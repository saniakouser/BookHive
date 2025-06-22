import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post("http://localhost:8080/auth/get-user", { email });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [email]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Account</h2>

      <div className="profile-section">
        <div className="profile-card">
          <h3 className="section-title">User Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="profile-card">
          <h3 className="section-title">Shipping Address</h3>
          <p><strong>State:</strong> {user.Address?.State || "Not Provided"}</p>
          <p><strong>District:</strong> {user.Address?.District || "Not Provided"}</p>
          <p><strong>Pin Code:</strong> {user.Address?.PinCode || "Not Provided"}</p>
          <div className="button-group">
            <button className="btn">Change Address</button>
            <button className="btn">Change Password</button>
          </div>
        </div>
      </div>

      <div className="extras">
        <button onClick={() => setShowCart(true)} className="toggle-btn">📚 View Cart Books</button>
        <button onClick={() => setShowHistory(true)} className="toggle-btn">🕘 View Purchase History</button>
      </div>

      {showCart && (
        <div className="popup-overlay" onClick={() => setShowCart(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-btn" onClick={() => setShowCart(false)}>&times;</button>
            <h3>Books in Cart</h3>
            {user.cart.length === 0 ? (
              <p>No books in cart.</p>
            ) : (
              <ul>
                {user.cart.map((item, index) => (
                  <li key={index} className="popup-item">
                    <img src={item.bookImage} alt={item.bookName} className="popup-img" />
                    <div>
                      <strong>{item.bookName}</strong>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {showHistory && (
        <div className="popup-overlay" onClick={() => setShowHistory(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-btn" onClick={() => setShowHistory(false)}>&times;</button>
            <h3>Purchased Books</h3>
            {user.history.length === 0 ? (
              <p>No purchase history yet.</p>
            ) : (
              <ul>
                {user.history.map((book, index) => (
                  <li key={index} className="popup-item">
                    <img src={book.image} alt={book.Title} className="popup-img" />
                    <div>
                      <strong>{book.Title}</strong>
                      <p>Author: {book.Author}</p>
                      <p>Price: ${book.Price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
