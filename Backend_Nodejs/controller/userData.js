// Register
const User=require("../models/User.js");
const bcrypt = require('bcrypt');

const UserRegister= async()=>{
 let {name,email,password}=req.body
    let existingUser=User.findOne({email});
    if(existingUser){
       return res.status(400).json({"message":"user is already exist"});
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new User({
           name:name,
           email:email,
           password:hashedPassword
        });
      newuser.save().then(()=>{
        
      }).catch((err)=>{
      
      })
    }
}

const LoginUser=async(req,res)=>{
   let{email,password}=req.body
   let existing_user=User.findOne({email});
   if(!existing_user){
    return res.status(400).json({"message":"user  doesnot exist"});
   }
   else{
    let isPasswordCorrect=bcrypt.compare(password,existing_user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({"message":"Password is incoorect"})
    }
    else{
     const token = jwt.sign({ email: existing_user.email, id: existing_user._id }, "My_secret_key", { expiresIn: "30m" });
      return res.json({ message: "Login successful", token });
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
 
module.exports={UserRegister,LoginUser,forgrtPassword,ResetPassword}