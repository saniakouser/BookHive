import React from "react";
import "../Css/cartTotal.css";
import book1 from "../assets/book3.jpg"
import book4 from "../assets/book4.jpg"

const CartTotal = () => {
  const cartItems = [
    {
      id: 1,
      name: "Apple Juice",
      size: "250ml",
      price: 2.99,
      quantity: 2,
      img: book1, 
    },
    {
      id: 2,
      name: "Grapes Juice",
      size: "250ml",
      price: 3.19,
      quantity: 1,
      img: book4
    },
  ];

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-content">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.name} className="cart-item-img" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>{item.size}</p>
              <span className="veg-indicator">🟢</span>
            </div>
            <div className="cart-quantity">
              <button className="quantity-btn">+</button>
              <span>{item.quantity}</span>
              <button className="quantity-btn">-</button>
            </div>
            <p className="cart-item-price">${item.price.toFixed(2)}</p>
            <div className="cart-item-actions">
              <p className="save-later">Save for later</p>
              <p className="remove-item">Remove</p>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="cart-footer">
        <div>
          <p>Sub-Total</p>
          <span>2 items</span>
        </div>
        <h3>$6.18</h3>
      </div>
      <button className="checkout-btn">Checkout</button>
    </div>
  );
};

export default CartTotal;
