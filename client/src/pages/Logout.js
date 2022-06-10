import React,{useEffect} from "react";
import "../styles/Logout.css";
import { Link, useNavigate } from "react-router-dom";


function Logout(){
const navigate = useNavigate()
    useEffect(() => {
        fetch('/log-out',{
        method:"GET",
        headers:{
           Accept:"application/json",
           "Content-Type":"application/json",

        },
        credentials:"include"
      }).then((res)=>{
            navigate("/log-out",{replace:true});
            if(res.status != 200){
                const error = new Error(res.error)
                throw error;
            }
      }).catch((err)=>{
        console.log(err)
      });
    },[]);
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