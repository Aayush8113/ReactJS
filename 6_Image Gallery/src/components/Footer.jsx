// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import "../style/Footer.css";

// Mock links for a professional footer
const footerLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Support", path: "/support" },
];

export default function Footer() {
    return (
        <footer className="footer" role="contentinfo">
            <div className="footer-content">
                
                {/* Copyright and Owner */}
                <p className="footer-copyright">
                    © {new Date().getFullYear()} Aayush Tripathi — All Rights Reserved.
                </p>

                {/* Navigation Links */}
                <nav className="footer-nav" aria-label="Footer Navigation">
                    <ul className="footer-links">
                        {footerLinks.map((link) => (
                            <li key={link.name}>
                                <Link to={link.path} className="footer-link">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            
            {/* Optional: Add social media icons or a theme note here */}
            <div className="footer-bottom">
                <p className="build-info">Built with React & 💙</p>
            </div>
        </footer>
    );
}