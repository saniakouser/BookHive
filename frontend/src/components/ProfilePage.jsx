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
      <h2 className="profile-title">Profile</h2>
      <div className="profile-section">
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="profile-address">
          <p><strong>State:</strong> {user.address.state}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>Pincode:</strong> {user.address.pincode}</p>
          <button className="btn">Change Address</button>
          <button className="btn">Change Password</button>
        </div>
      </div>
      
      <h3 className="order-title">Order History</h3>
      <ul className="order-list">
        {user.orders.map((order) => (
          <li key={order.id} className="order-item">
            <strong>{order.item}</strong> - {order.date} (<span className="order-status">{order.status}</span>)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;