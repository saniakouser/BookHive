// Register
const jwt = require("jsonwebtoken");
const User=require("../models/User.js");
const bcrypt = require('bcrypt');

const UserRegister = async (req, res) => {
  try {
    console.log("Received registration data:", req.body);
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

const LoginUser=async(req,res)=>{
  // console.log("Received login data:", req.body);
   let{email,password}=req.body
  //  const allUsers = await User.find({});
  //  console.log("All users in DB:", allUsers);

   let existing_user= await User.findOne({email});
   if(!existing_user){
    return res.status(400).json({"message":"user  doesnot exist"});
   }
   else{
    // console.log("Password from client:", password);
    // console.log("Password in DB:", existing_user.password);

    let isPasswordCorrect= await bcrypt.compare(password,existing_user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({"message":"Password is incoorect"})
    }
    else{
     const token = jwt.sign({ email: existing_user.email, id: existing_user._id }, "My_secret_key", { expiresIn: "30m" });
      // return res.json({ message: "Login successful", token });
      return res.json({ message: "Login successful", token, user: existing_user });

    }
   }
}

const updateUser = async (req,res) => {
    try {
      let {emailId, updateData}=req.body
      const updatedUser = await User.findByIdAndUpdate(
        emailId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  // * Get user
  const getUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email })
      .populate("history") 
      .exec();
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

  
// & forget password
  const forgrtPassword= async(req,res)=>{
    const {email}=req.body;
    let user=User.findOne({email});
    if(!user){
      return res.json({message:"user not found"})
    }
   const forget_token=jwt.sign({email:user.email},process.env.JWT_SECRET, { expiresIn: "15m" })
   await User.findOneAndUpdate(
    { email: email }, 
    { 
        $set: {
            forgotPasswordToken: forget_token,
            forgotPasswordTokenExpiry: Date.now() + 15 * 60 * 1000
        }
    },
    { new: true } 
);
  }

 const ResetPassword= async(req,res)=>{
 
  try{
    const{token, newPassword}=req.body;
    if(!token){
            return res.status(401).json({ message: "No token." });
        }
        const data=jwt.verify(token,process.env.JWT_SECRET);
        const user=User.findOne({email:data.email});
        if (!user || user.forgotPasswordToken !== token || user.forgotPasswordTokenExpiry < Date.now()) {
          return res.status(400).json({ message: "Invalid or expired token" });
      }  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.forgotPasswordToken = null;
      user.forgotPasswordTokenExpiry = null;
      await user.save();
      return res.json({ message: "Password reset successful" });
  }

  catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
  }
       
 }
 
module.exports={UserRegister,LoginUser,forgrtPassword,ResetPassword, getUser}