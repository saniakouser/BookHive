import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "../Css/login.css";

const Login = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function HandleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  async function HandleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user); 
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred");
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={HandleSubmit}>
        <input
          onChange={HandleChange}
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <input
          onChange={HandleChange}
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
