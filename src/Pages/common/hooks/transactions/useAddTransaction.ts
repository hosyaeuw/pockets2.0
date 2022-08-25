import * as React from 'react';

import { useDispatch } from 'react-redux';

import { categoriesApi } from '../../../../services/categories';
import { StatisticsApi } from '../../../../services/statistics';

import { useAddTransactionMutation } from '../../../../services/transactions';

const useAddTransaction = () => {
    const dispatch = useDispatch();
    const [addTransaction, data] = useAddTransactionMutation();

    const addTransactionHandler = React.useCallback(
        (amount: number, transaction_date: string, categoryId: number | undefined) => {
            const data = {
                amount,
                transaction_date,
                categoryId,
            };

            return addTransaction(data).then(() => {
                dispatch({
                    type: `${categoriesApi.reducerPath}/invalidateTags`,
                    payload: ['Categories'],
                });
                dispatch({
                    type: `${StatisticsApi.reducerPath}/invalidateTags`,
                    payload: ['Statistics'],
                });
            });
        },
        [addTransaction, dispatch],
    );

    return { addTransaction: addTransactionHandler, data };
};

export default useAddTransaction;
