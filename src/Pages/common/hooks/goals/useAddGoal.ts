import * as React from 'react';

import { useDispatch } from 'react-redux';

import { useAddGoalMutation } from '../../../../services/goals';
import { TransactionsApi } from '../../../../services/transactions';

const useAddGoal = () => {
    const dispatch = useDispatch();
    const [addGoal, { data, ...other }] = useAddGoalMutation();

    const addGoalHandler = React.useCallback(
        (data: {
            name: string;
            total_amount: number;
            initial_deposit: number;
            deposit_term: number;
            percent: number;
            category: number;
        }) => {
            addGoal(data).then(() => {
                return dispatch({
                    type: `${TransactionsApi.reducerPath}/invalidateTags`,
                    payload: ['Transactions'],
                });
            });
        },
        [addGoal, dispatch],
    );

    return {
        addGoal: addGoalHandler,
        data: data?.result,
        ...other,
    };
};

export default useAddGoal;
