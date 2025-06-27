import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetCartQuery } from "./api"
import { CartItem, addToCart } from "./cartSlice"
import { RootState } from "../store"

export const useCartInitializer = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => !!state.auth.user)
    const { data, isSuccess } = useGetCartQuery(undefined, { skip: !isAuthenticated })

    useEffect(() => {
        if (isAuthenticated && isSuccess && Array.isArray(data)) {
            data.forEach((item) => {
                dispatch(
                    addToCart({
                        id: item.productId, // frontend использует productId как id
                        name: "",
                        price: 0,
                        image: "",
                        quantity: item.quantity,
                        category: "",
                    } as CartItem)
                )
            })
        }
    }, [isAuthenticated, isSuccess, data, dispatch])
}
