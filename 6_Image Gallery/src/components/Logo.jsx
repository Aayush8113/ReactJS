// src/components/Logo.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FiImage } from "react-icons/fi"; // Using an icon for visual branding
import "../style/Logo.css"; // Ensure you create this CSS file

/**
 * Professional Logo Component.
 * Acts as a clickable link back to the homepage.
 */
export default function Logo() {
    return (
        <Link to="/" className="app-logo" aria-label="Go to homepage">
            <FiImage size={28} className="logo-icon" />
            <span className="logo-text">VisualHub</span>
        </Link>
    );
}