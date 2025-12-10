// src/components/Admin/AdminCards.jsx

import React from "react";
import { FiDollarSign, FiShoppingCart, FiUsers, FiAlertCircle, FiTrendingUp, FiTrendingDown } from "react-icons/fi";

// Enhanced Stats Data (Adding icon and trend information)
const statsData = [
    { 
        label: "Total Sales", 
        value: "$12,590", 
        icon: FiDollarSign, 
        color: "var(--success)",
        trend: 12.5, // Positive trend 
    },
    { 
        label: "New Orders", 
        value: "842", 
        icon: FiShoppingCart, 
        color: "var(--primary)",
        trend: 4.2, // Positive trend
    },
    { 
        label: "Active Users", 
        value: "1,209", 
        icon: FiUsers, 
        color: "var(--warning)",
        trend: -1.1, // Negative trend
    },
    { 
        label: "Pending Issues", 
        value: "12", 
        icon: FiAlertCircle, 
        color: "var(--danger)",
        trend: 0, // No change
    },
];

/**
 * Admin Stats Cards Component - Displays key performance indicators (KPIs).
 */
export default function AdminCards() {
    return (
        <section className="admin-cards" aria-label="Key Performance Indicators">
            {statsData.map((s, i) => {
                const Icon = s.icon;
                const TrendIcon = s.trend > 0 ? FiTrendingUp : s.trend < 0 ? FiTrendingDown : null;

                return (
                    <div className="admin-card" key={i}>
                        <div className="card-header-icon">
                            <h3 className="card-title">{s.label}</h3>
                            <Icon size={24} style={{ color: s.color }} />
                        </div>
                        
                        <p className="card-value">{s.value}</p>

                        <div className="card-footer-trend">
                            {TrendIcon && (
                                <span 
                                    className="trend-indicator" 
                                    style={{ color: s.trend > 0 ? 'var(--success)' : 'var(--danger)' }}
                                >
                                    <TrendIcon size={14} />
                                    {Math.abs(s.trend)}%
                                </span>
                            )}
                            <span className="trend-text">since last month</span>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}