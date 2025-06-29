// src/redux/admin/adminApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5278/api",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.accessToken
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getAdminMetrics: builder.query<{
            totalSales: number
            platformProfit: number
            averageOrderValue: number
            charityDonations: number
            totalUsers: number
            totalOrders: number
        }, void>({
            query: () => "Admin/metrics",
        }),

        getCategories: builder.query<{ id: number; name: string }[], void>({
            query: () => "Categories",
        }),

        addCategory: builder.mutation<void, { categorieName: string }>({
            query: (body) => ({
                url: "Categories",
                method: "POST",
                body,
            }),
        }),

        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `Categories/${id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetAdminMetricsQuery,
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
} = adminApi
