import React from 'react';
import axios from 'axios';
import "../Css/book.css";

export default function Book({ index, book, HandleChange }) {
  const email = localStorage.getItem("email");

  const handleAddToCat = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/book/add-to-cart", {
        email: email,
        bookId: book._id,
        quantity: 1
      });

      alert("Book added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add to cart.");
    }
  };

  return (
    <div onClick={HandleChange} key={index} className="book-card">
      <img src={book.image} alt={book.Title} className="book-image" />
      <p className="book-title">{book.Title}</p>
      <p className="book-title">{book.Author}</p>
      <p className="book-title">{"⭐".repeat(Math.floor(book.Reviews))}</p>
      <p className="book-Genre">{book.Genre}</p>
      <p className="book-price">${book.Price}</p>
      <button onClick={(e) => { e.stopPropagation(); handleAddToCat(); }}>
        Add to Cart
      </button>
    </div>
  );
}
