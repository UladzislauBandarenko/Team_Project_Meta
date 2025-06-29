"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearCredentials } from "../../redux/auth/authSlice"
import {
    useGetAdminMetricsQuery,
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
} from "../../redux/admin/adminApi"
import "./AdminProfile.scss"
import UsersPage from "./UsersPage"
import OrdersPage from "./OrdersPage"

const AdminProfile: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState("dashboard")

    const [showAddModal, setShowAddModal] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState("")
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

    const { data: stats, isLoading: metricsLoading, isError: metricsError } = useGetAdminMetricsQuery()
    const { data: categories = [], refetch: refetchCategories, isLoading: categoriesLoading } = useGetCategoriesQuery()
    const [addCategory] = useAddCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

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
        navigate("/login")
    }

    const handleAddCategory = async () => {
        if (newCategoryName.trim()) {
            try {
                await addCategory({ categorieName: newCategoryName }).unwrap()
                setNewCategoryName("")
                setShowAddModal(false)
                refetchCategories()
            } catch (error) {
                console.error("Error adding category:", error)
            }
        }
    }

    const handleDeleteCategory = async (id: number) => {
        try {
            await deleteCategory(id).unwrap()
            setShowDeleteConfirm(null)
            refetchCategories()
        } catch (error) {
            console.error("Error deleting category:", error)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddCategory()
        }
    }

    const renderDashboard = () => {
        if (metricsLoading) return <div className="admin-dashboard">Loading metrics...</div>
        if (metricsError || !stats) return <div className="admin-dashboard">Failed to load metrics.</div>

        return (
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
    }

    const renderCategories = () => (
        <div className="admin-categories">
            <div className="admin-categories__header">
                <h2>Categories</h2>
                <button className="admin-btn admin-btn--primary" onClick={() => setShowAddModal(true)}>
                    + Add Category
                </button>
            </div>
            {categoriesLoading ? (
                <div>Loading categories...</div>
            ) : (
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
                                    <div className="admin-table__cell">{category.categorieName}</div>
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
            )}
        </div>
    )

    const renderSection = () => {
        switch (activeSection) {
            case "dashboard":
                return renderDashboard()
            case "categories":
                return renderCategories()
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
                <header className="admin-header">
                    <div className="admin-header__brand">
                        <h1>PetCare Market</h1>
                    </div>
                    <div className="admin-header__title">
                        <h2>Admin Panel</h2>
                    </div>
                </header>

                <div className="admin-content">
                    <aside className="admin-sidebar">
                        <nav className="admin-sidebar__nav">
                            {["dashboard", "categories", "orders", "users"].map((section) => (
                                <button
                                    key={section}
                                    className={`admin-sidebar__item ${activeSection === section ? "admin-sidebar__item--active" : ""
                                        }`}
                                    onClick={() => setActiveSection(section)}
                                >
                                    <span className="admin-sidebar__icon">📁</span>
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </button>
                            ))}
                        </nav>
                        <div className="admin-sidebar__footer">
                            <button className="admin-sidebar__logout" onClick={handleLogout}>
                                <span className="admin-sidebar__icon">🚪</span>
                                Log Out
                            </button>
                        </div>
                    </aside>

                    <main className="admin-main">{renderSection()}</main>
                </div>

                {/* Add Modal */}
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
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter category name"
                                    autoFocus
                                />
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

                {/* Delete Modal */}
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
                                <p>Are you sure you want to delete this category?</p>
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
