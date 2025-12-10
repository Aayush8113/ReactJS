// src/components/Hero.jsx

import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi"; // Icon for the button
import { useNavigate } from "react-router-dom"; // Use navigate for cleaner routing
import "../style/Hero.css";

/**
 * Hero Component - The main introductory section of the homepage.
 */
export default function Hero() {
    const navigate = useNavigate();
    
    // Animation variants for staggered entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };
    
    const handleExplore = () => {
        // Example action: scroll to the product list section
        // or navigate to a main products page
        navigate('/'); 
        document.getElementById('product-catalog').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" 
            as={motion.section} 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-label="Hero Section: Explore Stunning Visuals"
        >
            <motion.h1
                className="hero-title"
                variants={itemVariants}
            >
                Explore Stunning Premium Visuals
            </motion.h1>

            <motion.p
                className="hero-subtitle"
                variants={itemVariants}
            >
                Browse high-resolution, curated images across nature, cities, mountains, and more.
            </motion.p>

            <motion.button
                className="hero-btn"
                variants={itemVariants}
                onClick={handleExplore}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.98 }}
            >
                Start Exploring 
                <FiArrowRight size={20} style={{ marginLeft: '8px' }} />
            </motion.button>
        </section>
    );
}