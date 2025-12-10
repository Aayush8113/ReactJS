// src/pages/RegisterPage.jsx

import React from "react";
import Register from "../components/User/Register.jsx";
import PageWrapper from "../components/PageWrapper.jsx";
import "../style/Auth.css";

/**
 * RegisterPage - Wraps the Register form component.
 * Handles successful registration by redirecting the user to the login page.
 */
export default function RegisterPage() {
    
    const handleRegisterSuccess = () => {
        // After successful registration, prompt user to log in
        window.location.href = "/login";
    };

    return (
        <PageWrapper isAuth={true}>
            <div className="auth-container" aria-label="Registration page container">
                {/* The Register component handles state and local logic */}
                <Register onSuccess={handleRegisterSuccess} />
            </div>
        </PageWrapper>
    );
}