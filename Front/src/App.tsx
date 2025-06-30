import "./Styles/App.scss"
import HistoryRouter from "./Routes/HistoryRouter"
import browserHistory from "./Routes/browserHistory"
import ScrollToTop from "./Routes/ScrollToTop"
import { Header, Footer } from "./Layouts"
import { AppRoutes } from "./Routes/AppRoutes"
import { FavoritesSync } from "./Sync/FavoritesSync"
import { CartSync } from "./Sync/CartSync"
import { useFavoritesInitializer } from "./redux/wishlist/useFavoritesInitializer"
import { useCartInitializer } from "./redux/cart/useCartInitializer"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useAppDispatch } from "./redux/store"
import { useGetCurrentUserQuery } from "./redux/auth/api"
import { updateUser } from "./redux/auth/authSlice"

function App() {
    useFavoritesInitializer()
    useCartInitializer()

    const location = useLocation()
    const isAdminRoute = location.pathname.startsWith("/admin")

    const dispatch = useAppDispatch()
    const { data: userData, isSuccess } = useGetCurrentUserQuery()

    useEffect(() => {
        if (isSuccess && userData) {
            dispatch(updateUser(userData))
        }
    }, [isSuccess, userData, dispatch])

    if (isAdminRoute) {
        return (
            <div className="App">
                <AppRoutes />
            </div>
        )
    }

    return (
        <div className="App">
            <FavoritesSync />
            <CartSync />
            <Header />
            <AppRoutes />
            <Footer />
        </div>
    )
}

function AppWrapper() {
    return (
        <HistoryRouter history={browserHistory}>
            <ScrollToTop />
            <App />
        </HistoryRouter>
    )
}

export default AppWrapper
