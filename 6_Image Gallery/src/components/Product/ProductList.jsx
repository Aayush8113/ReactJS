// src/components/Product/ProductList.jsx

import React from "react";
import { FiEdit, FiTrash2, FiStar, FiImage } from "react-icons/fi";
import "../../style/ProductManager.css";

/**
 * Product List Component - Displays products in a responsive table format.
 */
export default function ProductList({ products, onEdit, onDelete }) {
    
    // Helper to render star rating
    const renderRating = (rating) => {
        const fullStars = Math.round(rating);
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FiStar key={i} className="star-filled" />);
        }
        return <div className="product-rating">{stars}</div>;
    };

    return (
        <div className="pm-table-container">
            {products.length === 0 ? (
                <p className="pm-empty-message">No products found. Use the "Add Product" button to begin.</p>
            ) : (
                <table className="pm-table admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Rating</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td className="pm-img-cell">
                                    {p.img ? (
                                        <img src={p.img} alt={p.title} className="pm-img" loading="lazy" />
                                    ) : (
                                        <div className="pm-img-placeholder"><FiImage size={20} /></div>
                                    )}
                                </td>
                                <td className="pm-title-cell">{p.title}</td>
                                <td><span className="category-tag">{p.category}</span></td>
                                <td>{renderRating(p.rating)}</td>
                                <td className="pm-price-cell">${p.price.toFixed(2)}</td>

                                <td className="pm-actions-cell">
                                    <button 
                                        onClick={() => onEdit(p)} 
                                        className="action-icon-btn edit-btn"
                                        aria-label={`Edit ${p.title}`}
                                    >
                                        <FiEdit size={16} />
                                    </button>
                                    <button 
                                        onClick={() => onDelete(p.id)} 
                                        className="action-icon-btn delete-btn"
                                        aria-label={`Delete ${p.title}`}
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}