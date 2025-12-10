// src/pages/ProfilePage.jsx

import React from "react";
import Profile from "../components/User/Profile.jsx";
import PageWrapper from "../components/PageWrapper.jsx";
import "../style/Profile.css"; // Assuming you have a specific Profile.css file
import "../style/Auth.css"; // Using the general auth container style

/**
 * ProfilePage - Renders the authenticated user's profile view.
 */
export default function ProfilePage() {
    return (
        <PageWrapper>
            {/* Using auth-container class for a central, framed look */}
            <div className="auth-container" aria-label="User profile page container"> 
                <Profile />
            </div>
        </PageWrapper>
    );
}