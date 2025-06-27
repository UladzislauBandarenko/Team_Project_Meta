"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { clearCredentials } from "../../redux/auth/authSlice"
import type { RootState } from "../../redux/store"
import "./SellerProfile.scss"
import AnalyticsPage from "./AnalyticsPage"

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
    id: "ORD-7829",
    productName: "Premium Dog Food",
    quantity: 3,
    price: 41.66,
    customerName: "Emilija Kazlauskienė",
    status: "Processing",
    orderDate: "16.06.2025",
    totalAmount: 189.8,
    customerEmail: "emilija.kazlauskiene@gmail.com",
    customerPhone: "+370 612 34567",
    shippingAddress: "Gedimino pr. 15-23, Vilnius 01103, Lithuania",
    shippingCompany: "DPD Lietuva",
    trackingNumber: "DPD7829456123",
    orderItems: [
      { name: "Premium Dog Food", price: 39.99, quantity: 2, image: "/placeholder.svg?height=50&width=50" },
      { name: "Interactive Cat Toy", price: 24.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
      { name: "Orthopedic Dog Bed", price: 59.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: "ORD-7830",
    productName: "Interactive Cat Toy",
    quantity: 2,
    price: 79.99,
    customerName: "Michał Kowalski",
    status: "Shipped",
    orderDate: "15.06.2025",
    totalAmount: 159.98,
    customerEmail: "michal.kowalski@wp.pl",
    customerPhone: "+48 601 234 567",
    shippingAddress: "ul. Marszałkowska 84/92, 00-514 Warszawa, Poland",
    shippingCompany: "InPost",
    trackingNumber: "INP7830456789",
    orderItems: [
      { name: "Interactive Cat Toy", price: 24.99, quantity: 2, image: "/placeholder.svg?height=50&width=50" },
      { name: "Cat Scratching Post", price: 34.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
      { name: "Premium Cat Food", price: 29.99, quantity: 2, image: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: "ORD-7831",
    productName: "Orthopedic Dog Bed",
    quantity: 1,
    price: 159.98,
    customerName: "Līga Bērziņa",
    status: "Delivered",
    orderDate: "14.06.2025",
    totalAmount: 159.98,
    customerEmail: "liga.berzina@inbox.lv",
    customerPhone: "+371 2612 3456",
    shippingAddress: "Brīvības iela 72, Rīga, LV-1011, Latvia",
    shippingCompany: "Omniva",
    trackingNumber: "OMN7831567890",
    orderItems: [
      { name: "Orthopedic Dog Bed", price: 89.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
      { name: "Dog Leash Premium", price: 34.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
      { name: "Dog Treats", price: 19.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: "ORD-7832",
    productName: "Automatic Pet Feeder",
    quantity: 1,
    price: 124.99,
    customerName: "Kadri Tamm",
    status: "Pending",
    orderDate: "13.06.2025",
    totalAmount: 124.99,
    customerEmail: "kadri.tamm@gmail.com",
    customerPhone: "+372 5123 4567",
    shippingAddress: "Narva mnt 7d, 10117 Tallinn, Estonia",
    shippingCompany: "Smartpost",
    trackingNumber: "SMT7832678901",
    orderItems: [
      { name: "Automatic Pet Feeder", price: 79.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
      { name: "Pet Water Fountain", price: 44.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: "ORD-7833",
    productName: "Cat Scratching Post",
    quantity: 2,
    price: 94.97,
    customerName: "Andrius Petrauskas",
    status: "Delivered",
    orderDate: "12.06.2025",
    totalAmount: 94.97,
    customerEmail: "andrius.petrauskas@delfi.lt",
    customerPhone: "+370 698 76543",
    shippingAddress: "Savanorių pr. 284, Kaunas 50131, Lithuania",
    shippingCompany: "LP Express",
    trackingNumber: "LPE7833789012",
    orderItems: [
      { name: "Cat Scratching Post", price: 34.99, quantity: 2, image: "/placeholder.svg?height=50&width=50" },
      { name: "Cat Toys Set", price: 24.99, quantity: 1, image: "/placeholder.svg?height=50&width=50" },
    ],
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
  const location = useLocation()

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
    imageFile: null as File | null,
  })

  const [imagePreview, setImagePreview] = useState<string>("")

  const [orderFilter, setOrderFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (!user || user.role !== "seller") {
      navigate("/login")
    }
  }, [user, navigate])

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab)
    }
  }, [location.state])

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    let filtered = orders

    // Apply status filter
    if (orderFilter !== "All") {
      filtered = filtered.filter((order) => order.status === orderFilter)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filtered
  }, [orders, orderFilter, searchQuery])

  // Calculate order statistics
  const orderStats = useMemo(() => {
    const total = orders.length
    const pending = orders.filter((order) => order.status === "Pending").length
    const shipped = orders.filter((order) => order.status === "Shipped").length
    const delivered = orders.filter((order) => order.status === "Delivered").length
    const processing = orders.filter((order) => order.status === "Processing").length

    return { total, pending, shipped, delivered, processing }
  }, [orders])

  const handleLogout = () => {
    dispatch(clearCredentials())
    navigate("/")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewProduct({ ...newProduct, imageFile: file })

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price > 0) {
      const product: Product = {
        id: Date.now(),
        ...newProduct,
        sellerId: user?.id || 1,
        image: imagePreview || "/placeholder.svg?height=60&width=60",
      }
      setProducts([...products, product])
      setNewProduct({
        name: "",
        category: "Dog Products",
        price: 0,
        stock: 0,
        description: "",
        imageFile: null,
      })
      setImagePreview("")
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
      imageFile: null,
    })
    setImagePreview(product.image)
    setShowAddProduct(true)
  }

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.price > 0) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...editingProduct,
                ...newProduct,
                image: imagePreview || editingProduct.image,
              }
            : p,
        ),
      )
      setEditingProduct(null)
      setNewProduct({
        name: "",
        category: "Dog Products",
        price: 0,
        stock: 0,
        description: "",
        imageFile: null,
      })
      setImagePreview("")
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
      case "pending":
        return "pending"
      case "cancelled":
        return "cancelled"
      default:
        return "pending"
    }
  }

  const handleViewOrderDetails = (order: Order) => {
    navigate(`/seller/order/${order.id}`, { state: { order } })
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
            {activeTab === "analytics" && "Analytics Dashboard"}
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
              <div className="orders-stats">
                <div className="stat-card">
                  <div className="stat-icon">🛒</div>
                  <div className="stat-content">
                    <div className="stat-number">{orderStats.total}</div>
                    <div className="stat-label">Total Orders</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon pending">⏳</div>
                  <div className="stat-content">
                    <div className="stat-number">{orderStats.pending}</div>
                    <div className="stat-label">Pending</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon shipped">🚚</div>
                  <div className="stat-content">
                    <div className="stat-number">{orderStats.shipped}</div>
                    <div className="stat-label">Shipped</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon delivered">✅</div>
                  <div className="stat-content">
                    <div className="stat-number">{orderStats.delivered}</div>
                    <div className="stat-label">Delivered</div>
                  </div>
                </div>
              </div>

              <div className="orders-content">
                <div className="orders-header">
                  <h2>Recent Orders</h2>
                  <div className="order-filters">
                    {["All", "Pending", "Processing", "Shipped", "Delivered"].map((filter) => (
                      <button
                        key={filter}
                        className={`filter-btn ${orderFilter === filter ? "active" : ""}`}
                        onClick={() => setOrderFilter(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="search-container">
                  <div className="search-input">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search by order ID or customer name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="orders-table">
                  <div className="table-header">
                    <div className="table-col">Order ID</div>
                    <div className="table-col">Customer</div>
                    <div className="table-col">Date</div>
                    <div className="table-col">Items</div>
                    <div className="table-col">Total</div>
                    <div className="table-col">Status</div>
                    <div className="table-col">Actions</div>
                  </div>
                  <div className="table-body">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <div key={order.id} className="table-row">
                          <div className="table-col order-id">{order.id}</div>
                          <div className="table-col">{order.customerName}</div>
                          <div className="table-col">{order.orderDate}</div>
                          <div className="table-col">{order.quantity} items</div>
                          <div className="table-col">€{order.totalAmount.toFixed(2)}</div>
                          <div className="table-col">
                            <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                          </div>
                          <div className="table-col">
                            <button className="view-details-btn" onClick={() => handleViewOrderDetails(order)}>
                              View Details
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-results">
                        <p>No orders found matching your search criteria</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="orders-pagination">
                  <span className="pagination-info">
                    Showing {filteredOrders.length} of {orders.length} orders
                  </span>
                  <div className="pagination-controls">
                    <button disabled>Previous</button>
                    <span className="page-number">1</span>
                    <button disabled>Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="profile-section">
              <div className="profile-header">
                <h2>Seller Profile</h2>
              </div>

              <div className="profile-form">
                <div className="form-section">
                  <h3>Basic Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" value={user?.firstName || "John"} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" value={user?.lastName || "Smith"} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="text" value={user?.phoneNumber || "(555) 123-4567"} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" value={user?.email || "john@pawsomeproducts.com"} readOnly />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Store Information</h3>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Address</label>
                      <input type="text" value={user?.address || "123 Pet Lane"} readOnly />
                    </div>
                    <div className="form-group full-width">
                      <label>Apartment Number</label>
                      <input type="text" value="Suite 101" readOnly />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" value={user?.city || "Furry City"} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input type="text" value="PC 12345" readOnly />
                    </div>
                    <div className="form-group full-width">
                      <label>Country</label>
                      <input type="text" value="United States" readOnly />
                    </div>
                    <div className="form-group full-width">
                      <label>Phone Number</label>
                      <input type="text" value="(555) 987-6543" readOnly />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn btn--cancel">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && <AnalyticsPage />}
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
                    imageFile: null,
                  })
                  setImagePreview("")
                }}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder=""
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (€) *</label>
                  <input
                    type="number"
                    value={newProduct.price || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })}
                    placeholder=""
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    value={newProduct.stock || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) || 0 })}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Product Image *</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="image-upload-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="image-upload-label">
                    <div className="upload-icon">📤</div>
                    <span>{newProduct.imageFile ? newProduct.imageFile.name : "Choose image file"}</span>
                  </label>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview || "/placeholder.svg"} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Product Description *</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={4}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn--cancel"
                onClick={() => {
                  setShowAddProduct(false)
                  setEditingProduct(null)
                  setNewProduct({
                    name: "",
                    category: "Dog Products",
                    price: 0,
                    stock: 0,
                    description: "",
                    imageFile: null,
                  })
                  setImagePreview("")
                }}
              >
                Cancel
              </button>
              <button className="btn btn--save" onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SellerProfile
