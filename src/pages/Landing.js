import React from "react";
import "../styles/Landing.css";
import { Link } from "react-router-dom";


function Landing() {
    return (
        <div>
            <div className="nav-bar">
            <div className="nav-logo">
            <h2>VASTAG</h2>
            <i className='fab fa-firstdraft' />
            </div>
                

                <Link to="/login-signup">
                    <button className="nav-btn">Login/Signup</button>
                </Link>

            </div>


            <div className="section">
                <div className="section-content">
                    <h1 id="section-content">WHAT ?</h1>
                    <p>A platform to help people to hire a professional, and this platform gives independent professionals or
                        early professionals to work for customers.</p>
                </div>

                <img className="section-image" src={require('../images/images.png')} alt="" />

            </div>
            <div className="section">
                <img className="section-image" src={require('../images/images1.png')} alt="" />


                <div className="section-content">
                    <h1 id="section-content">WHY ?</h1>
                    <p>This platform helps people in hiring verified local professionals at their doorstep without having any trust issues. The professionals are verified and posted on the site. If there any problems caused there is a contact us page to let us know the problem.</p>
                </div>


            </div>
            <div className="section">
                <div className="section-content">
                    <h1 id="section-content">HOW?</h1>
                    <p>This platform acts a brigde between the customers and professionals. First the professionals are verified when they are registered and customers can type their location and the required service and then avail a professional by choosing them and choose their required tiers and that's how they hire the professionals. </p>
                </div>
                <img className="section-image" src={require('../images/images2.png')} alt="" />


            </div>
            <div className="end">
                <h1 id="section-content">So what's the wait for ?</h1>
                <Link to="/login-signup">
                    <button>Get Started</button>
                </Link>

            </div>
        </div>
    )
}

export default Landing