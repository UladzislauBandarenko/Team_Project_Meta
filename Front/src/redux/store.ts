import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { useDispatch } from "react-redux"
import type { ThunkDispatch, AnyAction } from "@reduxjs/toolkit"

import { authApi } from "./auth/api"
import { orderApi } from "./order/orderApi"
import { favoritesApi } from "./wishlist/favoritesApi"
import { cartApi } from "./cart/api"
import { productsApi } from "./products/productsApi"

import authReducer from "./auth/authSlice"
import cartReducer from "./cart/cartSlice"
import wishlistReducer from "./wishlist/wishlistSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        [authApi.reducerPath]: authApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            authApi.middleware,
            orderApi.middleware,
            favoritesApi.middleware,
            cartApi.middleware,
            productsApi.middleware
        ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>

// Типизированный хук useAppDispatch для thunk'ов
export const useAppDispatch: () => AppDispatch = useDispatch
