// src/main.jsx

import React from "react"; // Changed from import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./index.css"; // Global styles
import App from "./App.jsx";

const rootElement = document.getElementById("root");

if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                {/* mode="wait" ensures that the outgoing page finishes its exit animation 
                  before the new page starts its entrance animation.
                */}
                <AnimatePresence mode="wait">
                    <App />
                </AnimatePresence>
            </BrowserRouter>
        </React.StrictMode>
    );
} else {
    // Helpful fallback/error logging if the root element isn't found
    console.error("Failed to find the root element with ID 'root'.");
}