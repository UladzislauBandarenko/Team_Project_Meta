import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authApi } from "./auth/api"
import authReducer from "./auth/authSlice"
import cartReducer from "./cart/cartSlice"
import wishlistReducer from "./wishlist/wishlistSlice"
import { orderApi } from "./order/orderApi"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
        [authApi.reducerPath]: authApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
  },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            authApi.middleware,
            orderApi.middleware
        ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
