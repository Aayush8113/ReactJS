// src/components/Product/ProductForm.jsx

import React, { useState, useEffect, useMemo } from "react";
import { FiX, FiCheck, FiSave } from "react-icons/fi"; // Icons for actions
import { notify } from "../../utils/notifications";
import "../../style/ProductManager.css";

// Available categories for a professional form (avoids user typos)
const categoryOptions = [
    "Nature", "Mountains", "Forest", "Desert", "Ocean", "City", 
    "Autumn", "River", "Fields", "Snow", "Abstract"
];

/**
 * Product Form Component - Handles adding or editing a product within a modal.
 */
export default function ProductForm({ editing, data, onClose, onSave }) {
    const defaultForm = useMemo(() => ({
        title: "",
        price: "",
        category: categoryOptions[0], // Default to first category
        rating: 5, // Default to max rating
        img: ""
    }), []);
    
    const [form, setForm] = useState(defaultForm);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Populate form if in editing mode
        if (editing && data) {
            setForm(data);
        } else {
            setForm(defaultForm); // Reset form for new product
        }
    }, [editing, data, defaultForm]);

    // Consolidated input change handler
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        
        // Convert numbers to actual numbers, sanitize rating
        let finalValue = value;
        if (type === 'number') {
            finalValue = +value;
        }

        setForm(prev => ({ 
            ...prev, 
            [name]: finalValue 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simple validation
            if (!form.title || !form.price || form.price <= 0) {
                 notify("error", "Please fill out all required fields correctly.");
                 setIsLoading(false);
                 return;
            }

            // Simulate a save delay (e.g., API call)
            await new Promise(resolve => setTimeout(resolve, 500)); 
            
            onSave(form);
            notify("success", `Product ${editing ? 'updated' : 'added'} successfully.`);
            onClose();

        } catch (error) {
            notify("error", `Failed to save product: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Modal structure using the existing classes
        <div className="pm-modal" role="dialog" aria-modal="true">
            <div className="pm-modal-box">
                <div className="pm-modal-header">
                    <h2 className="modal-title">{editing ? "Edit Product" : "Add New Product"}</h2>
                    <button className="pm-btn-close" onClick={onClose} aria-label="Close Form">
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="pm-form">
                    
                    {/* Input Group: Title */}
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="e.g., Mountain Vista Pro"
                            value={form.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Input Group: Price */}
                    <div className="form-group">
                        <label htmlFor="price">Price ($)</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="39.99"
                            min="0.01"
                            step="0.01"
                            value={form.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Input Group: Category (Dropdown for consistency) */}
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={form.category}
                            onChange={handleInputChange}
                            required
                        >
                            {categoryOptions.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Input Group: Rating */}
                    <div className="form-group">
                        <label htmlFor="rating">Rating (1-5)</label>
                        <input
                            id="rating"
                            name="rating"
                            type="number"
                            placeholder="5"
                            min="1"
                            max="5"
                            value={form.rating}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Input Group: Image URL */}
                    <div className="form-group">
                        <label htmlFor="img">Image URL</label>
                        <input
                            id="img"
                            name="img"
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            value={form.img}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="form-actions">
                        <button 
                            className="pm-btn-save" 
                            type="submit" 
                            disabled={isLoading}
                        >
                            <FiSave size={18} />
                            {isLoading ? 'Saving...' : 'Save Product'}
                        </button>
                        <button 
                            className="pm-btn-cancel" 
                            type="button" 
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            {/* Modal Overlay to close on outside click */}
            <div className="pm-modal-overlay" onClick={onClose}></div>
        </div>
    );
}