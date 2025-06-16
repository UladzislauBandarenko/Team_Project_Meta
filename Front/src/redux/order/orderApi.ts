import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CreateOrderDto, OrderDto } from "./types"

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/orders",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken")
            if (token) headers.set("Authorization", `Bearer ${token}`)
            return headers
        },
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation<OrderDto, CreateOrderDto>({
            query: (order) => ({
                url: "",
                method: "POST",
                body: order,
            }),
        }),
        getMyOrders: builder.query<OrderDto[], void>({
            query: () => ({
                url: "/me",
                method: "GET",
            }),
        }),
    }),
})

export const { useCreateOrderMutation, useGetMyOrdersQuery } = orderApi
