"use client"

import type React from "react"
import { useState } from "react"
import "./OrdersPage.scss"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  orderId: string
  customer: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  date: string
  items: OrderItem[]
  itemCount: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  shippingCompany: string
  trackingNumber: string
  lastUpdate: string
}

const OrdersPage: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderId: "ORD-7829",
      customer: "Emily Johnson",
      customerEmail: "emily.johnson@example.com",
      customerPhone: "(555) 123-4567",
      shippingAddress: "123 Main Street, Apt 4B, New York, NY 10001",
      date: "15.06.2025",
      items: [
        { id: "1", name: "Premium Dog Food", price: 39.99, quantity: 2, image: "/Front/src/assets/IMG-57.jpg" },
        { id: "2", name: "Interactive Cat Toy", price: 24.99, quantity: 1, image: "/Front/src/assets/IMG-40.png" },
        { id: "3", name: "Orthopedic Dog Bed", price: 59.99, quantity: 1, image: "/Front/src/assets/IMG-372.jpg" },
      ],
      itemCount: 3,
      total: 124.97,
      status: "pending",
      shippingCompany: "FedEx",
      trackingNumber: "FDX7829456123",
      lastUpdate: "2025-06-16 10:30 AM",
    },
    {
      id: "2",
      orderId: "ORD-7830",
      customer: "Michael Smith",
      customerEmail: "michael.smith@example.com",
      customerPhone: "(555) 987-6543",
      shippingAddress: "456 Oak Avenue, Los Angeles, CA 90210",
      date: "15.06.2025",
      items: [
        { id: "4", name: "Cat Scratching Post", price: 79.99, quantity: 1, image: "/Front/src/assets/IMG-92.jpg" },
      ],
      itemCount: 1,
      total: 79.99,
      status: "pending",
      shippingCompany: "UPS",
      trackingNumber: "1Z999AA1234567890",
      lastUpdate: "2025-06-16 09:15 AM",
    },
    {
      id: "3",
      orderId: "ORD-7831",
      customer: "Sarah Williams",
      customerEmail: "sarah.williams@example.com",
      customerPhone: "(555) 456-7890",
      shippingAddress: "789 Pine Street, Chicago, IL 60601",
      date: "14.06.2025",
      items: [
        { id: "5", name: "Bird Cage", price: 89.99, quantity: 1, image: "/Front/src/assets/IMG-87.jpg" },
        { id: "6", name: "Bird Food Mix", price: 19.99, quantity: 2, image: "/Front/src/assets/IMG-44.jpg" },
        { id: "7", name: "Water Dispenser", price: 29.99, quantity: 1, image: "/Front/src/assets/IMG-78.jpg" },
      ],
      itemCount: 4,
      total: 159.98,
      status: "pending",
      shippingCompany: "DHL",
      trackingNumber: "DHL123456789",
      lastUpdate: "2025-06-15 14:20 PM",
    },
    {
      id: "4",
      orderId: "ORD-7832",
      customer: "David Brown",
      customerEmail: "david.brown@example.com",
      customerPhone: "(555) 321-0987",
      shippingAddress: "321 Elm Street, Miami, FL 33101",
      date: "13.06.2025",
      items: [
        { id: "8", name: "Aquarium Plants", price: 19.99, quantity: 1, image: "/Front/src/assets/IMG-85.jpg" },
        { id: "9", name: "Fish Food", price: 14.99, quantity: 2, image: "/Front/src/assets/IMG-113.jpg" },
      ],
      itemCount: 2,
      total: 49.99,
      status: "processing",
      shippingCompany: "FedEx",
      trackingNumber: "FDX783265432I",
      lastUpdate: "2025-06-13 4:20 PM",
    },
    {
      id: "5",
      orderId: "ORD-7833",
      customer: "Jessica Davis",
      customerEmail: "jessica.davis@example.com",
      customerPhone: "(555) 654-3210",
      shippingAddress: "654 Maple Drive, Seattle, WA 98101",
      date: "12.06.2025",
      items: [
        { id: "10", name: "Hamster Wheel", price: 24.99, quantity: 1, image: "/Front/src/assets/IMG-100.jpg" },
        { id: "11", name: "Hamster Food", price: 12.99, quantity: 2, image: "/Front/src/assets/IMG-126.jpg" },
        { id: "12", name: "Bedding Material", price: 16.99, quantity: 3, image: "/Front/src/assets/IMG-64.jpg" },
      ],
      itemCount: 3,
      total: 94.97,
      status: "pending",
      shippingCompany: "USPS",
      trackingNumber: "9400111899562123456789",
      lastUpdate: "2025-06-12 11:45 AM",
    },
  ])

  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  const getOrderStats = () => {
    const total = orders.length
    const pending = orders.filter((order) => order.status === "pending").length
    const shipped = orders.filter((order) => order.status === "shipped").length
    const delivered = orders.filter((order) => order.status === "delivered").length

    return { total, pending, shipped, delivered }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = activeFilter === "all" || order.status === activeFilter
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const handleBackToOrders = () => {
    setShowOrderDetails(false)
    setSelectedOrder(null)
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

  const stats = getOrderStats()

  if (showOrderDetails && selectedOrder) {
    return (
      <div className="order-details-page">
        <div className="order-details-header">
          <button className="back-btn" onClick={handleBackToOrders}>
            ← Back to Orders
          </button>
        </div>

        <div className="order-details-content">
          <div className="order-header-info">
            <h1>Order {selectedOrder.orderId}</h1>
            <div className="order-meta">
              <span className="order-date">📅 {selectedOrder.date}</span>
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
                <div className="card-value">€{selectedOrder.total.toFixed(2)}</div>
              </div>
            </div>
            <div className="summary-card items">
              <div className="card-icon">🛍️</div>
              <div className="card-content">
                <div className="card-label">Items</div>
                <div className="card-value">{selectedOrder.itemCount}</div>
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
                  <p className="customer-name">{selectedOrder.customer}</p>
                  <p className="customer-email">{selectedOrder.customerEmail}</p>
                  <p className="customer-phone">{selectedOrder.customerPhone}</p>
                </div>

                <h4>Shipping Address</h4>
                <div className="shipping-address">
                  <p>{selectedOrder.shippingAddress}</p>
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
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="item-row">
                      <div className="col product-col">
                        <img src={item.image || "/placeholder.svg?height=50&width=50"} alt={item.name} />
                        <span>{item.name}</span>
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
                    <span className="total-value">€{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shipping-info-section">
            <h3>Shipping Information</h3>
            <div className="shipping-info-table">
              <div className="shipping-row">
                <div className="shipping-cell">
                  <span className="label">Order Created</span>
                  <span className="value">{selectedOrder.date}</span>
                </div>
                <div className="shipping-cell">
                  <span className="label">Shipping Company</span>
                  <span className="value">{selectedOrder.shippingCompany}</span>
                </div>
                <div className="shipping-cell">
                  <span className="label">Tracking Number</span>
                  <span className="value">{selectedOrder.trackingNumber}</span>
                </div>
              </div>
              <div className="shipping-row">
                <div className="shipping-cell">
                  <span className="label">Status</span>
                  <span className="value status-processing">
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                <div className="shipping-cell">
                  <span className="label">Last Update</span>
                  <span className="value">{selectedOrder.lastUpdate}</span>
                </div>
                <div className="shipping-cell"></div>
              </div>
            </div>
          </div>

          <div className="order-timeline-section">
            <h3>Order Timeline</h3>
            <div className="timeline-item">
              <div className="timeline-icon">📦</div>
              <div className="timeline-content">
                <div className="timeline-status">
                  Current Status: {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </div>
                <div className="timeline-date">Last Updated: {selectedOrder.lastUpdate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>Orders</h2>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <div className="stat-label">Total Orders</div>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-label">Pending</div>
            <div className="stat-value">{stats.pending}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div className="stat-content">
            <div className="stat-label">Shipped</div>
            <div className="stat-value">{stats.shipped}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-label">Delivered</div>
            <div className="stat-value">{stats.delivered}</div>
          </div>
        </div>
      </div>

      <div className="orders-content">
        <div className="orders-controls">
          <h3>Recent Orders</h3>
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-tab ${activeFilter === "pending" ? "active" : ""}`}
              onClick={() => setActiveFilter("pending")}
            >
              Pending
            </button>
            <button
              className={`filter-tab ${activeFilter === "processing" ? "active" : ""}`}
              onClick={() => setActiveFilter("processing")}
            >
              Processing
            </button>
            <button
              className={`filter-tab ${activeFilter === "shipped" ? "active" : ""}`}
              onClick={() => setActiveFilter("shipped")}
            >
              Shipped
            </button>
            <button
              className={`filter-tab ${activeFilter === "delivered" ? "active" : ""}`}
              onClick={() => setActiveFilter("delivered")}
            >
              Delivered
            </button>
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
                  <td>
                    <span className="order-id">{order.orderId}</span>
                  </td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.itemCount} items</td>
                  <td>€{order.total.toFixed(2)}</td>
                  <td>
                    <span className={getStatusBadgeClass(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view-details-btn" onClick={() => handleViewDetails(order)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span className="pagination-info">
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>
              Previous
            </button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
