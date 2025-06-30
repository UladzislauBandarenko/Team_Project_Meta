// src/redux/admin/adminApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface AdminMetrics {
    totalSales: number
    platformProfit: number
    averageOrderValue: number
    charityDonations: number
    totalUsers: number
    totalOrders: number
}

interface Category {
    id: number
    name: string
}

interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    role: "buyer" | "seller" | "admin"
    address: string
    city: string
    postalCode: string
    country: string
    phoneNumber: string
    apartmentNumber: string
}

interface PromoteUserPayload {
    userId: number
    role: "buyer" | "seller" | "admin"
}

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
        getAdminMetrics: builder.query<AdminMetrics, void>({
            query: () => "Admin/metrics",
        }),

        getCategories: builder.query<Category[], void>({
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

        getAllUsers: builder.query<User[], void>({
            query: () => "Users",
        }),

        promoteUser: builder.mutation<void, PromoteUserPayload>({
            query: (body) => ({
                url: "Users/promote",
                method: "POST",
                body,
            }),
        }),
    }),
})

export const {
    useGetAdminMetricsQuery,
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllUsersQuery,
    usePromoteUserMutation,
} = adminApi
