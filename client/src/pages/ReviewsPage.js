import React,{useEffect} from "react";
import "../components/Review.css"
import Review from "../components/Review";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom";


function ReviewsPage(){
  const navigate = useNavigate();
  const callReviewsPage = async()=>{
    try {
      const res = await fetch('/reviews',{
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
    callReviewsPage();
    
  }, []);
    return(
      <div>
      <Navbar />
      <h4 className="page-heading">Give Your Reviews for the following professionals</h4>
      <div className="reviews-list">
      <Review />
      <Review />
      <Review />
      <Review />
      <Review />
      <Review />
      <Review />

      </div>
      
      <Footer />
      </div>
      

        
    )
}

export default ReviewsPage