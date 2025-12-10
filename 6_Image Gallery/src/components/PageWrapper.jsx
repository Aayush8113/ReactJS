// src/components/PageWrapper.jsx

import React from "react";
import { motion } from "framer-motion";

/**
 * PageWrapper component handles global page transitions and dynamic content sizing.
 * @param {object} props
 * @param {React.ReactNode} props.children - The page content to wrap.
 * @param {boolean} props.isAdmin - Flag to apply special styling for admin pages.
 * @param {boolean} props.isAuth - Flag to apply special styling for auth pages.
 */
export default function PageWrapper({ children, isAdmin, isAuth }) {
    
    // Define the animation variants for the page transition
    const pageTransitionVariants = {
        initial: { 
            opacity: 0, 
            y: isAuth ? 0 : 40, // Prevent vertical motion on auth pages for a static feel
            scale: isAuth ? 0.98 : 1, // Subtle scale down on auth pages
            filter: "blur(6px)" 
        },
        animate: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            filter: "blur(0px)" 
        },
        exit: { 
            opacity: 0, 
            y: -40, 
            scale: 1,
            filter: "blur(6px)" 
        }
    };

    // Use a dynamic class for easy CSS targeting
    const wrapperClass = `page-wrapper ${isAdmin ? 'page-wrapper-admin' : ''} ${isAuth ? 'page-wrapper-auth' : ''}`;

    return (
        <motion.main
            className={wrapperClass}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            // Adjusted transition duration for a slightly snappier feel
            transition={{ type: "tween", duration: 0.45 }} 
            role="main"
        >
            {children}
        </motion.main>
    );
}

// NOTE: You don't need a separate CSS file for this if you use the classnames in App.css 
// to define the padding/margin required for the header/sidebar.