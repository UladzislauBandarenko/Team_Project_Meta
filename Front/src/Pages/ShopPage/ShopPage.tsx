"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/cart/cartSlice"
import { toggleWishlistItem } from "../../redux/wishlist/wishlistSlice"
import type { RootState } from "../../redux/store"
import "./ShopPage.scss"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  tags?: string[]
}

// Mock products data
const allProducts: Product[] = [
  {
    id: 1,
    name: "Premium Dog Food - 5kg",
    price: 39.99,
    rating: 4.8,
    reviews: 128,
    image: "/placeholder.svg?height=200&width=200",
    category: "dogs",
    tags: ["organic", "premium"],
  },
  {
    id: 2,
    name: "Interactive Cat Toy Bundle",
    price: 24.99,
    rating: 4.6,
    reviews: 94,
    image: "/placeholder.svg?height=200&width=200",
    category: "cats",
    tags: ["interactive", "bundle"],
  },
  {
    id: 3,
    name: "Orthopedic Dog Bed - size L",
    price: 59.99,
    rating: 4.9,
    reviews: 76,
    image: "/placeholder.svg?height=200&width=200",
    category: "dogs",
    tags: ["orthopedic", "memory foam"],
  },
  {
    id: 4,
    name: "Automatic Pet Feeder with Timer",
    price: 79.99,
    rating: 4.7,
    reviews: 112,
    image: "/placeholder.svg?height=200&width=200",
    category: "dogs",
    tags: ["automatic", "timer"],
  },
  {
    id: 5,
    name: "Multi-Level Cat Scratching Post",
    price: 34.99,
    rating: 4.5,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=200",
    category: "cats",
    tags: ["scratching", "multi-level"],
  },
  {
    id: 6,
    name: "Reflective Dog Leash & Collar Set - size L",
    price: 29.99,
    rating: 4.4,
    reviews: 104,
    image: "/placeholder.svg?height=200&width=200",
    category: "dogs",
    tags: ["reflective", "set"],
  },
  {
    id: 7,
    name: "Complete Aquarium Starter Kit - 200L",
    price: 89.99,
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=200",
    category: "fish",
    tags: ["starter kit", "complete"],
  },
  {
    id: 8,
    name: "Deluxe Bird Cage with Accessories",
    price: 119.99,
    rating: 4.8,
    reviews: 52,
    image: "/placeholder.svg?height=200&width=200",
    category: "birds",
    tags: ["deluxe", "accessories"],
  },
  {
    id: 9,
    name: "Hamster Habitat Playground",
    price: 45.99,
    rating: 4.7,
    reviews: 38,
    image: "/placeholder.svg?height=200&width=200",
    category: "small-pets",
    tags: ["habitat", "playground"],
  },
  {
    id: 10,
    name: "Reptile Heat Lamp & UVB Kit",
    price: 64.99,
    rating: 4.5,
    reviews: 29,
    image: "/placeholder.svg?height=200&width=200",
    category: "reptiles",
    tags: ["heat lamp", "uvb"],
  },
  {
    id: 11,
    name: "Premium Cat Food - Grain Free - 1.5 kg",
    price: 32.99,
    rating: 4.9,
    reviews: 87,
    image: "/placeholder.svg?height=200&width=200",
    category: "cats",
    tags: ["premium", "grain free"],
  },
  {
    id: 12,
    name: "Dog Dental Care Kit",
    price: 19.99,
    rating: 4.3,
    reviews: 64,
    image: "/placeholder.svg?height=200&width=200",
    category: "dogs",
    tags: ["dental", "care kit"],
  },
]

const categories = [
  { id: "dogs", name: "Dogs", count: 5 },
  { id: "cats", name: "Cats", count: 3 },
  { id: "fish", name: "Fish", count: 1 },
  { id: "birds", name: "Birds", count: 1 },
  { id: "small-pets", name: "Small Pets", count: 1 },
  { id: "reptiles", name: "Reptiles", count: 1 },
]

// Category mapping for URL params
const categoryMapping: { [key: string]: string } = {
  dog: "dogs",
  cat: "cats",
  fish: "fish",
  bird: "birds",
  "small-pets": "small-pets",
  reptile: "reptiles",
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
]

