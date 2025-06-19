import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/cartTotal.css";

const CartTotal = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:8080/api/book/get-cart", { email });
        setCartItems(res.data.cart || []);
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
      setLoading(false);
    };

    fetchCart();
  }, [email]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleRemove = async (bookId) => {
    setRemovingId(bookId);
    try {
      const res = await axios.post("http://localhost:8080/api/book/remove-from-cart", {
        email,
        bookId,
      });
      setCartItems(res.data.cart);
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item.");
    }
    setRemovingId(null);
  };

  if (loading) {
    return <div className="cart-container"><h3>Loading cart...</h3></div>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-content">
        {cartItems.map((item, idx) => (
          <div key={idx} className="cart-item">
            <img src={item.bookImage} alt={item.bookName} className="cart-item-img" />
            <div className="cart-item-details">
              <h3>{item.bookName}</h3>
              <p>{item.bookId?.Genre || "Unknown Genre"}</p>
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
              <button
                className="remove-item-button"
                onClick={() => handleRemove(item.bookId)}
                disabled={removingId === item.bookId}
              >
                {removingId === item.bookId ? "Removing..." : "❌ Remove"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="cart-footer">
        <div>
          <p>Sub-Total</p>
          <span>{totalItems} items</span>
        </div>
        <h3>${totalPrice.toFixed(2)}</h3>
      </div>
      <button className="checkout-btn">Checkout</button>
    </div>
  );
};

export default CartTotal;
