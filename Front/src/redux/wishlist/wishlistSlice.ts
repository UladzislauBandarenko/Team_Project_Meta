import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  category: string
}

interface WishlistState {
  items: WishlistItem[]
  totalItems: number
}

// Load wishlist from localStorage
const loadWishlistFromStorage = (): WishlistItem[] => {
  try {
    const wishlistData = localStorage.getItem("petcare_wishlist")
    return wishlistData ? JSON.parse(wishlistData) : []
  } catch {
    return []
  }
}

// Save wishlist to localStorage
const saveWishlistToStorage = (items: WishlistItem[]) => {
  localStorage.setItem("petcare_wishlist", JSON.stringify(items))
}

const initialItems = loadWishlistFromStorage()

const initialState: WishlistState = {
  items: initialItems,
  totalItems: initialItems.length,
}

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (!existingItem) {
        state.items.push(action.payload)
        state.totalItems = state.items.length
        saveWishlistToStorage(state.items)
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.totalItems = state.items.length
      saveWishlistToStorage(state.items)
    },

    clearWishlist: (state) => {
      state.items = []
      state.totalItems = 0
      saveWishlistToStorage([])
    },

    toggleWishlistItem: (state, action: PayloadAction<WishlistItem>) => {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id)

      if (existingItemIndex >= 0) {
        state.items.splice(existingItemIndex, 1)
      } else {
        state.items.push(action.payload)
      }

      state.totalItems = state.items.length
      saveWishlistToStorage(state.items)
    },
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist, toggleWishlistItem } = wishlistSlice.actions
export default wishlistSlice.reducer
