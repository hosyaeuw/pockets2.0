import * as React from 'react';

import { useDispatch } from 'react-redux';

import { useInvestGoalMutation } from '../../../../services/goals';
import { TransactionsApi } from '../../../../services/transactions';

const useInvestGoal = () => {
    const dispatch = useDispatch();
    const [investGoal, { data, ...other }] = useInvestGoalMutation();

    const investGoalHandler = React.useCallback(
        (id: number, amount: number) => {
            return investGoal({ id, amount }).then(() => {
                return dispatch({
                    type: `${TransactionsApi.reducerPath}/invalidateTags`,
                    payload: ['Transactions'],
                });
            });
        },
        [investGoal, dispatch],
    );

    return {
        investGoal: investGoalHandler,
        data: data?.result,
        ...other,
    };
};

export default useInvestGoal;
