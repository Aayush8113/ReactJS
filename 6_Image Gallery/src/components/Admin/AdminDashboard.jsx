// src/components/Admin/AdminDashboard.jsx

import React from "react";
// --- Icons ---
import { FiLayout, FiList } from "react-icons/fi"; 

// --- Component Imports ---
import AdminTopbar from "./AdminTopbar.jsx";
import AdminSidebar from "./AdminSidebar.jsx";
import AdminCards from "./AdminCards.jsx";
import AdminChart from "./AdminChart.jsx";
import AdminTable from "./AdminTable.jsx"; // <-- ⭐️ NEW: Import the AdminTable component
import "../../style/AdminDashboard.css";

/**
 * Main Layout for the Admin Dashboard.
 * Defines the two-column structure (Sidebar + Main Content Area).
 */
export default function AdminDashboard() {
    return (
        <div className="admin-layout" aria-label="Administrator Dashboard Layout">
            
            {/* 1. Vertical Navigation Sidebar */}
            <AdminSidebar />
            
            {/* 2. Main Content Area */}
            <div className="admin-main">
                
                {/* Fixed Header/Top Bar */}
                <AdminTopbar />
                
                {/* Scrollable Dashboard Content */}
                <main className="admin-content">
                    <h1 className="admin-page-title">
                        <FiLayout size={28} className="title-icon" /> Dashboard Overview
                    </h1>

                    {/* Quick Stats/Cards (Row 1) */}
                    <AdminCards /> 
                    
                    {/* Main Charts/Data Visualizations (Row 2) */}
                    <AdminChart />

                    {/* Recent Data/Table (Row 3) */}
                    <div className="admin-section-header">
                        <h2 className="admin-section-title">
                            <FiList size={20} className="title-icon" /> Recent Activity
                        </h2>
                        {/* You can add a "View All" button here if needed */}
                    </div>
                    
                    <AdminTable />
                    
                </main>
            </div>
        </div>
    );
}