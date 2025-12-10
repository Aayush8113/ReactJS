// src/components/FeaturedCarousel.jsx

import React from "react";
import { motion } from "framer-motion";
import "../style/FeaturedCarousel.css";

const featuredItems = [
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        title: "Golden Valley",
        category: "Nature",
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        title: "Mountain Dream",
        category: "Mountains",
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
        title: "City Horizon",
        category: "City",
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1499002238440-d94be68410b0",
        title: "Forest Canopy",
        category: "Forest",
    },
];

/**
 * Featured Carousel Component - Displays a horizontal strip of highlighted items.
 */
export default function FeaturedCarousel() {
    return (
        <div className="featured-section" aria-label="Featured Products Carousel">
            <h2 className="section-heading">Featured Highlights</h2>
            <div className="carousel-container">
                {featuredItems.map((item, i) => (
                    <motion.div
                        key={item.id}
                        className="carousel-card"
                        // Refined animation for a smoother staggered entrance
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                        role="listitem"
                    >
                        <div className="image-wrapper">
                            <img src={item.img} alt={item.title} className="carousel-img" />
                            <span className="category-label">{item.category}</span>
                        </div>
                        <div className="carousel-content">
                            <h4 className="carousel-title">{item.title}</h4>
                            <span className="view-details-link">View Details →</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}