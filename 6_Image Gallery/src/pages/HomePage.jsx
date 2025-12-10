// src/pages/HomePage.jsx

import React, { useState, useMemo, useEffect, useContext } from "react";
import Masonry from "react-masonry-css";

// Import CartContext
import { CartContext, ProductDataContext } from "../App.jsx";
// Import Utility for adding to cart (must be updated to handle quantity logic)
import { addToCart as addToCartUtility } from "../utils/cart";
import { notify } from "../utils/notifications";

// Component Imports
import Hero from "../components/Hero.jsx";
import FeaturedCarousel from "../components/FeaturedCarousel.jsx";
import SmartSearch from "../components/SmartSearch.jsx";
import CategoryTabs from "../components/CategoryTabs.jsx";
import SortMenu from "../components/SortMenu.jsx";
import Card from "../components/Card.jsx";
import { FiLoader } from "react-icons/fi"; // For the loading spinner
import "../style/HomePage.css";


/**
 * Professional Home Page with filtering, sorting, infinite scroll, and theme logic.
 */
export default function HomePage() {
  // 1. Use Context
  const { cart, setCart } = useContext(CartContext);
  const { allProducts: allData } = useContext(ProductDataContext);

  // 2. Theme State (Local State)
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // 3. Filtering & Sorting States
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [sortType, setSortType] = useState("none");
  const [itemsToShow, setItemsToShow] = useState(6);
  const [wishlist, setWishlist] = useState([]);


  // 4. Filtering + Sorting Logic (Memoized)
  const filteredData = useMemo(() => {
    let result = [...allData];

    // 1. Search Filter
    if (search.trim()) {
      result = result.filter((i) =>
        i.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 2. Category Filter
    if (cat !== "All") {
      result = result.filter((i) => i.category === cat);
    }

    // 3. Sorting
    switch (sortType) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [search, cat, sortType, allData]);


  // 5. Infinite Scroll (Passive Loading)
  useEffect(() => {
    const handleScroll = () => {
      // Check if scroll is near the bottom (300px buffer)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300
      ) {
        // Only load more if there are more items to show
        if (itemsToShow < filteredData.length) {
          setItemsToShow((prev) => prev + 6);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [itemsToShow, filteredData.length]);


  // 6. Action Handlers
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    notify("info", wishlist.includes(id) ? "Removed from Wishlist" : "Added to Wishlist");
  };

  // ADD TO CART (Now using utility that updates the context state)
  const addToCart = (item) => {
    // Use the professional utility function to handle quantity update logic
    const newCart = addToCartUtility(cart, item);
    setCart(newCart);
    notify("success", `${item.title} added to cart!`);
  };

  // 7. Masonry Breakpoints
  const breakpoints = {
    default: 4,
    1400: 3,
    900: 2,
    500: 1,
  };

  const displayedItems = filteredData.slice(0, itemsToShow);
  const hasMore = itemsToShow < filteredData.length;

  return (
    // ⭐ APPLY main-content class for layout offset ⭐
    <div className="homepage main-content">

      {/* THEME TOGGLE (Fixed utility button) */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}>
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <Hero />
      <FeaturedCarousel />

      <div className="product-catalog-controls">
        <SmartSearch search={search} setSearch={setSearch} />
        <CategoryTabs category={cat} setCategory={setCat} />
        <SortMenu sortType={sortType} setSortType={setSortType} />
      </div>

      {/* PRODUCT GRID SECTION */}
      <section className="product-grid-section">
        {displayedItems.length === 0 && (
          <p className="no-results-message">No results found for your filters.</p>
        )}

        <Masonry
          breakpointCols={breakpoints}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {displayedItems.map((item, index) => (
            <Card
              key={item.id}
              item={item} 
              index={index}
              isWishlisted={wishlist.includes(item.id)}
              toggleWishlist={() => toggleWishlist(item.id)}
              addToCart={() => addToCart(item)}
            />
          ))}
        </Masonry>
      </section>

      {/* Infinite Scroll/Load More Indicator */}
      <div className="load-more-indicator">
        {hasMore ? (
          <p className="loading-message">
            <FiLoader className="loading-spinner" /> Loading more items...
          </p>
        ) : (
          displayedItems.length > 0 && (
            <p className="end-of-results">You have reached the end of the catalog.</p>
          )
        )}
      </div>
    </div>
  );
}