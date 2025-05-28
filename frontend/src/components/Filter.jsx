import React, { useState ,useEffect} from "react";
import "../Css/Filter.css";
import book1 from "../assets/book3.jpg"
import book4 from "../assets/book4.jpg"
import book5 from "../assets/book5.jpg";
import axios from "axios"
import Book from "./Book";
import CheckBox from "./CheckBox";
import _ from "lodash"

const Filter = () => {
  const [bookData,setbookData]=useState([]);
  useEffect(()=>{
    const res=axios.get("http://localhost:8080/api/book/Allbook");
      res.then(response=>{
        setbookData(response.data)
      })
  },[])
 const[isOpen,setisOpen]=useState({genre:"",setg:false});
 const[isRatingOpen ,setRatingOpen]=useState({ratng:0,setr:false})
 const[isPriceSet ,setIspriceSet]=useState({pricing:"",setp:false})
 const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const genre = [
    "Self-Help",
    "Non-Fiction",
    "Fantasy",
    "Thriller",
    "Science Fiction",
    "History",
    "Mystery",
    "Biography",
    "Romance",
    "Fiction"
];

const Rating=[,'⭐⭐⭐⭐⭐','⭐⭐⭐⭐','⭐⭐⭐','⭐⭐','⭐'];
const price=["low to high","high to low"];
const categories=[ "Science Fiction","History", "Mystery", "Romance"]
function HandleGenreChange(){
setRatingOpen({ratng:0,setr:false});
setIspriceSet({pricing:"",setp:false});
 setisOpen((prev)=>({
  ...prev,
  setg:!prev.setg
 }))
}
function HandleRatingChange(){
  setisOpen({genre:"",setg:false});
  setIspriceSet({pricing:"",setp:false});
  setRatingOpen((prevState) => ({
    ...prevState,
    setr: !prevState.setr, 
  }));
 
}
function SetPrice(){
  setisOpen({genre:"",setg:false});
  setRatingOpen({ratng:0,setr:false});
  setIspriceSet((prev)=>({
    ...prev,
    setp:!prev.setp
  }));
}
function handleInputChange(e) {
  let filter = e.target.id;
  let filter_by = e.target.name;
  setSelectedCheckbox(filter)
  if (filter === "Genre") {
    setisOpen((prev) => ({
      ...prev,
      genre: filter_by,
    }));
    let filter_book = bookData.filter((book) => book.Genre === filter_by);
    setbookData(filter_book);
  } 
  else if (filter === "Reviews") {
     let len=filter_by.length;
     setRatingOpen((prevState) => ({
      ...prevState,
      ratng: len, 
    }));
    let filter_book = bookData.filter((book) => book.Reviews === len);
    console.log(filter,filter_by,filter_book)
    setbookData(filter_book);
  } 
  else if (filter === "Price") {
    let sortedBooks = [...bookData]; 
    if (filter_by === "low-to-high") {
      sortedBooks.sort((a, b) => a.Price - b.Price);
    } 
    else if (filter_by === "high-to-low") {
      sortedBooks.sort((a, b) => b.Price - a.Price);
    }
    setbookData(sortedBooks);
  }
}
  return (
    <div className="main-container">
      <div className="filter-container">
        <h3>Filter</h3>
        <div className="filter-section">
        <div className="filter-category">
        <label htmlFor="genre">Genre</label>
         <span onClick={HandleGenreChange} className="dropdown-icon">
        ▼
      </span>
      <div className={isOpen.setg ? "child-category open" : "child-category"}>
    {isOpen.setg &&
    genre.map((g, index) => <CheckBox id={"Genre"} key={index} title={g} handleInputChange={handleInputChange}  selectedCheckbox={selectedCheckbox}/>)}
    </div>
    </div>
    <div className="filter-category">
        <label htmlFor="Reviews">Rating</label>
         <span onClick={HandleRatingChange} className="dropdown-icon">
        ▼
      </span>
      <div className={isRatingOpen.setr? "child-category open" : "child-category"}>
    {isRatingOpen.setr &&
    Rating.map((r, index) => <CheckBox id={"Reviews"} key={index} title={r} handleInputChange={handleInputChange}  selectedCheckbox={selectedCheckbox}/>)}
    </div>
    </div>
    <div className="filter-category">
        <label htmlFor="Price">Price</label>
         <span onClick={SetPrice} className="dropdown-icon">
        ▼
      </span>
      <div className={isPriceSet.setp ? "child-category open" : "child-category"}>
    {isPriceSet.setp &&
    price.map((p, index) => <CheckBox id={"Price"}   key={index} title={p} handleInputChange={handleInputChange}  selectedCheckbox={selectedCheckbox}/>)}
    </div>
    </div>
        </div>
      </div>


       <div className="books-container">
        <div className="categories">
          {categories.map((category, index) => (
            <button key={index} className="category-button">
              {category}
            </button>
          ))}
        </div> 
         <div className="books-grid">
           
          { bookData.slice(0, 6).map((book, index) => (
           <Book index={index} book={book} />
          ))}
        </div> 
       </div> 
    </div>
  );
};

export default Filter;
