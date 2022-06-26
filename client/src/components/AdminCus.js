import React,{useState,useEffect} from "react";
import Card from "react-bootstrap/Card/"
import Button from "react-bootstrap/Button/"
import  Modal  from "react-bootstrap/Modal";


function MyVerticallyCenteredModal(props) {
    // console.log(props)
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
                    <li>Phone Number : {props.item.phoneNo}</li>
                    <li>Email : {props.item.email}</li>
                    <li>Address : {props.item.address}</li>
                    <li>City : {props.item.city}</li>      
                    <li>State : {props.item.state}</li>
                    <li>Gender : {props.item.gender}</li>
                    <li>Date of Registration : {props.item.date}</li>


                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
const Cards=(props)=>{
const [modalShow, setModalShow] = React.useState(false);


    return(
        <Card>
                <Card.Body >
                    <Card.Title>{props.item.name}</Card.Title>
                    <Card.Text>Email: {props.item.email}</Card.Text>
                    <Card.Text>Phone Number: {props.item.phoneNo}</Card.Text>
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

const AdminCus = () => {
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
    // console.log(userData)
    // for (let i in userData){
    //     console.log(userData[i].name)  
    // }
    
 
 }},[])
 var arr  = Array()
 for(let i  = 0 ;i<userData.length;i++){
    arr.push(userData[i])
 }
 arr.reverse();
//  console.log(arr)
 const cards = arr.map(item=>{
    return( <Cards
        key={item._id}
        item={item}
    />)
 })

    return (
        <div className="customer-cards">
        {/* <p>Here {userData[0].name}</p> */}
        {cards}
        {/* <Cards />
        {/* {
            console.log(userData[0])
        } */}

        </div>
    )

}

export default AdminCus

// const [userData, setUserData] = useState({});
// let data;
// const callAdminCusPage = async()=>{
//     try {

//       const res = await fetch('/admin/cusDetails',{
//         method:"GET",
//         headers:{
//            Accept:"application/json",
//            "Content-Type":"application/json",

//         },
//         credentials:"include"
//       });

//       data  = await res.json();
//     //   return data
//     //   console.log(data);
//       setUserData(data);
//     // setUserData(data);
//     //   console.log(userData)

//         if(!res.status === 200){
//         const error = new Error(res.error)
//         throw error;
//       }
//     } catch (error) {
//       console.log(error);
      
//     }
    
//   }       
//   useEffect(() => {
//     callAdminCusPage();     

//   },[]);