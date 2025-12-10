// src/components/Admin/AdminSidebar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import { 
    FiTrello, 
    FiUsers, 
    FiBox, 
    FiGlobe, 
    FiSettings,
    FiBarChart2 
} from "react-icons/fi"; // Professional icons

/**
 * Admin Sidebar Navigation Component.
 * Uses NavLink for automatic active link styling.
 */
export default function AdminSidebar() {
    
    // Define navigation links
    const navLinks = [
        { to: "/admin", name: "Dashboard", icon: FiTrello },
        { to: "/admin/products", name: "Products", icon: FiBox },
        { to: "/admin/users", name: "Users", icon: FiUsers },
        { to: "/admin/analytics", name: "Analytics", icon: FiBarChart2 },
        { to: "/admin/settings", name: "Settings", icon: FiSettings },
    ];
    
    return (
        <div className="admin-sidebar" aria-label="Admin Navigation Menu">
            
            <h1 className="admin-logo">DASHBOARD</h1>

            <nav className="admin-nav">
                {navLinks.map(link => (
                    <NavLink 
                        key={link.to}
                        to={link.to} 
                        // NavLink automatically adds the 'active' class when the path matches
                        className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}
                        end // 'end' ensures exact matching for the dashboard path
                    >
                        <link.icon size={20} />
                        {link.name}
                    </NavLink>
                ))}
                
                {/* Separator and Back to Site Link */}
                <hr style={{ margin: '15px 0', borderColor: 'var(--border-light)' }} />
                
                <NavLink to="/" className="admin-link">
                    <FiGlobe size={20} />
                    Back to Site
                </NavLink>
            </nav>
        </div>
    );
}