import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    let navigate = useNavigate();
    return(
        <div className="login-form">
        <div className="title">Login</div>
        <form onSubmit={()=>{ navigate('/home')}}>
            <div className="input-boxes">
                <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input type="text" placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Enter your password" required />
                </div>
                <div className="text"><a href="#" style={{color: "#191919"}}>Forgot password?</a></div>
                <div className="button input-box">
                    <input type="submit" value="Submit" />
                </div>
                <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Sigup now</label>
                </div>
            </div>
        </form>
    </div>
    )
}