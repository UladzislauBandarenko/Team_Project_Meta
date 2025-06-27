import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import {
    useAddCartItemMutation,
    useUpdateCartItemMutation,
    useDeleteCartItemMutation,
    useGetCartQuery,
} from "../redux/cart/api"

export const CartSync = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const [addCartItem] = useAddCartItemMutation()
    const [updateCartItem] = useUpdateCartItemMutation()
    const [deleteCartItem] = useDeleteCartItemMutation()
    const { data: backendCart, isSuccess } = useGetCartQuery()

    useEffect(() => {
        const syncCart = async () => {
            console.log("🛒 [CartSync] syncCart START")

            const token = localStorage.getItem("accessToken")
            if (!token || !isSuccess) {
                console.log("❌ [CartSync] Data not ready yet", { isSuccess, backendCart })
                return
            }

            console.log("✅ [CartSync] Syncing with backend")
            console.log("🧺 Local cart:", cartItems)
            console.log("📦 Backend cart:", backendCart)

            // === ОБНОВЛЕНИЕ / ДОБАВЛЕНИЕ ===
            for (const localItem of cartItems) {
                const existing = backendCart.find((b) => b.productId === localItem.id)

                if (existing) {
                    if (existing.quantity !== localItem.quantity) {
                        console.log("🔄 Updating item", localItem)
                        try {
                            await updateCartItem({
                                itemId: existing.id,
                                quantity: localItem.quantity,
                            }).unwrap()
                        } catch (err) {
                            console.error("❌ Ошибка обновления", err)
                        }
                    }
                } else {
                    console.log("➕ Adding item", localItem)
                    try {
                        await addCartItem({
                            productId: localItem.id,
                            quantity: localItem.quantity,
                        }).unwrap()
                    } catch (err) {
                        console.error("❌ Ошибка добавления", err)
                    }
                }
            }

            // === УДАЛЕНИЕ ===
            for (const backendItem of backendCart) {
                const stillExists = cartItems.find((i) => i.id === backendItem.productId)
                if (!stillExists) {
                    console.log("❌ Removing item from backend", backendItem)
                    try {
                        await deleteCartItem(backendItem.id).unwrap()
                    } catch (err) {
                        console.error("❌ Ошибка удаления", err)
                    }
                }
            }
        }

        const interval = setInterval(syncCart, 120_000)
        syncCart()

        return () => clearInterval(interval)
    }, [cartItems, backendCart, isSuccess, addCartItem, updateCartItem, deleteCartItem])

    return null
}
