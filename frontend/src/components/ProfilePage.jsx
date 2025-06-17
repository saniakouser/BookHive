import React from "react";
import "../Css/ProfilePage.css";

const ProfilePage = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: {
      state: "California",
      city: "Los Angeles",
      pincode: "90001",
    },
    orders: [
      { id: 1, item: "Red Dress", date: "2024-03-20", status: "Delivered" },
      { id: 2, item: "Makeup Kit", date: "2024-03-18", status: "Shipped" },
      { id: 3, item: "High Heels", date: "2024-03-15", status: "Processing" },
    ],
  };

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
          <p><strong>State:</strong> {user.address.state}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>Pincode:</strong> {user.address.pincode}</p>
          <div className="button-group">
            <button className="btn">Change Address</button>
            <button className="btn">Change Password</button>
          </div>
        </div>
      </div>

      <h3 className="order-title">Order History</h3>
      <ul className="order-list">
        {user.orders.map((order) => (
          <li key={order.id} className="order-item">
            <div className="order-details">
              <strong>{order.item}</strong>
              <span className="order-date">{order.date}</span>
            </div>
            <span className={`order-status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
