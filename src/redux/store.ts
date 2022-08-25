import { configureStore } from '@reduxjs/toolkit';

import { categoriesApi } from '../services/categories';
import { GoalsApi } from '../services/goals';
import { StatisticsApi } from '../services/statistics';
import { TransactionsApi } from '../services/transactions';
import categories from './slices/categories';
import globalTransactions from './slices/globalTransactions';
import goals from './slices/goals';
import transactions from './slices/transactions';
// TODO: в цикле?
const reducersObj = {
    categories,
    transactions,
    globalTransactions,
    goals,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [TransactionsApi.reducerPath]: TransactionsApi.reducer,
    [GoalsApi.reducerPath]: GoalsApi.reducer,
    [StatisticsApi.reducerPath]: StatisticsApi.reducer,
};

export const store = configureStore({
    reducer: reducersObj,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            categoriesApi.middleware,
            TransactionsApi.middleware,
            GoalsApi.middleware,
            StatisticsApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
