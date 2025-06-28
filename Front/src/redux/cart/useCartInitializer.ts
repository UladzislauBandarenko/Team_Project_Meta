import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetCartQuery } from "./api"
import { CartItem, addToCart } from "./cartSlice"
import { RootState } from "../store"

interface BackendCartItem {
    id: number
    cartId: number
    productId: number
    quantity: number
    isSelected: boolean
    productName: string
    price: number
    imageBase64: string | null
}

export const useCartInitializer = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => !!state.auth.user)
    const { data, isSuccess } = useGetCartQuery(undefined, { skip: !isAuthenticated })

    // 💡 сохраняем флаг, чтобы не повторять инициализацию
    const isInitializedRef = useRef(false)

    useEffect(() => {
        if (!isAuthenticated || !isSuccess || !Array.isArray(data) || isInitializedRef.current) {
            return
        }

        (data as BackendCartItem[]).forEach((item) => {
            console.log("🛠 [CartInitializer] Первая инициализация корзины")
                isInitializedRef.current = true

                if (!item.productName || item.price <= 0) {
                    console.warn("⚠️ Пропущен товар — недостаточно данных:", item)
                    return
                }

                const newItem: CartItem = {
                    id: item.productId,
                    backendId: item.id,
                    name: item.productName,
                    price: item.price,
                    image: item.imageBase64 || "",
                    quantity: item.quantity,
                    category: "",
                }

                console.log("📥 Добавление с бэка:", newItem)
                dispatch(addToCart(newItem))
            })
    }, [isAuthenticated, isSuccess, data, dispatch])
}
