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
  accessToken: string
  refreshToken: string
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

const USERS_KEY = "petcare_users"

const getUsers = () => {
  try {
    let users = localStorage.getItem(USERS_KEY)
    const parsedUsers = users ? JSON.parse(users) : []

    // admin
    const adminEmail = "admin@example.com"
    const adminExists = parsedUsers.some((u: any) => u.email === adminEmail)

    if (!adminExists) {
      const adminUser = {
        id: "admin_1",
        email: adminEmail,
        password: "admin123",
        firstName: "Admin",
        lastName: "User",
        phone: "",
        createdAt: new Date().toISOString(),
      }
      parsedUsers.push(adminUser)
      localStorage.setItem(USERS_KEY, JSON.stringify(parsedUsers))
    }

    return parsedUsers
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
          const isAdmin = user.email === "admin@example.com"
          const authResponse: AuthResponse = {
            accessToken: generateToken(),
            refreshToken: generateToken(),
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
              isEmailConfirmed: true,
              roles: isAdmin ? ["admin"] : ["user"],
              lastLoginAt: new Date().toISOString(),
              createdAt: user.createdAt,
            },
          }
          resolve(authResponse)
        } else {
          reject(new Error("Invalid email or password"))
        }
      }, 500)
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
  password: userData.password,
  firstName: userData.firstName,
  lastName: userData.lastName,
  phone: "",
  createdAt: new Date().toISOString(),
  roles: userData.email === "admin@example.com" ? ["admin"] : ["user"],
}

users.push(newUser)
saveUsers(users)

const authResponse: AuthResponse = {
  accessToken: generateToken(),
  refreshToken: generateToken(),
  user: {
    id: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    phone: newUser.phone,
    isEmailConfirmed: true,
    roles: newUser.roles,
    lastLoginAt: new Date().toISOString(),
    createdAt: newUser.createdAt,
  },

        }
        resolve(authResponse)
      }, 500)
    })
  },
}
