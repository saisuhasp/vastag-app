import { Alert } from "react-bootstrap";
import { React, useState } from "react";
import { Card } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import './Review.css';
const Review = (props) => {
    const [show, setShow] = useState(false);
    const [reviewText, setSubmitReview] = useState();

const clicked= async (e)=>{
    setShow(true) 
    e.preventDefault();
    setSubmitReview(e.target.value)
    const res  = await fetch('/reviews',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        reviewText:reviewText,
        pro_email : props.item.professional.email,
        tier_name :props.item.professional.tier_name
      })
    });
    const data = res.json();
}
return (
    <Card className="review-card">
        <Card.Body>
            <Card.Title>{props.item.professional.name}</Card.Title>
            <Card.Title>Email: {props.item.professional.email}</Card.Title>
            <Card.Title>Phone number{props.item.professional.phoneNo}</Card.Title>

            <Card.Title>Type :{props.item.professional.tier_name}</Card.Title>

            <Card.Text>Give us a Review below.</Card.Text>
            <FloatingLabel controlId="floatingTextarea2" label="Review" >
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    name = "reviewText"
                    value = {reviewText}
                    onChange={(e)=> setSubmitReview(e.target.value)}

                />
            </FloatingLabel>
            {/* <Button variant="success" size="lg" className="send" type="submit" >
                Send Review
            </Button> */}
        </Card.Body>
        <Alert show={show} variant="success">
        <Alert.Heading>Review is Successfully submited</Alert.Heading>
        <div className="d-flex justify-content-end">
        </div>
      </Alert>

      {!show && <Button onClick={clicked}  variant="success" size="lg" className="send" type="submit">Send Review</Button>}
    </Card>
)
}

export default Review