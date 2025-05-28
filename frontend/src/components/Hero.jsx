import {useState,useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Css/hero.css";
import book1 from "../assets/book3.jpg"
import book4 from "../assets/book4.jpg"
import book5 from "../assets/book5.jpg"
import axios from "axios";


const Hero = () => {
  const[cardData,setCardData]=useState([]);
  useEffect(()=>{
    const res=   axios.get("http://127.0.0.1:5001/");
    res.then(response => {
         setCardData(response.data) 
    }).catch(error => {
        console.error("Error:", error);
    });
    
  },[])
 if(cardData.length===0){
  return <p>"something is cooking"</p>
 }
 let books=[cardData[0],cardData[1],cardData[2]];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="hero-container">
      <h2 className="hero-title">Our Best Sellers</h2>
      <Slider {...settings} className="slider">

      {books.map((book) => (
    <div key={book} className="slide">
    <img src={book["Image-URL-M"]} alt={book["Book-Author"]} className="slide-image" />
    <div className="slide-content">
      <h3 className="book-title">{book["Book-Title"]?.split(" ").slice(0, 4).join(" ")}</h3>
      <h2 className="book-author">{book["Book-Author"]?.split(" ").slice(0, 4).join(" ")}</h2>
      <button className="learn-more" >Buy Now</button>
    </div>
  </div>
))}

      </Slider>
    </div>
  );
};

 export default Hero

