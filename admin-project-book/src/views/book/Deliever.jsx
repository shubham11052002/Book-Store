import axios from 'axios';
import React, { useState } from 'react'
import { Container,Button, Form, Row, Col } from 'react-bootstrap'

const Deliever = () => {

    const [pincode, setPincode] = useState('');
  const [serviceAvailable, setServiceAvailable] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [areasCovered, setAreasCovered] = useState('');
  
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate and handle the form submission (you can send this data to the backend here)
    const pincodeData = {
      pincode,
      serviceAvailable,
      deliveryTime,
      areasCovered: areasCovered.split(',').map(area => area.trim()),
      isActive,
    };


    axios({
        url : 'http://localhost:3001/deleivery',
        method : 'post',
        data : pincodeData,
    }).then((res) => {
        console.log(res);
        alert('Pincode Added Successfully');
    }).catch((err) => {
        console.log(err);
    })
}


    return (
        <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h3>Add New Pincode</h3>
            <Form onSubmit={handleSubmit}>
              {/* Pincode */}
              <Form.Group controlId="pincode" className='mt-4'>
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                  maxLength={6}
                  pattern="[0-9]{6}" // Only 6 digits
                />
              </Form.Group>
  
              {/* Service Available */}
              <Form.Group controlId="serviceAvailable" className='mt-4'>
                <Form.Check
                  type="checkbox"
                  label="Service Available"
                  checked={serviceAvailable}
                  onChange={(e) => setServiceAvailable(e.target.checked)}
                />
                {serviceAvailable}
              </Form.Group>
  
              {/* Delivery Time */}
              <Form.Group controlId="deliveryTime" className='mt-4'>
                <Form.Label>Delivery Time</Form.Label>
                <Form.Control
                  as="select"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  required
                >
                  <option value="">Select Delivery Time</option>
                  <option value="1-3 days">1-3 days</option>
                  <option value="4-7 days">4-7 days</option>
                  <option value="7-10 days">7-10 days</option>
                </Form.Control>
              </Form.Group>
  
              {/* Areas Covered */}
              <Form.Group controlId="areasCovered" className='mt-4'>
                <Form.Label>Areas Covered (comma separated)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter areas covered (e.g., Connaught Place, Rajiv Chowk)"
                  value={areasCovered}
                  onChange={(e) => setAreasCovered(e.target.value)}
                  required
                />
              </Form.Group>
  
              
  
              {/* Active Status */}
              <Form.Group controlId="isActive" className='mt-4 mb-4'>
                <Form.Check
                  type="checkbox"
                  label="Active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </Form.Group>
  
              {/* Submit Button */}
              <Button variant="primary" type="submit">
                Save Pincode
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
       
    )
}

export default Deliever
