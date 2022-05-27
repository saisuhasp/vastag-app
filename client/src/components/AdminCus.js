import React from "react";
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
                    John Joe
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Details</h4>
                <ul>
                    <li>Phone Number : 999999999</li>
                    <li>Email : johnjoe@gmail.com</li>
                    <li>City : Bangalore</li>       
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const AdminCus = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div className="customer-cards">
            <Card>
                <Card.Body >
                    <Card.Title>John joe</Card.Title>
                    <Card.Text>Email: johnjoe@gmail.com</Card.Text>
                    <Card.Text>Phone Number: 9999999999</Card.Text>
                    <Button variant="primary" onClick={() => setModalShow(true)}>More Information</Button>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Card.Body>
            </Card>
            <Card>
                <Card.Body >
                    <Card.Title>John joe</Card.Title>
                    <Card.Text>Email: johnjoe@gmail.com</Card.Text>
                    <Card.Text>Phone Number: 9999999999</Card.Text>
                    <Button variant="primary" onClick={() => setModalShow(true)}>More Information</Button>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Card.Body>
            </Card> <Card>
                <Card.Body >
                    <Card.Title>John joe</Card.Title>
                    <Card.Text>Email: johnjoe@gmail.com</Card.Text>
                    <Card.Text>Phone Number: 9999999999</Card.Text>
                    <Button variant="primary" onClick={() => setModalShow(true)}>More Information</Button>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Card.Body>
            </Card>
        </div>
    )
}

export default AdminCus