export const ShopPage: React.FC = () => {
  const dispatch = useDispatch()
  const { category: urlCategory } = useParams<{ category?: string }>()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  // Initialize selected categories based on URL parameter
  const getInitialCategories = (): string[] => {
    if (urlCategory && categoryMapping[urlCategory]) {
      return [categoryMapping[urlCategory]]
    }
    return []
  }

  const [selectedCategories, setSelectedCategories] = useState<string[]>(getInitialCategories())
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)

  // Update selected categories when URL changes
  useEffect(() => {
    if (urlCategory && categoryMapping[urlCategory]) {
      setSelectedCategories([categoryMapping[urlCategory]])
    } else {
      setSelectedCategories([])
    }
    setCurrentPage(1) // Reset to first page when category changes
  }, [urlCategory])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [selectedCategories, priceRange, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handlePriceRangeChange = (value: number, index: number) => {
    const newRange: [number, number] = [...priceRange]
    newRange[index] = value
    setPriceRange(newRange)
    setCurrentPage(1)
  }

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      }),
    )
    // You can add a toast notification here
    console.log("Added to cart:", product.name)
  }

  const handleToggleWishlist = (product: Product) => {
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

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId)
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

  // Get current category name for breadcrumb
  const getCurrentCategoryName = (): string => {
    if (urlCategory && categoryMapping[urlCategory]) {
      const category = categories.find((cat) => cat.id === categoryMapping[urlCategory])
      return category ? category.name : "Shop"
    }
    return "Shop"
  }

  return (
    <div className="shop-page">
      <div className="shop-page__container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb__link">
            Home
          </Link>
          <span className="breadcrumb__separator">/</span>
          {urlCategory ? (
            <>
              <Link to="/shop" className="breadcrumb__link">
                Shop
              </Link>
              <span className="breadcrumb__separator">/</span>
              <span className="breadcrumb__current">{getCurrentCategoryName()}</span>
            </>
          ) : (
            <span className="breadcrumb__current">Shop</span>
          )}
        </nav>

        <div className="shop-page__content">
          {/* Sidebar Filters */}
          <aside className="shop-page__sidebar">
            <div className="filters">
              <h3 className="filters__title">Filters</h3>

              {/* Pet Type Filter */}
              <div className="filter-group">
                <h4 className="filter-group__title">Pet Type</h4>
                <div className="filter-group__options">
                  {categories.map((category) => (
                    <label key={category.id} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                      />
                      <span className="checkbox-option__text">
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="filter-group">
                <h4 className="filter-group__title">Price Range</h4>
                <div className="price-range">
                  <div className="price-range__inputs">
                    <div className="price-input">
                      <span className="price-input__symbol">€</span>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(Number(e.target.value), 0)}
                        min="0"
                        max="200"
                      />
                    </div>
                    <span className="price-range__separator">to</span>
                    <div className="price-input">
                      <span className="price-input__symbol">€</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(Number(e.target.value), 1)}
                        min="0"
                        max="200"
                      />
                    </div>
                  </div>
                  <div className="price-range__slider">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(Number(e.target.value), 0)}
                      className="range-slider range-slider--min"
                    />
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(Number(e.target.value), 1)}
                      className="range-slider range-slider--max"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="shop-page__main">
            {/* Header */}
            <div className="shop-header">
              <div className="shop-header__info">
                <span className="shop-header__count">Showing {filteredAndSortedProducts.length} products</span>
                {urlCategory && <span className="shop-header__category">in {getCurrentCategoryName()}</span>}
              </div>
              <div className="shop-header__controls">
                <div className="sort-control">
                  <label htmlFor="sort-by">Sort by:</label>
                  <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-card__image">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} />
                    <button
                      className={`product-card__wishlist ${isInWishlist(product.id) ? "active" : ""}`}
                      onClick={() => handleToggleWishlist(product)}
                      title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
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
                      {product.originalPrice && (
                        <span className="product-card__original-price">€{product.originalPrice}</span>
                      )}
                    </div>

                    <button className="product-card__add-to-cart" onClick={() => handleAddToCart(product)}>
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination__info">
                <label htmlFor="items-per-page">Show:</label>
                <select
                  id="items-per-page"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>

              <div className="pagination__controls">
                <button
                  className="pagination__button"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination__button ${page === currentPage ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="pagination__button"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
