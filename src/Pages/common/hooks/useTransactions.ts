import * as React from "react";
import { useDispatch } from "react-redux";
import { useTypesSelector } from "../../../hooks/useTypesSelector";
import { addTransactionAction } from "../../../redux/slices/transactions";
import { TCategory } from "./useCategories";

export type TransactionType = "income" | "expense";

export type TTransaction = {
    id: number;
    category?: TCategory;
    date: string;
    type: TransactionType;
    amount: number;
};

export type TGlobal = {
    income: number;
    expense: number;
};

const useTransactions = () => {
    const dispatch = useDispatch();
    const [items, global] = useTypesSelector(
        ({ transactions, globalTransactions }) => [
            transactions.items,
            globalTransactions.data,
        ]
    );

    const addTransaction = React.useCallback(
        ({
            date,
            type,
            amount = 0,
            category,
        }: {
            date: string;
            type: TransactionType;
            amount: number;
            category?: TCategory;
        }) => {
            dispatch(
                addTransactionAction({
                    id: items[items.length]?.id ?? 0,
                    date,
                    type,
                    amount,
                    category,
                })
            );
        },
        [dispatch, items]
    );

    return {
        addTransaction,
        items,
        global,
    };
};

export default useTransactions;
