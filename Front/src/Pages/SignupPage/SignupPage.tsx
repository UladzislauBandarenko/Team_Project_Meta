"use client"

import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../redux/auth/authSlice"
import { useRegisterMutation } from "../../redux/auth/api"
import "./SignupPage.scss"

interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
  agreeToPrivacy: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  agreeToTerms?: string
  agreeToPrivacy?: string
  general?: string
}

export const SignupPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [register] = useRegisterMutation()

  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length !== 6) newErrors.password = "Password must be exactly 6 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the Terms of Service"
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "You must agree to the Privacy Policy"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }).unwrap()

      dispatch(setCredentials({ token: result.token, user: result.user }))
      navigate("/")
    } catch (error: any) {
      console.error("Registration error:", error)
      setErrors({ general: error?.data?.message || "Registration failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-page__container">
        <Link to="/" className="signup-page__back">
          ← Back to Home
        </Link>

        <div className="signup-page__content">
          <div className="signup-page__header">
            <h1 className="signup-page__title">Create Your Account</h1>
            <p className="signup-page__subtitle">
              Join our pet-loving community and start shopping while supporting animal shelters
            </p>
          </div>

          {errors.general && <div className="signup-page__error">{errors.general}</div>}

          <form className="signup-page__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={`form-input ${errors.firstName ? "error" : ""}`}
                disabled={isLoading}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className={`form-input ${errors.lastName ? "error" : ""}`}
                disabled={isLoading}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className={`form-input ${errors.email ? "error" : ""}`}
                disabled={isLoading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a 6-character password"
                className={`form-input ${errors.password ? "error" : ""}`}
                disabled={isLoading}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                disabled={isLoading}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <span className="checkbox-text">
                  I agree to the{" "}
                  <Link to="/terms" className="terms-link">
                    Terms of Service
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <span className="checkbox-text">
                  I agree to the{" "}
                  <Link to="/privacy" className="terms-link">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToPrivacy && <span className="error-message">{errors.agreeToPrivacy}</span>}
            </div>

            <button type="submit" className="signup-page__submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="signup-page__footer">
            Already have an account?{" "}
            <Link to="/login" className="signup-page__login-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
