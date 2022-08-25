import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TCategory } from '../Pages/common/hooks/useCategories';
import { api } from './api';
import { TResponse } from './types';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: api.categories.domain }),
    tagTypes: ['Categories'],
    endpoints: builder => ({
        fetchCategories: builder.query<TResponse<TCategory[]>, string>({
            query: date => ({
                url: api.categories.getWithTransactions,
                params: {
                    date,
                },
            }),
            providesTags: ['Categories'],
        }),
        addCategory: builder.mutation<TResponse<TCategory>, { name: string }>({
            query: body => ({
                url: api.categories.common,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Categories'],
        }),
    }),
});

export const { useFetchCategoriesQuery, useAddCategoryMutation } = categoriesApi;
