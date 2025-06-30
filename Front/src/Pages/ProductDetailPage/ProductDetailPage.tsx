"use client"

import React, { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useGetProductByIdQuery, useGetReviewsByProductIdQuery } from "../../redux/products/productsApi"
import { addToCart } from "../../redux/cart/cartSlice"
import { toggleWishlistItem } from "../../redux/wishlist/wishlistSlice"
import type { RootState } from "../../redux/store"
import placeholderImage from "../../assets/IMG-44.jpg"
import "./ProductDetailPage.scss"

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const productId = Number(id)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

    const { data: product, isLoading, isError } = useGetProductByIdQuery(productId)
    const { data: reviews = [], isLoading: loadingReviews } = useGetReviewsByProductIdQuery(productId)

    const [showAllReviews, setShowAllReviews] = useState(false)

    const handleAddToCart = () => {
        if (!product) return
        dispatch(
            addToCart({
                id: product.id,
                name: product.productName,
                price: product.price,
                image: product.imageBase64 ? `data:image/jpeg;base64,${product.imageBase64}` : undefined,
                category: product.categoryName,
            }),
        )
    }

    const handleToggleWishlist = () => {
        if (!product) return
        dispatch(
            toggleWishlistItem({
                id: product.id,
                name: product.productName,
                price: product.price,
                image: product.imageBase64 ? `data:image/jpeg;base64,${product.imageBase64}` : undefined,
                rating: product.averageRating,
                reviews: product.reviewCount,
                category: product.categoryName,
            }),
        )
    }

    const isInWishlist = () => {
        return product ? wishlistItems.some((item) => item.id === product.id) : false
    }

    const renderStars = (rating: number) => {
        const full = Math.floor(rating)
        const hasHalf = rating % 1 !== 0
        const empty = 5 - Math.ceil(rating)

        return (
            <>
                {[...Array(full)].map((_, i) => <span key={`full-${i}`} className="star filled">★</span>)}
                {hasHalf && <span className="star half">★</span>}
                {[...Array(empty)].map((_, i) => <span key={`empty-${i}`} className="star empty">☆</span>)}
            </>
        )
    }

    const formatDate = (iso: string) => {
        const date = new Date(iso)
        return date.toLocaleDateString("en-GB") // 15/06/2025
    }

    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3)

    if (isLoading) {
        return <div className="product-detail-page"><div className="loading">Loading...</div></div>
    }

    if (isError || !product) {
        return <div className="product-detail-page"><div className="error">Product not found</div></div>
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail-page__container">
                <nav className="breadcrumb">
                    <Link to="/" className="breadcrumb__link">Home</Link>
                    <span className="breadcrumb__separator">/</span>
                    <Link to="/shop" className="breadcrumb__link">Shop</Link>
                    <span className="breadcrumb__separator">/</span>
                    <span className="breadcrumb__current">{product.productName}</span>
                </nav>

                <div className="product-detail">
                    <div className="product-detail__image">
                        <img
                            src={product.imageBase64 ? `data:image/jpeg;base64,${product.imageBase64}` : placeholderImage}
                            alt={product.productName}
                            className="product-detail__main-image"
                        />
                    </div>

                    <div className="product-detail__info">
                        <h1 className="product-detail__title">{product.productName}</h1>

                        <div className="product-detail__rating">
                            <div className="product-detail__stars">{renderStars(product.averageRating)}</div>
                            <span className="product-detail__reviews-count">({product.reviewCount} reviews)</span>
                        </div>

                        <div className="product-detail__price">
                            <span className="product-detail__current-price">€{product.price.toFixed(2)}</span>
                        </div>

                        <div className="product-detail__description">
                            <p>{product.productDescription}</p>
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

                    {loadingReviews ? (
                        <div>Loading reviews...</div>
                    ) : reviews.length === 0 ? (
                        <div>No reviews yet.</div>
                    ) : (
                        <>
                            <div className="customer-reviews__list">
                                {displayedReviews.map((review) => (
                                    <div key={review.id} className="review-card">
                                        <div className="review-card__header">
                                            <div className="review-card__avatar">{review.userName[0]}</div>
                                            <div className="review-card__info">
                                                <h4 className="review-card__name">{review.userName}</h4>
                                                <div className="review-card__rating">{renderStars(review.rating)}</div>
                                            </div>
                                            <div className="review-card__date">{formatDate(review.createdDate)}</div>
                                        </div>
                                        <div className="review-card__content">
                                            <p>{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {reviews.length > 3 && (
                                <button
                                    className="customer-reviews__view-all"
                                    onClick={() => setShowAllReviews(!showAllReviews)}
                                >
                                    {showAllReviews ? "Show Less Reviews" : "View All Reviews"}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage
