import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CartItem } from "./types"

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/cart",
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => "",
      providesTags: ["Cart"],
    }),
  }),
})

export const { useGetCartQuery } = cartApi
