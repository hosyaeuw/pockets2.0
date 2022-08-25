import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    TransactionType,
    TTransaction,
    TTransactionsBalance,
} from '../Pages/common/hooks/useTransactions';
import { api } from './api';
import { TResponse } from './types';

export const TransactionsApi = createApi({
    reducerPath: 'TransactionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: api.transactions.domain }),
    tagTypes: ['Transactions'],
    endpoints: builder => ({
        fetchTransactions: builder.query<TResponse<TTransaction[]>, string>({
            query: date => ({
                url: api.transactions.common,
                params: {
                    date,
                },
            }),
            providesTags: ['Transactions'],
        }),
        fetchBalance: builder.query<TResponse<TTransactionsBalance>, any>({
            query: () => api.transactions.balance,
            providesTags: ['Transactions'],
        }),
        fetchGlobal: builder.query<TResponse<Record<TransactionType, number>>, string>({
            query: date => ({
                url: api.transactions.global,
                params: {
                    date,
                },
            }),
            providesTags: ['Transactions'],
        }),
        addTransaction: builder.mutation<
            TResponse<TTransaction>,
            { amount: number; categoryId: number | undefined; transaction_date: string }
        >({
            query: body => ({
                url: api.transactions.common,
                method: 'POST',
                body: {
                    ...body,
                    category: body.categoryId,
                },
            }),
            invalidatesTags: ['Transactions'],
        }),
    }),
});

export const {
    useFetchBalanceQuery,
    useFetchGlobalQuery,
    useFetchTransactionsQuery,
    useAddTransactionMutation,
} = TransactionsApi;
