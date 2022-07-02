import React,{useEffect,useState} from "react";
import "../components/Review.css"
import Review from "../components/Review";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom";


function ReviewsPage(){
  var [userData, setUserData] = useState("");

    useEffect(()=>{
    if(userData===""){
              async function showReviewsPage() {
           
           try {
               const res = await  fetch('/reviews',{
                   method:"GET",
                   headers:{
                       Accept:"application/json",
                      "Content-Type":"application/json",
                   },
                   credentials:"include"
               })
              
               const data = await res.json()
              //  console.log(data)
               setUserData(data)
   
           } catch (error) {
               console.log(error)
           }
       }
       showReviewsPage()
    }else{
      //  console.log(userData)
       // for (let i in userData){
       //     console.log(userData[i].name)  
       // }
       

       
    
    }},[])
    var arr = Array()

    
       for (let i = 0; i < userData.length; i++) {
           arr.push(userData[i])
       }
      //  console.log(arr)
   
   
       arr.reverse();
       const reviewCards = arr.map(item=>{
        return( <Review
            key={item._id}
            item={item}
        />)
     })
    return(
      <div>
      <Navbar />
      <h4 className="page-heading">Give Your Reviews for the following professionals</h4>
      <div className="reviews-list">
      {reviewCards}

      </div>
      
      <Footer />
      </div>
      

        
    )
}

export default ReviewsPage