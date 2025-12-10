// src/components/SmartSearch.jsx

import React, { useState, useEffect, useRef, useCallback, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi"; // Professional icons
import { ProductDataContext } from "../App.jsx"; // Import the Context
import "../style/SmartSearch.css";

// Helper component for highlighting search results
const SuggestionHighlight = ({ text, highlight }) => {
    if (!highlight) return <span>{text}</span>;

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <strong key={i} className="highlight">{part}</strong>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

/**
 * Smart Search Component with Autocomplete and Trending Tags.
 * Data is consumed globally via ProductDataContext.
 */
export default function SmartSearch({ search, setSearch }) { // allData prop removed
    // Get data from Context
    const { allProducts } = useContext(ProductDataContext);

    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef(null);

    // FIX: Safely access allProducts (guaranteed array from Context)
    const dataToUse = allProducts || [];

    // ⭐ FIX: Use useMemo to stabilize allTitles and allCategories
    // This prevents the infinite render loop.
    const allTitles = useMemo(() => {
        return dataToUse.map((i) => i.title);
    }, [dataToUse]); 

    const allCategories = useMemo(() => {
        return [...new Set(dataToUse.map((i) => i.category))];
    }, [dataToUse]);
    
    const trendingTags = ["Nature", "Mountains", "City", "Ocean", "New"];

    // 1. Suggestion Logic (Now stable due to useMemo)
    useEffect(() => {
        if (!search.trim()) {
            setSuggestions([]);
            return;
        }

        const query = search.toLowerCase();
        const matched = new Set();

        // Match Titles
        allTitles.forEach((t) => {
            if (t.toLowerCase().includes(query)) matched.add(t);
        });

        // Match Categories
        allCategories.forEach((c) => {
            if (c.toLowerCase().includes(query)) matched.add(c);
        });

        setSuggestions(Array.from(matched).slice(0, 7));
    }, [search, allTitles, allCategories]); // Dependencies are now stable!


    // 2. Click Outside Handler (To close suggestions)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 3. Action Handlers (Wrapped in useCallback in the complete file)
    const handleTagClick = useCallback((tag) => {
        setSearch(tag);
        setIsFocused(false);
    }, [setSearch]);

    const handleSuggestionSelect = useCallback((suggestion) => {
        setSearch(suggestion);
        setIsFocused(false);
    }, [setSearch]);

    const handleClearSearch = () => {
        setSearch('');
        setSuggestions([]);
    };

    return (
        <div
            className={`smart-search-container ${isFocused ? 'is-active' : ''}`}
            ref={containerRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => { /* Delay blur to allow clicks on suggestions */ }}
        >
            <div className="search-input-wrapper">
                <FiSearch className="search-icon" size={20} />

                <motion.input
                    type="text"
                    className="smart-input"
                    placeholder="Search images, categories, products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    whileFocus={{ scale: 1 }}
                    aria-label="Search product catalog"
                />

                {/* Clear Button */}
                {search && (
                    <motion.button
                        className="clear-btn"
                        onClick={handleClearSearch}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-label="Clear search"
                    >
                        <FiX size={20} />
                    </motion.button>
                )}
            </div>

            {/* Suggestions/Trending Tags Area */}
            {isFocused && (suggestions.length > 0 || !search.trim()) && (
                <AnimatePresence>
                    <motion.div
                        className="search-dropdown"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {suggestions.length > 0 && search.trim() ? (
                            /* --- Suggestions List --- */
                            <ul className="smart-suggestions">
                                {suggestions.map((s, i) => (
                                    <li
                                        key={i}
                                        className="suggestion-item"
                                        onMouseDown={() => handleSuggestionSelect(s)}
                                        tabIndex={0}
                                    >
                                        {/* Highlight the matching text */}
                                        <SuggestionHighlight text={s} highlight={search} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            /* --- Trending Tags when input is empty --- */
                            <div className="smart-tags-section">
                                <span className="tags-label">Popular Searches:</span>
                                <div className="smart-tags">
                                    {trendingTags.map((t, i) => (
                                        <motion.span
                                            key={i}
                                            className="smart-tag"
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => handleTagClick(t)}
                                        >
                                            {t}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}