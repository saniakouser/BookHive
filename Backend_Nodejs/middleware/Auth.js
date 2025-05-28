

  const jwt=require("jsonwebtoken")
   const CheckDetails=(req,res,next)=>{
     const {email,password}=req.body;
     if(!email || ! password){
        return res.status(400).json({ message: "Email and password are required" });
     }
     next();
   }


   const ValidateToken=(req,res,next)=>{
   try{
    const token=req.header("Authorization")
    if(!token){
        return res.status(401).json({ message: "No token." });
    }
    const info=jwt.verify(token,process.env.JWT_SECRET)
    req.user=info;
    next();
   }
   catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token" });
}
   }



















 