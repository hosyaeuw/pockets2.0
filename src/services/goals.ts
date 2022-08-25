import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TGoal, TGoalAnalytics, TGoalTop } from '../Pages/common/hooks/useGoals';
import { URLHelper } from '../utils/URLHelper';
import { api } from './api';
import { TResponse } from './types';
import { setAuthHeaders } from './utils';

export const GoalsApi = createApi({
    reducerPath: 'GoalsApi',
    tagTypes: ['Goals'],
    baseQuery: fetchBaseQuery({
        baseUrl: api.goals.domain,
        prepareHeaders: headers => {
            headers = setAuthHeaders(headers);

            return headers;
        },
    }),
    endpoints: builder => ({
        fetchAllGoals: builder.query<TResponse<TGoal[]>, any>({
            query: () => api.goals.common,
            providesTags: ['Goals'],
        }),
        fetchTopGoals: builder.query<TResponse<TGoalTop[]>, any>({
            query: () => api.goals.top,
            providesTags: ['Goals'],
        }),
        fetchAnalytics: builder.query<TResponse<TGoalAnalytics>, any>({
            query: () => api.goals.analytics,
            providesTags: ['Goals'],
        }),
        investGoal: builder.mutation<TResponse<TGoal>, { id: number; amount: number }>({
            query: ({ id, amount }) => ({
                url: URLHelper.buildUrl(api.goals.invest, { id }),
                method: 'POST',
                body: {
                    amount,
                },
            }),
            invalidatesTags: ['Goals'],
        }),
        addGoal: builder.mutation<
            TResponse<TGoal>,
            {
                name: string;
                total_amount: number;
                initial_deposit: number;
                deposit_term: number;
                percent: number;
                category: number;
            }
        >({
            query: body => ({
                url: api.goals.common,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Goals'],
        }),
        deleteGoal: builder.mutation<TResponse<any>, number>({
            query: id => ({
                url: URLHelper.buildUrl(api.goals.specific, { id }),
                method: 'DELETE',
            }),
            invalidatesTags: ['Goals'],
        }),
    }),
});

export const {
    useFetchTopGoalsQuery,
    useFetchAllGoalsQuery,
    useFetchAnalyticsQuery,
    useAddGoalMutation,
    useInvestGoalMutation,
    useDeleteGoalMutation,
} = GoalsApi;
