 import React from 'react'
 import "../Css/book.css"
 export default function Book({index,book,HandleChange}) {
   return (
    <div onClick={HandleChange} key={index} className="book-card">
    <img src={book.image} alt={book.Title} className="book-image" />
    <p className="book-title">{book.Title}</p>
    <p className="book-title">{book.Author}</p>
    <p className="book-title">{"⭐".repeat(Math.floor(book.Reviews))}</p>
    <p className="book-Genre">{book.Genre}</p>
    <p className="book-price">${book.Price}</p>
  </div>
   )
 }
 