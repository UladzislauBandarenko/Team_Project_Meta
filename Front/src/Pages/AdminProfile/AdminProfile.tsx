"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearCredentials } from "../../redux/auth/authSlice"
import "./AdminProfile.scss"
import UsersPage from "./UsersPage"
import OrdersPage from "./OrdersPage"

interface Category {
  id: number
  name: string
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  reviews: Review[]
}

interface Review {
  id: number
  customerName: string
  rating: number
  date: string
  comment: string
}

interface AdminStats {
  totalSales: number
  platformProfit: number
  averageOrderValue: number
  charityDonations: number
  totalUsers: number
  totalOrders: number
}

const AdminProfile: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Dog Products" },
    { id: 2, name: "Cat Products" },
    { id: 3, name: "Fish Products" },
    { id: 4, name: "Bird Products" },
    { id: 5, name: "Small Pets Products" },
    { id: 6, name: "Reptiles Products" },
  ])
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Dog Food",
      category: "Dogs",
      price: 49.99,
      reviews: [
        {
          id: 1,
          customerName: "John D.",
          rating: 5,
          date: "2025-06-25",
          comment: "Great product! Exactly what I needed.",
        },
        { id: 2, customerName: "Sarah M.", rating: 4, date: "2025-06-24", comment: "Good quality but a bit pricey." },
        {
          id: 3,
          customerName: "Mike R.",
          rating: 3,
          date: "2025-06-23",
          comment: "Average product, meets basic needs.",
        },
      ],
    },
    {
      id: 2,
      name: "Luxury Cat Bed",
      category: "Cats",
      price: 79.99,
      reviews: [
        {
          id: 4,
          customerName: "Emma L.",
          rating: 5,
          date: "2025-06-24",
          comment: "My cat loves it! Very comfortable.",
        },
        { id: 5, customerName: "David K.", rating: 4, date: "2025-06-23", comment: "Good quality, fast delivery." },
      ],
    },
    {
      id: 3,
      name: "Bird Cage Deluxe",
      category: "Birds",
      price: 129.99,
      reviews: [
        { id: 6, customerName: "Lisa P.", rating: 5, date: "2025-06-22", comment: "Perfect size for my parrots!" },
      ],
    },
    {
      id: 4,
      name: "Aquarium Filter System",
      category: "Fish",
      price: 89.99,
      reviews: [
        { id: 7, customerName: "Tom W.", rating: 4, date: "2025-06-21", comment: "Works well, keeps water clean." },
        { id: 8, customerName: "Anna S.", rating: 5, date: "2025-06-20", comment: "Excellent filtration system!" },
      ],
    },
    {
      id: 5,
      name: "Hamster Exercise Wheel",
      category: "Small Pets",
      price: 24.99,
      reviews: [
        { id: 9, customerName: "Chris B.", rating: 3, date: "2025-06-19", comment: "Decent wheel, a bit noisy." },
      ],
    },
    {
      id: 6,
      name: "Reptile Heat Lamp",
      category: "Reptiles",
      price: 34.99,
      reviews: [
        { id: 10, customerName: "Maria G.", rating: 4, date: "2025-06-18", comment: "Good heat output, reliable." },
      ],
    },
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [showReviewsModal, setShowReviewsModal] = useState<Product | null>(null)
  const [reviewToDelete, setReviewToDelete] = useState<{ productId: number; reviewId: number } | null>(null)

  const stats: AdminStats = {
    totalSales: 45280,
    platformProfit: 6792,
    averageOrderValue: 92.45,
    charityDonations: 2340,
    totalUsers: 1247,
    totalOrders: 489,
  }

  const formatEuro = (amount: number): string => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const handleLogout = () => {
    dispatch(clearCredentials())
    navigate('/login')
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Math.max(...categories.map((c) => c.id)) + 1,
        name: newCategoryName.trim(),
      }
      setCategories([...categories, newCategory])
      setNewCategoryName("")
      setShowAddModal(false)
    }
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id))
    setShowDeleteConfirm(null)
  }

  const handleDeleteReview = (productId: number, reviewId: number) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, reviews: product.reviews.filter((review) => review.id !== reviewId) }
        : product,
    )
    setProducts(updatedProducts)

    // Update the modal data if it's currently showing
    if (showReviewsModal && showReviewsModal.id === productId) {
      const updatedProduct = updatedProducts.find((p) => p.id === productId)
      if (updatedProduct) {
        setShowReviewsModal(updatedProduct)
      }
    }

    setReviewToDelete(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddCategory()
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "star--filled" : "star--empty"}`}>
        ⭐
      </span>
    ))
  }

  const renderDashboard = () => (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h2>Admin Dashboard</h2>
      </div>
      <div className="admin-dashboard__stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon admin-stat-card__icon--sales">💰</div>
          <div className="admin-stat-card__content">
            <h3>Total Sales</h3>
            <p className="admin-stat-card__value">{formatEuro(stats.totalSales)}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon admin-stat-card__icon--profit">📈</div>
          <div className="admin-stat-card__content">
            <h3>Platform Profit</h3>
            <p className="admin-stat-card__value">{formatEuro(stats.platformProfit)}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon admin-stat-card__icon--order">🛒</div>
          <div className="admin-stat-card__content">
            <h3>Average Order Value</h3>
            <p className="admin-stat-card__value">{formatEuro(stats.averageOrderValue)}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon admin-stat-card__icon--charity">❤️</div>
          <div className="admin-stat-card__content">
            <h3>Charity Donations</h3>
            <p className="admin-stat-card__value">{formatEuro(stats.charityDonations)}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon admin-stat-card__icon--users">👥</div>
          <div className="admin-stat-card__content">
            <h3>Total Users</h3>
            <p className="admin-stat-card__value">{stats.totalUsers.toLocaleString()}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon admin-stat-card__icon--orders">📦</div>
          <div className="admin-stat-card__content">
            <h3>Total Orders</h3>
            <p className="admin-stat-card__value">{stats.totalOrders.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCategories = () => (
    <div className="admin-categories">
      <div className="admin-categories__header">
        <h2>Categories</h2>
        <button className="admin-btn admin-btn--primary" onClick={() => setShowAddModal(true)}>
          + Add Category
        </button>
      </div>
      <div className="admin-categories__table">
        <div className="admin-table">
          <div className="admin-table__header">
            <div className="admin-table__row">
              <div className="admin-table__cell admin-table__cell--header">Name</div>
              <div className="admin-table__cell admin-table__cell--header admin-table__cell--actions">Action</div>
            </div>
          </div>
          <div className="admin-table__body">
            {categories.map((category) => (
              <div key={category.id} className="admin-table__row">
                <div className="admin-table__cell">{category.name}</div>
                <div className="admin-table__cell admin-table__cell--actions">
                  <button
                    className="admin-action-btn admin-action-btn--delete"
                    onClick={() => setShowDeleteConfirm(category.id)}
                    title="Delete category"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="admin-products">
      <div className="admin-products__header">
        <h2>Products</h2>
      </div>
      <div className="admin-products__table">
        <div className="admin-table admin-table--products">
          <div className="admin-table__header">
            <div className="admin-table__row admin-table__row--products">
              <div className="admin-table__cell admin-table__cell--header">Product Name</div>
              <div className="admin-table__cell admin-table__cell--header">Category</div>
              <div className="admin-table__cell admin-table__cell--header">Price</div>
              <div className="admin-table__cell admin-table__cell--header admin-table__cell--actions">Actions</div>
            </div>
          </div>
          <div className="admin-table__body">
            {products.map((product) => (
              <div key={product.id} className="admin-table__row admin-table__row--products">
                <div className="admin-table__cell">{product.name}</div>
                <div className="admin-table__cell">{product.category}</div>
                <div className="admin-table__cell">{formatEuro(product.price)}</div>
                <div className="admin-table__cell admin-table__cell--actions">
                  <button
                    className="admin-action-btn admin-action-btn--view"
                    onClick={() => setShowReviewsModal(product)}
                    title="View reviews"
                  >
                    💬
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard()
      case "categories":
        return renderCategories()
      case "products":
        return renderProducts()
      case "orders":
        return <OrdersPage />
      case "users":
        return <UsersPage />
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="admin-profile">
      <div className="admin-profile__container">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header__brand">
            <h1>PetCare Market</h1>
          </div>
          <div className="admin-header__title">
            <h2>Admin Panel</h2>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <nav className="admin-sidebar__nav">
              <button
                className={`admin-sidebar__item ${activeSection === "dashboard" ? "admin-sidebar__item--active" : ""}`}
                onClick={() => setActiveSection("dashboard")}
              >
                <span className="admin-sidebar__icon">📊</span>
                Dashboard
              </button>
              <button
                className={`admin-sidebar__item ${activeSection === "categories" ? "admin-sidebar__item--active" : ""}`}
                onClick={() => setActiveSection("categories")}
              >
                <span className="admin-sidebar__icon">📁</span>
                Categories
              </button>
              <button
                className={`admin-sidebar__item ${activeSection === "orders" ? "admin-sidebar__item--active" : ""}`}
                onClick={() => setActiveSection("orders")}
              >
                <span className="admin-sidebar__icon">🛒</span>
                Orders
              </button>
              <button
                className={`admin-sidebar__item ${activeSection === "products" ? "admin-sidebar__item--active" : ""}`}
                onClick={() => setActiveSection("products")}
              >
                <span className="admin-sidebar__icon">📦</span>
                Products
              </button>
              <button
                className={`admin-sidebar__item ${activeSection === "users" ? "admin-sidebar__item--active" : ""}`}
                onClick={() => setActiveSection("users")}
              >
                <span className="admin-sidebar__icon">👥</span>
                Users
              </button>
            </nav>
            <div className="admin-sidebar__footer">
              <button className="admin-sidebar__logout" onClick={handleLogout}>
                <span className="admin-sidebar__icon">🚪</span>
                Log Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="admin-main">{renderSection()}</main>
        </div>

        {/* Add Category Modal */}
        {showAddModal && (
          <div className="admin-modal">
            <div className="admin-modal__backdrop" onClick={() => setShowAddModal(false)} />
            <div className="admin-modal__content">
              <div className="admin-modal__header">
                <h3>Add New Category</h3>
                <button className="admin-modal__close" onClick={() => setShowAddModal(false)}>
                  ×
                </button>
              </div>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label htmlFor="categoryName">Category Name</label>
                  <input
                    id="categoryName"
                    type="text"
                    className="admin-input"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter category name"
                    autoFocus
                  />
                </div>
              </div>
              <div className="admin-modal__footer">
                <button className="admin-btn admin-btn--secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button
                  className="admin-btn admin-btn--primary"
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Category Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="admin-modal">
            <div className="admin-modal__backdrop" onClick={() => setShowDeleteConfirm(null)} />
            <div className="admin-modal__content">
              <div className="admin-modal__header">
                <h3>Confirm Delete</h3>
                <button className="admin-modal__close" onClick={() => setShowDeleteConfirm(null)}>
                  ×
                </button>
              </div>
              <div className="admin-modal__body">
                <p>Are you sure you want to delete this category? This action cannot be undone.</p>
              </div>
              <div className="admin-modal__footer">
                <button className="admin-btn admin-btn--secondary" onClick={() => setShowDeleteConfirm(null)}>
                  Cancel
                </button>
                <button
                  className="admin-btn admin-btn--primary"
                  onClick={() => handleDeleteCategory(showDeleteConfirm)}
                  style={{ backgroundColor: "#dc3545" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Reviews Modal */}
        {showReviewsModal && (
          <div className="admin-modal">
            <div className="admin-modal__backdrop" onClick={() => setShowReviewsModal(null)} />
            <div className="admin-modal__content admin-modal__content--reviews">
              <div className="admin-modal__header">
                <h3>Product Reviews</h3>
                <button className="admin-modal__close" onClick={() => setShowReviewsModal(null)}>
                  ×
                </button>
              </div>
              <div className="admin-modal__body">
                <div className="reviews-list">
                  {showReviewsModal.reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-item__header">
                        <div className="review-item__info">
                          <span className="review-item__name">{review.customerName}</span>
                          <div className="review-item__rating">{renderStars(review.rating)}</div>
                          <span className="review-item__date">{review.date}</span>
                        </div>
                        <button
                          className="admin-action-btn admin-action-btn--delete"
                          onClick={() => setReviewToDelete({ productId: showReviewsModal.id, reviewId: review.id })}
                          title="Delete review"
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="review-item__comment">{review.comment}</div>
                    </div>
                  ))}
                  {showReviewsModal.reviews.length === 0 && (
                    <div className="reviews-empty">
                      <p>No reviews yet for this product.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Review Confirmation Modal */}
        {reviewToDelete && (
          <div className="admin-modal">
            <div className="admin-modal__backdrop" onClick={() => setReviewToDelete(null)} />
            <div className="admin-modal__content">
              <div className="admin-modal__header">
                <h3>Delete Review</h3>
                <button className="admin-modal__close" onClick={() => setReviewToDelete(null)}>
                  ×
                </button>
              </div>
              <div className="admin-modal__body">
                <p>Are you sure you want to delete this review? This action cannot be undone.</p>
              </div>
              <div className="admin-modal__footer">
                <button className="admin-btn admin-btn--secondary" onClick={() => setReviewToDelete(null)}>
                  Cancel
                </button>
                <button
                  className="admin-btn admin-btn--primary"
                  onClick={() => handleDeleteReview(reviewToDelete.productId, reviewToDelete.reviewId)}
                  style={{ backgroundColor: "#dc3545" }}
                >
                  Delete Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProfile
