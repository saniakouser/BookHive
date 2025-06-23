import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaHome, FaTags, FaUserCircle } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">Bookie</div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn" type="submit">
            <FaSearch />
          </button>
        </form>

        <button className="cart-btn">
          <a href="/cart"><FaShoppingCart className="cart-icon" /> $35.19</a>
        </button>
      </header>

      <nav className="bottom-nav">
        <a href="/" className="nav-item active"><FaHome /> Home</a>
        <a href="#"><IoNewspaperSharp /> New Releases</a>
        <a href="#"><MdLibraryBooks /> Recommendations</a>
        <a href="/profile"><FaUserCircle /> Account</a>
        <a href="#" className="sale-item"><FaTags /> SALE</a>
      </nav>
    </>
  );
}
