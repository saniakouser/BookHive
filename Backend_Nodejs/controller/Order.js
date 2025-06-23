 
 const {Book}=require("../models/Book.js");
 const User=require("../models/User.js")

 // ! GET BOOK

   const getBook= async(req,res)=>{
   try{
    let book= await Book.find({});
    res.status(200).json(book)
   }
   catch(err){
     console.log(err);
     res.status(500).json({message:"No books found"});
   }
  }

 // ! SEARCH book by title (used in frontend search page)
  const searchBookByTitle = async (req, res) => {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    try {
      const books = await Book.find({
        Title: { $regex: query, $options: 'i' }
      });

      const formattedBooks = books.map(b => ({
        _id: b._id,
        title: b.Title,
        author: b.Author,
        price: b.Price,
        image: b.image
      }));

      res.status(200).json({ books: formattedBooks });
    } catch (err) {
      console.error("Error in searchBookByTitle:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

   
 
 // ! add to cart
  const addToCart = async (req, res) => {
    const { bookId, quantity, email } = req.body;

    if (!email || !bookId || !quantity) {
      return res.status(400).json({ message: "Missing email, bookId, or quantity" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const book = await Book.findById(bookId);
      if (!book) return res.status(404).json({ message: "Book not found" });

      const existingItem = user.cart.find(item => item.bookId.toString() === bookId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        user.cart.push({
          bookId: book._id,
          bookName: book.Title,
          bookImage: book.image,
          quantity: quantity,
          price: book.Price * quantity
        });
      }

      await user.save();
      res.status(200).json({ message: "Book added to cart successfully", cart: user.cart });
    } catch (err) {
      console.error("Error in addToCart:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };


 // ! remove from cart
 
 const removeFromCart = async (req, res) => {
  const { email, bookId } = req.body;

  if (!email || !bookId) {
    return res.status(400).json({ message: "Missing email or bookId" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(item => item.bookId.toString() !== bookId);
    await user.save();

    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (err) {
    console.error("Error in removeFromCart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

 // ! get cart product
  const getCartProduct = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing email" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ cart: user.cart });
    } catch (err) {
      console.error("Error in getCartProduct:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

   
 //^ add to history
   const add_to_history= async(req,res)=>{
      const {BookId,email}=req.body
      let findBook=Book.find({BookId});
       let history_book={
        BookId:findBook[0].BookId,
        bookName:findBook[0].Title,
        bookAuthor:findBook[0].Author,
        bookImage:findBook[0].image,
        price:findBook[0].price
       }
       let existing_user= await User.findOne({email});
          if(!existing_user){
           return res.status(400).json({"message":"user  doesnot exist"});
          }
          else{
             let history_data=existing_user[0].cart;
              let updated_history=[...history_data,history_book]
             const updatedHist= await User.findByIdAndUpdate(
                 email,
                { $set: {history:updated_history }},
                { new: true, runValidators: true }
              );
              return updatedHist;
          }
   }
  
   
 

 //^ delete from history
  
  const del_history=async(req,res)=>{
    let {email,BookId}=req.body;
    let existingUser= await User.findOne({email});
    if(!existingUser){
     return res.status(400).json({"message":"user  doesnot exist"});
    }
    else{
        let HistoryData = existingUser[0].History;
         if(HistoryData.length==0){
          return res.status(400).status({message:"history is already empty"})
         }
        HistoryData = HistoryData.filter(item => item.BookId !== BookId);
    
        const updatedHistory = await User.findByIdAndUpdate(
            email,
            { $set: { History: HistoryData } },
            { new: true, runValidators: true }
        );
        
        return updatedHistory;
 }
  }

   const addReview= async(req,res)=>{
   let{bookId,email}=req.body;
   let existingUser= await User.findOne({email});
   if(!existingUser){
    return res.status(400).json({message:"user  doesnot exist"});
   }
   let findBook=Book.find({bookId});
    let updated_review=[...findBook[0].Reviews,email];
    const updatedReview= await Book.findByIdAndUpdate(
      email,
     { $set: {Reviews:updated_review}},
     { new: true, runValidators: true }
   );
   return updated_review;
   }

   const DeleteReview=async(req,res)=>{
    let{bookId,email}=req.body;
   let existingUser= await User.findOne({email});
   if(!existingUser){
    return res.status(400).json({message:"user  doesnot exist"});
   }
   let findBook=Book.find({bookId});
    let updated_review= findBook[0].Reviews.filter(item => item!== email);
    const updatedReview= await Book.findByIdAndUpdate(
      email,
     { $set: {Reviews:updated_review}},
     { new: true, runValidators: true }
   );
   return updated_review;
   }
   
module.exports={getBook, addToCart, getCartProduct, removeFromCart, searchBookByTitle}




 
















