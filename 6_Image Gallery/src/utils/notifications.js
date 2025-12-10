// src/utils/notifications.js

/**
 * --- Global Notification System (Pub/Sub Pattern) ---
 * Manages notification subscriptions and dispatches notifications globally.
 */

// Array to hold all registered callback functions (listeners)
let listeners = [];

/**
 * Registers a callback function (listener) that will receive notifications.
 * @param {Function} fn - The callback function to execute when a notification is dispatched.
 * @returns {Function} A function to unsubscribe the listener.
 */
export function registerNotification(fn) {
    // Add the function to the listeners array
    listeners.push(fn);

    // Return an unsubscribe function
    return () => {
        listeners = listeners.filter(listener => listener !== fn);
    };
}

/**
 * Dispatches a notification to all registered listeners.
 * @param {'success'|'error'|'info'|'warning'} type - The type of notification.
 * @param {string} message - The message content.
 */
export function notify(type, message) {
    const notification = {
        id: Date.now() + Math.random(), // Unique ID for React keys
        type,
        message,
        timestamp: new Date().toISOString()
    };

    // Dispatch the notification to every registered listener
    listeners.forEach(listener => {
        // Use a short delay if needed, but synchronous is often fine
        listener(notification);
    });
}