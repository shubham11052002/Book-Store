import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Checkout() {
  let name = localStorage.getItem("name");
  let email = localStorage.getItem("email");
  let mobileNo = localStorage.getItem("mobileNo");
  const navigate = useNavigate();
  const book = JSON.parse(localStorage.getItem("book"));

  let [shippingAddressLine1, setShippingAddressLine1] = useState("");
  let [shippingAddressLine2, setShippingAddressLine2] = useState("");
  let [shippingAddressCity, setShippingAddressCity] = useState("");
  let [shippingAddressState, setShippingAddressState] = useState("");
  let [shippingAddressCountry, setShippingAddressCountry] = useState("India");
  let [shippingAddressZipCode, setShippingAddressZipCode] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/home");
    }
  }, [navigate]);

  async function goToPurchase() {
    let data = {
      email:email,
      firstName:name,
      mobileNo:mobileNo,
      shippingAddressLine1:shippingAddressLine1,
      shippingAddressLine2:shippingAddressLine2,
      shippingAddressCity:shippingAddressCity,
      shippingAddressState: shippingAddressState,
      shippingAddressCountry: shippingAddressCountry,
      shippingAddressZipCode: shippingAddressZipCode,  
    };

    const stripe = await loadStripe(
      "pk_test_51QnBX1BIi4EFVacMePhRzjTR6EFnuVMgFTsufpGx0V8PBxVlkxZBgvP2d3yPQsHY1UCccwUhv9A0byWyHWw0oCzW00YZQAt2ec"
    );

    let cart = [book];
    const body = { products: cart, data };
    let tokenSend = "Bearer " + localStorage.getItem("token");

    axios
      .post(import.meta.env.VITE_BASE_API + "/create-checkout-session", body, {
        headers: { "Content-Type": "application/json", authorization: tokenSend },
      })
      .then((res) => {
        localStorage.setItem("transactionId", res.data.data);
        stripe.redirectToCheckout({ sessionId: res.data.data });
      })
      .catch((err) => {
        alert("Something went wrong in checkout: " + err);
      });
  }

  const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Puducherry",
  ];
  const countries = ["India","China","Nepal","Bhutan","SriLanka"]

  return (
    <Container className="mt-5">
      <Row>
        {/* Left Column - Delivery Form */}
        <Col md={6}>
          <Card className="p-4 shadow-lg border-0">
            <h3 className="mb-4 text-center text-primary">Delivery Details</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control type="text" value={mobileNo} readOnly placeholder="mobile number"/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="House No./Street"
                  value={shippingAddressLine1}
                  onChange={(e) => setShippingAddressLine1(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Landmark"
                  value={shippingAddressLine2}
                  onChange={(e) => setShippingAddressLine2(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={shippingAddressCity}
                  onChange={(e) => setShippingAddressCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  value={shippingAddressState}
                  onChange={(e) => setShippingAddressState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {statesOfIndia.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      as="select"
                      value={shippingAddressCountry}
                      onChange={(e) => setShippingAddressCountry(e.target.value)}
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ZIP Code"
                  value={shippingAddressZipCode}
                  onChange={(e) => setShippingAddressZipCode(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-4 shadow-lg border-0">
            <h3 className="mb-4 text-center text-primary">Product Summary</h3>
            <hr />
            <Row className="mb-3">
              <Col className="fw-bold">Book Name:</Col>
              <Col>{book.bookName}</Col>
            </Row>

            <Row className="mb-3">
              <Col className="fw-bold">Original Price:</Col>
              <Col>&#x20b9;{book.price}</Col>
            </Row>

            <Row className="mb-3">
              <Col className="fw-bold">Discount:</Col>
              <Col>-&#x20b9;{book.discountedUnit}</Col>
            </Row>

            <hr />
            <Row className="mb-3">
              <Col className="fw-bold">Final Price:</Col>
              <Col className="text-success fw-bold">&#x20b9;{book.finalPrice}</Col>
            </Row>

            <Button
              className="w-100 mt-3"
              variant="success"
              size="lg"
              onClick={goToPurchase}
            >
              Pay Now &#x20b9; {book.finalPrice}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
