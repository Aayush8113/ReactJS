// src/components/Product/ProductManager.jsx

import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { FiPlusCircle, FiBox } from "react-icons/fi";
import { notify } from "../../utils/notifications";
import "../../style/ProductManager.css";

// Assuming productStore utilities are updated to be asynchronous if they interact with local storage/API
import {
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from "../../utils/productStore";

/**
 * Product Manager Component - Main controller for CRUD operations.
 */
export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Renamed 'open' for clarity
    const [isEditing, setIsEditing] = useState(false); // Renamed 'editing'
    const [currentProduct, setCurrentProduct] = useState(null); // Renamed 'current'

    // Load products on mount
    useEffect(() => {
        // NOTE: Load products should be wrapped in a try/catch in a real app
        setProducts(loadProducts());
    }, []);

    const refreshProducts = () => {
        setProducts(loadProducts());
    };

    // --- Action Handlers ---

    const handleAdd = () => {
        setIsEditing(false);
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (prod) => {
        setIsEditing(true);
        setCurrentProduct(prod);
        setIsModalOpen(true);
    };

    const handleSave = (prod) => {
        if (isEditing) {
            updateProduct(currentProduct.id, prod);
            notify("success", `Product ${prod.title} updated!`);
        } else {
            // Assign unique ID locally (should be done by API in production)
            addProduct({ ...prod, id: Date.now() }); 
            notify("success", `${prod.title} added successfully!`);
        }
        refreshProducts(); // Reload data
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
            notify("info", "Product deleted.");
            refreshProducts(); // Reload data
        }
    };

    return (
        <section className="product-manager-section admin-content">
            <h1 className="admin-page-title">
                <FiBox size={28} className="title-icon" /> Product Management
            </h1>

            <div className="pm-box">
                <div className="pm-header">
                    <h2 className="pm-header-title">Product List ({products.length})</h2>
                    <button className="pm-btn-add" onClick={handleAdd} aria-label="Add a New Product">
                        <FiPlusCircle size={18} /> Add New Product
                    </button>
                </div>

                <ProductList
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                
                {/* Product Count/Pagination Info */}
                <div className="pm-footer-info">
                    Displaying {products.length} total products.
                </div>

                {isModalOpen && (
                    <ProductForm
                        editing={isEditing}
                        data={currentProduct}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </section>
    );
}