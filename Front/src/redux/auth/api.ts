import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RegisterRequest, LoginRequest, AuthResponse, User } from "./types"

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
  }),
})

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } = authApi
