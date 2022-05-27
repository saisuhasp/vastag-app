import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card1 from "../components/Card1";
import "../styles/Search.css";

const Search =()=>{
    return(
        <div>
            <Navbar />
            <h1 className="main-title">
                Searched Results
            </h1>
            <div className="main">
            
            <Card1 />
            <Card1 />
            <Card1 />
            <Card1 />
            <Card1 />
            <Card1 />
            <Card1 />
            <Card1 />

            </div>
            <Footer />
        </div>
    )
}
export default Search
