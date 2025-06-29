import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface PopularProduct {
    productId: number
    name: string
    price: number
    orderCount: number
    totalRevenue: number
}

export interface SellerMetrics {
    totalSales: number
    netProfit: number
    averageOrderValue: number
    totalOrders: number
    popularProducts: PopularProduct[]
    averageRating: number
    recentReviews: any[]
}

export const sellerApi = createApi({
    reducerPath: "sellerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/SellerMetrics",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken")
            if (token) headers.set("Authorization", `Bearer ${token}`)
            return headers
        },
    }),
    endpoints: (builder) => ({
        getSellerMetrics: builder.query<SellerMetrics, void>({
            query: () => "metrics",
        }),
    }),
})

export const { useGetSellerMetricsQuery } = sellerApi
