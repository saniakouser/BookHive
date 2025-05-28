 
 import {useState} from "react";
 import "../Css/login.css";


 
     const Login = () => {
     const[userInput ,setUserInput]=useState({email:"",password:""});
     function HandleSubmit(e){
      
     }
     function HandleChange(e){
        setUserInput({...userInput,[e.target.name]:e.target.value})
        console.log(userInput)
     }
     return (
         <div className="login-container">
             <h2>Login</h2>
             <form>
                 <input onChange={(e)=>HandleChange(e)} type="email" placeholder="Email" name="email" required />
                 <input  onChange={(e)=>HandleChange(e)}type="password" placeholder="Password" name="password" required />
                 <button onSubmit={(e)=>HandleSubmit} type="submit">Login</button>
             </form>
             <p>Don't have an account? <a href="/register">Register</a></p>
         </div>
     );
 };
 
 export default Login;
 