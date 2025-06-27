"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./VerifyCodePage.scss"

interface VerifyCodeFormData {
  code: string
}

interface FormErrors {
  code?: string
  general?: string
}

export const VerifyCodePage: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<VerifyCodeFormData>({
    code: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetPasswordEmail")
    if (!storedEmail) {
      navigate("/forgot-password")
      return
    }
    setEmail(storedEmail)
  }, [navigate])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.code) {
      newErrors.code = "Verification code is required"
    } else if (formData.code.length !== 6) {
      newErrors.code = "Please enter a 6-digit code"
    } else if (!/^\d{6}$/.test(formData.code)) {
      newErrors.code = "Code must contain only numbers"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 6)

    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
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

      // Store verification status
      localStorage.setItem("codeVerified", "true")

      // Navigate to reset password page
      navigate("/reset-password")
    } catch (error: any) {
      console.error("Code verification failed:", error)
      setErrors({
        general: "Invalid verification code. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendCooldown > 0) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setResendCooldown(60) // 60 seconds cooldown
    } catch (error) {
      console.error("Resend failed:", error)
    }
  }

  return (
    <div className="verify-code-page">
      <div className="verify-code-page__container">
        <div className="verify-code-page__content">
          <div className="verify-code-page__header">
            <Link to="/login" className="verify-code-page__back">
              ← Back to Login
            </Link>
            <h1 className="verify-code-page__title">Forgot Password</h1>
            <p className="verify-code-page__description">Enter the verification code sent to your email</p>
          </div>

          <div className="verify-code-page__success">Verification code sent to your email</div>

          {errors.general && <div className="verify-code-page__error">{errors.general}</div>}

          <form className="verify-code-page__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="code" className="form-label">
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Enter 6-digit code"
                className={`form-input ${errors.code ? "error" : ""}`}
                disabled={isLoading}
                maxLength={6}
              />
              {errors.code && <span className="error-message">{errors.code}</span>}

              <div className="resend-section">
                {resendCooldown > 0 ? (
                  <span className="resend-cooldown">Resend code in {resendCooldown}s</span>
                ) : (
                  <button type="button" onClick={handleResendCode} className="resend-button">
                    Resend Code
                  </button>
                )}
              </div>
            </div>

            <button type="submit" className="verify-code-page__submit" disabled={isLoading}>
              {isLoading ? "Confirming Code..." : "Confirm Code"}
            </button>
          </form>

          <div className="verify-code-page__footer">
            Remember your password?{" "}
            <Link to="/login" className="verify-code-page__login-link">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyCodePage
