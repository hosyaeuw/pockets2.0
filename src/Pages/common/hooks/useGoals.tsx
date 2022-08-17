import React from "react";
import { useDispatch } from "react-redux";
import { useTypesSelector } from "../../../hooks/useTypesSelector";
import { addGoalsAction } from "../../../redux/slices/goals";
import { TCategory } from "./useCategories";

export type TGoal = {
    id: number;
    name: string;
    amount: number;
    initial_deposit: number;
    percent: number;
    deposit_term: number;
    total_amount: number;
    prev_month_amount: number;
    days_to_end: number;
    is_closed: boolean;
    created_at: string;
    closed_at: string | null;
    category: TCategory;
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
            const endGoal = new Date(currDate).setMonth(
                currDate.getMonth() + +data.deposit_term
            );
            const secondsToEnd = endGoal - currDate.getTime();
            dispatch(
                addGoalsAction({
                    id: (items[items.length - 1]?.id ?? 0) + 1,
                    ...data,
                    amount: data.initial_deposit,
                    prev_month_amount: 0,
                    days_to_end: secondsToEnd / (1000 * 3600 * 24),
                    is_closed: false,
                    created_at: currDate.toLocaleDateString(),
                    closed_at: null,
                })
            );
        },
        [items, dispatch]
    );

    return { addGoal, items };
};

export default useGoals;
