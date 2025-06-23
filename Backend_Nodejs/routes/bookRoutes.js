const express = require('express');
const { getBook, addToCart, getCartProduct, removeFromCart , searchBookByTitle} = require('../controller/Order');

const bookRouter = express.Router();

// Get all books
bookRouter.get('/Allbook', getBook);

// Add to cart
bookRouter.post('/add-to-cart', addToCart);

// Get cart books
bookRouter.post("/get-cart", getCartProduct);

// Remove from cart
bookRouter.post("/remove-from-cart", removeFromCart);

// search Book
bookRouter.get("/search", searchBookByTitle);

module.exports = bookRouter;
