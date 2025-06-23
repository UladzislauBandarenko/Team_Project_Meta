"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./ResetPasswordPage.scss"

interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

interface FormErrors {
  password?: string
  confirmPassword?: string
  general?: string
}

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    const codeVerified = localStorage.getItem("codeVerified")
    const email = localStorage.getItem("resetPasswordEmail")

    if (!codeVerified || !email) {
      navigate("/forgot-password")
      return
    }
  }, [navigate])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setErrors({})
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Clear stored data
      localStorage.removeItem("resetPasswordEmail")
      localStorage.removeItem("codeVerified")

      // Navigate to login with success message
      navigate("/login", {
        state: { message: "Password reset successfully! Please log in with your new password." },
      })
    } catch (error: any) {
      console.error("Password reset failed:", error)
      setErrors({
        general: "Failed to reset password. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-page__container">
        <div className="reset-password-page__content">
          <div className="reset-password-page__header">
            <Link to="/login" className="reset-password-page__back">
              ← Back to Login
            </Link>
            <h1 className="reset-password-page__title">Reset Password</h1>
            <p className="reset-password-page__description">Create a new password for your account</p>
          </div>

          <div className="reset-password-page__success">Code verified successfully</div>

          {errors.general && <div className="reset-password-page__error">{errors.general}</div>}

          <form className="reset-password-page__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className={`form-input ${errors.password ? "error" : ""}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="reset-password-page__submit" disabled={isLoading}>
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          <div className="reset-password-page__footer">
            Remember your password?{" "}
            <Link to="/login" className="reset-password-page__login-link">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
