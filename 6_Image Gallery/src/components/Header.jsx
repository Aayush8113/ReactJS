// src/components/Header.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Import Icons for a clean look
import { FiUser, FiHome, FiSettings } from 'react-icons/fi';
import Logo from "./Logo.jsx";
import SmartSearch from "./SmartSearch.jsx"; // Assuming it can be placed here
import MiniCart from "./MiniCart.jsx"; // Import the component
import "../style/Header.css";

export default function Header() {
  const location = useLocation();
  // ⭐ Local state for the global search input in the header
  const [headerSearch, setHeaderSearch] = useState('');

  // Helper function to determine if a link is currently active
  const getLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Determine if we should show the full header content (hide on Admin/Auth pages)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAuthPage || isAdminPage) {
    // Render a minimalist header or nothing if required by the design
    return (
      <header className="header header-minimal">
        <Logo />
        {isAdminPage && <p className="admin-header-title">Admin Dashboard</p>}
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-left">
        <Logo />

        <nav className="nav-links">
          <Link to="/" className={getLinkClass("/")}>
            <FiHome size={16} /> Home
          </Link>
          <Link to="/profile" className={getLinkClass("/profile")}>
            <FiUser size={16} /> Profile
          </Link>
          <Link to="/admin" className={getLinkClass("/admin")}>
            <FiSettings size={16} /> Admin
          </Link>
        </nav>
      </div>

      <div className="header-right">
        {/* 1. Search Bar - SmartSearch is safe here as data is global */}
        <SmartSearch
          search={headerSearch}
          setSearch={setHeaderSearch}
          // allData prop is OMITTED!
        />

        {/* 2. Login/Profile Button */}
        <Link to="/login" className="login-btn">
          Sign In
        </Link>

        {/* 3. MiniCart Component (Now handles its own icon and state) */}
        <MiniCart />
      </div>
    </header>
  );
}