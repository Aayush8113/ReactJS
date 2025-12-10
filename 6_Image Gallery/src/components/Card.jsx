// src/components/Card.jsx

import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi"; // Using professional icons
import "../style/Card.css";

// Refactored to accept a single 'item' prop for cleaner syntax
export default function Card({
    item, // Contains id, img, title, rating, price, category
    isWishlisted,
    toggleWishlist,
    index,
    addToCart 
}) {
    const { id, img, title, rating, price, category } = item; // Destructure item
    
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const imgRef = useRef(null);

    // CATEGORY COLORS (Memoized for performance)
    const catColor = useMemo(() => {
        const colors = {
            Nature: "var(--color-nature, #4CAF50)",
            Mountains: "var(--color-mountains, #90A4AE)",
            Forest: "var(--color-forest, #2E7D32)",
            Desert: "var(--color-desert, #FB8C00)",
            Ocean: "var(--color-ocean, #0288D1)",
            City: "var(--color-city, #7E57C2)",
            Autumn: "var(--color-autumn, #D84315)",
            River: "var(--color-river, #26A69A)",
            Fields: "var(--color-fields, #BA68C8)",
            Snow: "var(--color-snow, #80D8FF)",
            All: "var(--text-secondary)"
        };
        // Use CSS variables for better theming integration
        return colors[category] || "var(--text-secondary)";
    }, [category]); 

    // 3D Tilt handler
    const handleMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        // Reduced tilt effect for subtlety
        setTilt({ x: x * 10, y: y * 10 }); 
    };

    // Rating Display (Modern icon stars)
    const renderRating = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FiStar 
                    key={i} 
                    className={`star-icon ${i <= rating ? 'filled' : 'empty'}`} 
                />
            );
        }
        return stars;
    };

    return (
        <>
            <motion.div
                className="card"
                onMouseMove={handleMove}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                style={{ 
                    transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` 
                }}
                // Staggered entrance animation
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                aria-label={`Product card for ${title}`}
            >
                {/* CATEGORY BADGE */}
                <motion.div
                    className="card-category"
                    style={{ backgroundColor: catColor }}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                >
                    {category}
                </motion.div>

                {/* WISHLIST BUTTON */}
                <button
                    className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
                    onClick={() => toggleWishlist(id)}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <FiHeart fill={isWishlisted ? 'var(--danger)' : 'none'} size={20} />
                </button>

                {/* IMAGE & SKELETON */}
                <div className="card-img-wrapper" onClick={() => setOpen(true)} role="button" tabIndex={0} aria-label={`View details for ${title}`}>
                    {loading && <div className="img-skeleton"></div>}

                    <motion.img
                        src={img}
                        alt={title}
                        ref={imgRef}
                        className={`card-img ${loading ? "hidden" : "visible"}`}
                        onLoad={() => setLoading(false)}
                        // Adjusted hover scale for subtlety
                        whileHover={{ scale: 1.05 }} 
                        transition={{ duration: 0.3 }}
                        draggable="false" // Prevent dragging image on hover
                    />
                </div>

                {/* CONTENT */}
                <div className="card-content">
                    <div className="card-header">
                        <h3 className="card-title">{title}</h3>
                        <span className="price">${price.toFixed(2)}</span>
                    </div>

                    <div className="rating" aria-label={`Rating: ${rating} out of 5 stars`}>
                        {renderRating()}
                    </div>

                    {/* ADD TO CART BUTTON */}
                    <motion.button
                        className="add-btn"
                        whileTap={{ scale: 0.95 }}
                        onClick={addToCart} 
                        aria-label={`Add ${title} to cart`}
                    >
                        <FiShoppingCart size={18} className="add-icon" />
                        Add to Cart
                    </motion.button>
                </div>
            </motion.div>

            {/* MODAL - For Quick View */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="modal-overlay"
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="modal-content"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                        >
                            <img src={img} alt={title} className="modal-img" />
                            {/* In a professional app, this modal should show more details */}
                            <button className="modal-close-btn" onClick={() => setOpen(false)}>X</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}