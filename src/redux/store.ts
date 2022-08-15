import { configureStore } from "@reduxjs/toolkit";
import categories from "./slices/categories";
import transactions from "./slices/transactions";
import globalTransactions from "./slices/globalTransactions";

export const store = configureStore({
    reducer: { categories, transactions, globalTransactions },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
