// src/components/Sidebar.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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

// ⭐ Constants MUST match values in Sidebar.css for perfect visual alignment ⭐
const SIDEBAR_WIDTH_EXPANDED = '240px';
const SIDEBAR_WIDTH_COLLAPSED = '80px';
const SIDEBAR_WIDTH_MOBILE_HIDDEN = '0px'; 

// Mock user state
const isAuthenticated = true;
const isAdmin = true;

/**
 * Professional Sidebar Component - Collapsible and responsive.
 */
export default function Sidebar() {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false); 

    // Function to calculate and update the global CSS variable
    const updateSidebarWidth = (collapsedState) => {
        const isMobile = window.innerWidth <= 768;
        let width;

        if (isMobile) {
            width = SIDEBAR_WIDTH_MOBILE_HIDDEN;
        } else {
            width = collapsedState ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;
        }
        
        // This dynamically sets the --sidebar-current-width used by Header.css
        document.documentElement.style.setProperty('--sidebar-current-width', width);
    };

    // 1. Handle collapsed state changes (Initial load and clicks)
    useEffect(() => {
        updateSidebarWidth(isCollapsed);
        
        return () => {
            document.documentElement.style.removeProperty('--sidebar-current-width');
        };
    }, [isCollapsed]);

    // 2. Handle window resize (for smooth breakpoint transitions)
    useEffect(() => {
        const handleResize = () => {
             updateSidebarWidth(isCollapsed);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isCollapsed]);


    const mainLinks = [
        { name: "Home", path: "/", icon: FiHome },
        { name: "Profile", path: "/profile", icon: FiUser },
        { name: "Catalog", path: "/catalog", icon: FiGrid },
    ];

    const adminLinks = [
        { name: "Dashboard", path: "/admin", icon: FiSettings },
        { name: "Products", path: "/admin/products", icon: FiGrid },
    ];

    const authLinks = isAuthenticated
        ? { name: "Logout", path: "/logout", icon: FiLogOut }
        : { name: "Login/Register", path: "/login", icon: FiLogIn };

    // Helper to determine active link
    const getLinkClass = (path) => {
        if (path === "/") {
            return location.pathname === "/" ? "active" : "";
        }
        return location.pathname.startsWith(path) ? "active" : "";
    };


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