
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearCredentials } from "../../redux/auth/authSlice"
import { logout } from "../../redux/auth/authSlice"
import type { RootState } from "../../redux/store"
import "./ProfilePage.scss"
import { useAppDispatch } from "../../redux/store"

interface OrderItem {
  id: number
  orderId: string
  productId: number
  quantity: number
  price: number
  name: string
  image: string
}

interface Order {
  id: string
  userId: number
  totalPrice: number
  deliveryServiceId: number
  trackingNumber: string
  status: string
  address: string
  city: string
  postalCode: string
  country: string
  phoneNumber: string
  apartmentNumber: string
  orderItems: OrderItem[]
  createdDate: string
  lastUpdatedDate: string
}

interface Review {
  rating: number
  comment: string
}
const mockOrders: Order[] = [
  {
    id: "ORD-12345",
    userId: 1,
    totalPrice: 124.97,
    deliveryServiceId: 2,
    trackingNumber: "DS19GT6PQY006",
    status: "delivered",
    address: "123 Main Street",
    city: "Vilnius",
    postalCode: "01234",
    country: "Lithuania",
    phoneNumber: "12344",
    apartmentNumber: "4B",
    orderItems: [
      {
        id: 11,
        orderId: "ORD-12345",
        productId: 34,
        quantity: 2,
        price: 39.99,
        name: "Premium Dog Food - 5kg",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 12,
        orderId: "ORD-12345",
        productId: 35,
        quantity: 1,
        price: 24.99,
        name: "Interactive Cat Toy Bundle",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 13,
        orderId: "ORD-12345",
        productId: 36,
        quantity: 1,
        price: 19.99,
        name: "Dog Leash & Collar Set",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    createdDate: "2025-05-01T10:00:55.264532Z",
    lastUpdatedDate: "2025-05-03T17:00:00Z",
  },
  {
    id: "ORD-12344",
    userId: 1,
    totalPrice: 89.99,
    deliveryServiceId: 1,
    trackingNumber: "SP20HT7RQZ007",
    status: "delivered",
    address: "123 Main Street",
    city: "Vilnius",
    postalCode: "01234",
    country: "Lithuania",
    phoneNumber: "12344",
    apartmentNumber: "4B",
    orderItems: [
      {
        id: 14,
        orderId: "ORD-12344",
        productId: 37,
        quantity: 1,
        price: 34.99,
        name: "Cat Scratching Post",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 15,
        orderId: "ORD-12344",
        productId: 38,
        quantity: 1,
        price: 54.99,
        name: "Automatic Pet Feeder",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    createdDate: "2025-04-15T08:30:20.123456Z",
    lastUpdatedDate: "2025-04-17T14:20:00Z",
  },
  {
    id: "ORD-12343",
    userId: 1,
    totalPrice: 94.98,
    deliveryServiceId: 3,
    trackingNumber: "OM21IT8SRX008",
    status: "delivered",
    address: "123 Main Street",
    city: "Vilnius",
    postalCode: "01234",
    country: "Lithuania",
    phoneNumber: "12344",
    apartmentNumber: "4B",
    orderItems: [
      {
        id: 16,
        orderId: "ORD-12343",
        productId: 39,
        quantity: 1,
        price: 59.99,
        name: "Orthopedic Dog Bed - L",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 17,
        orderId: "ORD-12343",
        productId: 40,
        quantity: 1,
        price: 19.99,
        name: "Dog Dental Care Kit",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 18,
        orderId: "ORD-12343",
        productId: 41,
        quantity: 1,
        price: 14.99,
        name: "Premium Cat Food - 1.5kg",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    createdDate: "2025-03-28T15:45:10.987654Z",
    lastUpdatedDate: "2025-03-30T11:15:00Z",
  },
]

const deliveryServices = {
  1: { name: "Smartpost pickup point", cost: 0 },
  2: { name: "DPD parcel machine", cost: 2.79 },
  3: { name: "Omniva parcel machine", cost: 2.79 },
}

function ProfilePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    } else if (user.role === "admin") {
      navigate("/admin")
    } else if (user.role === "seller") {
      navigate("/seller/dashboard")
    }
  }, [user, navigate])

  if (!user || user.role !== "buyer") {
    return <div className="profile-page__loading">Loading profile...</div>
  }

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem("userProfile")
    return saved
      ? JSON.parse(saved)
      : {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
        }
  })

  const [addressData, setAddressData] = useState(() => {
    const saved = localStorage.getItem("userAddress")
    return saved
      ? JSON.parse(saved)
      : {
          address: "",
          apartmentNumber: "",
          city: "",
          postalCode: "",
          country: "",
          phone: "",
        }
  })

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [reviews, setReviews] = useState<Record<string, Review>>(() => {
    const saved = localStorage.getItem("productReviews")
    return saved ? JSON.parse(saved) : {}
  })

    function handleLogout() {
        const dispatch = useAppDispatch()

      dispatch(logout())
    navigate("/")
  }

  const handleProfileEdit = () => setIsEditingProfile(true)
  const handleAddressEdit = () => setIsEditingAddress(true)
  const handleProfileSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profileData))
    setIsEditingProfile(false)
  }
  const handleAddressSave = () => {
    localStorage.setItem("userAddress", JSON.stringify(addressData))
    setIsEditingAddress(false)
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "delivered"
      case "processing":
        return "processing"
      case "shipped":
        return "shipped"
      case "cancelled":
        return "cancelled"
      default:
        return "processing"
    }
  }

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false)
    setSelectedOrder(null)
  }

  const handleReviewSubmit = (productId: number, rating: number, comment: string) => {
    const reviewKey = `${selectedOrder?.id}-${productId}`
    const newReviews = { ...reviews, [reviewKey]: { rating, comment } }
    setReviews(newReviews)
    localStorage.setItem("productReviews", JSON.stringify(newReviews))
  }

  const getProductReview = (productId: number) => {
    const reviewKey = `${selectedOrder?.id}-${productId}`
    return reviews[reviewKey] || null
  }

  return (
    <div className="profile-page">
      <div className="profile-page__container">
        <h1 className="profile-page__title">My Profile</h1>
        <div className="profile-page__content">
          <div className="profile-page__main">
            
            {/* Profile Section */}
            <div className="profile-section">
              <div className="profile-header">
                <div className="profile-avatar">
                  <img
                    src="/placeholder.svg?height=80&width=80"
                    alt="Profile Avatar"
                    className="profile-avatar__image"
                  />
                </div>
                <div className="profile-info">
                  {isEditingProfile ? (
                    <div className="profile-edit">
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        className="profile-edit__input"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        className="profile-edit__input"
                        placeholder="Last Name"
                      />
                      <input
                        type="email"
                        value={profileData.email}
                        className="profile-edit__input profile-edit__input--disabled"
                        disabled
                      />
                      <div className="profile-edit__actions">
                        <button onClick={handleProfileSave} className="btn btn--primary">
                          Save
                        </button>
                        <button onClick={handleProfileEdit} className="btn btn--secondary">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="profile-info__name">
                        {profileData.firstName} {profileData.lastName}
                      </h2>
                      <p className="profile-info__email">{profileData.email}</p>
                    </>
                  )}
                </div>
                {!isEditingProfile && (
                  <button onClick={handleProfileEdit} className="profile-header__edit-btn">
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Address Section */}
            <div className="address-section">
              <div className="section-header">
                <h3 className="section-title">Shopping Address</h3>
                {!isEditingAddress && (
                  <button onClick={handleAddressEdit} className="section-edit-btn">
                    Edit
                  </button>
                )}
              </div>

              {isEditingAddress ? (
                <div className="address-edit">
                  {Object.entries({
                    Address: "address",
                    "Apartment Number": "apartmentNumber",
                    City: "city",
                    "Postal Code": "postalCode",
                    Country: "country",
                    "Phone Number": "phone",
                  }).map(([label, key]) => (
                    <div className="form-group" key={key}>
                      <label className="form-label">{label}</label>
                      <input
                        type="text"
                        value={(addressData as any)[key]}
                        onChange={(e) => setAddressData({ ...addressData, [key]: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  ))}
                  <div className="address-edit__actions">
                    <button onClick={handleAddressSave} className="btn btn--primary">
                      Save
                    </button>
                    <button onClick={handleAddressEdit} className="btn btn--secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="address-info">
                  <p>
                    <strong>Address:</strong> {addressData.address}, Apt. {addressData.apartmentNumber}
                  </p>
                  <p>
                    <strong>City:</strong> {addressData.city}
                  </p>
                  <p>
                    <strong>Postal Code:</strong> {addressData.postalCode}
                  </p>
                  <p>
                    <strong>Country:</strong> {addressData.country}
                  </p>
                  <p>
                    <strong>Phone:</strong> {addressData.phone}
                  </p>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="orders-section">
              <h3 className="section-title">Order History</h3>
              <div className="orders-list">
                {mockOrders.map((order) => (
                  <div key={order.id} className="order-item">
                   <div className="order-item__header">
                      <div className="order-item__id-date">
                          <span className="order-item__id">{order.id}</span>
                          <span className="order-item__date">{formatDate(order.createdDate)}</span>
                        </div>
                      </div>

                    <div className="order-item__details">
                      <div className="order-item__info">
                        <div className="order-item__status">
                          Status:
                          <span className={`order-status order-status--${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="order-item__tracking">Tracking: {order.trackingNumber}</div>
                        <div className="order-item__delivery">
                          Delivery: {deliveryServices[order.deliveryServiceId as keyof typeof deliveryServices]?.name}
                        </div>
                      </div>
                      <div className="order-item__total">Total: €{order.totalPrice.toFixed(2)}</div>
                    </div>
                    <button onClick={() => handleViewOrderDetails(order)} className="order-item__view-details">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details Modal */}
            {showOrderDetails && selectedOrder && (
              <div className="order-details-modal">
                <div className="order-details-modal__backdrop" onClick={handleCloseOrderDetails}></div>
                <div className="order-details-modal__content">
                  <div className="order-details-modal__header">
                    <h2 className="order-details-modal__title">Order Details - {selectedOrder.id}</h2>
                    <button onClick={handleCloseOrderDetails} className="order-details-modal__close">
                      ×
                    </button>
                  </div>

                  <div className="order-details-modal__body">
                    {/* Order Summary */}
                    <div className="order-summary-section">
                      <h3>Order Summary</h3>
                      <div className="order-summary-info">
                        <div className="order-summary-row">
                          <span>Order Date:</span>
                          <span>{formatDate(selectedOrder.createdDate)}</span>
                        </div>
                        <div className="order-summary-row">
                          <span>Last Updated:</span>
                          <span>{formatDate(selectedOrder.lastUpdatedDate)}</span>
                        </div>
                        <div className="order-summary-row">
                          <span>Status:</span>
                          <span className={`order-status order-status--${getStatusColor(selectedOrder.status)}`}>
                            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                          </span>
                        </div>
                        <div className="order-summary-row">
                          <span>Tracking Number:</span>
                          <span className="tracking-number">{selectedOrder.trackingNumber}</span>
                        </div>
                        <div className="order-summary-row">
                          <span>Total:</span>
                          <span className="order-total">€{selectedOrder.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items with Reviews */}
                    <div className="order-items-section">
                      <h3>Items Ordered</h3>
                      <div className="order-items-list">
                        {selectedOrder.orderItems.map((item) => {
                          const existingReview = getProductReview(item.productId)
                          return (
                            <OrderItemWithReview
                              key={item.id}
                              item={item}
                              existingReview={existingReview}
                              onReviewSubmit={(rating, comment) => handleReviewSubmit(item.productId, rating, comment)}
                            />
                          )
                        })}
                      </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="shipping-info-section">
                      <h3>Shipping Information</h3>
                      <div className="shipping-info">
                        <div className="shipping-address">
                          <h4>Delivery Address</h4>
                          <p>
                            {selectedOrder.address}
                            {selectedOrder.apartmentNumber && `, Apt ${selectedOrder.apartmentNumber}`}
                          </p>
                          <p>
                            {selectedOrder.city}, {selectedOrder.postalCode}
                          </p>
                          <p>{selectedOrder.country}</p>
                          <p>Phone: {selectedOrder.phoneNumber}</p>
                        </div>
                        <div className="shipping-method">
                          <h4>Shipping Method</h4>
                          <p>
                            {deliveryServices[selectedOrder.deliveryServiceId as keyof typeof deliveryServices]?.name}
                          </p>
                          <p>
                            Cost:{" "}
                            {deliveryServices[selectedOrder.deliveryServiceId as keyof typeof deliveryServices]
                              ?.cost === 0
                              ? "Free"
                              : `€${deliveryServices[selectedOrder.deliveryServiceId as keyof typeof deliveryServices]?.cost}`}
                          </p>
                          <p>Tracking: {selectedOrder.trackingNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar with only Log Out */}
          <div className="profile-page__sidebar">
            <div className="settings-section">
              <button onClick={handleLogout} className="logout-btn">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for Order Item with Review functionality
interface OrderItemWithReviewProps {
  item: OrderItem
  existingReview: { rating: number; comment: string } | null
  onReviewSubmit: (rating: number, comment: string) => void
}

function OrderItemWithReview({ item, existingReview, onReviewSubmit }: OrderItemWithReviewProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating > 0) {
      onReviewSubmit(rating, comment)
      setShowReviewForm(false)
      // Reset form
      setRating(0)
      setComment("")
    }
  }

  function renderStars(currentRating: number, interactive = false) {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1
      const isFilled = interactive ? starValue <= (hoveredRating || rating) : starValue <= currentRating

      return (
        <span
          key={index}
          className={`star ${isFilled ? "filled" : "empty"} ${interactive ? "interactive" : ""}`}
          onClick={interactive ? () => setRating(starValue) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        >
          ★
        </span>
      )
    })
  }

  return (
    <div className="order-item-detail">
      <div className="order-item-detail__image">
        <img src={item.image || "/placeholder.svg"} alt={item.name} />
      </div>
      <div className="order-item-detail__info">
        <h4 className="order-item-detail__name">{item.name}</h4>
        <div className="order-item-detail__price">
          €{item.price.toFixed(2)} × {item.quantity}
        </div>

        {existingReview ? (
          <div className="product-review">
            <div className="product-review__rating">{renderStars(existingReview.rating)}</div>
            <p className="product-review__comment">{existingReview.comment}</p>
            <span className="product-review__submitted">Review submitted</span>
          </div>
        ) : (
          <>
            {!showReviewForm ? (
              <button onClick={() => setShowReviewForm(true)} className="add-review-btn">
                Add Review
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="review-form">
                <div className="review-form__rating">
                  <label>Rating:</label>
                  <div className="star-rating">{renderStars(rating, true)}</div>
                </div>
                <div className="review-form__comment">
                  <label>Comment:</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                    rows={3}
                  />
                </div>
                <div className="review-form__actions">
                  <button type="submit" className="btn btn--primary" disabled={rating === 0}>
                    Submit Review
                  </button>
                  <button type="button" onClick={() => setShowReviewForm(false)} className="btn btn--secondary">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
      <div className="order-item-detail__total">€{(item.price * item.quantity).toFixed(2)}</div>
    </div>
  )
}

export default ProfilePage
