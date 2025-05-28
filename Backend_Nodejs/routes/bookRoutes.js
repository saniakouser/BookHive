 const express=require('express');
  const { getBook } = require('../controller/Order');
 const bookRouter=express.Router();

 bookRouter.get('/Allbook',getBook);


 module.exports=bookRouter