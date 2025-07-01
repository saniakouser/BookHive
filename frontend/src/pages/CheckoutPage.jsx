import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const amount = location.state?.amount;

  useEffect(() => {
    if (!amount) {
      alert("No amount provided");
      navigate("/cart");
    }
  }, [amount, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Check internet connection.");
      return;
    }

    try {
      const { data: order } = await axios.post("http://localhost:8080/api/payment/create-order", {
        amount: Math.round(amount * 83), 
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Bookie Store",
        description: "Book Purchase",
        order_id: order.id,
        handler: function (response) {
          alert("✅ Payment Successful");
          console.log("Payment ID:", response.razorpay_payment_id);
          console.log("Order ID:", response.razorpay_order_id);
          console.log("Signature:", response.razorpay_signature);
          navigate("/profile");
        },
        prefill: {
          email: email || "",
          name: "Bookie User",
        },
        theme: {
          color: "#00d4ff",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Ready to Checkout?</h2>
      <h3 className="checkout-amount">Total Payable: ₹{amount*83}</h3>
      <button className="pay-btn" onClick={handlePayment}>
        Proceed to Pay
      </button>
    </div>
  );
};

export default CheckoutPage;
