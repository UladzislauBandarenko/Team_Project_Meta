"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { clearCart } from "../../redux/cart/cartSlice"
import type { RootState } from "../../redux/store"
import { useCreateOrderMutation } from "../../redux/order/orderApi"
import type { CreateOrderDto } from "../../redux/order/types"
import { useGetCurrentUserQuery, useUpdateUserAddressMutation } from "../../redux/auth/api"
import "./CheckoutPage.scss"

interface ShippingData {
  firstName: string
  lastName: string
  streetAddress: string
  apartment: string
  city: string
  zipCode: string
  country: string
  phoneNumber: string
  saveAddress: boolean
}

interface PaymentData {
  method: "card" | "paypal" | "apple"
  cardNumber: string
  nameOnCard: string
  expiryDate: string
  cvv: string
  saveCard: boolean
}

interface ShippingMethod {
  id: string
  name: string
  price: number
  estimatedDays: string
  estimatedDate: string
}

const shippingMethods: ShippingMethod[] = [
  {
    id: "smartpost",
    name: "Smartposti Post Office/Pickup Point",
    price: 0,
    estimatedDays: "5-7 business days",
    estimatedDate: "June 17-19, 2025",
  },
  {
    id: "dpd",
    name: "DPD parcel machine",
    price: 2.79,
    estimatedDays: "2-3 business days",
    estimatedDate: "June 13-14, 2025",
  },
  {
    id: "omniva",
    name: "Omniva parcel machine",
    price: 2.79,
    estimatedDays: "2-3 business day",
    estimatedDate: "June 13-14, 2025",
  },
]

