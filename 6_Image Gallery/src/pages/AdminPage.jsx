// src/pages/AdminPage.jsx

import React from "react";
// Import the main component that orchestrates the entire dashboard layout
import AdminDashboard from "../components/Admin/AdminDashboard"; 
import "../style/AdminDashboard.css"; // The styles for the overall admin layout

/**
 * AdminPage - Renders the primary Admin Dashboard view.
 * Uses the comprehensive AdminDashboard component for layout and content.
 */
export default function AdminPage() {
    return (
        // The AdminDashboard component handles the two-column grid (sidebar + main)
        <AdminDashboard />
    );
}