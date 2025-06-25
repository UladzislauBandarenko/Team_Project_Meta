"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { clearCredentials } from "../../redux/auth/authSlice"
import type { RootState } from "../../redux/store"
import "./SellerProfile.scss"

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  image: string
  description: string
  sellerId: number
}

interface Order {
  id: string
  productName: string
  quantity: number
  price: number
  customerName: string
  status: string
  orderDate: string
  totalAmount: number
}

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "Dog Products",
    price: 39.99,
    stock: 45,
    image: "/placeholder.svg?height=60&width=60",
    description: "High-quality premium dog food for all breeds",
    sellerId: 1,
  },
  {
    id: 2,
    name: "Interactive Cat Toy",
    category: "Cat Products",
    price: 24.99,
    stock: 32,
    image: "/placeholder.svg?height=60&width=60",
    description: "Interactive toy to keep cats entertained",
    sellerId: 1,
  },
  {
    id: 3,
    name: "Orthopedic Dog Bed",
    category: "Dog Products",
    price: 59.99,
    stock: 18,
    image: "/placeholder.svg?height=60&width=60",
    description: "Comfortable orthopedic bed for dogs",
    sellerId: 1,
  },
  {
    id: 4,
    name: "Automatic Pet Feeder",
    category: "Dog Products",
    price: 79.99,
    stock: 12,
    image: "/placeholder.svg?height=60&width=60",
    description: "Automatic feeder with timer functionality",
    sellerId: 1,
  },
  {
    id: 5,
    name: "Cat Scratching Post",
    category: "Cat Products",
    price: 34.99,
    stock: 27,
    image: "/placeholder.svg?height=60&width=60",
    description: "Durable scratching post for cats",
    sellerId: 1,
  },
]

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    productName: "Premium Dog Food",
    quantity: 2,
    price: 39.99,
    customerName: "John Smith",
    status: "Processing",
    orderDate: "2025-06-20",
    totalAmount: 79.98,
  },
  {
    id: "ORD-002",
    productName: "Interactive Cat Toy",
    quantity: 1,
    price: 24.99,
    customerName: "Sarah Johnson",
    status: "Shipped",
    orderDate: "2025-06-19",
    totalAmount: 24.99,
  },
  {
    id: "ORD-003",
    productName: "Orthopedic Dog Bed",
    quantity: 1,
    price: 59.99,
    customerName: "Mike Wilson",
    status: "Delivered",
    orderDate: "2025-06-18",
    totalAmount: 59.99,
  },
]

const categories = [
  "Dog Products",
  "Cat Products",
  "Fish Products",
  "Bird Products",
  "Small Pet Products",
  "Reptile Products",
]

