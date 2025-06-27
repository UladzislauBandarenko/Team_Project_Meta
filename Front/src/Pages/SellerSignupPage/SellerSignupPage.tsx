"use client"

import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../redux/auth/authSlice"
import { useRegisterSellerMutation } from "../../redux/auth/api"
import "./SellerSignupPage.scss"

interface SellerSignupFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  address: string
  city: string
  postalCode: string
  country: string
  phoneNumber: string
  apartmentNumber: string
  agreeToTerms: boolean
  agreeToPrivacy: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  address?: string
  city?: string
  postalCode?: string
  country?: string
  phoneNumber?: string
  apartmentNumber?: string
  agreeToTerms?: string
  agreeToPrivacy?: string
  general?: string
}

export const SellerSignupPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [registerSeller] = useRegisterSellerMutation()

  const [formData, setFormData] = useState<SellerSignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Country",
    phoneNumber: "",
    apartmentNumber: "",
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
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the Terms of Service"
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "You must agree to the Privacy Policy"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
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
      const result = await registerSeller({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
        apartmentNumber: formData.apartmentNumber,
      }).unwrap()

      dispatch(setCredentials({ token: result.token, user: result.user }))
      navigate("/")
    } catch (error: any) {
      console.error("Seller registration error:", error)
      setErrors({ general: error?.data?.message || "Registration failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="seller-signup-page">
      <div className="seller-signup-page__container">
        <Link to="/login" className="seller-signup-page__back">
          ← Back to Login
        </Link>

        <div className="seller-signup-page__content">
          <div className="seller-signup-page__header">
            <h1 className="seller-signup-page__title">Create Seller Account</h1>
            <p className="seller-signup-page__subtitle">
              Join our marketplace as a seller and start selling pet products to help animal shelters
            </p>
          </div>

          {errors.general && <div className="seller-signup-page__error">{errors.general}</div>}

          <form className="seller-signup-page__form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className={`form-input ${errors.firstName ? "error" : ""}`}
                  disabled={isLoading}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name *
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
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password *
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
                  Confirm Password *
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
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your street address"
                className={`form-input ${errors.address ? "error" : ""}`}
                disabled={isLoading}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="apartmentNumber" className="form-label">
                  Apartment Number
                </label>
                <input
                  type="text"
                  id="apartmentNumber"
                  name="apartmentNumber"
                  value={formData.apartmentNumber}
                  onChange={handleInputChange}
                  placeholder="Apt, suite, etc."
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  className={`form-input ${errors.city ? "error" : ""}`}
                  disabled={isLoading}
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="postalCode" className="form-label">
                  Postal Code *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Enter postal code"
                  className={`form-input ${errors.postalCode ? "error" : ""}`}
                  disabled={isLoading}
                />
                {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="country" className="form-label">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`form-input ${errors.country ? "error" : ""}`}
                  disabled={isLoading}
                >
                  <option value="Lithuania">Lithuania</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Poland">Poland</option>
                </select>
                {errors.country && <span className="error-message">{errors.country}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className={`form-input ${errors.phoneNumber ? "error" : ""}`}
                disabled={isLoading}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
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

            <button type="submit" className="seller-signup-page__submit" disabled={isLoading}>
              {isLoading ? "Creating Seller Account..." : "Create Seller Account"}
            </button>
          </form>

          <div className="seller-signup-page__footer">
            Already have an account?{" "}
            <Link to="/login" className="seller-signup-page__login-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerSignupPage
