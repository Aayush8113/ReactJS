// src/utils/productStore.js

/**
 * --- LocalStorage Product Management Utility ---
 * Provides CRUD operations for product data stored in localStorage.
 */

const KEY = "products-db";

/**
 * Helper function to safely retrieve all products from localStorage.
 * @returns {Array<Object>} The array of products, or an empty array if none exist or parsing fails.
 */
function getProducts() {
    try {
        const data = localStorage.getItem(KEY);
        // Ensure data is not null and is valid JSON
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error loading products from localStorage:", error);
        return [];
    }
}

/**
 * Helper function to safely save the product array to localStorage.
 * @param {Array<Object>} products - The array of product objects to save.
 */
function setProducts(products) {
    try {
        localStorage.setItem(KEY, JSON.stringify(products));
    } catch (error) {
        console.error("Error saving products to localStorage:", error);
        // Optionally notify the user about the storage failure here
    }
}

/**
 * Public function to load products.
 * @returns {Array<Object>}
 */
export function loadProducts() {
    return getProducts();
}

/**
 * Public function to add a new product.
 * @param {Object} newProd - The product object to add. Must contain necessary fields (id, title, price, etc.).
 */
export function addProduct(newProd) {
    const data = getProducts();
    // Use the spread operator for immutable addition
    const newData = [...data, newProd];
    setProducts(newData);
}

/**
 * Public function to update an existing product.
 * @param {number|string} id - The ID of the product to update.
 * @param {Object} updatedFields - The product object containing the updated data.
 */
export function updateProduct(id, updatedFields) {
    const data = getProducts();
    
    // Perform an immutable update
    const newData = data.map(p => {
        if (p.id === id) {
            // Merge existing data with the updated fields, preserving original properties not in updatedFields
            return { ...p, ...updatedFields };
        }
        return p;
    });

    setProducts(newData);
}

/**
 * Public function to delete a product.
 * @param {number|string} id - The ID of the product to delete.
 */
export function deleteProduct(id) {
    const data = getProducts();
    // Perform an immutable deletion
    const newData = data.filter(p => p.id !== id);
    setProducts(newData);
}

/**
 * Public function to clear all products (for testing/reset).
 */
export function clearAllProducts() {
    localStorage.removeItem(KEY);
}