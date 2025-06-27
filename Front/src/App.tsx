import "./Styles/App.scss"
import HistoryRouter from "./Routes/HistoryRouter"
import browserHistory from "./Routes/browserHistory"
import ScrollToTop from "./Routes/ScrollToTop"
import { Header, Footer } from "./Layouts/index"
import { AppRoutes } from "./Routes/AppRoutes"
import { FavoritesSync } from "./Sync/FavoritesSync"
import { CartSync } from "./Sync/CartSync"
import { useFavoritesInitializer } from "./redux/wishlist/useFavoritesInitializer"
import { useCartInitializer } from "./redux/cart/useCartInitializer"

function App() {
    useFavoritesInitializer()
    useCartInitializer()

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
