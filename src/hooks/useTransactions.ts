import * as React from "react";
import { Category } from "./useCategories";

export type TransactionType = "income" | "expense";

export type TTransaction = {
    category?: Category;
    date: string;
    type: TransactionType;
    amount: number;
};

class Transaction {
    id: number;
    category: Category | undefined;
    date: string;
    type: TransactionType;
    amount: number;

    constructor(
        id: number,
        date: string,
        type: TransactionType,
        amount = 0,
        category: Category | undefined
    ) {
        this.id = id;
        this.category = category;
        this.date = date;
        this.type = type;
        this.amount = amount;
    }

    toJson() {
        return {
            id: this.id,
            category: this.category,
            date: this.date,
            type: this.type,
            amount: this.amount,
        };
    }
}

class Transactions {
    private static _instance: Transactions = new Transactions();

    items: Transaction[] = [];

    constructor() {
        if (typeof Transactions._instance === "object") {
            return Transactions._instance;
        }

        Transactions._instance = this;
        return this;
    }

    getLastId() {
        return this.items[this.items.length - 1]?.id || 0;
    }

    addTransaction(transaction: Transaction) {
        this.items.push(transaction);
    }

    toJson() {
        return this.items;
    }
}

type TGlobal = {
    income: number;
    expense: number;
};

const useTransactions = () => {
    const transactions = React.useMemo(() => {
        const transactions = new Transactions();
        // TODO: удалить
        // @ts-ignore
        window.transactions = transactions;
        return transactions;
    }, []);
    const [items, setItems] = React.useState(transactions.items);

    const sumGlobal = React.useCallback((): TGlobal => {
        return transactions.items.reduce(
            (acc, curr) => {
                if (curr.type === "income") {
                    return { ...acc, income: acc.income + curr.amount };
                } else {
                    return { ...acc, income: acc.expense + curr.amount };
                }
            },
            {
                expense: 0,
                income: 0,
            }
        );
    }, [transactions]);

    const [global, setGlobal] = React.useState(sumGlobal());

    const updateItems = React.useCallback(() => {
        setItems([...transactions.items]);
        setGlobal({ ...sumGlobal() });
    }, [transactions, sumGlobal]);

    const addTransaction = React.useCallback(
        ({ date, type, amount = 0, category }: TTransaction) => {
            const lastId = transactions.getLastId();
            transactions.addTransaction(
                new Transaction(lastId + 1, date, type, amount, category)
            );
            updateItems();
        },
        [transactions, updateItems]
    );

    return {
        addTransaction,
        items,
        global,
    };
};

export default useTransactions;
