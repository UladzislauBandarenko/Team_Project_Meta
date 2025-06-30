import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState, store } from "../redux/store"
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
    const { data: backendCart, isSuccess } = useGetCartQuery(undefined, {
        pollingInterval: 0,
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false,
        refetchOnFocus: false,
    })

    useEffect(() => {
        const syncCart = async () => {
            console.log("🛒 [CartSync] syncCart START")

            const token = localStorage.getItem("accessToken")
            if (!token || !isSuccess) {
                console.log("❌ [CartSync] Data not ready yet", { isSuccess, backendCart })
                return
            }

            const currentCart = store.getState().cart.items
            const backend = store.getState().cartApi.queries["getCart(undefined)"]?.data as typeof backendCart

            console.log("✅ [CartSync] Syncing with backend")
            console.log("🧺 Local cart:", currentCart)
            console.log("📦 Backend cart:", backend)

            for (const localItem of currentCart) {
                const existing = backend?.find((b) => b.productId === localItem.id)

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
                    if (!localItem.name || localItem.price <= 0) {
                        console.warn("⚠️ Пропущен пустой товар при добавлении:", localItem)
                        continue
                    }

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

            for (const backendItem of backend || []) {
                const stillExists = currentCart.some(
                    (local) => local.backendId === backendItem.id
                )

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
    }, [])

    return null
}
