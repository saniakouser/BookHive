
const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const CartItemSchema=new Schema({
  bookId:{type:mongoose.Schema.Types.ObjectId,ref:'Book'},
  bookName:String,
  quantity:Number,
  price:Number
})

const AdressSchema=new Schema({
 State:String,
 District:String,
 PinCode:String,
 LandMark:String
})
const UserSchema=new Schema({
 name:String,
 email:{
    type:String,
    required:true,
    unique:true
 },
 password:String,
 cart:[CartItemSchema],
 isAdmin: {
    type: Boolean,
    default: false
},
 Address:{AdressSchema},
 forgotPasswordToken: String,
 forgotPasswordTokenExpiry: Date,
 verifyToken: String,
 verifyTokenExpiry: Date,
},
{
    timestamps:true
});
 const User=mongoose.model('User',UserSchema)