import React from "react";
import { FaSearch, FaShoppingCart, FaHome, FaTags, FaUsersSlash } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { MdLibraryBooks, MdHeadphones } from "react-icons/md";
import { BiBookAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <header className="navbar">
        <div className="logo">Bookie</div>

        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-btn"><FaSearch /></button>
        </div>

        <button className="cart-btn">
          <FaShoppingCart className="cart-icon" /> $35.19
        </button>
      </header>

      <nav className="bottom-nav">
        <a href="#" className="nav-item active"><FaHome /> Home</a>
        <a href="#"><IoNewspaperSharp /> New Releases</a>
        <a href="#"><MdLibraryBooks /> Recommendations</a>
        <a href="profile"><FaUserCircle /> Account</a>
        <a href="#" className="sale-item"><FaTags /> SALE</a>
      </nav>
    </>
  );
}
