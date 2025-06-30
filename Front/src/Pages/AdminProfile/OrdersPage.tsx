"use client"

import React, { useState } from "react"
import { useGetAllOrdersQuery, useGetOrderByIdQuery } from "../../redux/order/orderApi"
import type { OrderDto } from "../../redux/order/types"
import "./OrdersPage.scss"

const OrdersPage: React.FC = () => {
    const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery()
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

    const {
        data: selectedOrder,
        isLoading: isOrderLoading,
        isError: isOrderError,
    } = useGetOrderByIdQuery(selectedOrderId!, {
        skip: selectedOrderId === null,
    })

    const [activeFilter, setActiveFilter] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState("")

    const handleViewDetails = (id: number) => {
        setSelectedOrderId(id)
    }

    const handleBackToOrders = () => {
        setSelectedOrderId(null)
    }

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case "pending":
                return "status-badge status-pending"
            case "processing":
                return "status-badge status-processing"
            case "shipped":
                return "status-badge status-shipped"
            case "delivered":
                return "status-badge status-delivered"
            default:
                return "status-badge"
        }
    }

    const filteredOrders = orders.filter((order) => {
        const matchesFilter = activeFilter === "all" || order.status === activeFilter
        const matchesSearch =
            order.id.toString().includes(searchTerm.toLowerCase()) ||
            `${order.firstName} ${order.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const stats = {
        total: orders.length,
        pending: orders.filter((o) => o.status === "pending").length,
        shipped: orders.filter((o) => o.status === "shipped").length,
        delivered: orders.filter((o) => o.status === "delivered").length,
    }

    if (selectedOrderId && (isOrderLoading || !selectedOrder)) return <div className="orders-page">Loading order...</div>
    if (selectedOrderId && isOrderError) return <div className="orders-page">Failed to load order details</div>

    if (selectedOrderId !== null && selectedOrder) {
        return (
            <div className="order-details-page">
                <div className="order-details-header">
                    <button className="back-btn" onClick={handleBackToOrders}>
                        ← Back to Orders
                    </button>
                </div>

                <div className="order-details-content">
                    <div className="order-header-info">
                        <h1>Order #{selectedOrder.id}</h1>
                        <div className="order-meta">
                            <span className="order-date">📅 {new Date(selectedOrder.createdDate).toLocaleDateString()}</span>
                            <span className={getStatusBadgeClass(selectedOrder.status)}>
                                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                            </span>
                        </div>
                    </div>

                    <div className="order-summary-cards">
                        <div className="summary-card total-amount">
                            <div className="card-icon">💰</div>
                            <div className="card-content">
                                <div className="card-label">Total Amount</div>
                                <div className="card-value">€{selectedOrder.totalPrice.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="summary-card items">
                            <div className="card-icon">🛍️</div>
                            <div className="card-content">
                                <div className="card-label">Items</div>
                                <div className="card-value">{selectedOrder.orderItems.length}</div>
                            </div>
                        </div>
                        <div className="summary-card shipping">
                            <div className="card-icon">🚚</div>
                            <div className="card-content">
                                <div className="card-label">Shipping</div>
                                <div className="card-value">In Transit</div>
                            </div>
                        </div>
                    </div>

                    <div className="order-details-grid">
                        <div className="customer-section">
                            <h3>Customer Information</h3>
                            <div className="info-card">
                                <h4>Customer Details</h4>
                                <div className="customer-info">
                                    <p className="customer-name">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                                    <p className="customer-phone">{selectedOrder.phoneNumber}</p>
                                </div>

                                <h4>Shipping Address</h4>
                                <div className="shipping-address">
                                    <p>{selectedOrder.address}, Apt {selectedOrder.apartmentNumber}</p>
                                    <p>{selectedOrder.city}, {selectedOrder.postalCode}, {selectedOrder.country}</p>
                                </div>
                            </div>
                        </div>

                        <div className="items-section">
                            <h3>Ordered Items</h3>
                            <div className="items-table">
                                <div className="items-header">
                                    <div className="col">Product</div>
                                    <div className="col">Price</div>
                                    <div className="col">Quantity</div>
                                    <div className="col">Subtotal</div>
                                </div>
                                <div className="items-body">
                                    {selectedOrder.orderItems.map((item) => (
                                        <div key={item.id} className="item-row">
                                            <div className="col product-col">
                                                <img
                                                    src={item.imageBase64 ? `data:image/jpeg;base64,${item.imageBase64}` : "/placeholder.svg?height=50&width=50"}
                                                    alt={item.productName}
                                                />
                                                <span>{item.productName}</span>
                                            </div>
                                            <div className="col">€{item.price.toFixed(2)}</div>
                                            <div className="col">{item.quantity}</div>
                                            <div className="col">€{(item.price * item.quantity).toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) return <div className="orders-page">Loading orders...</div>
    if (isError) return <div className="orders-page">Failed to load orders</div>

    return (
        <div className="orders-page">
            <div className="orders-header">
                <h2>Orders</h2>
            </div>

            <div className="stats-cards">
                <div className="stat-card"><div className="stat-icon">🛒</div><div className="stat-content"><div className="stat-label">Total Orders</div><div className="stat-value">{stats.total}</div></div></div>
                <div className="stat-card"><div className="stat-icon">⏳</div><div className="stat-content"><div className="stat-label">Pending</div><div className="stat-value">{stats.pending}</div></div></div>
                <div className="stat-card"><div className="stat-icon">🚚</div><div className="stat-content"><div className="stat-label">Shipped</div><div className="stat-value">{stats.shipped}</div></div></div>
                <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-content"><div className="stat-label">Delivered</div><div className="stat-value">{stats.delivered}</div></div></div>
            </div>

            <div className="orders-content">
                <div className="orders-controls">
                    <h3>Recent Orders</h3>
                    <div className="filter-tabs">
                        {["all", "pending", "processing", "shipped", "delivered"].map((status) => (
                            <button
                                key={status}
                                className={`filter-tab ${activeFilter === status ? "active" : ""}`}
                                onClick={() => setActiveFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by order ID or customer name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="orders-table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>{order.firstName} {order.lastName}</td>
                                    <td>{new Date(order.createdDate).toLocaleDateString()}</td>
                                    <td>{order.orderItems.length}</td>
                                    <td>€{order.totalPrice.toFixed(2)}</td>
                                    <td><span className={getStatusBadgeClass(order.status)}>{order.status}</span></td>
                                    <td><button className="action-btn view-details-btn" onClick={() => handleViewDetails(order.id)}>View Details</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrdersPage
