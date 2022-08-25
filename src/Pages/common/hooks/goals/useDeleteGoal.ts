import * as React from 'react';

import { useDispatch } from 'react-redux';

import { useDeleteGoalMutation } from '../../../../services/goals';
import { TransactionsApi } from '../../../../services/transactions';

const useDeleteGoal = () => {
    const dispatch = useDispatch();
    const [deleteGoal, { data, ...other }] = useDeleteGoalMutation();

    const deleteGoalHandler = React.useCallback(
        (id: number) => {
            deleteGoal(id).then(() => {
                return dispatch({
                    type: `${TransactionsApi.reducerPath}/invalidateTags`,
                    payload: ['Transactions'],
                });
            });
        },
        [deleteGoal, dispatch],
    );

    return {
        deleteGoal: deleteGoalHandler,
        data: data?.result,
        ...other,
    };
};

export default useDeleteGoal;
