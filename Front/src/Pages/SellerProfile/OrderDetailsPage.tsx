"use client"

import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetSellerOrdersQuery } from "../../redux/order/orderApi"
import type { OrderDto } from "@/redux/order/types"
import "./OrderDetailsPage.scss"

const OrderDetailsPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>()
    const navigate = useNavigate()
    const { data: orders, isLoading } = useGetSellerOrdersQuery()
    const [order, setOrder] = useState<OrderDto | null>(null)

    useEffect(() => {
        if (orders && orderId) {
            const matchedOrder = orders.find((o) => o.id.toString() === orderId)
            if (matchedOrder) {
                setOrder(matchedOrder)
            } else {
                navigate("/seller/dashboard")
            }
        }
    }, [orders, orderId, navigate])

    const handleBackToOrders = () => {
        navigate("/seller/dashboard", { state: { activeTab: "orders" } })
    }

    if (isLoading || !order) {
        return (
            <div className="order-details-loading">
                <p>Loading order details...</p>
            </div>
        )
    }

    const shippingAddress = `${order.address}, Apt ${order.apartmentNumber}, ${order.city}, ${order.country}, ${order.postalCode}`
    const customerName = `${order.firstName} ${order.lastName}`

    return (
        <div className="order-details-page">
            {/* Header */}
            <div className="order-details-header">
                <button className="back-btn" onClick={handleBackToOrders}>
                    ← Back to Orders
                </button>
                <div className="header-right">
                    <button className="notification-btn">🔔</button>
                    <div className="user-info">
                        <span>👤 Seller Account</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="order-details-content">
                <div className="order-header-info">
                    <h1>Order #{order.id}</h1>
                    <div className="order-meta">
                        <span className="order-date">📅 {new Date(order.createdDate).toLocaleString()}</span>
                        <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                    </div>
                </div>

                <div className="order-summary-cards">
                    <div className="summary-card total-amount">
                        <div className="card-icon">💰</div>
                        <div className="card-content">
                            <div className="card-label">Total Amount</div>
                            <div className="card-value">€{order.totalPrice.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="summary-card items">
                        <div className="card-icon">🛍️</div>
                        <div className="card-content">
                            <div className="card-label">Items</div>
                            <div className="card-value">{order.orderItems.length}</div>
                        </div>
                    </div>
                    <div className="summary-card shipping">
                        <div className="card-icon">🚚</div>
                        <div className="card-content">
                            <div className="card-label">Shipping</div>
                            <div className="card-value">{order.status}</div>
                        </div>
                    </div>
                </div>

                <div className="order-details-grid">
                    <div className="customer-section">
                        <h3>Customer Information</h3>
                        <div className="info-card">
                            <h4>Customer Details</h4>
                            <div className="customer-info">
                                <p className="customer-name">{customerName}</p>
                                <p className="customer-phone">{order.phoneNumber}</p>
                            </div>

                            <h4>Shipping Address</h4>
                            <div className="shipping-address">
                                <p>{shippingAddress}</p>
                            </div>
                        </div>

                        <div className="shipping-info-card">
                            <h4>Shipping Information</h4>
                            <div className="shipping-details">
                                <div className="detail-row">
                                    <span className="label">Order Created</span>
                                    <span className="value">{new Date(order.createdDate).toLocaleString()}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Shipping Company</span>
                                    <span className="value">—</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Tracking Number</span>
                                    <span className="value">{order.trackingNumber}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Status</span>
                                    <span className="value status-in-transit">{order.status}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Last Update</span>
                                    <span className="value">{new Date(order.lastUpdatedDate).toLocaleString()}</span>
                                </div>
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
                                {order.orderItems.map((item) => (
                                    <div key={item.id} className="item-row">
                                        <div className="col product-col">
                                            <img
                                                src={`data:image/jpeg;base64,${item.imageBase64}`}
                                                alt={item.productName}
                                                width={50}
                                                height={50}
                                            />
                                            <span>{item.productName}</span>
                                        </div>
                                        <div className="col">€{item.price.toFixed(2)}</div>
                                        <div className="col">{item.quantity}</div>
                                        <div className="col">€{(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="items-total">
                                <div className="total-row">
                                    <span className="total-label">Total</span>
                                    <span className="total-value">€{order.totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="order-timeline">
                            <h4>Order Timeline</h4>
                            <div className="timeline-item current">
                                <div className="timeline-icon">📦</div>
                                <div className="timeline-content">
                                    <div className="timeline-status">Current Status: {order.status}</div>
                                    <div className="timeline-date">
                                        Last Updated: {new Date(order.lastUpdatedDate).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsPage
