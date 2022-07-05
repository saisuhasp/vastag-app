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
                {props.item.cus_name} 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Details</h4>
                <ul>
                    <li>Phone Number : {props.item.cus_phoneNo} </li>
                    <li>Email : {props.item.cus_phoneNo} </li>    
                    <li>Tier Type : {props.item.tier_name} </li>
                    <li>Comment : {props.item.comment} </li>      
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
                    <Card.Title>{props.item.cus_name} has chosen your Service</Card.Title>
                    <Card.Text>Email : {props.item.cus_email}</Card.Text>
                    <Card.Text>Phone Number : {props.item.cus_phoneNo}</Card.Text>
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
               const res = await  fetch('/pro/cusReview',{
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

    // console.log(userData)
    if(userData!==""){
       for (let i = 0; i < userData.reviews.length; i++) {
        if(userData.reviews[i].tier_name){
           arr.push(userData.reviews[i])
        }
       }
    //    console.log(arr)
    }
   
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