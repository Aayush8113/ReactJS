import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    const removeFromCart = (index) => {
        const newCart = [...cartItems];
        newCart.splice(index, 1);
        setCartItems(newCart);
    };

    return (
        <div>
            <h1>Simple React Cart</h1>
            <div className="container">
                <div className="product-list">
                    <ProductList addToCart={addToCart} />
                </div>
                <div className="cart">
                    <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
                </div>
            </div>
        </div>
    );
};

export default App;
