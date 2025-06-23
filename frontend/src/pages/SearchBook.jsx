import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../Css/SearchBook.css";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email"); 

  const handleAddToCart = async (book) => {
    if (!email) {
      alert("Please login first.");
      return;
    }

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

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/api/book/search?q=${encodeURIComponent(query)}`);
        setResults(res.data.books);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="search-container">
      <h2 className="search-heading">Search Results for: {query}</h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : results.length === 0 ? (
        <p className="no-result">No such book available at the moment.</p>
      ) : (
        <div className="search-grid">
          {results.map((book, index) => (
            <div key={index} className="search-card">
              <img src={book.image} alt={book.title} />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <p className="book-price">${book.price}</p>


              <button className="cart-button" onClick={() => handleAddToCart(book)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
