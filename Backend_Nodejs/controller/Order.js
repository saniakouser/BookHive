 
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

 // ! get book by title
   const getBookByTitle= async(req,res)=>{
      let{book_title}=req.body;
      let existingBook= await Book.find({book_title})
      if(!existingBook){
        res.status(500).json({message:"No books found"});
      }
      else{
        res.status(200).json(existingBook)
      }
   }
   
 
 // ! add to cart
  const addToCart=async(req,res)=>{
     const {BookId,qunatity,email}=req.body
     let findBook=Book.find({BookId});
      let cart={
       BookId:findBook[0].BookId,
       bookName:findBook[0].Title,
       bookImage:findBook[0].image,
       quantity:qunatity,
       price:findBook[0].price*qunatity
      }
      let existing_user= await User.findOne({email});
         if(!existing_user){
          return res.status(400).json({"message":"user  doesnot exist"});
         }
         else{
            let cart_data=existing_user[0].cart;
             let updated_cart=[...cart_data,cart]
            const updatedCart= await User.findByIdAndUpdate(
                email,
               { $set: {cart:updated_cart }},
               { new: true, runValidators: true }
             );
             return updatedUser;
         }
  }
 // ! remove from cart
 const RemmoveFromCart=async(req,res)=>{
    let {email,BookId}=req.body;
    let existingUser= await User.findOne({email});
    if(!existingUser){
     return res.status(400).json({"message":"user  doesnot exist"});
    }
    else{
        let cartData = existingUser[0].cart;
        cartData = cartData.filter(item => item.BookId !== BookId);
        
        const updatedCart = await User.findByIdAndUpdate(
            email,
            { $set: { cart: cartData } },
            { new: true, runValidators: true }
        );
        
        return updatedCart;
 }
 }
 // ! get cart product
   const getCartProduct=(req,res)=>{
    let {email}=req.body;
    let existing_user=User.findOne({email})
    if(!existing_user){
        return res.status(400).json({"message":"user  doesnot exist"});
       }
       else{
        let data=existing_user[0].cart
        res.status(200).json({data})
   }
 
}
   
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
   
module.exports={getBook}




 
















