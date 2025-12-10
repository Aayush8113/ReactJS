// src/components/User/Login.jsx

import React, { useState } from "react";
import { FiLogIn, FiLoader } from "react-icons/fi"; // Added professional icons
import { loginUser } from "../../utils/auth";
import { notify } from "../../utils/notifications";
import "../../style/Auth.css";

/**
 * Professional Login Form Component.
 * @param {object} props
 * @param {function} props.onSuccess - Callback function to run upon successful login.
 */
export default function Login({ onSuccess }) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    // Consolidated handler for all form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // NOTE: loginUser utility should be updated to be an async function (e.g., fetching an API)
            const result = await loginUser(credentials); 

            if (result.success) {
                notify("success", result.message || "Login successful! Redirecting...");
                setTimeout(onSuccess, 500); // Small delay for notification visibility
            } else {
                notify("error", result.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login API error:", error);
            notify("error", "A network error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="auth-card" onSubmit={handleSubmit} aria-label="Login Form">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to access your account.</p>

            {/* Email Input */}
            <div className="auth-input-group">
                <input
                    type="email"
                    name="email" 
                    placeholder="Email Address"
                    required
                    disabled={isLoading}
                    value={credentials.email}
                    onChange={handleInputChange}
                    className="auth-input"
                    aria-label="Email Address"
                />
            </div>

            {/* Password Input */}
            <div className="auth-input-group">
                <input
                    type="password"
                    name="password" 
                    placeholder="Password"
                    required
                    disabled={isLoading}
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="auth-input"
                    aria-label="Password"
                />
            </div>

            <button 
                type="submit" 
                className={`auth-btn ${isLoading ? 'auth-btn-loading' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <FiLoader className="loading-spinner" />
                ) : (
                    <>
                        <FiLogIn size={18} /> Login
                    </>
                )}
            </button>
            
            <a href="/forgot-password" className="auth-link-small">Forgot Password?</a>
        </form>
    );
}