// src/components/Admin/AdminChart.jsx (New component for visualization)

import React from "react";

// Mock data for a simple monthly sales bar chart
const monthlySalesData = [
    { month: "Jan", sales: 150 },
    { month: "Feb", sales: 200 },
    { month: "Mar", sales: 250 },
    { month: "Apr", sales: 350 },
    { month: "May", sales: 300 },
    { month: "Jun", sales: 420 },
    { month: "Jul", sales: 450 },
    { month: "Aug", sales: 500 },
];

/**
 * Admin Chart Component - Displays a simple bar chart visualization.
 */
export default function AdminChart() {
    // Calculate max value for normalization
    const maxSales = Math.max(...monthlySalesData.map(d => d.sales));
    const chartHeight = 200; // Matches the CSS height

    return (
        <section className="admin-chart-container" aria-label="Monthly Sales Visualization">
            <h2 className="admin-section-title">Sales Performance (Last 8 Months)</h2>
            
            <div className="admin-chart">
                {monthlySalesData.map((data, index) => {
                    // Calculate bar height relative to the max sales
                    const barHeight = (data.sales / maxSales) * chartHeight;

                    return (
                        <div className="bar-wrapper" key={index} style={{ height: `${chartHeight}px` }}>
                            <div 
                                className="bar" 
                                style={{ height: `${barHeight}px` }}
                                title={`${data.month}: $${data.sales}k`}
                            />
                            <span className="bar-label">{data.month}</span>
                        </div>
                    );
                })}
            </div>
            <p className="chart-footer-note">Note: Values in thousands ($k)</p>
        </section>
    );
}