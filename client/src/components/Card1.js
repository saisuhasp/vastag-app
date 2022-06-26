import React from "react";
import { Link } from "react-router-dom";
import "../styles/Search.css";

const Card1 = (props) => {
var links="/about-pro?id="+ String(props.item._id);
    return(
    <Link to={links}>
    <div className="search-card">

        <div className="image-card">
            <img src={require('../images/download.png')} className="profile-pic" />

        </div>
        <div className="title-card">
            <h3>{props.item.name}</h3>
        </div>
        <div className="des-card">
            <p>Ratings : 4.5/5</p>
            {/* <button>Read More...</button> */}
        </div>
    </div>
    </Link>)
    }

export default Card1