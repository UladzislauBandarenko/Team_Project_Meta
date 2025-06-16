"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { removeFromWishlist, clearWishlist } from "../../redux/wishlist/wishlistSlice"
import { addToCart } from "../../redux/cart/cartSlice"
import type { RootState } from "../../redux/store"
import "./WishlistPage.scss"

export const WishlistPage: React.FC = () => {
  const dispatch = useDispatch()
  const { items, totalItems } = useSelector((state: RootState) => state.wishlist)

  const handleRemoveFromWishlist = (id: number) => {
    dispatch(removeFromWishlist(id))
  }

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishlist())
    }
  }

  const handleAddToCart = (item: any) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      }),
    )
    console.log("Added to cart:", item.name)
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>,
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>,
      )
    }

    return stars
  }

  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-page__container">
          <div className="wishlist-header">
            <Link to="/shop" className="wishlist-header__back">
              ← Continue Shopping
            </Link>
            <h1 className="wishlist-header__title">My Wishlist (0)</h1>
          </div>

          <div className="empty-wishlist">
            <div className="empty-wishlist__icon">💝</div>
            <h2 className="empty-wishlist__title">Your Wishlist is Empty</h2>
            <p className="empty-wishlist__message">
              Save your favorite pet products here so you can easily find them later. Start browsing and add items you
              love!
            </p>
            <Link to="/shop" className="empty-wishlist__shop-button">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-page__container">
        <div className="wishlist-header">
          <Link to="/shop" className="wishlist-header__back">
            ← Continue Shopping
          </Link>
          <h1 className="wishlist-header__title">My Wishlist ({totalItems})</h1>
        </div>

        <div className="wishlist-content">
          <div className="wishlist-stats">
            <div className="wishlist-stats__content">
              <div className="wishlist-stats__info">
                <div className="wishlist-stats__count">{totalItems}</div>
                <div className="wishlist-stats__label">items in your wishlist</div>
              </div>
              <div className="wishlist-stats__actions">
                <button onClick={handleClearWishlist} className="wishlist-stats__clear">
                  Clear All
                </button>
                <Link to="/shop" className="wishlist-stats__shop">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          <div className="wishlist-grid">
            {items.map((item) => (
              <div key={item.id} className="wishlist-item">
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="wishlist-item__remove"
                  title="Remove from wishlist"
                >
                  🗑️
                </button>

                <div className="wishlist-item__image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </div>

                <div className="wishlist-item__content">
                  <h3 className="wishlist-item__name">{item.name}</h3>

                  <div className="wishlist-item__rating">
                    <div className="wishlist-item__stars">{renderStars(item.rating)}</div>
                    <span className="wishlist-item__reviews">({item.reviews})</span>
                  </div>

                  <div className="wishlist-item__price">€{item.price.toFixed(2)}</div>

                  <div className="wishlist-item__actions">
                    <button className="wishlist-item__add-to-cart" onClick={() => handleAddToCart(item)}>
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
