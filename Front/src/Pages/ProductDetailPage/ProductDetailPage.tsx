"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/cart/cartSlice"
import { toggleWishlistItem } from "../../redux/wishlist/wishlistSlice"
import type { RootState } from "../../redux/store"
import placeholderImage from "../../assets/IMG-44.jpg"
import "./ProductDetailPage.scss"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image?: string
  category: string
  description: string
}

interface Review {
  id: number
  customerName: string
  rating: number
  comment: string
  date: string
  avatar: string
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showAllReviews, setShowAllReviews] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return

      try {
        setLoading(true)
        const res = await fetch(`http://localhost:5278/api/Products/${id}`)
        if (!res.ok) {
          throw new Error("Product not found")
        }
        const data = await res.json()

        setProduct({
          id: data.id,
          name: data.productName,
          price: data.price,
          rating: data.averageRating || 4.2,
          reviews: data.reviewCount || 128,
          image: data.imageData ? `data:image/jpeg;base64,${data.imageData}` : undefined,
          category: data.categoryName || "",
          description:
            data.description ||
            "Premium organic pet food made with real meat and natural ingredients. Perfect for maintaining your pet's health and vitality. Rich in proteins and essential nutrients.",
        })

        // Mock reviews data - в реальном приложении это будет отдельный API запрос
        setReviews([
          {
            id: 1,
            customerName: "Sarah M.",
            rating: 5,
            comment: "My dog absolutely loves this food! His coat is shinier and he has more energy.",
            date: "15.06.2025",
            avatar: "S",
          },
          {
            id: 2,
            customerName: "John D.",
            rating: 4,
            comment: "Good quality product, but a bit pricey. Still worth it for the quality.",
            date: "14.06.2025",
            avatar: "J",
          },
          {
            id: 3,
            customerName: "Emma R.",
            rating: 5,
            comment: "Best pet food I've ever bought. Will definitely purchase again!",
            date: "12.06.2025",
            avatar: "E",
          },
        ])
      } catch (error) {
        console.error("Failed to fetch product:", error)
        navigate("/shop")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, navigate])

  const handleAddToCart = () => {
    if (!product) return

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      }),
    )
  }

  const handleToggleWishlist = () => {
    if (!product) return

    dispatch(
      toggleWishlistItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        category: product.category,
      }),
    )
  }

  const isInWishlist = () => {
    if (!product) return false
    return wishlistItems.some((item) => item.id === product.id)
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
          ☆
        </span>,
      )
    }

    return stars
  }

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3)

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-page__container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-page__container">
          <div className="error">Product not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-page__container">
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb__link">
            Home
          </Link>
          <span className="breadcrumb__separator">/</span>
          <Link to="/shop" className="breadcrumb__link">
            Shop
          </Link>
          <span className="breadcrumb__separator">/</span>
          <span className="breadcrumb__current">{product.name}</span>
        </nav>

        <div className="product-detail">
          <div className="product-detail__image">
            <img src={product.image || placeholderImage} alt={product.name} className="product-detail__main-image" />
          </div>

          <div className="product-detail__info">
            <h1 className="product-detail__title">{product.name}</h1>

            <div className="product-detail__rating">
              <div className="product-detail__stars">{renderStars(product.rating)}</div>
              <span className="product-detail__reviews-count">({product.reviews} reviews)</span>
            </div>

            <div className="product-detail__price">
              <span className="product-detail__current-price">€{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="product-detail__original-price">€{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="product-detail__description">
              <p>{product.description}</p>
            </div>

            <div className="product-detail__actions">
              <button className="product-detail__add-to-cart" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button
                className={`product-detail__wishlist ${isInWishlist() ? "active" : ""}`}
                onClick={handleToggleWishlist}
              >
                {isInWishlist() ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        </div>

        <div className="customer-reviews">
          <h2 className="customer-reviews__title">Customer Reviews</h2>

          <div className="customer-reviews__list">
            {displayedReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card__header">
                  <div className="review-card__avatar">{review.avatar}</div>
                  <div className="review-card__info">
                    <h4 className="review-card__name">{review.customerName}</h4>
                    <div className="review-card__rating">{renderStars(review.rating)}</div>
                  </div>
                  <div className="review-card__date">{review.date}</div>
                </div>
                <div className="review-card__content">
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>

          {reviews.length > 3 && (
            <button className="customer-reviews__view-all" onClick={() => setShowAllReviews(!showAllReviews)}>
              {showAllReviews ? "Show Less Reviews" : "View All Reviews"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
