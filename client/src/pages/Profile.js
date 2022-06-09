import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom";
import ProfilePic from '../images/download.png'


export default function Profile() {
    const navigate = useNavigate();
    const [userData,setUserData] = useState("");
  const callProfilePage = async()=>{
    try {
      const res = await fetch('/profile',{
        method:"GET",
        headers:{
           Accept:"application/json",
           "Content-Type":"application/json",

        },
        credentials:"include"
      });
      const data  = await res.json();
      setUserData(data);
          if(!res.status === 200){
        const error = new Error(res.error)
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login-signup");
    }
  }
  

  useEffect(() => {
    callProfilePage();
    
  }, []);
 
    return (
        <>
        <Navbar />
        <div className="page">
            <div className="container">
                <div className="title">Profile</div>
                <div className="content">
                    <div className="user-information">

                        <div className="info-box">
                            <p className="info">Profile Picture</p>
                            <img src={ProfilePic} className="profile-pic" />
                        </div>
                        <div className="info-box">
                            <p className="info">Full Name : </p>
                            <p className="info-details">{userData.name}</p>
                        </div>

                        <div className="info-box">
                            <p className="info">Email: </p>
                            <p className="info-details">{userData.email}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Phone Number : </p>
                            <p className="info-details">{userData.phoneNo}</p>
                        </div>

                        <div className="info-box">
                            <p className="info">Address: </p>
                            <p className="info-details">{userData.address}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">City: </p>
                            <p className="info-details">{userData.city}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">State: </p>
                            <p className="info-details">Karnataka</p>
                        </div>
                        {/* <div className="button">
                            <button>Edit Profile</button>
                        </div> */}
                    </div>



                </div>
            </div>
        </div>
        <Footer />
        </>
        
    )
}