import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken")
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getSellerProducts: builder.query<any[], void>({
            query: () => "Products/seller",
        }),
        createProduct: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: "Products",
                method: "POST",
                body: formData,
            }),
        }),
        updateProduct: builder.mutation<any, { id: number; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `Products/${id}`,
                method: "PUT",
                body: formData,
            }),
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `Products/${id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetSellerProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi
