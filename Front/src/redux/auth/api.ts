// redux/auth/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RegisterRequest, SellerRegisterRequest, LoginRequest, AuthResponse, User } from "./types"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/Users",
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken")
            if (token) headers.set("Authorization", `Bearer ${token}`)
            return headers
        },
    }),
    tagTypes: ["Auth", "User"],
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
            }),
        }),
        registerSeller: builder.mutation<AuthResponse, SellerRegisterRequest>({
            query: (data) => ({
                url: "register-seller",
                method: "POST",
                body: data,
            }),
        }),
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (creds) => ({
                url: "login",
                method: "POST",
                body: creds,
            }),
        }),
        getCurrentUser: builder.query<User, void>({
            query: () => ({ url: "me", method: "GET" }),
            providesTags: ["User"],
        }),

        updateUserAddress: builder.mutation<void, {
            firstName: string
            lastName: string
            address: string
            city: string
            postalCode: string
            country: string
            phoneNumber: string
            apartmentNumber: string
        }>({
            query: (data) => ({
                url: "",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),


        forgotPassword: builder.mutation<void, { email: string }>({
            query: (data) => ({
                url: "request-reset",
                method: "POST",
                body: data,
                responseHandler: (response) => response.text(),
            }),
        }),
    }),
})

export const {
    useRegisterMutation,
    useRegisterSellerMutation,
    useLoginMutation,
    useGetCurrentUserQuery,
    useForgotPasswordMutation,
    useUpdateUserAddressMutation,
} = authApi
