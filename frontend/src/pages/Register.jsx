import { useState } from "react";
import { FaBook } from "react-icons/fa";
import axios from "axios";
import "../Css/register.css";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  function HandleChange(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/register", userInfo);
      console.log("Registration Success:", res.data);
      alert("Registration Successful");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="register-container">
      <div className="logo">
        <FaBook className="book-icon" />
        <h1>BookHive</h1>
      </div>
      <h2>Register</h2>
      <form onSubmit={HandleSubmit}>
        <input
          onChange={HandleChange}
          type="text"
          name="name"
          placeholder="UserName"
          required
        />
        <input
          onChange={HandleChange}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          onChange={HandleChange}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;
