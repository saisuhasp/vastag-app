import React,{useEffect,useState} from "react";
import { Link, } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card1 from "../components/Card1";
import "../styles/Search.css";
import {useNavigate} from "react-router-dom";


const Search =()=>{
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
 
         } catch (error) {
             console.log(error)
         }
     }
     showAdminCus()
  }else{
  //    console.log(userData)
     // for (let i in userData){
     //     console.log(userData[i].name)  
     // }
     
  
  }},[])
  var arr  = Array()
  var usersArr  = Array()



    for(let i  = 0 ;i<userData.length;i++){
      if("tiers" in userData[i]){
        
        for (let j in userData[i].tiers){
          arr.push(j)
        }
        // console.log(arr)

      if(arr.length===9)
        usersArr.push(userData[i])
      }
    }
    
    console.log(usersArr)
    

    const cards = usersArr.map(item=>{
       return( <Card1
           key={item._id}
           item={item}
       />)
    })
    return(
        <div>
            <Navbar />
            <h1 className="main-title">
                Searched Results
            </h1>
            <div className="main">
            
         {cards}

            </div>
            <Footer />
        </div>
    )
}
export default Search
