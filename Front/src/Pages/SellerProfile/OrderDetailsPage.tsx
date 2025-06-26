"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import "./OrderDetailsPage.scss"

interface Order {
  id: string
  productName: string
  quantity: number
  price: number
  customerName: string
  status: string
  orderDate: string
  totalAmount: number
  customerEmail?: string
  customerPhone?: string
  shippingAddress?: string
  shippingCompany?: string
  trackingNumber?: string
  orderItems?: Array<{
    name: string
    price: number
    quantity: number
    image: string
  }>
}

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Get order data from React Router state
    if (location.state?.order) {
      setOrder(location.state.order)
    } else {
      // If no order in state, redirect back to dashboard
      navigate("/seller/dashboard")
    }
  }, [orderId, location.state, navigate])

  const handleBackToOrders = () => {
    navigate("/seller/dashboard", { state: { activeTab: "orders" } })
  }

  if (!order) {
    return (
      <div className="order-details-loading">
        <p>Loading order details...</p>
      </div>
    )
  }

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
          <h1>Order {order.id}</h1>
          <div className="order-meta">
            <span className="order-date">📅 {order.orderDate}</span>
            <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
          </div>
        </div>

        <div className="order-summary-cards">
          <div className="summary-card total-amount">
            <div className="card-icon">💰</div>
            <div className="card-content">
              <div className="card-label">Total Amount</div>
              <div className="card-value">€{order.totalAmount.toFixed(2)}</div>
            </div>
          </div>
          <div className="summary-card items">
            <div className="card-icon">🛍️</div>
            <div className="card-content">
              <div className="card-label">Items</div>
              <div className="card-value">{order.quantity}</div>
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
                <p className="customer-name">{order.customerName}</p>
                <p className="customer-email">{order.customerEmail}</p>
                <p className="customer-phone">{order.customerPhone}</p>
              </div>

              <h4>Shipping Address</h4>
              <div className="shipping-address">
                <p>{order.shippingAddress}</p>
              </div>
            </div>

            <div className="shipping-info-card">
              <h4>Shipping Information</h4>
              <div className="shipping-details">
                <div className="detail-row">
                  <span className="label">Order Created</span>
                  <span className="value">{order.orderDate}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Shipping Company</span>
                  <span className="value">{order.shippingCompany}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Tracking Number</span>
                  <span className="value">{order.trackingNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Status</span>
                  <span className="value status-in-transit">In Transit</span>
                </div>
                <div className="detail-row">
                  <span className="label">Last Update</span>
                  <span className="value">2025-06-17 10:30 AM</span>
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
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="item-row">
                    <div className="col product-col">
                      <img src={item.image || "/placeholder.svg?height=50&width=50"} alt={item.name} />
                      <span>{item.name}</span>
                    </div>
                    <div className="col">€{item.price.toFixed(2)}</div>
                    <div className="col">{item.quantity}</div>
                    <div className="col">€{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                )) || (
                  <div className="item-row">
                    <div className="col product-col">
                      <img src="/placeholder.svg?height=50&width=50" alt={order.productName} />
                      <span>{order.productName}</span>
                    </div>
                    <div className="col">€{order.price.toFixed(2)}</div>
                    <div className="col">{order.quantity}</div>
                    <div className="col">€{order.totalAmount.toFixed(2)}</div>
                  </div>
                )}
              </div>
              <div className="items-total">
                <div className="total-row">
                  <span className="total-label">Total</span>
                  <span className="total-value">€{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="order-timeline">
              <h4>Order Timeline</h4>
              <div className="timeline-item current">
                <div className="timeline-icon">📦</div>
                <div className="timeline-content">
                  <div className="timeline-status">Current Status: {order.status}</div>
                  <div className="timeline-date">Last Updated: {order.orderDate} at 10:30 AM</div>
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
