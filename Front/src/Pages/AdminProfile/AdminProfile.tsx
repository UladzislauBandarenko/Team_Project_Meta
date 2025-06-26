"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { clearCredentials } from "../../redux/auth/authSlice"
import "./AdminProfile.scss"

interface Category {
  id: number
  name: string
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
  const [activeSection, setActiveSection] = useState("dashboard")
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Dog Products" },
    { id: 2, name: "Cat Products" },
    { id: 3, name: "Fish Products" },
    { id: 4, name: "Bird Products" },
    { id: 5, name: "Small Pets Products" },
    { id: 6, name: "Reptiles Products" },
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

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
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const handleLogout = () => {
    dispatch(clearCredentials())
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddCategory()
    }
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

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard()
      case "categories":
        return renderCategories()
      case "orders":
        return (
          <div className="admin-section">
            <div className="admin-section__header">
              <h2>Orders Management</h2>
            </div>
            <div className="admin-section__content">
              <p>Orders management functionality will be implemented here.</p>
            </div>
          </div>
        )
      case "products":
        return (
          <div className="admin-section">
            <div className="admin-section__header">
              <h2>Products Management</h2>
            </div>
            <div className="admin-section__content">
              <p>Products management functionality will be implemented here.</p>
            </div>
          </div>
        )
      case "users":
        return (
          <div className="admin-section">
            <div className="admin-section__header">
              <h2>Users Management</h2>
            </div>
            <div className="admin-section__content">
              <p>Users management functionality will be implemented here.</p>
            </div>
          </div>
        )
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

        {/* Delete Confirmation Modal */}
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
      </div>
    </div>
  )
}

export default AdminProfile
