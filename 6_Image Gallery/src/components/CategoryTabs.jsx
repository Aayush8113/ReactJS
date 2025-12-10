// src/components/CategoryTabs.jsx

import React, { useMemo } from "react";
// FiGrid is a good fallback/generic icon
import { 
    FiGlobe, 
    FiSunrise, 
    FiWind, 
    FiCloud, 
    FiDroplet, 
    FiFeather, 
    FiMap, 
    FiGrid,
    FiZap, // Used for Desert as a stylized choice
    FiHash, // Used for Fields as a pattern/land icon
    FiAperture // A potential replacement for FiMountain
} from "react-icons/fi";
import "../style/CategoryTabs.css";

// Helper function to map category names to icons
const getCategoryIcon = (cat) => {
    // 💡 IMPORTANT: I've replaced FiMountain with FiAperture (or FiLayers, FiSunset, etc.)
    // as FiMountain often is NOT exported directly by react-icons/fi (Feather Icons).
    const iconMap = {
        "All": FiGrid,          // Grid/Structure
        "Nature": FiGlobe,      // Global/World
        "Mountains": FiAperture, // Aperture/Focus (Placeholder for a specific natural feature)
        "Forest": FiSunrise,    // Sunrise/Natural light
        "Desert": FiZap,        // stylized/Hot
        "Ocean": FiDroplet,     // Water/Droplet
        "City": FiMap,          // Map/Location
        "Autumn": FiFeather,    // Feather/Lightness
        "River": FiCloud,       // Clouds/Water cycle
        "Fields": FiHash,       // Pattern/Texture (Placeholder)
        "Snow": FiWind,         // Wind/Weather (Placeholder for snow)
    };
    // Use FiGlobe as the final general fallback
    return iconMap[cat] || FiGrid; 
};

/**
 * Category Tabs Component - Renders clickable buttons for filtering products.
 * Uses useMemo for efficient, stable category list creation.
 */
export default function CategoryTabs({ category, setCategory }) {
    
    // Memoize the stable list of categories
    const cats = useMemo(() => [
        "All", "Nature", "Mountains", "Forest", "Desert",
        "Ocean", "City", "Autumn", "River", "Fields", "Snow",
    ], []);

    return (
        <div className="category-tabs" role="tablist" aria-label="Product Categories">
            {cats.map((c) => {
                const Icon = getCategoryIcon(c);
                const isActive = category === c;

                return (
                    <button
                        key={c}
                        className={`cat-btn ${isActive ? "active" : ""}`}
                        onClick={() => setCategory(c)}
                        role="tab"
                        aria-selected={isActive}
                        tabIndex={isActive ? 0 : -1}
                        aria-controls="product-grid" // Assuming your product list has this ID
                    >
                        <Icon size={16} className="cat-icon" />
                        <span className="cat-text">{c}</span>
                    </button>
                );
            })}
        </div>
    );
}