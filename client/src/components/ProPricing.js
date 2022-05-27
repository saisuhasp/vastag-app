import React from "react";
import { Card, Form, Row, Col, InputGroup, FormControl,Button } from "react-bootstrap"

const ProPricing = () => {
    return (
        <div className="pricing-page">
            <h1>Pricing Tiers</h1>
            <Form>
                <Card>
                    <Card.Header>Tier 1</Card.Header>
                    <Card.Body>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control type="text" placeholder="Name" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="5">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>₹</InputGroup.Text>
                                    <FormControl aria-label="Amount (to the nearest dollar)" />
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
                                <Form.Control type="text" placeholder="Name" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="5">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>₹</InputGroup.Text>
                                    <FormControl aria-label="Amount (to the nearest dollar)" />
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
                                <Form.Control type="text" placeholder="Name" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="5">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>₹</InputGroup.Text>
                                    <FormControl aria-label="Amount (to the nearest dollar)" />
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
                                />
                            </Col>
                        </Form.Group>
                    </Card.Body>
                </Card>
                <br />
                <Button variant="success" size="lg">Submit</Button>
            </Form>

        </div>

    )
}

export default ProPricing