
 const express=require("express");
 const authRouter=express.Router();
 const{UserRegister,LoginUser,forgrtPassword,ResetPassword, getUser}=require("../controller/userData.js")

  authRouter.post("/register",UserRegister)
  authRouter.post("/login",LoginUser)
  authRouter.post("/forgetpassword",forgrtPassword)
  authRouter.post("/Resetpassword",ResetPassword)
  authRouter.post("/get-user", getUser);

  module.exports=authRouter;