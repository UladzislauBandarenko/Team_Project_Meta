import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const favoritesApi = createApi({
    reducerPath: "favoritesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/FavoritesProducts",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken")
            if (token) headers.set("Authorization", `Bearer ${token}`)
            return headers
        },
    }),
    tagTypes: ["Favorites"],
    endpoints: (builder) => ({
        getMyFavorites: builder.query<number[], void>({
            query: () => "me",
            transformResponse: (response: any[]) => response.map((item) => item.productId),
            providesTags: ["Favorites"],
        }),
        addFavorite: builder.mutation<void, number>({
            query: (productId) => ({
                url: "",
                method: "POST",
                body: { productId },
            }),
            invalidatesTags: ["Favorites"],
        }),
        deleteFavorite: builder.mutation<void, number>({
            query: (productId) => ({
                url: `${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Favorites"],
        }),
    }),
})

export const {
    useGetMyFavoritesQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
} = favoritesApi
