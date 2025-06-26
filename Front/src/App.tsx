import "./Styles/App.scss"
import HistoryRouter from "./Routes/HistoryRouter"
import browserHistory from "./Routes/browserHistory"
import ScrollToTop from "./Routes/ScrollToTop"
import { Header, Footer } from "./Layouts/index"
import { AppRoutes } from "./Routes/AppRoutes"
import { useLocation } from "react-router-dom"

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")

  if (isAdminRoute) {
    return (
      <div className="App">
        <AppRoutes />
      </div>
    )
  }

  return (
    <div className="App">
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
