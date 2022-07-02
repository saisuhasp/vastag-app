import React,{useState,useEffect} from "react";
import Card from "react-bootstrap/Card/"
import Button from "react-bootstrap/Button/"
import  Modal  from "react-bootstrap/Modal";


function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {props.item.customer.name} 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Details</h4>
                <ul>
                    <li>Phone Number : {props.item.customer.phoneNo} </li>
                    <li>Email : {props.item.customer.email} </li>
                    <li>Address : {props.item.customer.address} </li>     
                    <li>City : {props.item.customer.city} </li>       
                    <li>State : {props.item.customer.state} </li>
                    <li>Tier Type : {props.item.professional.tier_name} </li>
                    <li>Price : ₹{props.item.professional.tier_price} </li>      
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="success">Accept</Button>
                

            </Modal.Footer>
        </Modal>
    );
}
const Cards=(props)=>{
    const [modalShow, setModalShow] = useState(false);
    
    
        return(
            <Card>
                <Card.Body >
                    <Card.Title>{props.item.customer.name} has chosen your Service</Card.Title>
                    <Card.Text>Email : {props.item.customer.email}</Card.Text>
                    <Card.Text>Phone Number : {props.item.customer.phoneNo}</Card.Text>
                    <Button variant="primary" onClick={() => setModalShow(true)}>More Information</Button>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        item = {props.item}

                    />
                </Card.Body>
            </Card>
        );
    }

const CusNotifiaction = () => {
    const [modalShow, setModalShow] = React.useState(false);
    var [userData, setUserData] = useState("");

    useEffect(()=>{
    if(userData===""){
              async function showReviewsPage() {
           
           try {
               const res = await  fetch('/pro/cusNotify',{
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
    //    console.log(arr)
   
   
       arr.reverse();
       const cards = arr.map(item=>{
        return( <Cards
            key={item._id}
            item={item}
        />)
     })
    return (
        <div className="customer-cards">
            {cards}
        </div>
    )
}

export default CusNotifiaction