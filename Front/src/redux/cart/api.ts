import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CartItem } from "./types"

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/CartItems",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken")
            if (token) headers.set("Authorization", `Bearer ${token}`)
            return headers
        },
    }),
    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        getCart: builder.query<CartItem[], void>({
            query: () => "",
            providesTags: ["Cart"],
        }),
        addCartItem: builder.mutation<void, { productId: number; quantity: number }>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),
        updateCartItem: builder.mutation<void, { itemId: number; quantity: number }>({
            query: ({ itemId, quantity }) => ({
                url: `${itemId}`,
                method: "PUT",
                body: { quantity, isSelected: true },
            }),
            invalidatesTags: ["Cart"],
        }),
        deleteCartItem: builder.mutation<void, number>({
            query: (itemId) => ({
                url: `${itemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
})

export const {
    useGetCartQuery,
    useAddCartItemMutation,
    useUpdateCartItemMutation,
    useDeleteCartItemMutation,
} = cartApi
