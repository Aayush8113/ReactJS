import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <>
            <h2>Cart</h2>
            {cartItems.length === 0 && <p>Cart is empty</p>}
            {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="info">
                        <span>{item.name} - ${item.price}</span>
                        <button onClick={() => removeFromCart(index)}>❌ Remove</button>
                    </div>
                </div>
            ))}
            <div className="total">Total: ${total}</div>
        </>
    );
};

export default Cart;
