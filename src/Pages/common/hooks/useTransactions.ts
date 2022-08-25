import * as React from 'react';

import { useDispatch } from 'react-redux';

import { useTypesSelector } from '../../../hooks/useTypesSelector';
import { addTransactionAction } from '../../../redux/slices/transactions';
import { TCategory } from './useCategories';

export type TransactionType = 'income' | 'expense';

export type TTransaction = {
    id: number;
    category?: TCategory;
    transaction_date: string;
    amount: number;
};

export type TGlobal = {
    income: number;
    expense: number;
};

export type TTransactionsBalance = {
    balance: number;
};

const useTransactions = () => {
    const dispatch = useDispatch();
    const [items, global, freeMoney] = useTypesSelector(({ transactions, globalTransactions }) => [
        transactions.items,
        globalTransactions.data,
        globalTransactions.freeMoney,
    ]);

    const addTransaction = React.useCallback(
        ({
            date,
            amount = 0,
            category,
        }: {
            date: string;
            amount: number;
            category?: TCategory;
        }) => {
            dispatch(
                addTransactionAction({
                    id: items[items.length]?.id ?? 0,
                    transaction_date: date,
                    amount,
                    category,
                }),
            );
        },
        [dispatch, items],
    );

    return {
        addTransaction,
        items,
        global,
        freeMoney,
    };
};

export default useTransactions;
