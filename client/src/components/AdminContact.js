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
                {props.item.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Details</h4>
                <ul>
                    <li>Email : {props.item.email}</li>
                    <li>Comment : {props.item.message}</li>       
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="success">Done</Button>
                

            </Modal.Footer>
        </Modal>
    );
}
const Cards=(props)=>{
    const [modalShow, setModalShow] = useState(false);
    
    
        return(
            <Card>
            <Card.Body >
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Text>Email: {props.item.email}</Card.Text>
                
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


const AdminContact = () => {
    var [userData, setUserData] = useState("");

    useEffect(()=>{
    if(userData===""){
              async function showAdminCus() {
           
           try {
               const res = await  fetch('/admin/cusDetails',{
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

    for(let i  = 0 ;i<userData.length;i++){
       if(userData[i].messages.length>0){
        for(let j = 0;j<userData[i].messages.length;j++)
        arr.push(userData[i].messages[j])
        // for(let j  = 0 ;j<arr[i].length;j++){
        //     cArr.push(arr[j])
        //  }
       }
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

export default AdminContact