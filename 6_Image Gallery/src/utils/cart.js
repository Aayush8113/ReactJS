// src/utils/cart.js

/**
 * Adds an item to the cart. If the item already exists, it increments the quantity.
 * @param {Array<Object>} currentCart - The current state of the cart array.
 * @param {Object} itemToAdd - The item object to add (should include id, price, title, img).
 * @returns {Array<Object>} The new state of the cart.
 */
export function addToCart(currentCart, itemToAdd) {
    const existingItem = currentCart.find(item => item.id === itemToAdd.id);

    if (existingItem) {
        // Item exists: Increase quantity
        return currentCart.map(item =>
            item.id === itemToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        // Item is new: Add to cart with quantity 1
        return [...currentCart, { ...itemToAdd, quantity: 1 }];
    }
}

/**
 * Removes an item completely from the cart by its ID.
 * @param {Array<Object>} currentCart - The current state of the cart array.
 * @param {number} itemId - The ID of the item to remove.
 * @returns {Array<Object>} The new state of the cart.
 */
export function removeItemFromCart(currentCart, itemId) {
    return currentCart.filter(item => item.id !== itemId);
}

/**
 * Updates the quantity of a specific item in the cart.
 * If the quantity drops to 0 or below, the item is removed.
 * @param {Array<Object>} currentCart - The current state of the cart array.
 * @param {number} itemId - The ID of the item to update.
 * @param {number} change - The change in quantity (e.g., +1 or -1).
 * @returns {Array<Object>} The new state of the cart.
 */
export function updateItemQuantity(currentCart, itemId, change) {
    const updatedCart = currentCart.map(item => {
        if (item.id === itemId) {
            // Calculate the new quantity
            const newQuantity = item.quantity + change;
            return { ...item, quantity: newQuantity };
        }
        return item;
    });

    // Remove item if quantity is zero or less
    return updatedCart.filter(item => item.quantity > 0);
}

// Optional: Function to clear the entire cart
export function clearCart() {
    return [];
}