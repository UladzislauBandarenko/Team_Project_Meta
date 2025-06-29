import type React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import HomePage from "../Pages/HomePage/HomePage"
import ShopPage from "../Pages/ShopPage/ShopPage"
import ProductDetailPage from "../Pages/ProductDetailPage/ProductDetailPage"
import CartPage from "../Pages/CartPage/CartPage"
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage"
import WishlistPage from "../Pages/WishlistPage/WishlistPage"
import HelpSheltersPage from "../Pages/HelpSheltersPage/HelpSheltersPage"
import LoginPage from "../Pages/LoginPage/LoginPage"
import SignupPage from "../Pages/SignupPage/SignupPage"
import SellerSignupPage from "../Pages/SellerSignupPage/SellerSignupPage"
import ProfilePage from "../Pages/ProfilePage/ProfilePage"
import ForgotPasswordPage from "../Pages/ForgotPasswordPage/ForgotPasswordPage"
import VerifyCodePage from "../Pages/VerifyCodePage/VerifyCodePage"
import ResetPasswordPage from "../Pages/ResetPasswordPage/ResetPasswordPage"
import AdminProfile from "../Pages/AdminProfile/AdminProfile"
import SellerProfile from "../Pages/SellerProfile/SellerProfile"
import OrderDetailsPage from "../Pages/SellerProfile/OrderDetailsPage"

// Protected Route Component for Sellers
const ProtectedFromSellers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth)

  // If user is a seller, redirect to their dashboard
  if (user?.role === "seller") {
    return <Navigate to="/seller/dashboard" replace />
  }

  return <>{children}</>
}

// Seller Only Route Component
const SellerOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If not a seller, redirect to home
  if (user?.role !== "seller") {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/help-shelters" element={<HelpSheltersPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/seller-signup" element={<SellerSignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-code" element={<VerifyCodePage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Routes that sellers cannot access */}
      <Route
        path="/cart"
        element={
          <ProtectedFromSellers>
            <CartPage />
          </ProtectedFromSellers>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedFromSellers>
            <CheckoutPage />
          </ProtectedFromSellers>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedFromSellers>
            <WishlistPage />
          </ProtectedFromSellers>
        }
      />
      <Route
        path="/help-shelters"
        element={
          <ProtectedFromSellers>
            <HelpSheltersPage />
          </ProtectedFromSellers>
        }
      />

      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminProfile />} />

      {/* Seller-only routes */}
      <Route
        path="/seller/dashboard"
        element={
          <SellerOnlyRoute>
            <SellerProfile />
          </SellerOnlyRoute>
        }
      />
      <Route
        path="/seller/order/:id"
        element={
          <SellerOnlyRoute>
            <OrderDetailsPage />
          </SellerOnlyRoute>
        }
      />

      {/* Static pages */}
      <Route path="/mission" element={<div>Mission Page</div>} />
      <Route path="/partner-shelters" element={<div>Partner Shelters Page</div>} />
      <Route path="/contact" element={<div>Contact Page</div>} />
      <Route path="/faq" element={<div>FAQ Page</div>} />
      <Route path="/shipping" element={<div>Shipping Policy Page</div>} />
      <Route path="/returns" element={<div>Returns & Refunds Page</div>} />
      <Route path="/privacy" element={<div>Privacy Policy Page</div>} />
      <Route path="/terms" element={<div>Terms of Service Page</div>} />
      <Route path="/success-stories" element={<div>Success Stories Page</div>} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  )
}
