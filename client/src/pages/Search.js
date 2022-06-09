import React,{useEffect} from "react";
import { Link, } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card1 from "../components/Card1";
import "../styles/Search.css";
import {useNavigate} from "react-router-dom";


const Search =()=>{
    const navigate = useNavigate();
  const callSearchPage = async()=>{
    try {
      const res = await fetch('/search',{
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
    callSearchPage();
    
  }, []);
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
