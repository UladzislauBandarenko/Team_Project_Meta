"use client"

import type React from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { removeFromCart, updateQuantity } from "../../redux/cart/cartSlice"
import type { RootState } from "../../redux/store"
import "./CartPage.scss"

export const CartPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalAmount } = useSelector((state: RootState) => state.cart)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)

  // Mock promo codes
  const promoCodes = {
    SAVE10: 0.1,
    WELCOME15: 0.15,
    PETLOVE20: 0.2,
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id))
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id))
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }
  }

  const handleApplyPromo = () => {
    const discount = promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes]
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount })
      setPromoCode("")
    } else {
      alert("Invalid promo code")
    }
  }

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    navigate("/checkout")
  }

  const subtotal = totalAmount
  const shipping = subtotal > 50 ? 0 : 5.99
  const promoDiscount = appliedPromo ? subtotal * appliedPromo.discount : 0
  const total = subtotal + shipping - promoDiscount

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-page__container">
          <div className="empty-cart">
            <h1 className="empty-cart__title">Your Shopping Cart is Empty</h1>
            <p className="empty-cart__message">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop" className="empty-cart__shop-button">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-page__container">
        <div className="cart-header">
          <Link to="/shop" className="cart-header__back">
            ← Continue Shopping
          </Link>
          <h1 className="cart-header__title">Your Shopping Cart</h1>
        </div>

        <div className="cart-content">
          <div className="cart-main">
            {/* Cart Table */}
            <div className="cart-table">
              <div className="cart-table__header">
                <div className="cart-table__col cart-table__col--product">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === items.length && items.length > 0}
                    onChange={handleSelectAll}
                    className="cart-checkbox"
                  />
                  <span>Product</span>
                </div>
                <div className="cart-table__col cart-table__col--price">Price</div>
                <div className="cart-table__col cart-table__col--quantity">Quantity</div>
                <div className="cart-table__col cart-table__col--subtotal">Subtotal</div>
                <div className="cart-table__col cart-table__col--actions">Actions</div>
              </div>

              <div className="cart-table__body">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-table__col cart-table__col--product">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="cart-checkbox"
                      />
                      <div className="cart-item__product">
                        <div className="cart-item__image">
                          <img src={item.image || "/placeholder.svg"} alt={item.name} />
                        </div>
                        <div className="cart-item__details">
                          <h3 className="cart-item__name">{item.name}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="cart-table__col cart-table__col--price">
                      <span className="cart-item__price">€{item.price.toFixed(2)}</span>
                    </div>

                    <div className="cart-table__col cart-table__col--quantity">
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="quantity-controls__button"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-controls__value">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="quantity-controls__button"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-table__col cart-table__col--subtotal">
                      <span className="cart-item__subtotal">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>

                    <div className="cart-table__col cart-table__col--actions">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="cart-item__remove"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="promo-section">
              <h3 className="promo-section__title">Have a Promo Code?</h3>
              <div className="promo-section__form">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="promo-section__input"
                />
                <button onClick={handleApplyPromo} className="promo-section__button">
                  Apply
                </button>
              </div>
              <button className="promo-section__view-promotions">View Available Promotions</button>

              {appliedPromo && (
                <div className="applied-promo">
                  <span className="applied-promo__text">
                    Promo code "{appliedPromo.code}" applied! {(appliedPromo.discount * 100).toFixed(0)}% off
                  </span>
                  <button onClick={() => setAppliedPromo(null)} className="applied-promo__remove">
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="cart-sidebar">
            <div className="order-summary">
              <h3 className="order-summary__title">Order Summary</h3>

              <div className="order-summary__line">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>

              <div className="order-summary__line">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}</span>
              </div>

              {appliedPromo && (
                <div className="order-summary__line order-summary__line--discount">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-€{promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="order-summary__total">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>

              <button onClick={handleProceedToCheckout} className="order-summary__checkout">
                Proceed to Checkout
              </button>

              <Link to="/shop" className="order-summary__continue">
                Continue Shopping
              </Link>

              <div className="order-summary__features">
                <div className="feature-item">
                  <span className="feature-item__icon">🔒</span>
                  <span className="feature-item__text">Secure Checkout</span>
                </div>
                <div className="feature-item">
                  <span className="feature-item__icon">🚚</span>
                  <span className="feature-item__text">Free Shipping on orders over $50</span>
                </div>
                <div className="feature-item">
                  <span className="feature-item__icon">❤️</span>
                  <span className="feature-item__text">5% of your purchase helps animal shelters</span>
                </div>
              </div>

              <div className="payment-methods">
                <h4 className="payment-methods__title">We Accept</h4>
                <div className="payment-methods__icons">
                  <span className="payment-icon">💳</span>
                  <span className="payment-icon">💳</span>
                  <span className="payment-icon">💳</span>
                  <span className="payment-icon">💳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
