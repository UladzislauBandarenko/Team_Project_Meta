"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForgotPasswordMutation } from "../../redux/auth/api"
import "./ForgotPasswordPage.scss"

interface ForgotPasswordFormData {
    email: string
}

interface FormErrors {
    email?: string
    general?: string
}

export const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<ForgotPasswordFormData>({ email: "" })
    const [errors, setErrors] = useState<FormErrors>({})
    const [forgotPassword] = useForgotPasswordMutation()
    const [isLoading, setIsLoading] = useState(false)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
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
            await forgotPassword({ email: formData.email }).unwrap()
            localStorage.setItem("resetPasswordEmail", formData.email)
            navigate("/verify-code")
        } catch (error: any) {
            console.error("Send code failed:", error)
            setErrors({
                general: "Failed to send verification code. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-page__container">
                <div className="forgot-password-page__content">
                    <div className="forgot-password-page__header">
                        <Link to="/login" className="forgot-password-page__back">
                            ← Back to Login
                        </Link>
                        <h1 className="forgot-password-page__title">Forgot Password</h1>
                        <p className="forgot-password-page__description">Enter your email to receive a verification code</p>
                    </div>

                    {errors.general && <div className="forgot-password-page__error">{errors.general}</div>}

                    <form className="forgot-password-page__form" onSubmit={handleSubmit}>
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
                                placeholder="Enter your email"
                                className={`form-input ${errors.email ? "error" : ""}`}
                                disabled={isLoading}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <button type="submit" className="forgot-password-page__submit" disabled={isLoading}>
                            {isLoading ? "Sending Code..." : "Send Code"}
                        </button>
                    </form>

                    <div className="forgot-password-page__footer">
                        Remember your password?{" "}
                        <Link to="/login" className="forgot-password-page__login-link">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage
