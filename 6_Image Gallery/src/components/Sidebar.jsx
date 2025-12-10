// src/components/Sidebar.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Use Fi icons for a professional look
import { 
    FiHome, 
    FiUser, 
    FiLogOut, 
    FiLogIn, 
    FiSettings, 
    FiChevronLeft, 
    FiGrid 
} from "react-icons/fi";
import "../style/Sidebar.css";

// Mock user state (replace with real auth context later)
const isAuthenticated = true;
const isAdmin = true;

/**
 * Professional Sidebar Component - Collapsible and responsive.
 */
export default function Sidebar() {
    const location = useLocation();
    // State to handle collapsed view (e.g., on hover or based on user preference)
    const [isCollapsed, setIsCollapsed] = useState(false); 

    const mainLinks = [
        { name: "Home", path: "/", icon: FiHome },
        { name: "Profile", path: "/profile", icon: FiUser },
        { name: "Catalog", path: "/catalog", icon: FiGrid }, // Added a general catalog link
    ];

    const adminLinks = [
        { name: "Dashboard", path: "/admin", icon: FiSettings },
        { name: "Products", path: "/admin/products", icon: FiGrid },
    ];

    const authLinks = isAuthenticated
        ? { name: "Logout", path: "/logout", icon: FiLogOut }
        : { name: "Login/Register", path: "/login", icon: FiLogIn };

    // Helper to determine active link
    const getLinkClass = (path) => location.pathname === path ? "active" : "";

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} aria-label="Main Navigation">
            
            {/* Collapse Toggle Button */}
            <button 
                className="collapse-toggle" 
                onClick={() => setIsCollapsed(prev => !prev)}
                aria-expanded={!isCollapsed}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {/* Rotate icon based on collapse state */}
                <FiChevronLeft size={24} className={isCollapsed ? 'rotate-180' : ''} />
            </button>

            <nav className="sidebar-nav">
                <ul className="main-menu">
                    <h3>{!isCollapsed && "Main Menu"}</h3>
                    {mainLinks.map(({ name, path, icon: Icon }) => (
                        <li key={path} className={getLinkClass(path)}>
                            <Link to={path} title={name}>
                                <Icon size={20} className="link-icon" />
                                {!isCollapsed && <span className="link-text">{name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>

                {isAdmin && (
                    <ul className="admin-menu">
                        <h3>{!isCollapsed && "Admin Tools"}</h3>
                        {adminLinks.map(({ name, path, icon: Icon }) => (
                            <li key={path} className={getLinkClass(path)}>
                                <Link to={path} title={name}>
                                    <Icon size={20} className="link-icon" />
                                    {!isCollapsed && <span className="link-text">{name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>

            {/* Bottom Auth Link */}
            <div className="sidebar-footer">
                <Link to={authLinks.path} className="auth-link" title={authLinks.name}>
                    <authLinks.icon size={20} className="link-icon" />
                    {!isCollapsed && <span className="link-text">{authLinks.name}</span>}
                </Link>
            </div>
        </aside>
    );
}