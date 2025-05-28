import React from "react";
import "../Css/singleProduct.css";
import bookMain from "../assets/book5.jpg"; // Replace with actual image
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import book3 from "../assets/book3.jpg";
import book4 from "../assets/book4.jpg";

const SingleProduct = () => {
  const reviews = [
    { id: 1, text: '"A thrilling read from start to finish!" - Emily Johnson' },
    { id: 2, text: '"Couldn\'t put it down, a masterpiece of storytelling." - Michael Brown' },
    { id: 3, text: '"A journey worth taking, absolutely loved it!" - Sarah Lee' },
  ];

  const relatedProducts = [
    { id: 1, title: "Mystic Lands", price: "$14.99", img: book1 },
    { id: 2, title: "Journey to the Unknown", price: "$18.99", img: book2 },
    { id: 3, title: "Explorer's Quest", price: "$16.50", img: book3 },
    { id: 4, title: "Beyond the Horizon", price: "$20.00", img: book4 },
  ];

  return (
    <div className="single-product-container">
      {/* Product Section */}
      <div className="product-details">
        <img src={bookMain} alt="The Great Adventure" className="product-image" />
        <div className="product-info">
          <h1 className="product-title">The Great Adventure</h1>
          <p className="product-author">by John Smith</p>
          <p className="product-price">$19.99</p>
          <p className="product-description">
            Join the thrilling journey of discovery and excitement in "The Great Adventure," 
            a novel that takes you through uncharted territories and mystical lands. 
            Perfect for fans of epic tales and storytelling.
          </p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="customer-reviews">
        <h2>Customer Reviews</h2>
        <div className="review-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              {review.text}
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-list">
          {relatedProducts.map((product) => (
            <div key={product.id} className="related-item">
              <img src={product.img} alt={product.title} className="related-image" />
              <p className="related-title">{product.title}</p>
              <p className="related-price">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
