// src/components/Header.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUser, FiHome, FiSettings } from 'react-icons/fi';
import Logo from "./Logo.jsx"; // Assuming Logo component exists
import SmartSearch from "./SmartSearch.jsx"; // Assuming SmartSearch component exists
import MiniCart from "./MiniCart.jsx"; // Assuming MiniCart component exists
import "../style/Header.css";

export default function Header() {
  const location = useLocation();
  // State for the global search input
  const [headerSearch, setHeaderSearch] = useState('');

  // Helper function to determine if a link is currently active
  const getLinkClass = (path) => {
    // Uses startsWith for admin to handle sub-routes, but exact match for root/profile
    if (path === "/") return location.pathname === "/" ? "active" : "";
    return location.pathname.startsWith(path) ? "active" : "";
  };

  // Determine if we should render the full application header
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAuthPage || isAdminPage) {
    // Render a minimal header on auth or admin pages
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
        {/* 1. Search Bar */}
        <SmartSearch
          search={headerSearch}
          setSearch={setHeaderSearch}
        />

        {/* 2. Login/Profile Button */}
        <Link to="/login" className="login-btn">
          Sign In
        </Link>

        {/* 3. MiniCart Component */}
        <MiniCart />
      </div>
    </header>
  );
}