import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  isEmailConfirmed: boolean
  roles: string[]
  lastLoginAt: string
  createdAt: string
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  isAuthenticated: boolean
}

// Load initial state from localStorage
const loadAuthState = (): AuthState => {
  try {
    const token = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    const userData = localStorage.getItem("userData")

    return {
      accessToken: token,
      refreshToken: refreshToken,
      user: userData ? JSON.parse(userData) : null,
      isAuthenticated: !!token,
    }
  } catch {
    return {
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    }
  }
}

const initialState: AuthState = loadAuthState()

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<{ accessToken: string; refreshToken: string; user: User }>) => {
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
      state.user = payload.user
      state.isAuthenticated = true

      localStorage.setItem("accessToken", payload.accessToken)
      localStorage.setItem("refreshToken", payload.refreshToken)
      localStorage.setItem("userData", JSON.stringify(payload.user))
    },
    clearCredentials: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      state.isAuthenticated = false

      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userData")
    },
    updateUser: (state, { payload }: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...payload }
        localStorage.setItem("userData", JSON.stringify(state.user))
      }
    },
  },
})

export const { setCredentials, clearCredentials, updateUser } = authSlice.actions
export default authSlice.reducer
