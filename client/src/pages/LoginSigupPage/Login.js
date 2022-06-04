import React from "react";
import { useNavigate } from "react-router-dom";
import {useState} from "react"


 function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  const loginUser = async (e)=>{
    e.preventDefault();
    const res  = await fetch('/login-signup',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    });
    const data = res.json();
    // console.log(data);
    if(res.status===400 || !data){
      window.alert("Invalid Credentials");

    }else{
      // window.alert("login Successful");
      if(res.status===250){
        navigate("/admin")
      }else if(res.status==251 ){
        navigate("/pro")
      }else{
      navigate("/home")
      }
    }
  }
  
    return(
        <div className="login-form">
        <div className="title">Login</div>
        <form  method="POST">
            <div className="input-boxes">
                <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input type="text"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                     placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                     placeholder="Enter your password" required />
                </div>
                <div className="text"><a href="#" style={{color: "#191919"}}>Forgot password?</a></div>
                <div className="button input-box">
                    <input type="submit" value="Log In"
                    onClick={loginUser}
                     />
                </div>
                <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Sigup now</label>
                </div>
            </div>
        </form>
    </div>
    )
    }

export default Login