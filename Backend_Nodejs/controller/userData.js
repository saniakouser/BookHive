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

const LoginUser=async()=>{
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

const updateUser = async () => {
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
  