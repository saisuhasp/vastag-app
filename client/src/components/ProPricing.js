import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap"

const ProPricing = () => {
    const [userData, setUserData] = useState({
        tier1_name: "",
        tier1_price: "",
        tier1_details: "",
        tier2_name: "",
        tier2_price: "",
        tier2_details: "",
        tier3_name: "",
        tier3_price: "",
        tier3_details: "",
    });
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })

    }
    const proPricingForm = async (e) => {
        e.preventDefault();
        
        const res = await fetch('/pro', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tier1_name:userData.tier1_name,
                tier1_price:userData.tier1_price,
                tier1_details:userData.tier1_details,
                tier2_name:userData.tier2_name,
                tier2_price:userData.tier2_price,
                tier2_details:userData.tier3_details,
                tier3_name:userData.tier3_name,
                tier3_price:userData.tier3_price,
                tier3_details:userData.tier3_details,
            })
        });
        console.log(userData)
        const data = await res.json();
        if (!data) {
            console.log("message not sent");
        } else {
            alert("Message Sent");
        }
    }
    return (
        <div className="pricing-page">
            <h1>Pricing Tiers</h1>
            <Form method="POST">
                <Card>
                    <Card.Header>Tier 1</Card.Header>
                    <Card.Body>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext" >
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control type="text" placeholder="Name" name="tier1_name"
                                    onChange={handleInputs}

                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="5">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>₹</InputGroup.Text>
                                    <FormControl aria-label="Amount (to the nearest dollar)" name="tier1_price"
                                        onChange={handleInputs}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Details
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Details"
                                    style={{ height: '100px' }}
                                    name="tier1_details"
                                    onChange={handleInputs}
                                />
                            </Col>
                        </Form.Group>
                    </Card.Body>
                </Card>
                <br />

                <Card>
                    <Card.Header>Tier 2</Card.Header>
                    <Card.Body>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control type="text" placeholder="Name" name="tier2_name"
                                    onChange={handleInputs}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="5">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>₹</InputGroup.Text>
                                    <FormControl aria-label="Amount (to the nearest dollar)" name="tier2_price"
                                        onChange={handleInputs}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Details
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Details"
                                    style={{ height: '100px' }}
                                    name="tier2_details"
                                    onChange={handleInputs}

                                />
                            </Col>
                        </Form.Group>
                    </Card.Body>
                </Card>
                <br />

                <Card>
                    <Card.Header>Tier 3</Card.Header>
                    <Card.Body>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control type="text" placeholder="Name" name="tier3_name"
                                    onChange={handleInputs}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="5">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>₹</InputGroup.Text>
                                    <FormControl aria-label="Amount (to the nearest dollar)" name="tier3_price"
                                        onChange={handleInputs}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Details
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Details"
                                    style={{ height: '100px' }}
                                    name="tier3_details"
                                    onChange={handleInputs}

                                />
                            </Col>
                        </Form.Group>
                    </Card.Body>
                </Card>
                <br />
                <Button variant="success" size="lg" onClick={proPricingForm}>Submit</Button>
            </Form>

        </div>

    )
}

export default ProPricing