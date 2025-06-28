import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
    id: number               // productId
    backendId?: number       // ID в базе
    name: string
    price: number
    image: string
    quantity: number
    category: string
}

interface CartState {
    items: CartItem[]
    totalItems: number
    totalAmount: number
    isOpen: boolean
}

const loadCartFromStorage = (): CartItem[] => {
    try {
        const cartData = localStorage.getItem("petcare_cart")
        return cartData ? JSON.parse(cartData) : []
    } catch {
        return []
    }
}

const saveCartToStorage = (items: CartItem[]) => {
    localStorage.setItem("petcare_cart", JSON.stringify(items))
}

const calculateTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { totalItems, totalAmount }
}

const initialItems = loadCartFromStorage()
const { totalItems, totalAmount } = calculateTotals(initialItems)

const initialState: CartState = {
    items: initialItems,
    totalItems,
    totalAmount,
    isOpen: false,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id)

            if (existingItem) {
                existingItem.quantity = action.payload.quantity ?? existingItem.quantity + 1

                // 🔁 Обновляем backendId, если пришёл новый
                if (action.payload.backendId && existingItem.backendId !== action.payload.backendId) {
                    console.log("🔁 Обновление backendId:", {
                        old: existingItem.backendId,
                        new: action.payload.backendId,
                    })
                    existingItem.backendId = action.payload.backendId
                }
            } else {
                console.log("🛒 Добавление нового товара:", action.payload)
                state.items.push({ ...action.payload, quantity: action.payload.quantity ?? 1 })
            }

            const totals = calculateTotals(state.items)
            state.totalItems = totals.totalItems
            state.totalAmount = totals.totalAmount
            saveCartToStorage(state.items)
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
            const totals = calculateTotals(state.items)
            state.totalItems = totals.totalItems
            state.totalAmount = totals.totalAmount
            saveCartToStorage(state.items)
        },

        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find((item) => item.id === action.payload.id)

            if (item) {
                if (action.payload.quantity <= 0) {
                    state.items = state.items.filter((item) => item.id !== action.payload.id)
                } else {
                    item.quantity = action.payload.quantity
                }
            }

            const totals = calculateTotals(state.items)
            state.totalItems = totals.totalItems
            state.totalAmount = totals.totalAmount
            saveCartToStorage(state.items)
        },

        clearCart: (state) => {
            state.items = []
            state.totalItems = 0
            state.totalAmount = 0
            saveCartToStorage([])
        },

        toggleCart: (state) => {
            state.isOpen = !state.isOpen
        },

        setCartOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        },
    },
})

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    setCartOpen,
} = cartSlice.actions

export default cartSlice.reducer
