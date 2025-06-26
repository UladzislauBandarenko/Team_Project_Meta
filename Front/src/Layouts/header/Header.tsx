"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { NavLink, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import "./Header.scss"

export const Header: React.FC = () => {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { totalItems } = useSelector((state: RootState) => state.cart)
  const { totalItems: wishlistItems } = useSelector((state: RootState) => state.wishlist)

  // Check if user is a seller
  const isSeller = user?.role === "seller"

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <h2>PetCare Market</h2>
        </Link>

        <div className="header__actions">
          <nav className="header__nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "header__link header__link--active" : "header__link")}
            >
              {t("navigation.home", "Home")}
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "header__link header__link--active" : "header__link")}
            >
              {t("navigation.shop", "Shop")}
            </NavLink>
            <NavLink
              to="/help-shelters"
              className={({ isActive }) => (isActive ? "header__link header__link--active" : "header__link")}
            >
              {t("navigation.helpShelters", "Help Shelters")}
            </NavLink>
          </nav>

          {isAuthenticated && user ? (
            <>
              {/* Profile link - different for sellers and regular users */}
              <Link
                to={isSeller ? "/seller/dashboard" : "/profile"}
                className="header__user-icon"
                title={isSeller ? "Seller Dashboard" : "Profile"}
              >
                👤
              </Link>

              {/* Hide cart and wishlist for sellers */}
              {!isSeller && (
                <>
                  <Link to="/wishlist" className="header__cart" title="Wishlist">
                    ❤️
                    {wishlistItems > 0 && <span className="header__cart-count">{wishlistItems}</span>}
                  </Link>
                  <Link to="/cart" className="header__cart" title="Shopping Cart">
                    🛒{totalItems > 0 && <span className="header__cart-count">{totalItems}</span>}
                  </Link>
                </>
              )}
            </>
          ) : (
            <Link to="/login" className="header__link">
              {t("navigation.signIn", "Sign In")}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
