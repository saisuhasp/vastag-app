import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AboutPro.css";
import {useNavigate,useSearchParams,Link} from "react-router-dom";


function AboutPro() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    var id=searchParams.get("id");
    // console.log(searchParams.get("id"))

    var [userData, setUserData] = useState("");

    useEffect(()=>{
    
    if(userData===""){
              async function showAdminCus() {
      
           try {
               const res = await  fetch('/search',{
                   method:"GET",
                   headers:{
                       Accept:"application/json",
                      "Content-Type":"application/json",
                   },
                   credentials:"include"
               })
              
               const data = await res.json();
               setUserData(data)
            //    console.log(userData)
           } catch (error) {
               console.log(error)
           }
       }
       showAdminCus()
    }
},[])
    var myData={};
// console.log(userData)
for(let i in userData){
    // console.log(userData[i])
    if(id === userData[i]._id){
        myData=userData[i]
    }
}
// console.log(myData);
if(userData!==""){
    
    var confirmLink="/confirm?id="+ String(myData._id);

    return (
        <div>
            <Navbar />
        
            <div className="panels-page">
                <div className="panel">
                <img src={require('../images/download.png')} className="profile-pic" />
                    <div className="profile-details">
                        <div className="info-box">
                            <p className="info">Full Name : </p>
                            <p className="info-details">{myData.name}</p>
                        </div>

                        <div className="info-box">
                            <p className="info">Email: </p>
                            <p className="info-details">{myData.email}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Phone Number : </p>
                            <p className="info-details">{myData.phoneNo}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Address: </p>
                            <p className="info-details">{myData.address}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">City: </p>
                            <p className="info-details">{myData.city}</p>
                        </div>

                        <div className="info-box">
                            <p className="info">State: </p>
                            <p className="info-details">{myData.state}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Rating: </p>
                            <p className="info-details">4.5/5</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Occupation: </p>
                            <p className="info-details">{myData.profession}</p>
                        </div>
                    </div>

                </div>
                <div className="panel">


                    <div className="pricing-plan">
                        <h2 className="pricing-header">{myData.tiers.tier1_name}</h2>
                        <ul className="pricing-features">
                            <p className="pricing-features-item">{myData.tiers.tier1_details}</p>
                            
                        </ul>
                        <span className="pricing-price">₹{myData.tiers.tier1_price}</span>
                        
                        <Link to={confirmLink+String("&tier=1")}><button className="pricing-button">Apply</button></Link>
                    </div>

                    <div className="pricing-plan">
                        <h2 className="pricing-header">{myData.tiers.tier2_name}</h2>
                        <ul className="pricing-features">
                            <p className="pricing-features-item">{myData.tiers.tier2_details}</p>
                            
                        </ul>
                        <span className="pricing-price">₹{myData.tiers.tier2_price}</span>
                        <Link to={confirmLink+String("&tier=2")}><button className="pricing-button">Apply</button></Link>
                    </div>

                    <div className="pricing-plan">
                        <h2 className="pricing-header">{myData.tiers.tier3_name}</h2>
                        <ul className="pricing-features">
                            <p className="pricing-features-item">{myData.tiers.tier3_details}</p>
                            
                        </ul>
                        <span className="pricing-price">₹{myData.tiers.tier3_price}</span>
                        <Link to={confirmLink+String("&tier=3")}><button className="pricing-button">Apply</button></Link>
                    </div>

                </div>
                <div className="comments-panel">
                    <h1 className="comments-heading">
                        Comments
                    </h1>
                    <div className="comments">
                        <p className="commenter">Name of the person</p>
                        <p className="comment">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum sapiente minima
                            explicabo dolor nisi neque vitae voluptate facere amet harum, at reiciendis earum maxime quisquam
                            autem ratione cumque, aspernatur id.</p>
                        <br />
                    </div>
                    <div className="comments">
                        <p className="commenter">Name of the person</p>
                        <p className="comment">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum sapiente minima
                            explicabo dolor nisi neque vitae voluptate facere amet harum, at reiciendis earum maxime quisquam
                            autem ratione cumque, aspernatur id.</p>
                        <br />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
}

export default AboutPro