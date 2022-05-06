import React from "react";
import "../components/Review.css"
import Review from "../components/Review";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ReviewsPage(){
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