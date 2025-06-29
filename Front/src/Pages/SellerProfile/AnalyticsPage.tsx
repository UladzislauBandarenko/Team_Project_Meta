import type React from "react"
import "./AnalyticsPage.scss"
import { useGetSellerMetricsQuery } from "../../redux/seller/sellerApi"

const AnalyticsPage: React.FC = () => {
    const { data: metrics, isLoading } = useGetSellerMetricsQuery()

    const formatEuro = (amount: number): string => {
        return `€${amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }

    const formatEuroWhole = (amount: number): string => {
        return `€${amount.toLocaleString("de-DE")}`
    }

    if (isLoading || !metrics) {
        return <div className="analytics-page"><p>Loading analytics...</p></div>
    }

    return (
        <div className="analytics-page">
            {/* Summary Cards */}
            <div className="analytics-summary">
                <div className="analytics-card total-sales">
                    <div className="analytics-card__icon">💰</div>
                    <div className="analytics-card__content">
                        <div className="analytics-card__label">Total Sales</div>
                        <div className="analytics-card__number">{formatEuroWhole(metrics.totalSales)}</div>
                    </div>
                </div>
                <div className="analytics-card orders">
                    <div className="analytics-card__icon">🛍️</div>
                    <div className="analytics-card__content">
                        <div className="analytics-card__label">Orders</div>
                        <div className="analytics-card__number">{metrics.totalOrders}</div>
                    </div>
                </div>
                <div className="analytics-card average-order">
                    <div className="analytics-card__icon">📊</div>
                    <div className="analytics-card__content">
                        <div className="analytics-card__label">Average Order Value</div>
                        <div className="analytics-card__number">{formatEuro(metrics.averageOrderValue)}</div>
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
                            <div className="overview-col">{formatEuroWhole(metrics.totalSales)}</div>
                        </div>
                        <div className="overview-row">
                            <div className="overview-col">Net Profit</div>
                            <div className="overview-col">{formatEuro(metrics.netProfit)}</div>
                        </div>
                        <div className="overview-row">
                            <div className="overview-col">Average Order Value</div>
                            <div className="overview-col">{formatEuro(metrics.averageOrderValue)}</div>
                        </div>
                        <div className="overview-row">
                            <div className="overview-col">Total Orders</div>
                            <div className="overview-col">{metrics.totalOrders}</div>
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
                        <div className="products-analytics-col">Price</div>
                        <div className="products-analytics-col">Units Sold</div>
                        <div className="products-analytics-col">Revenue</div>
                    </div>
                    <div className="products-analytics-body">
                        {metrics.popularProducts.map((product) => (
                            <div key={product.productId} className="products-analytics-row">
                                <div className="products-analytics-col">{product.name}</div>
                                <div className="products-analytics-col">{formatEuro(product.price)}</div>
                                <div className="products-analytics-col">{product.orderCount}</div>
                                <div className="products-analytics-col">{formatEuro(product.totalRevenue)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsPage
