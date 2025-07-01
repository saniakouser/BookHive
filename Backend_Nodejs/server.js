 const express=require('express');
 const cors=require("cors");
 const connectDB =require("./config/db.js");
 const authRouter=require("./routes/userRoutes.js");
 const bookRouter = require('./routes/bookRoutes.js');
 const paymentRouter = require('./routes/paymentRoutes.js');
 require('dotenv').config();

 const app=express()
 app.use(express.json());
 app.use(cors({
    origin : ['http://localhost:3000'],
}))

 connectDB()
 app.use("/auth",authRouter);
 app.use("/api/book",bookRouter)
 app.use("/api/payment", paymentRouter);

 
app.listen(process.env.port, () => {
    console.log("Server running on: http://localhost:8080");

 });