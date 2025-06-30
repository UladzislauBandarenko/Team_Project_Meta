import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Product {
    id: number
    productName: string
    productDescription: string
    price: number
    categoryName: string
    stockQuantity: number
    averageRating: number
    reviewCount: number
    sellerName: string
    imageBase64: string | null
}

interface Review {
    id: number
    rating: number
    comment: string
    createdDate: string
    userId: number
    userName: string
}

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5278/api", // поправили порт
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

        getProductById: builder.query<Product, number>({
            query: (id) => `Products/${id}`,
        }),

        getReviewsByProductId: builder.query<Review[], number>({
            query: (productId) => `Reviews/product/${productId}`,
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

        getAllProducts: builder.query<any[], void>({
            query: () => "Products",
        }),

        getBestsellers: builder.query<Product[], void>({
            query: () => "Products/bestsellers",
        }),
    }),
})

export const {
    useGetSellerProductsQuery,
    useGetProductByIdQuery,
    useGetReviewsByProductIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetAllProductsQuery,
    useGetBestsellersQuery,
} = productsApi
