// src/components/MiniCart.jsx

import React, { useState, useContext, useMemo } from "react";
import { motion } from "framer-motion";
// Import the Context created in App.jsx
import { CartContext } from "../App.jsx"; 
// Import icons for a professional look (Assumes you install react-icons)
import { FiX, FiShoppingCart, FiTrash2 } from 'react-icons/fi'; 
import { notify } from "../utils/notifications";
import { updateItemQuantity, removeItemFromCart } from "../utils/cart"; // Assuming utility functions are updated/exist
import "../style/MiniCart.css";

/**
 * Professional Mini Cart Component - uses CartContext for state management.
 */
export default function MiniCart() {
    // 1. USE CONTEXT: Get cart state and setter directly from the context
    const { cart, setCart } = useContext(CartContext);
    const [open, setOpen] = useState(false);

    // 2. Memoized Calculations: Use useMemo for total price and quantity
    const { totalItems, totalPrice } = useMemo(() => {
        const items = cart.reduce((sum, item) => sum + item.quantity, 0);
        // Correct calculation: sum price * quantity for each item
        const price = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { totalItems: items, totalPrice: price };
    }, [cart]);


    const handleRemoveItem = (id) => {
        // Assuming utility function handles filtering
        const newCart = removeItemFromCart(cart, id);
        setCart(newCart);
        notify('info', 'Item removed from cart.');
    };
    
    // Optional: Handler to change quantity directly in the cart
    const handleUpdateQuantity = (id, change) => {
        // Assuming utility function handles quantity update logic
        const newCart = updateItemQuantity(cart, id, change);
        setCart(newCart);
    };

    return (
        <>
            {/* 1. Cart Icon Button */}
            <button className="cart-icon-btn" onClick={() => setOpen(true)} aria-label={`Open Shopping Cart with ${totalItems} items`}>
                <FiShoppingCart size={24} className="cart-icon" />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            {/* 2. Overlay */}
            {open && <div className="cart-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}

            {/* 3. Sliding Cart Panel */}
            <motion.div
                className="mini-cart"
                // Adjusted initial position for better visibility when closed
                initial={{ x: '100%' }} 
                animate={{ x: open ? 0 : '100%' }}
                // Smoother animation profile
                transition={{ type: "tween", duration: 0.3 }} 
                role="dialog"
                aria-modal="true"
                aria-label="Shopping Cart"
            >
                <div className="cart-header">
                    <h2>Your Cart ({totalItems})</h2>
                    <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close Cart">
                        <FiX size={24} />
                    </button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 && <p className="cart-empty-message">No items added yet. Start browsing!</p>}

                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.img} alt={item.title} className="item-image" />
                            <div className="cart-info">
                                <h4 className="item-title">{item.title}</h4>
                                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                <div className="quantity-controls">
                                    <button 
                                        onClick={() => handleUpdateQuantity(item.id, -1)} 
                                        disabled={item.quantity <= 1} 
                                        className="qty-btn"
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button 
                                        onClick={() => handleUpdateQuantity(item.id, 1)} 
                                        className="qty-btn"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                className="remove-btn"
                                onClick={() => handleRemoveItem(item.id)}
                                aria-label="Remove item"
                            >
                                <FiTrash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-bottom">
                    <div className="cart-total-row">
                        <span className="total-label">Subtotal:</span>
                        <span className="total-value">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn" disabled={cart.length === 0}>
                        Proceed to Checkout
                    </button>
                </div>
            </motion.div>
        </>
    );
}