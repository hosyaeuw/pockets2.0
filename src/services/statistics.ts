import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TCategory } from '../Pages/common/hooks/useCategories';

import { api } from './api';
import { TResponse } from './types';

export type TMonthlyTransaction = {
    total_income: number;
    total_expense: number;
    month_income_goals: number;
    most_expensive_category: TCategory | null;
};

export const StatisticsApi = createApi({
    reducerPath: 'StatisticsApi',
    baseQuery: fetchBaseQuery({ baseUrl: api.statistics.domain }),
    tagTypes: ['Statistics'],
    endpoints: builder => ({
        fetchMonthlyTransaction: builder.query<TResponse<TMonthlyTransaction>, any>({
            query: () => api.statistics.monthlyTransaction,
            providesTags: ['Statistics'],
        }),
    }),
});

export const { useFetchMonthlyTransactionQuery } = StatisticsApi;