const SellerProfile: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)

  const [activeTab, setActiveTab] = useState("products")
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [orders] = useState<Order[]>(mockOrders)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const itemsPerPage = 5

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Dog Products",
    price: 0,
    stock: 0,
    description: "",
    image: "",
  })

  useEffect(() => {
    if (!user || user.role !== "seller") {
      navigate("/login")
    }
  }, [user, navigate])

  const handleLogout = () => {
    dispatch(clearCredentials())
    navigate("/")
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price > 0) {
      const product: Product = {
        id: Date.now(),
        ...newProduct,
        sellerId: user?.id || 1,
        image: newProduct.image || "/placeholder.svg?height=60&width=60",
      }
      setProducts([...products, product])
      setNewProduct({
        name: "",
        category: "Dog Products",
        price: 0,
        stock: 0,
        description: "",
        image: "",
      })
      setShowAddProduct(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image,
    })
    setShowAddProduct(true)
  }

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.price > 0) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...editingProduct, ...newProduct } : p)))
      setEditingProduct(null)
      setNewProduct({
        name: "",
        category: "Dog Products",
        price: 0,
        stock: 0,
        description: "",
        image: "",
      })
      setShowAddProduct(false)
    }
  }

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "delivered"
      case "processing":
        return "processing"
      case "shipped":
        return "shipped"
      case "cancelled":
        return "cancelled"
      default:
        return "processing"
    }
  }

  // Pagination
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage)

  // Analytics data
  const totalProducts = products.length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const lowStockProducts = products.filter((p) => p.stock < 10).length

  if (!user || user.role !== "seller") {
    return <div className="seller-profile__loading">Loading...</div>
  }

  return (
    <div className="seller-profile">
      {/* Header */}
      <div className="seller-header">
        <div className="seller-header__left">
          <Link to="/" className="seller-header__logo">
            PetCare Market
          </Link>
          <h1 className="seller-header__title">
            {activeTab === "products" && "My Products"}
            {activeTab === "orders" && "Orders"}
            {activeTab === "profile" && "My Profile"}
            {activeTab === "analytics" && "Analytics"}
          </h1>
        </div>
        <div className="seller-header__right">
          <button className="notification-btn">🔔</button>
          <div className="user-dropdown">
            <button className="user-dropdown__trigger" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              👤 Seller Account
            </button>
            {showUserDropdown && (
              <div className="user-dropdown__menu">
                <button onClick={() => setActiveTab("profile")}>My Profile</button>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="seller-content">
        {/* Sidebar */}
        <div className="seller-sidebar">
          <nav className="seller-nav">
            <button
              className={`seller-nav__item ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              📦 My Products
            </button>
            <button
              className={`seller-nav__item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              🛒 Orders
            </button>
            <button
              className={`seller-nav__item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              👤 My Profile
            </button>
            <button
              className={`seller-nav__item ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              📊 Analytics
            </button>
          </nav>

          <Link to="/" className="back-to-site">
            ← Back to Main Site
          </Link>
        </div>

        {/* Main Content */}
        <div className="seller-main">
          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="products-section">
              <div className="section-header">
                <h2>Product Inventory</h2>
                <button className="add-product-btn" onClick={() => setShowAddProduct(true)}>
                  ➕ Add New Product
                </button>
              </div>

              <div className="products-table">
                <div className="table-header">
                  <div className="table-col">Product</div>
                  <div className="table-col">Category</div>
                  <div className="table-col">Price</div>
                  <div className="table-col">Stock</div>
                  <div className="table-col">Actions</div>
                </div>

                <div className="table-body">
                  {paginatedProducts.map((product) => (
                    <div key={product.id} className="table-row">
                      <div className="table-col product-info">
                        <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
                        <div className="product-details">
                          <div className="product-name">{product.name}</div>
                          <div className="product-id">ID: #{product.id}</div>
                        </div>
                      </div>
                      <div className="table-col">{product.category}</div>
                      <div className="table-col">€{product.price.toFixed(2)}</div>
                      <div className="table-col">
                        <span className={`stock ${product.stock < 10 ? "low" : ""}`}>{product.stock} units</span>
                      </div>
                      <div className="table-col actions">
                        <button className="action-btn edit" onClick={() => handleEditProduct(product)}>
                          ✏️
                        </button>
                        <button className="action-btn delete" onClick={() => handleDeleteProduct(product.id)}>
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="pagination">
                <span className="pagination-info">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, products.length)} of {products.length}{" "}
                  products
                </span>
                <div className="pagination-controls">
                  <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <span className="page-number">{currentPage}</span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="orders-section">
              <h2>Recent Orders</h2>
              <div className="orders-table">
                <div className="table-header">
                  <div className="table-col">Order ID</div>
                  <div className="table-col">Product</div>
                  <div className="table-col">Customer</div>
                  <div className="table-col">Quantity</div>
                  <div className="table-col">Total</div>
                  <div className="table-col">Status</div>
                  <div className="table-col">Date</div>
                </div>
                <div className="table-body">
                  {orders.map((order) => (
                    <div key={order.id} className="table-row">
                      <div className="table-col">{order.id}</div>
                      <div className="table-col">{order.productName}</div>
                      <div className="table-col">{order.customerName}</div>
                      <div className="table-col">{order.quantity}</div>
                      <div className="table-col">€{order.totalAmount.toFixed(2)}</div>
                      <div className="table-col">
                        <span className={`status status--${getStatusColor(order.status)}`}>{order.status}</span>
                      </div>
                      <div className="table-col">{order.orderDate}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="profile-section">
              <h2>Seller Profile</h2>
              <div className="profile-card">
                <div className="profile-info">
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <p>Email: {user.email}</p>
                  <p>Role: Seller</p>
                  {user.address && <p>Address: {user.address}</p>}
                  {user.city && <p>City: {user.city}</p>}
                  {user.phoneNumber && <p>Phone: {user.phoneNumber}</p>}
                </div>
                <button className="edit-profile-btn">Edit Profile</button>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="analytics-section">
              <h2>Analytics Dashboard</h2>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <div className="analytics-card__icon">📦</div>
                  <div className="analytics-card__content">
                    <div className="analytics-card__number">{totalProducts}</div>
                    <div className="analytics-card__label">Total Products</div>
                  </div>
                </div>
                <div className="analytics-card">
                  <div className="analytics-card__icon">🛒</div>
                  <div className="analytics-card__content">
                    <div className="analytics-card__number">{totalOrders}</div>
                    <div className="analytics-card__label">Total Orders</div>
                  </div>
                </div>
                <div className="analytics-card">
                  <div className="analytics-card__icon">💰</div>
                  <div className="analytics-card__content">
                    <div className="analytics-card__number">€{totalRevenue.toFixed(2)}</div>
                    <div className="analytics-card__label">Total Revenue</div>
                  </div>
                </div>
                <div className="analytics-card">
                  <div className="analytics-card__icon">⚠️</div>
                  <div className="analytics-card__content">
                    <div className="analytics-card__number">{lowStockProducts}</div>
                    <div className="analytics-card__label">Low Stock Items</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setShowAddProduct(false)
                  setEditingProduct(null)
                  setNewProduct({
                    name: "",
                    category: "Dog Products",
                    price: 0,
                    stock: 0,
                    description: "",
                    image: "",
                  })
                }}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (€)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="Enter image URL"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn--secondary"
                onClick={() => {
                  setShowAddProduct(false)
                  setEditingProduct(null)
                }}
              >
                Cancel
              </button>
              <button className="btn btn--primary" onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SellerProfile
