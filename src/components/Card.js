import React from "react";
import { Link } from "react-router-dom";
import "../styles/Search.css";

const Card = () => (
    <Link to="/about-pro">
    <div className="card">

        <div className="image-card">
            <img src={require('../images/download.png')} className="profile-pic" />

        </div>
        <div className="title-card">
            <h1>
                John Joe</h1>
        </div>
        <div className="des-card">
            <p>Ratings : 4.5/5</p>
            {/* <button>Read More...</button> */}
        </div>
    </div>
    </Link>
)

export default Card