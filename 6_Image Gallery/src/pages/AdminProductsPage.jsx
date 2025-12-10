// src/pages/AdminProductsPage.jsx

import React from "react";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminTopbar from "../components/Admin/AdminTopbar";
import ProductManager from "../components/Product/ProductManager";
import { FiBox } from "react-icons/fi"; 
import "../style/AdminDashboard.css";
import "../style/ProductManager.css";

/**
 * AdminProductsPage - Dedicated page for product creation, editing, and listing.
 * Renders the full Admin layout shell with the ProductManager component in the main content area.
 */
export default function AdminProductsPage() {
    return (
        // The main container defined by AdminDashboard.css (CSS Grid: Sidebar | Main Content)
        <div className="admin-layout" aria-label="Admin Product Management Layout">
            
            <AdminSidebar />
            
            <div className="admin-main">
                <AdminTopbar />

                {/* The main scrollable content area for the page */}
                <main className="admin-content">
                    
                    {/* Page title matching the dashboard style */}
                    <h1 className="admin-page-title">
                        <FiBox size={28} className="title-icon" /> Product Catalog Management
                    </h1>
                    
                    {/* The core Product Manager component, which contains the list and form logic */}
                    <ProductManager />
                    
                </main>
            </div>
        </div>
    );
}