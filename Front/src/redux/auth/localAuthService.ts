// Local authentication service (mock backend)
interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface AuthResponse {
  token: string,
  user: {
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
}

// Mock users database (in real app this would be in backend)
const USERS_KEY = "petcare_users"

const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY)
    return users ? JSON.parse(users) : []
  } catch {
    return []
  }
}

const saveUsers = (users: any[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

const generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

const generateUserId = () => {
  return "user_" + Math.random().toString(36).substring(2, 15)
}

export const localAuthService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers()
        const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password)

        if (user) {
          const authResponse: AuthResponse = {
              token: generateToken(),
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
              isEmailConfirmed: true,
              roles: ["user"],
              lastLoginAt: new Date().toISOString(),
              createdAt: user.createdAt,
            },
          }
          resolve(authResponse)
        } else {
          reject(new Error("Invalid email or password"))
        }
      }, 500) // Simulate network delay
    })
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers()
        const existingUser = users.find((u: any) => u.email === userData.email)

        if (existingUser) {
          reject(new Error("User with this email already exists"))
          return
        }

        const newUser = {
          id: generateUserId(),
          email: userData.email,
          password: userData.password, // In real app, this would be hashed
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: "",
          createdAt: new Date().toISOString(),
        }

        users.push(newUser)
        saveUsers(users)

        const authResponse: AuthResponse = {
            token: generateToken(),
          user: {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
            isEmailConfirmed: true,
            roles: ["user"],
            lastLoginAt: new Date().toISOString(),
            createdAt: newUser.createdAt,
          },
        }
        resolve(authResponse)
      }, 500) // Simulate network delay
    })
  },
}
