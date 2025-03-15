
const mongoose=require('mongoose');
const Schema=mongoose.Schema

const BookSchema=new Schema({
    Title:String,
    Author:String,
    image:String,
    Reviews:[],
    discount:{
        type:Number,
        min:0,
        max:100
    }
   }  ,
    {
     timestamps:true
    }
)