import React,{useEffect,useState} from "react";
import { Link,useSearchParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card1 from "../components/Card1";
import "../styles/Search.css";
import {useNavigate} from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form,Button } from "react-bootstrap";
import "../styles/Home.css"



const Search =()=>{
  var [userData, setUserData] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  var loc = searchParams.get("loc");
  var pro = searchParams.get("pro");
  const [location, setLocation] = useState('')
  const [service, setService] = useState('')

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
      arr = []
    }
    
    console.log(usersArr)
    
    var finalArr  = Array()
    for (let i = 0 ;i<usersArr.length;i++){
      if(loc.toLowerCase()===usersArr[i].city.toLowerCase() && pro.toLowerCase() ===usersArr[i].profession.toLowerCase()){
        finalArr.push(usersArr[i])
      }
    }
    const cards = finalArr.map(item=>{
       return( <Card1
           key={item._id}
           item={item}
       />)
    })
var links="/search?loc="+ String(location).toLowerCase()+"&pro="+String(service).toLowerCase();

    if(finalArr.length!==0){
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
    else{
      return(
        <div>
            <Navbar />
            <h1 className="main-title">
                Searched Results
            </h1>
            <div className="main2">
            
        <h1>The professional you are looking for is not found please try again.</h1>
        <Form className="search-form">
          <FloatingLabel
            controlId="floatingInput"
            label="Enter your Location"
            className="input-boxes"
          >
            <Form.Control type="text" placeholder="Location" required name="location"
              value={location}
                    onChange={(e)=> setLocation(e.target.value)}
                    
            />
          </FloatingLabel>
          <br />

          <FloatingLabel controlId="floatingInput" label="Enter your Service" className="input-boxes">
            <Form.Control type="text" placeholder="Service" name="service"
            value={service}
                    onChange={(e)=> setService(e.target.value)}
                    
             />
          </FloatingLabel>
          <Link to={links}>
          <br />
          <Button  className="search-button">SERACH</Button>
          </Link>
          </Form>
        

            </div>
            <Footer />
        </div>
      )
    }
}
export default Search
