"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
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
    image?: string
    category: string
}

const ShopPage: React.FC = () => {
    const dispatch = useDispatch()
    const { category: urlCategory } = useParams<{ category?: string }>()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get("search")?.toLowerCase() || ""

    const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

    const [products, setProducts] = useState<Product[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
    const [sortBy, setSortBy] = useState("featured")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5278/api/Products")
                const data = await res.json()
                console.log("Products from API:", data)
                setProducts(
                    data.map((p: any) => ({
                        id: p.id,
                        name: p.productName,
                        price: p.price,
                        rating: p.averageRating || 4.5,
                        reviews: p.reviewCount || 0,
                        image: p.imageData ? `data:image/jpeg;base64,${p.imageData}` : undefined,
                        category: p.categoryName ?? "",
                    }))
                )
            } catch (err) {
                console.error("Failed to fetch products", err)
            }
        }
        fetchProducts()
    }, [])

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products]

        if (searchQuery) {
            filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery))
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((p) => selectedCategories.includes(p.category))
        }

        filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

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
        }

        return filtered
    }, [products, selectedCategories, priceRange, sortBy, searchQuery])

    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage)

    const handleCategoryChange = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        )
        setCurrentPage(1)
    }

    const handlePriceRangeChange = (value: number, index: number) => {
        const newRange: [number, number] = [...priceRange]
        if (index === 0 && value <= priceRange[1]) {
            newRange[0] = value
        } else if (index === 1 && value >= priceRange[0]) {
            newRange[1] = value
        }
        setPriceRange(newRange)
        setCurrentPage(1)
    }

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product))
    }

    const handleToggleWishlist = (product: Product) => {
        dispatch(toggleWishlistItem(product))
    }

    const isInWishlist = (productId: number) => {
        return wishlistItems.some((item) => item.id === productId)
    }

    const getCategoryCounts = (): Record<string, number> => {
        return products.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1
            return acc
        }, {} as Record<string, number>)
    }

    const categoryCounts = getCategoryCounts()
    const uniqueCategories = Object.keys(categoryCounts)

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`star ${i < Math.floor(rating) ? "filled" : "empty"}`}>★</span>
        ))
    }

    return (
        <div className="shop-page">
            <div className="shop-page__container">
                <nav className="breadcrumb">
                    <Link to="/" className="breadcrumb__link">Home</Link>
                    <span className="breadcrumb__separator">/</span>
                    <span className="breadcrumb__current">Shop</span>
                </nav>

                <div className="shop-page__content">
                    <aside className="shop-page__sidebar">
                        <div className="filters">
                            <h3 className="filters__title">Filters</h3>

                            <div className="filter-group">
                                <h4 className="filter-group__title">Pet Type</h4>
                                <div className="filter-group__options">
                                    {uniqueCategories.map((cat) => (
                                        <label key={cat} className="checkbox-option">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => handleCategoryChange(cat)}
                                            />
                                            <span className="checkbox-option__text">
                                                {cat} ({categoryCounts[cat]})
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-group">
                                <h4 className="filter-group__title">Price Range</h4>
                                <div className="price-range__inputs">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => handlePriceRangeChange(+e.target.value, 0)}
                                        min={0}
                                        max={priceRange[1]}
                                    />
                                    <span>to</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => handlePriceRangeChange(+e.target.value, 1)}
                                        min={priceRange[0]}
                                        max={200}
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="shop-page__main">
                        <div className="shop-header">
                            <span>Showing {filteredAndSortedProducts.length} products</span>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>

                        <div className="products-grid">
                            {paginatedProducts.length > 0 ? (
                                paginatedProducts.map((product) => (
                                    <div key={product.id} className="product-card">
                                        <div className="product-card__image-container">
                                            <Link to={`/product/${product.id}`}>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="product-card__image"
                                                />
                                            </Link>
                                            <button
                                                className={`product-card__wishlist ${isInWishlist(product.id) ? "active" : ""}`}
                                                onClick={() => handleToggleWishlist(product)}
                                            >
                                                {isInWishlist(product.id) ? "❤️" : "🤍"}
                                            </button>
                                        </div>

                                        <div className="product-card__content">
                                            <Link to={`/product/${product.id}`} className="product-card__title-link">
                                                <h3 className="product-card__name">{product.name}</h3>
                                            </Link>

                                            <div className="product-card__rating">
                                                <div className="product-card__stars">{renderStars(product.rating)}</div>
                                                <span className="product-card__reviews">({product.reviews})</span>
                                            </div>

                                            <div className="product-card__price">
                                                <span className="product-card__current-price">€{product.price.toFixed(2)}</span>
                                                {product.originalPrice && (
                                                    <span className="product-card__original-price">
                                                        €{product.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>

                                            <button className="product-card__add-to-cart" onClick={() => handleAddToCart(product)}>
                                                🛒 Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products found{searchQuery && ` for "${searchQuery}"`}.</p>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default ShopPage
