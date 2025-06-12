import type { Product } from "../../types/product"

const API_BASE_URL = "http://localhost:5278/api"

export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${API_BASE_URL}/Products`)
    if (!res.ok) throw new Error("Failed to fetch products")
    return res.json()
}
