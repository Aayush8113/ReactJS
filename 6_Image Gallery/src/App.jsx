// src/App.jsx

import React, { useState, useEffect, createContext, useContext, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// --- System & Layout Components ---
import PageWrapper from "./components/PageWrapper.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Notification from "./components/Notification.jsx";
import MiniCart from "./components/MiniCart.jsx";

// --- Pages ---
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminProductsPage from "./pages/AdminProductsPage.jsx"; 

import "./App.css";

// --- GLOBAL PRODUCT DATA (Lifted from HomePage.jsx to be shared) ---
// This is the source of truth for the global product catalog.
const GLOBAL_MOCK_PRODUCTS = [
    { id: 1, category: "Nature", title: "Sunset Vista", rating: 4, price: 39.99, img: "https://static.vecteezy.com/...jpg", quantity: 1 },
    { id: 2, category: "Mountains", title: "Mountain Peak", rating: 5, price: 59.99, img: "https://static.vecteezy.com/...jpg", quantity: 1 },
    { id: 3, category: "Forest", title: "Forest Trail", rating: 3, price: 24.99, img: "https://static.vecteezy.com/...jpg", quantity: 1 },
    { id: 4, category: "Desert", title: "Desert Dunes", rating: 4, price: 45.0, img: "https://static.vecteezy.com/...jpg", quantity: 1 },
    { id: 5, category: "Ocean", title: "Ocean Waves", rating: 5, price: 52.5, img: "https://static.vecteezy.com/...jpg", quantity: 1 },
    { id: 6, category: "City", title: "City Lights", rating: 4, price: 49.99, img: "https://static.vecteezy.com/...jpg", quantity: 1 },
    { id: 7, category: "Autumn", title: "Autumn Leaves", rating: 3, price: 29.99, img: "https://static.vecteezy.com/...jpg", quantity: 1 },
    { id: 8, category: "River", title: "River Bend", rating: 4, price: 34.75, img: "https://static.vecteezy.com/...jpg", quantity: 1 },
    { id: 9, category: "Fields", title: "Lavender Fields", rating: 5, price: 49.5, img: "https://static.vecteezy.com/...jpg", quantity: 1 },
    { id: 10, category: "Snow", title: "Snowy Cabin", rating: 4, price: 65.0, img: "https://static.vecteezy.com/...jpg", quantity: 1 },
];


// --- 1. CONTEXTS SETUP ---
export const CartContext = createContext();
export const ProductDataContext = createContext(); 


// --- CART PROVIDER ---
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); 

    useEffect(() => {
        console.log("Cart Updated:", cart);
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

// --- ⭐ CLEANED PRODUCT DATA PROVIDER ---
const ProductDataProvider = ({ children }) => {
    // The products are loaded here. Since they are currently static/mocked, 
    // we use useMemo to expose them as a stable value.
    const allProducts = GLOBAL_MOCK_PRODUCTS; 

    // We only memoize the context object itself, relying on the constant nature of allProducts.
    const contextValue = useMemo(() => ({
        allProducts,
        // If product changes were later managed via admin forms, 
        // a useState hook and setter would be re-introduced here.
    }), [allProducts]); 

    return (
        <ProductDataContext.Provider value={contextValue}>
            {children}
        </ProductDataContext.Provider>
    );
};


// --- 2. Main App Component ---
export default function App() {
    const location = useLocation();
    
    // Check if the current route is an admin route
    const isAdminRoute = location.pathname.startsWith("/admin");
    const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

    return (
        <CartProvider>
            {/* Wrap the rest of the app in the new Product Data Provider */}
            <ProductDataProvider> 
                {/* System UI - Should always be visible */}
                <Notification /> 
                
                {/* MiniCart - Only visible on non-admin pages */}
                {!isAdminRoute && <MiniCart />} 

                {/* Global Layout Components (Conditionally Rendered) */}
                {!isAdminRoute && (
                    <>
                        <Header />
                        <Sidebar />
                    </>
                )}

                {/* Animated Page Transitions */}
                <PageWrapper key={location.pathname} isAdmin={isAdminRoute} isAuth={isAuthRoute}>
                    <Routes location={location}>
                        {/* Public & User Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        
                        {/* Admin Routes */}
                        {/* NOTE: You'll want to add an AuthGuard component wrapper here */}
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/admin/products" element={<AdminProductsPage />} />
                        {/* Add other admin routes */}
                    </Routes>
                </PageWrapper>

                {/* Footer - Only visible on non-admin pages */}
                {!isAdminRoute && <Footer />}
            </ProductDataProvider>
        </CartProvider>
    );
}