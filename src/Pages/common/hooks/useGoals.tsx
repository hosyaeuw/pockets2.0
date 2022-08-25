import * as React from 'react';

import { useDispatch } from 'react-redux';

import { useTypesSelector } from '../../../hooks/useTypesSelector';
import {
    addGoalsAction,
    deleteGoalsAction,
    incrementGoalAction,
} from '../../../redux/slices/goals';
import DateHelper from '../../../utils/DateHelper';
import { TCategory } from './useCategories';

export type TGoal = {
    id: number;
    name: string;
    amount: number;
    initial_deposit: number;
    percent: number;
    deposit_term: number;
    total_amount: number;
    prev_month_amount: number;
    is_closed: boolean;
    created_at: string;
    want_close: string;
    closed_at: string | null;
    category: TCategory;
    replenishmentCount: number;
};

export type TGoalTop = {
    id: number;
    name: string;
    total_amount: number;
    amount: number;
    progress: number;
};

export type TGoalAnalytics = {
    open_goal_amount: number;
    open_goal_total: number;
    current_month_percent: number;
    all_time_percent: number;
    nearest_end_goal_days: number;
    most_successful_category: TCategory | undefined;
    post_popular_category: TCategory | undefined;
};

const useGoals = () => {
    const dispatch = useDispatch();
    const [items] = useTypesSelector(({ goals }) => [goals.items]);

    const addGoal = React.useCallback(
        (data: {
            name: string;
            total_amount: number;
            initial_deposit: number;
            deposit_term: number;
            percent: number;
            category: TCategory;
        }) => {
            const currDate = new Date();
            const wantClose = new Date(
                new Date(currDate).setMonth(currDate.getMonth() + data.deposit_term),
            );

            dispatch(
                addGoalsAction({
                    id: (items[items.length - 1]?.id ?? 0) + 1,
                    ...data,
                    amount: data.initial_deposit,
                    prev_month_amount: 0,
                    is_closed: false,
                    want_close: DateHelper.formatDateToStr(wantClose),
                    created_at: DateHelper.formatDateToStr(currDate),
                    closed_at: null,
                    replenishmentCount: 0,
                }),
            );
        },
        [items, dispatch],
    );

    const incrementGoal = React.useCallback(
        (data: { id: number; amount: number }) => {
            dispatch(incrementGoalAction(data));
        },
        [dispatch],
    );

    const deleteGoal = React.useCallback(
        (id: number) => {
            if (window.confirm('Вы точно хотите удалить эту цель?')) {
                dispatch(deleteGoalsAction(id));
            }
        },
        [dispatch],
    );

    return { addGoal, items, incrementGoal, deleteGoal };
};

export default useGoals;
