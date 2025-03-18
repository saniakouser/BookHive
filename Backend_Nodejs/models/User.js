
const mongoose=require('mongoose');
const BookSchema=require("../models/Book.js")
const Schema=mongoose.Schema;
const CartItemSchema=new Schema({
  bookId:{type:mongoose.Schema.Types.ObjectId,ref:'Book'},
  bookName:String,
  quantity:Number,
  price:Number
})
const AdressSchema=new Schema({
 State:{type:String,},
 District:{type:String,},
 PinCode:{type:String},
 LandMark:{type:String,},
})
const UserSchema=new Schema({
 name:{
  type:String,
  required:true
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 profile_pic:String,
 password:{
  type:String,
  required:true,
  unique:true
 },
 cart:[CartItemSchema],
 Address:{AdressSchema},
 history:[BookSchema],
 forgotPasswordToken: String,
 forgotPasswordTokenExpiry: Date,
 verifyToken: String,
 verifyTokenExpiry: Date,
},
{
    timestamps:true
});
 const User=mongoose.model('User',UserSchema);

 module.exports=User;