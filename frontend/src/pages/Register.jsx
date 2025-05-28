import {useState} from "react";
import { FaBook } from "react-icons/fa";
import axios from "axios"
import "../Css/register.css";

const Register = () => {
    const[userInfo,setuserInfo]=useState({
     UserName:"",
     email:"",
     password:""
    })
    const[error,setError]=useState(null)
    function HandleChange(e){
     
    }
    function HandleSubmit(e){
      e.preventDefault();
      const res=axios.post("/auth/register",userInfo);
      console.log(res);

    }
    return (
        <div className="register-container">
            <div className="logo">
                <FaBook className="book-icon" /> 
                <h1>BookHive</h1> 
            </div>
            <h2>Register</h2>
            <form>
                <input  onChange={(e)=>HandleChange(e)}  type="text" placeholder="UserName" required />
                <input   onChange={(e)=>HandleChange(e)}  type="email" placeholder="Email" required />
                <input   onChange={(e)=>HandleChange(e)}  type="password" placeholder="Password" required />
                <button  onSubmit={(e)=>HandleSubmit(e)}  type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Register;
