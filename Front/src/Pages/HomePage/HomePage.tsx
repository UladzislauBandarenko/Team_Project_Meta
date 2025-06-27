"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/cart/cartSlice"
import { toggleWishlistItem } from "../../redux/wishlist/wishlistSlice"
import type { RootState } from "../../redux/store"
import "./HomePage.scss"

import cover from "../../assets/IMG-44.jpg"
import dog from "../../assets/IMG-57.jpg"
import cat from "../../assets/IMG-64.jpg"
import fish from "../../assets/IMG-71.jpg"
import bird from "../../assets/IMG-78.jpg"
import small from "../../assets/IMG-85.jpg"
import reptile from "../../assets/IMG-92.jpg"
import help from "../../assets/IMG-372.jpg"

const categories = [
  { id: 1, name: "Dog Products", image: dog, link: "/shop/dog" },
  { id: 2, name: "Cat Products", image: cat, link: "/shop/cat" },
  { id: 3, name: "Fish Products", image: fish, link: "/shop/fish" },
  { id: 4, name: "Bird Products", image: bird, link: "/shop/bird" },
  { id: 5, name: "Small Pet Products", image: small, link: "/shop/small-pets" },
  { id: 6, name: "Reptile Products", image: reptile, link: "/shop/reptile" },
]

const bestsellerProducts = [
  {
    id: 1,
    name: "Premium Dog Food - 1kg",
    price: 39.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 128,
    image: "/placeholder.svg?height=180&width=250",
    category: "dogs",
  },
  {
    id: 2,
    name: "Interactive Cat Toy",
    price: 24.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 94,
    image: "/placeholder.svg?height=180&width=250",
    category: "cats",
  },
  {
    id: 3,
    name: "Orthopedic Dog Bed - size L",
    price: 59.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 76,
    image: "/placeholder.svg?height=180&width=250",
    category: "dogs",
  },
  {
    id: 4,
    name: "Automatic Pet Feeder",
    price: 79.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 112,
    image: "/placeholder.svg?height=180&width=250",
    category: "dogs",
  },
  {
    id: 5,
    name: "Cat Scratching Post",
    price: 34.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=180&width=250",
    category: "cats",
  },
  {
    id: 6,
    name: "Dog Leash & Collar Set - size S",
    price: 29.99,
    originalPrice: null,
    rating: 4.4,
    reviews: 104,
    image: "/placeholder.svg?height=180&width=250",
    category: "dogs",
  },
  {
    id: 7,
    name: "Aquarium Starter Kit - 10L",
    price: 89.99,
    originalPrice: null,
    rating: 4.3,
    reviews: 67,
    image: "/placeholder.svg?height=180&width=250",
    category: "fish",
  },
  {
    id: 8,
    name: "Bird Cage with Accessories",
    price: 119.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 52,
    image: "/placeholder.svg?height=180&width=250",
    category: "birds",
  },
]

export const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (trimmed) {
      navigate(`/shop?search=${encodeURIComponent(trimmed)}`)
    }
  }

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    )
  }

  const handleToggleWishlist = (product: any) => {
    dispatch(
      toggleWishlistItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        category: product.category,
      })
    )
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const renderStars = (rating: number) => {
    const stars = []
    const full = Math.floor(rating)
    const half = rating % 1 !== 0
    for (let i = 0; i < full; i++) stars.push(<span key={i}>★</span>)
    if (half) stars.push(<span key="half">★</span>)
    for (let i = stars.length; i < 5; i++) stars.push(<span key={`e${i}`}>☆</span>)
    return stars
  }

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">Shop for Your Pet</h1>
            <p className="hero__subtitle">
              Find the best products for your furry friends while supporting animal shelters with every purchase.
            </p>
            <form className="hero__search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for pet products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hero__search-input"
              />
              <button type="submit" className="hero__search-button">🔍</button>
            </form>
            <Link to="/shop" className="hero__cta-button">
              Find Products
            </Link>
          </div>
          <div className="hero__image">
            <img src={cover} alt="Happy pets with products" className="hero__image-main" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="categories__container">
          <div className="categories__header">
            <h2 className="categories__title">Pet Categories</h2>
            <p className="categories__subtitle">Find everything your pet needs in one place</p>
          </div>
          <div className="categories__grid">
            {categories.map((cat) => (
              <Link key={cat.id} to={cat.link} className="category-card">
                <div className="category-card__image">
                  <img src={cat.image || "/placeholder.svg"} alt={cat.name} />
                </div>
                <h3 className="category-card__name">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestseller Section */}
      <section className="bestsellers">
        <div className="bestsellers__container">
          <div className="bestsellers__header">
            <h2 className="bestsellers__title">Bestseller Products</h2>
            <p className="bestsellers__subtitle">Most loved products by pet parents like you</p>
          </div>
          <div className="bestsellers__grid">
            {bestsellerProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-card__image">
                  <img src={product.image} alt={product.name} />
                  <button
                    className={`product-card__wishlist ${isInWishlist(product.id) ? "active" : ""}`}
                    onClick={() => handleToggleWishlist(product)}
                  >
                    {isInWishlist(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="product-card__content">
                  <h3 className="product-card__name">{product.name}</h3>
                  <div className="product-card__rating">
                    <div className="product-card__stars">{renderStars(product.rating)}</div>
                    <span className="product-card__reviews">({product.reviews})</span>
                  </div>
                  <div className="product-card__price">
                    <span className="product-card__current-price">€{product.price}</span>
                  </div>
                  <button className="product-card__add-to-cart" onClick={() => handleAddToCart(product)}>
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bestsellers__footer">
            <Link to="/shop" className="bestsellers__view-all">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact">
        <div className="impact__container">
          <div className="impact__image">
            <img src={help || "/placeholder.svg"} alt="Veterinarians helping animals" />
          </div>
          <div className="impact__content">
            <h2 className="impact__title">Your Purchase = Real help</h2>
            <p className="impact__description">
              Part of every payment goes to support shelters. With each purchase, you're directly contributing to the
              wellbeing of animals in need across the country.
            </p>
            <div className="impact__stats">
              <div className="impact__stat">
                <div className="impact__stat-icon">❤️</div>
                <div className="impact__stat-content">
                  <div className="impact__stat-number">€125,840</div>
                  <div className="impact__stat-label">donated to date</div>
                </div>
              </div>
              <div className="impact__stat">
                <div className="impact__stat-icon">🏠</div>
                <div className="impact__stat-content">
                  <div className="impact__stat-number">4</div>
                  <div className="impact__stat-label">partner shelters</div>
                </div>
              </div>
            </div>
            <Link to="/help-shelters" className="impact__learn-more">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
