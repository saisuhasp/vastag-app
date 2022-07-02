import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card/"
import Button from "react-bootstrap/Button/"
import Modal from "react-bootstrap/Modal";



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
                    Transaction Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Customer Information</h4>
                <h6>Name : {props.item.customer.name}</h6>
                <ul >
                    <li>Email : {props.item.customer.email}</li>
                    <li>Phone Number : {props.item.customer.phoneNo}</li>
                    <li>Address : {props.item.customer.address}</li>
                    <li>City : {props.item.customer.city}</li>
                    <li>State : {props.item.customer.state}</li>


                </ul>
                <h4>Professional Information</h4>
                <h6>Name : {props.item.professional.name}</h6>
                <ul >
                    <li>Email : {props.item.professional.email}</li>
                    <li>Phone Number : {props.item.professional.phoneNo}</li>
                    <li>Rating : {props.item.professional.rating}</li>
                    <li>Profession : {props.item.professional.profession}</li>
                    <li>Tier Name : {props.item.professional.tier_name}</li>
                    <li>Price : {props.item.professional.tier_price}</li>
                </ul>
                <p> Date of Transaction:{props.item.date} </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
const Cards = (props) => {
    const [modalShow, setModalShow] = useState(false);


    return (
        <Card>
            <Card.Body>
                <Card.Title>Customer: {props.item.customer.name}</Card.Title>
                <Card.Title>Professional: {props.item.professional.name}</Card.Title>
                <Card.Text>{props.item.customer.name} has taken {props.item.professional.name} service</Card.Text>

                <Button variant="primary" onClick={() => setModalShow(true)}>More Information</Button>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    item={props.item}
                />
            </Card.Body>
        </Card>
    );
}


const Transactions = () => {
    var [userData, setUserData] = useState("");

    useEffect(() => {
        if (userData === "") {
            async function showAdminCus() {

                try {
                    const res = await fetch('/admin/transactions', {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        credentials: "include"
                    })

                    const data = await res.json();
                    setUserData(data)
                    // console.log(userData)


                } catch (error) {
                    console.log(error)
                }
            }
            showAdminCus()
        } else {
            //    console.log(userData)
            // for (let i in userData){
            //     console.log(userData[i].name)  
            // }


        }
    }, [])
    // console.log(userData[0])
    var arr = Array()

    
    for (let i = 0; i < userData.length; i++) {
        arr.push(userData[i])
    }
    // console.log(arr)


    arr.reverse();
    const cards = arr.map(item => {
        return (<Cards
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

export default Transactions