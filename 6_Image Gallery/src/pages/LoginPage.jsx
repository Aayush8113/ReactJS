// src/pages/LoginPage.jsx

import React from "react";
import Login from "../components/User/Login.jsx";
import PageWrapper from "../components/PageWrapper.jsx";
import { notify } from "../utils/notifications"; // To use utility for success messages
import "../style/Auth.css"; // Ensure styles are imported

/**
 * LoginPage - Wraps the Login form component.
 * Handles successful login by redirecting the user to the profile page.
 */
export default function LoginPage() {
    
    const handleLoginSuccess = () => {
        // Use history/navigate hook in a real app, but for window.location:
        window.location.href = "/profile";
    };

    return (
        <PageWrapper isAuth={true}>
            <div className="auth-container" aria-label="Login page container">
                {/* The Login component handles state and local logic */}
                <Login onSuccess={handleLoginSuccess} />
            </div>
        </PageWrapper>
    );
}