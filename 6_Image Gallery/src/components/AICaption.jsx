// src/components/AICaption.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap, FiCopy, FiCheckCircle } from "react-icons/fi";
import { generateCaption } from "../utils/aiCaption";
import { notify } from "../utils/notifications"; // Use the notification utility
import "../style/AICaption.css";

/**
 * AI Caption Generator Component.
 * @param {object} props
 * @param {string} props.img - The URL of the image to analyze.
 */
export default function AICaption({ img }) {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copyState, setCopyState] = useState(null); // 'caption' or 'tags'

    const handleGenerate = async () => {
        if (!img) {
            return notify('warning', 'No image source provided for analysis.');
        }

        setIsLoading(true);
        setResult(null);

        // Simulate API delay for a better user experience
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const ai = generateCaption(img);
        setResult(ai);
        setIsLoading(false);
    };
    
    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopyState(type);
        notify('success', `${type.charAt(0).toUpperCase() + type.slice(1)} copied to clipboard!`);
        
        // Reset copy state after a brief period
        setTimeout(() => setCopyState(null), 1500);
    };

    return (
        <div className="ai-box">
            <h3 className="ai-title"><FiZap size={18} /> AI Auto Caption Generator</h3>

            <motion.button
                className="ai-btn"
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerate}
                disabled={isLoading}
            >
                {isLoading ? (
                    'Analyzing...'
                ) : (
                    'Generate Caption & Tags'
                )}
            </motion.button>

            <AnimatePresence>
                {result && (
                    <motion.div
                        className="ai-result"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* 1. Caption Output */}
                        <div className="caption-output-group">
                            <p className="caption-text">{result.caption}</p>
                            <motion.button
                                className="copy-btn"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleCopy(result.caption, 'caption')}
                                aria-label="Copy caption"
                            >
                                {copyState === 'caption' ? <FiCheckCircle size={18} /> : <FiCopy size={18} />}
                            </motion.button>
                        </div>
                        
                        {/* 2. Tags Output */}
                        <div className="tag-box-group">
                            <div className="tag-box">
                                {result.tags.map((t, i) => (
                                    <span key={i} className="tag-item">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <motion.button
                                className="copy-btn copy-tags-btn"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleCopy(result.tags.join(' '), 'tags')}
                                aria-label="Copy tags"
                            >
                                {copyState === 'tags' ? <FiCheckCircle size={18} /> : <FiCopy size={18} />}
                            </motion.button>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}