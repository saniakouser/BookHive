
const mongoose=require('mongoose');
const Schema=mongoose.Schema

const BookSchema=new Schema({
    Title:String,
    Author:String,
    image:String,
    Reviews:Number,
    Genre:String,
    discount:{
        type:Number,
        min:0,
        max:100
    },
    Customer_Review:String,
    Price:Number
   },

    {
     timestamps:true
    }
)
 
const Book=mongoose.model("Book",BookSchema);

module.exports={Book,BookSchema}