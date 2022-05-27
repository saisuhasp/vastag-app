import React from "react";
import "../styles/Logout.css";
import { Link } from "react-router-dom";


function Logout(){
    return(
        <div className="logout-page" >
            <div className="logout-content">
            <h1 className="logout-heading">You have sucessfully Loged Out </h1>
        <h3 className="logout-login">If you want to Log In</h3> <Link to="/login-signup"> Click here  </Link>
            </div>
        
        </div>
            
        
    )
}

export default Logout