import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "../styles/Search.css";

const Search =()=>{
    return(
        <div>
            <Navbar />
            <div className="main-page"></div>
            <div className="side-main-right">
            <h1 className="main-title">
                Searched Results
            </h1>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            </div>
            <Footer />
        </div>
    )
}
export default Search
