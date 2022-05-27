import { Alert } from "react-bootstrap";
import { React, useState } from "react";
import { Card } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import './Review.css';
const Review = () => {
    const [show, setShow] = useState(false);


return (
    <Card className="review-card">
        <Card.Body>
            <Card.Title>Roger James</Card.Title>
            <Card.Text>Give us a Review below.</Card.Text>
            <FloatingLabel controlId="floatingTextarea2" label="Review" >
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
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

      {!show && <Button onClick={() => setShow(true) } variant="success" size="lg" className="send" type="submit">Send Review</Button>}
    </Card>
)
}

export default Review