import type React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "../Pages/HomePage/HomePage"
import ShopPage from "../Pages/ShopPage/ShopPage"
import CartPage from "../Pages/CartPage/CartPage"
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage"
import WishlistPage from "../Pages/WishlistPage/WishlistPage"
import HelpSheltersPage from "../Pages/HelpSheltersPage/HelpSheltersPage"
import LoginPage from "../Pages/LoginPage/LoginPage"
import SignupPage from "../Pages/SignupPage/SignupPage"
import ProfilePage from "../Pages/ProfilePage/ProfilePage"
import ForgotPasswordPage from "../Pages/ForgotPasswordPage/ForgotPasswordPage"
import VerifyCodePage from "../Pages/VerifyCodePage/VerifyCodePage"
import ResetPasswordPage from "../Pages/ResetPasswordPage/ResetPasswordPage"

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/:category" element={<ShopPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/help-shelters" element={<HelpSheltersPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-code" element={<VerifyCodePage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/mission" element={<div>Mission Page</div>} />
      <Route path="/shelters" element={<div>Partner Shelters Page</div>} />
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
