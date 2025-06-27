import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetMyFavoritesQuery } from "../wishlist/favoritesApi"
import { WishlistItem, addToWishlist, clearWishlist } from "../wishlist/wishlistSlice"
import { RootState } from "../store"

export const useFavoritesInitializer = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)

    const wasInitialized = useRef(false)

    const { data, isSuccess } = useGetMyFavoritesQuery(undefined, {
        skip: !accessToken || wasInitialized.current,
    })

    useEffect(() => {
        if (isSuccess && Array.isArray(data)) {
            wasInitialized.current = true

            dispatch(clearWishlist()) // очищаем локальные фейвориты
            data.forEach((productId) => {
                dispatch(
                    addToWishlist({
                        id: productId,
                        name: "",
                        price: 0,
                        image: "",
                        rating: 0,
                        reviews: 0,
                        category: "",
                    } as WishlistItem)
                )
            })
        }
    }, [isSuccess, data, dispatch])
}
