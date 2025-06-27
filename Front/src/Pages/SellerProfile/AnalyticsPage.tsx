import type React from "react"
import "./AnalyticsPage.scss"

interface TopSellingProduct {
  id: number
  name: string
  category: string
  price: number
  unitsSold: number
  revenue: number
  image: string
}

const topSellingProducts: TopSellingProduct[] = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "Dog Products",
    price: 35.99,
    unitsSold: 128,
    revenue: 4606.72,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Interactive Cat Toy",
    category: "Cat Products",
    price: 22.99,
    unitsSold: 94,
    revenue: 2161.06,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Orthopedic Dog Bed",
    category: "Dog Products",
    price: 54.99,
    unitsSold: 76,
    revenue: 4179.24,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Automatic Pet Feeder",
    category: "Dog Products",
    price: 72.99,
    unitsSold: 52,
    revenue: 3795.48,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Cat Scratching Post",
    category: "Cat Products",
    price: 31.99,
    unitsSold: 48,
    revenue: 1535.52,
    image: "/placeholder.svg?height=40&width=40",
  },
]

const AnalyticsPage: React.FC = () => {
  // Analytics calculations
  const totalSales = 12580
  const totalOrdersAnalytics = 142
  const averageOrderValue = totalSales / totalOrdersAnalytics
  const netProfit = totalSales * 0.15 // Assuming 15% profit margin

  // Format currency in euros
  const formatEuro = (amount: number): string => {
    return `€${amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatEuroWhole = (amount: number): string => {
    return `€${amount.toLocaleString("de-DE")}`
  }

  return (
    <div className="analytics-page">
      {/* Analytics Summary Cards */}
      <div className="analytics-summary">
        <div className="analytics-card total-sales">
          <div className="analytics-card__icon">💰</div>
          <div className="analytics-card__content">
            <div className="analytics-card__label">Total Sales</div>
            <div className="analytics-card__number">{formatEuroWhole(totalSales)}</div>
            <div className="analytics-card__change positive">↑ 12.5% from last month</div>
          </div>
        </div>
        <div className="analytics-card orders">
          <div className="analytics-card__icon">🛍️</div>
          <div className="analytics-card__content">
            <div className="analytics-card__label">Orders</div>
            <div className="analytics-card__number">{totalOrdersAnalytics}</div>
            <div className="analytics-card__change positive">↑ 5.2% from last month</div>
          </div>
        </div>
        <div className="analytics-card average-order">
          <div className="analytics-card__icon">📊</div>
          <div className="analytics-card__content">
            <div className="analytics-card__label">Average Order Value</div>
            <div className="analytics-card__number">{formatEuro(averageOrderValue)}</div>
            <div className="analytics-card__change positive">↑ 3.2% from last month</div>
          </div>
        </div>
      </div>

      {/* Sales Overview */}
      <div className="sales-overview">
        <h3>Sales Overview</h3>
        <div className="overview-table">
          <div className="overview-header">
            <div className="overview-col">Metric</div>
            <div className="overview-col">Value</div>
          </div>
          <div className="overview-body">
            <div className="overview-row">
              <div className="overview-col">Total Sales</div>
              <div className="overview-col">{formatEuroWhole(totalSales)}</div>
            </div>
            <div className="overview-row">
              <div className="overview-col">Net Profit</div>
              <div className="overview-col">{formatEuro(netProfit)}</div>
            </div>
            <div className="overview-row">
              <div className="overview-col">Average Order Value</div>
              <div className="overview-col">{formatEuro(averageOrderValue)}</div>
            </div>
            <div className="overview-row">
              <div className="overview-col">Total Orders</div>
              <div className="overview-col">{totalOrdersAnalytics}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="top-products">
        <h3>Top Selling Products</h3>
        <div className="products-analytics-table">
          <div className="products-analytics-header">
            <div className="products-analytics-col">Product</div>
            <div className="products-analytics-col">Category</div>
            <div className="products-analytics-col">Price</div>
            <div className="products-analytics-col">Units Sold</div>
            <div className="products-analytics-col">Revenue</div>
          </div>
          <div className="products-analytics-body">
            {topSellingProducts.map((product) => (
              <div key={product.id} className="products-analytics-row">
                <div className="products-analytics-col product-info">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image-small" />
                  <span className="product-name">{product.name}</span>
                </div>
                <div className="products-analytics-col">{product.category}</div>
                <div className="products-analytics-col">{formatEuro(product.price)}</div>
                <div className="products-analytics-col">{product.unitsSold}</div>
                <div className="products-analytics-col">{formatEuro(product.revenue)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
