"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearCredentials } from "../../redux/auth/authSlice"
import "./AdminProfile.scss"

interface AdminStats {
  totalSales: number
  platformProfit: number
  averageOrderValue: number
  charityDonations: number
  totalUsers: number
  totalOrders: number
}

const AdminProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    navigate("/login")
  }

  const handleBackToMainSite = () => {
    navigate("/")
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
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>Categories Management</h2>
      </div>
      <div className="admin-section__content">
        <p>Manage product categories, add new categories, and organize the product catalog.</p>
      </div>
    </div>
  )

  const renderOrders = () => (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>Orders Management</h2>
      </div>
      <div className="admin-section__content">
        <p>View and manage all orders, track order status, and handle customer requests.</p>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>Products Management</h2>
      </div>
      <div className="admin-section__content">
        <p>Manage all products, approve seller listings, and maintain product quality.</p>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>Users Management</h2>
      </div>
      <div className="admin-section__content">
        <p>Manage user accounts, seller applications, and user permissions.</p>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "categories":
        return renderCategories()
      case "orders":
        return renderOrders()
      case "products":
        return renderProducts()
      case "users":
        return renderUsers()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="admin-profile">
      <div className="admin-profile__container">
        <div className="admin-header">
          <div className="admin-header__brand">
            <h1>PetCare Market</h1>
          </div>
          <div className="admin-header__title">
            <h2>Admin Panel</h2>
          </div>
        </div>

        <div className="admin-content">
          <aside className="admin-sidebar">
            <nav className="admin-sidebar__nav">
              <button
                className={`admin-sidebar__item ${activeTab === "dashboard" ? "admin-sidebar__item--active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <span className="admin-sidebar__icon">📊</span>
                Dashboard
              </button>

              <button
                className={`admin-sidebar__item ${activeTab === "categories" ? "admin-sidebar__item--active" : ""}`}
                onClick={() => setActiveTab("categories")}
              >
                <span className="admin-sidebar__icon">🏷️</span>
                Categories
              </button>

              <button
                className={`admin-sidebar__item ${activeTab === "orders" ? "admin-sidebar__item--active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <span className="admin-sidebar__icon">🛒</span>
                Orders
              </button>

              <button
                className={`admin-sidebar__item ${activeTab === "products" ? "admin-sidebar__item--active" : ""}`}
                onClick={() => setActiveTab("products")}
              >
                <span className="admin-sidebar__icon">📦</span>
                Products
              </button>

              <button
                className={`admin-sidebar__item ${activeTab === "users" ? "admin-sidebar__item--active" : ""}`}
                onClick={() => setActiveTab("users")}
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

          <main className="admin-main">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
