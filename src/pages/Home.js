import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../images/background.jpg";
import "../styles/Home.css";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


function Home() {
  return (
    <div>
      <Navbar />
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` , width:"50%" , float:"left"}}>
      <div className="headerContainer">
        <h1> Your Location </h1>
        <input type="text" id="fname" name="fname"  className="input-boxes" required/>
        <h1> Your Service</h1>
        <input type="text" id="fname" name="fname" className="input-boxes" required/><br /><br />

        <Link to="/search">
          <button> SERACH </button>
        </Link>
      </div>
    </div>
    <Footer />
    </div>
    
  );
}

export default Home;