export const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalAmount } = useSelector((state: RootState) => state.cart)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  const [createOrder] = useCreateOrderMutation()

  const [currentStep, setCurrentStep] = useState(1)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)
  const [selectedShipping, setSelectedShipping] = useState("standard")

  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    streetAddress: "",
    apartment: "",
    city: "",
    zipCode: "",
    country: "Lithuania",
    phoneNumber: "",
    saveAddress: false,
  })

  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "card",
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  })

  const [orderNumber, setOrderNumber] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Mock promo codes
  const promoCodes = {
    SAVE10: 0.1,
    WELCOME15: 0.15,
    PETLOVE20: 0.2,
    PET2025: 0.2,
    }

    const { data: currentUser, isLoading: isUserLoading } = useGetCurrentUserQuery()

    useEffect(() => {
        if (currentUser) {
            setShippingData((prev) => ({
                ...prev,
                firstName: currentUser.firstName || "",
                lastName: currentUser.lastName || "",
                streetAddress: currentUser.address || "",
                apartment: currentUser.apartmentNumber || "",
                city: currentUser.city || "",
                zipCode: currentUser.postalCode || "",
                country: currentUser.country || "Lithuania",
                phoneNumber: currentUser.phoneNumber || "",
            }))
        }
    }, [currentUser])



  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (items.length === 0) {
      navigate("/cart")
      return
    }
  }, [isAuthenticated, items.length, navigate])

  const handleApplyPromo = () => {
    const discount = promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes]
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount })
      setPromoCode("")
    } else {
      alert("Invalid promo code")
    }
  }

  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!shippingData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!shippingData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!shippingData.streetAddress.trim()) newErrors.streetAddress = "Street address is required"
    if (!shippingData.city.trim()) newErrors.city = "City is required"
    if (!shippingData.zipCode.trim()) newErrors.zipCode = "ZIP/Postal code is required"
    if (!shippingData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = (): boolean => {
    if (paymentData.method !== "card") return true

    const newErrors: Record<string, string> = {}

    if (!paymentData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
    if (!paymentData.nameOnCard.trim()) newErrors.nameOnCard = "Name on card is required"
    if (!paymentData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required"
    if (!paymentData.cvv.trim()) newErrors.cvv = "CVV is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (currentStep === 1 && !validateShipping()) return
    if (currentStep === 2 && !validatePayment()) return

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      setErrors({})
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
    }

    const [updateUserAddress] = useUpdateUserAddressMutation()

    const handlePlaceOrder = async () => {
        const orderNum = `ORD-${Date.now()}`
        setOrderNumber(orderNum)

        try {
            if (shippingData.saveAddress) {
                await updateUserAddress({
                    firstName: shippingData.firstName,
                    lastName: shippingData.lastName,
                    address: shippingData.streetAddress,
                    apartmentNumber: shippingData.apartment,
                    city: shippingData.city,
                    postalCode: shippingData.zipCode,
                    country: shippingData.country,
                    phoneNumber: shippingData.phoneNumber,
                })
            }

            const payload: CreateOrderDto = {
                address: shippingData.streetAddress,
                apartmentNumber: shippingData.apartment,
                city: shippingData.city,
                postalCode: shippingData.zipCode,
                country: shippingData.country,
                phoneNumber: shippingData.phoneNumber,
                totalPrice: total,
                status: "Pending",
                deliveryServiceId: selectedShipping === "smartpost" ? 1 : selectedShipping === "dpd" ? 2 : 3,
                orderItems: items.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            }

            await createOrder(payload).unwrap()
            dispatch(clearCart())
            setCurrentStep(4)
        } catch (error) {
            console.error("Order submission failed:", error)
            alert("Error placing the order. Please try again later.")
        }
    }

  const subtotal = totalAmount
  const selectedShippingMethod = shippingMethods.find((method) => method.id === selectedShipping)
  const shippingCost = selectedShippingMethod?.price || 0
  const promoDiscount = appliedPromo ? subtotal * appliedPromo.discount : 0
  const total = subtotal + shippingCost - promoDiscount

  if (!isAuthenticated || items.length === 0) {
    return null
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page__container">
        {/* Header */}
        <div className="checkout-header">
          <Link to="/cart" className="checkout-header__back">
            ← Back to Cart
          </Link>
          <h1 className="checkout-header__title">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="checkout-steps">
          <div className={`checkout-step ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
            <div className="checkout-step__icon">🛒</div>
            <span className="checkout-step__label">Cart</span>
          </div>
          <div className="checkout-steps__line"></div>
          <div className={`checkout-step ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
            <div className="checkout-step__icon">🚚</div>
            <span className="checkout-step__label">Shipping</span>
          </div>
          <div className="checkout-steps__line"></div>
          <div className={`checkout-step ${currentStep >= 3 ? "active" : ""} ${currentStep > 3 ? "completed" : ""}`}>
            <div className="checkout-step__icon">💳</div>
            <span className="checkout-step__label">Payment</span>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-main">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="checkout-section">
                <h2 className="checkout-section__title">Shipping Address</h2>

                <form className="checkout-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        value={shippingData.firstName}
                        onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                        className={`form-input ${errors.firstName ? "error" : ""}`}
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        value={shippingData.lastName}
                        onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                        className={`form-input ${errors.lastName ? "error" : ""}`}
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Street Address *</label>
                    <input
                      type="text"
                      value={shippingData.streetAddress}
                      onChange={(e) => setShippingData({ ...shippingData, streetAddress: e.target.value })}
                      className={`form-input ${errors.streetAddress ? "error" : ""}`}
                    />
                    {errors.streetAddress && <span className="error-message">{errors.streetAddress}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Apartment, Suite, etc. (optional)</label>
                    <input
                      type="text"
                      value={shippingData.apartment}
                      onChange={(e) => setShippingData({ ...shippingData, apartment: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        className={`form-input ${errors.city ? "error" : ""}`}
                      />
                      {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">ZIP/Postal Code *</label>
                      <input
                        type="text"
                        value={shippingData.zipCode}
                        onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                        className={`form-input ${errors.zipCode ? "error" : ""}`}
                      />
                      {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country *</label>
                      <select
                        value={shippingData.country}
                        onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                        className="form-select"
                      >
                        <option value="Lithuania">Lithuania</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Poland">Poland</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      value={shippingData.phoneNumber}
                      onChange={(e) => setShippingData({ ...shippingData, phoneNumber: e.target.value })}
                      className={`form-input ${errors.phoneNumber ? "error" : ""}`}
                    />
                    {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={shippingData.saveAddress}
                        onChange={(e) => setShippingData({ ...shippingData, saveAddress: e.target.checked })}
                      />
                      <span className="checkbox-text">Save this address for future orders</span>
                    </label>
                  </div>
                </form>

                <div className="shipping-methods">
                  <h3 className="shipping-methods__title">Shipping Method</h3>
                  <div className="shipping-methods__list">
                    {shippingMethods.map((method) => (
                      <label key={method.id} className="shipping-method">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={selectedShipping === method.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                        />
                        <div className="shipping-method__content">
                          <div className="shipping-method__info">
                            <div className="shipping-method__name">{method.name}</div>
                            <div className="shipping-method__price">
                              {method.price === 0 ? "Free" : `€${method.price.toFixed(2)}`}
                            </div>
                          </div>
                          <div className="shipping-method__delivery">Estimated delivery: {method.estimatedDate}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="checkout-section">
                <h2 className="checkout-section__title">Payment Method</h2>

                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentData.method === "card"}
                      onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value as "card" })}
                    />
                    <div className="payment-method__content">
                      <span>Credit / Debit Card</span>
                      <div className="payment-method__icons">
                        <span>💳</span>
                        <span>💳</span>
                        <span>💳</span>
                        <span>💳</span>
                      </div>
                    </div>
                  </label>

                  {paymentData.method === "card" && (
                    <div className="card-form">
                      <div className="form-group">
                        <label className="form-label">Card Number *</label>
                        <input
                          type="text"
                          placeholder="•••• •••• •••• ••••"
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                          className={`form-input ${errors.cardNumber ? "error" : ""}`}
                        />
                        {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Name on Card *</label>
                        <input
                          type="text"
                          value={paymentData.nameOnCard}
                          onChange={(e) => setPaymentData({ ...paymentData, nameOnCard: e.target.value })}
                          className={`form-input ${errors.nameOnCard ? "error" : ""}`}
                        />
                        {errors.nameOnCard && <span className="error-message">{errors.nameOnCard}</span>}
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Expiry Date *</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentData.expiryDate}
                            onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                            className={`form-input ${errors.expiryDate ? "error" : ""}`}
                          />
                          {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                        </div>
                        <div className="form-group">
                          <label className="form-label">CVV *</label>
                          <input
                            type="text"
                            placeholder="•••"
                            value={paymentData.cvv}
                            onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                            className={`form-input ${errors.cvv ? "error" : ""}`}
                          />
                          {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={paymentData.saveCard}
                            onChange={(e) => setPaymentData({ ...paymentData, saveCard: e.target.checked })}
                          />
                          <span className="checkbox-text">Save this card for future purchases</span>
                        </label>
                      </div>
                    </div>
                  )}

                  <label className="payment-method">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentData.method === "paypal"}
                      onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value as "paypal" })}
                    />
                    <div className="payment-method__content">
                      <span>PayPal</span>
                      <span>🅿️</span>
                    </div>
                  </label>

                  <label className="payment-method">
                    <input
                      type="radio"
                      name="payment"
                      value="apple"
                      checked={paymentData.method === "apple"}
                      onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value as "apple" })}
                    />
                    <div className="payment-method__content">
                      <span>Apple Pay</span>
                      <span>🍎</span>
                    </div>
                  </label>
                </div>

                <div className="security-notice">
                  <span className="security-notice__icon">🔒</span>
                  <span className="security-notice__text">
                    Your payment information is secure. We use SSL encryption to keep your data safe.
                  </span>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="checkout-section">
                <h2 className="checkout-section__title">Review Your Order</h2>

                <div className="order-review">
                  <div className="order-review__section">
                    <div className="order-review__header">
                      <h3>Items in Your Order</h3>
                      <button onClick={() => setCurrentStep(1)} className="edit-button">
                        Edit Items
                      </button>
                    </div>
                    <div className="order-items">
                      {items.map((item) => (
                        <div key={item.id} className="order-item">
                          <div className="order-item__image">
                            <img src={item.image || "/placeholder.svg"} alt={item.name} />
                          </div>
                          <div className="order-item__details">
                            <h4 className="order-item__name">{item.name}</h4>
                            <p className="order-item__quantity">Quantity: {item.quantity}</p>
                          </div>
                          <div className="order-item__price">€{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-review__section">
                    <div className="order-review__header">
                      <h3>Shipping Address</h3>
                      <button onClick={() => setCurrentStep(1)} className="edit-button">
                        Edit
                      </button>
                    </div>
                    <div className="address-summary">
                      <p>
                        {shippingData.firstName} {shippingData.lastName}
                      </p>
                      <p>{shippingData.streetAddress}</p>
                      {shippingData.apartment && <p>{shippingData.apartment}</p>}
                      <p>
                        {shippingData.city}, {shippingData.zipCode}
                      </p>
                      <p>{shippingData.country}</p>
                      <p>Phone: {shippingData.phoneNumber}</p>
                    </div>
                  </div>

                  <div className="order-review__section">
                    <div className="order-review__header">
                      <h3>Payment Method</h3>
                      <button onClick={() => setCurrentStep(2)} className="edit-button">
                        Edit
                      </button>
                    </div>
                    <div className="payment-summary">
                      {paymentData.method === "card" && (
                        <div className="payment-summary__card">
                          <span className="payment-summary__icon">💳</span>
                          <span>Credit Card</span>
                          <p>Card details will be entered at checkout</p>
                        </div>
                      )}
                      {paymentData.method === "paypal" && (
                        <div className="payment-summary__paypal">
                          <span className="payment-summary__icon">🅿️</span>
                          <span>PayPal</span>
                        </div>
                      )}
                      {paymentData.method === "apple" && (
                        <div className="payment-summary__apple">
                          <span className="payment-summary__icon">🍎</span>
                          <span>Apple Pay</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="order-review__section">
                    <div className="order-review__header">
                      <h3>Shipping Method</h3>
                      <button onClick={() => setCurrentStep(1)} className="edit-button">
                        Edit
                      </button>
                    </div>
                    <div className="shipping-summary">
                      <p>{selectedShippingMethod?.name}</p>
                      <p>Estimated delivery: {selectedShippingMethod?.estimatedDate}</p>
                      <p className="shipping-summary__price">
                        {selectedShippingMethod?.price === 0 ? "Free" : `€${selectedShippingMethod?.price.toFixed(2)}`}
                      </p>
                    </div>
                  </div>

                  <div className="terms-agreement">
                    <label className="checkbox-label">
                      <input type="checkbox" required />
                      <span className="checkbox-text">
                        I agree to the{" "}
                        <Link to="/terms" className="terms-link">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="terms-link">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="order-confirmation">
                <div className="confirmation-header">
                  <div className="confirmation-icon">✅</div>
                  <h2 className="confirmation-title">Order Confirmed!</h2>
                  <p className="confirmation-subtitle">Thank you for your purchase</p>
                </div>

                <div className="order-info">
                  <div className="order-number">
                    <strong>Order Number:</strong>
                    <span>{orderNumber}</span>
                  </div>
                  <div className="estimated-delivery">
                    <strong>Estimated Delivery:</strong>
                    <span>{selectedShippingMethod?.estimatedDate}</span>
                  </div>
                </div>

                <div className="confirmation-notice">
                  <span className="confirmation-notice__icon">📧</span>
                  <span>Sending confirmation email</span>
                </div>

                <div className="confirmation-actions">
                  <Link to="/shop" className="btn btn--secondary">
                    🛒 Continue Shopping
                  </Link>
                  <button className="btn btn--primary">📋 Track Order</button>
                </div>

                <button className="print-order">🖨️ Print Order</button>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="checkout-navigation">
                {currentStep > 1 && (
                  <button onClick={handlePreviousStep} className="btn btn--secondary">
                    ← Back
                  </button>
                )}
                {currentStep < 3 && (
                  <button onClick={handleNextStep} className="btn btn--primary">
                    Continue →
                  </button>
                )}
                {currentStep === 3 && (
                  <button onClick={handlePlaceOrder} className="btn btn--primary">
                    Place Order →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep < 4 && (
            <div className="checkout-sidebar">
              <div className="order-summary">
                <div className="order-summary__header">
                  <h3>Order Summary</h3>
                  <span>{items.length} items</span>
                </div>

                <div className="order-summary__items">
                  {items.map((item) => (
                    <div key={item.id} className="summary-item">
                      <div className="summary-item__image">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} />
                      </div>
                      <div className="summary-item__details">
                        <h4 className="summary-item__name">{item.name}</h4>
                        <p className="summary-item__quantity">Qty: {item.quantity}</p>
                      </div>
                      <div className="summary-item__price">€{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="promo-section">
                  <div className="promo-section__form">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="promo-section__input"
                    />
                    <button onClick={handleApplyPromo} className="promo-section__button">
                      Apply
                    </button>
                  </div>

                  {appliedPromo && (
                    <div className="applied-promo">
                      <span className="applied-promo__text">
                        Discount ({(appliedPromo.discount * 100).toFixed(0)}%)
                      </span>
                      <span className="applied-promo__amount">-€{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="order-summary__totals">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : `€${shippingCost.toFixed(2)}`}</span>
                  </div>
                  {appliedPromo && (
                    <div className="summary-line summary-line--discount">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-€{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-total">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="order-summary__features">
                  <div className="feature-item">
                    <span className="feature-item__icon">🔒</span>
                    <span className="feature-item__text">Secure Checkout</span>
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
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
