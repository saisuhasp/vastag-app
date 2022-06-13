import React,{useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AboutPro.css";
import {useNavigate} from "react-router-dom";




function AboutPro() {
    const navigate = useNavigate();
  const callAboutProPage = async()=>{
    try {
      const res = await fetch('/about-pro',{
        method:"GET",
        headers:{
           Accept:"application/json",
           "Content-Type":"application/json",

        },
        credentials:"include"
      });
      const data  = await res.json();
      console.log(data);
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
    callAboutProPage();
    
  }, []);
    return (
        <div>
            <Navbar />
            <div className="panels-page">
                <div className="panel">
                <img src={require('../images/download.png')} className="profile-pic" />
                    <div className="profile-details">
                        <div className="info-box">
                            <p className="info">Full Name : </p>
                            <p className="info-details">John Joe</p>
                        </div>

                        <div className="info-box">
                            <p className="info">Email: </p>
                            <p className="info-details">johnjoe@gmail.com</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Phone Number : </p>
                            <p className="info-details">9999999999</p>
                        </div>
                        <div className="info-box">
                            <p className="info">City: </p>
                            <p className="info-details">Bangalore</p>
                        </div>
                        <div className="info-box">
                            <p className="info">State: </p>
                            <p className="info-details">Karnataka</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Rating: </p>
                            <p className="info-details">4.5/5</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Occupation: </p>
                            <p className="info-details">Electrian</p>
                        </div>
                    </div>

                </div>
                <div className="panel">


                    <div className="pricing-plan">
                        <h2 className="pricing-header">Personal</h2>
                        <ul className="pricing-features">
                            <p className="pricing-features-item">Custom domains</p>
                            
                        </ul>
                        <span className="pricing-price">₹1oo</span>
                        <a href="#/" className="pricing-button">Apply</a>
                    </div>

                    <div className="pricing-plan">
                        <h2 className="pricing-header">Small team</h2>
                        <ul className="pricing-features">
                        <p className="pricing-features-item">Custom domains</p>

                        </ul>
                        <span className="pricing-price">₹150</span>
                        <a href="#/" className="pricing-button is-featured">Apply</a>
                    </div>

                    <div className="pricing-plan">

                        <h2 className="pricing-header">Enterprise</h2>
                        <ul className="pricing-features">
                        <p className="pricing-features-item">Custom domains</p>

                        </ul>
                        <span className="pricing-price">₹400</span>
                        <a href="#/" className="pricing-button">Apply</a>
                    </div>

                </div>
                <div className="comments-panel">
                    <h1 className="comments-heading">
                        Comments
                    </h1>
                    <div className="comments">
                        <p className="commenter">Name of the person</p>
                        <p className="comment">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum sapiente minima
                            explicabo dolor nisi neque vitae voluptate facere amet harum, at reiciendis earum maxime quisquam
                            autem ratione cumque, aspernatur id.</p>
                        <br />
                    </div>
                    <div className="comments">
                        <p className="commenter">Name of the person</p>
                        <p className="comment">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum sapiente minima
                            explicabo dolor nisi neque vitae voluptate facere amet harum, at reiciendis earum maxime quisquam
                            autem ratione cumque, aspernatur id.</p>
                        <br />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default AboutPro