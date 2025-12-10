// src/components/Admin/AdminTable.jsx (Content derived from the user's AdminChart.jsx input)

import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

/**
 * Admin Table Component - Displays a list of users or recent orders.
 */
export default function AdminTable() {
    const users = [
        { id: 1, name: "Aayush Tripathi", email: "aayush@example.com", status: "Active" },
        { id: 2, name: "Rohan Patel", email: "rohan@example.com", status: "Pending" },
        { id: 3, name: "Isha Sharma", email: "isha@example.com", status: "Active" },
        { id: 4, name: "Vivek K.", email: "vivek@example.com", status: "Inactive" },
    ];

    return (
        <section className="admin-chart-container" aria-label="Recent User Status">
            <h2 className="admin-section-title">Recent Users</h2>
            
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>
                                <span className={`status ${u.status.toLowerCase().replace(' ', '-')}`}>
                                    {u.status}
                                </span>
                            </td>
                            <td className="admin-table-actions">
                                <button className="action-icon-btn edit-btn" aria-label={`Edit user ${u.name}`}>
                                    <FiEdit size={16} />
                                </button>
                                <button className="action-icon-btn delete-btn" aria-label={`Delete user ${u.name}`}>
                                    <FiTrash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}