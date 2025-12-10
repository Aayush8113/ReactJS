// src/components/Admin/AdminTopbar.jsx

import React, { useState } from "react";
import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom"; // Use Link if the profile button navigates

/**
 * Admin Top Bar Component - Contains Search, Notifications, and User Profile.
 */
export default function AdminTopbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="admin-topbar">
            
            {/* 1. Search Bar */}
            <div className="admin-search-wrapper">
                <FiSearch className="admin-search-icon" />
                <input 
                    type="text" 
                    placeholder="Search transactions, users, products..." 
                    className="admin-search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search administrative data"
                />
            </div>

            {/* 2. Actions & Profile */}
            <div className="admin-top-actions">
                {/* Notification Icon */}
                <button className="icon-btn" aria-label="View notifications">
                    <FiBell size={20} />
                    <span className="notification-badge">3</span> {/* Example badge */}
                </button>

                {/* Profile Dropdown */}
                <div className="profile-dropdown-container">
                    <button 
                        className="admin-profile" 
                        onClick={() => setIsProfileOpen(prev => !prev)}
                        aria-expanded={isProfileOpen}
                        aria-controls="profile-menu"
                    >
                        AT
                        <FiChevronDown size={16} style={{ marginLeft: '5px' }} />
                    </button>
                    
                    {/* Placeholder for Profile Menu */}
                    {isProfileOpen && (
                        <div id="profile-menu" className="profile-menu-dropdown">
                            <Link to="/profile" className="menu-item">My Profile</Link>
                            <Link to="/admin/settings" className="menu-item">Settings</Link>
                            <Link to="/logout" className="menu-item logout">Logout</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}