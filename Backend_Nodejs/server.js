 const express=require('express')
 const app=express()
 const port=3000
 app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))


 
