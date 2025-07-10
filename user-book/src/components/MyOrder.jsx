import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container,Button, Modal, Form ,Card} from 'react-bootstrap'
import './Order.css'

function MyOrder() {
    let [review,setReview] = useState('');
    let [myOrders , setMyOrders] = useState([]);
    let [productId, setProductId] = useState('')
    let [showModal, setshowModal] = useState(false);
    useEffect(() => {
        let email = localStorage.getItem('email');
        let url = import.meta.env.VITE_BASE_API + '/myorder'
        axios({
            url: url,
            method: 'get',
            params:{
                email:email,
            }
        }).then((res) => {
            setMyOrders(res.data.data)
        }).catch((err) => {
            console.log(err.message, 'msg');
        })
    }, [])
    function openRevieModal(id){
        // alert(id)
        setProductId(id);
        setshowModal(true)
    }
    const handleClose = () => {
        setshowModal(false);
        window.location.reload();
    };
    function submitReview(){
       // alert(productId)
        let url = import.meta.env.VITE_BASE_API + '/review/'
        let tokenSend = 'Bearer' + ' ' + localStorage.getItem('token')
        let data = {
            product : productId,
            review:review,
        }
        const headers = {
            authorization:tokenSend,
        }
        axios({
            url:url,
            method:'post',
            data:data,
            headers:headers,
        }).then(()=>{
            alert("your review has been submitted succesfully");
            setshowModal(false);
        }).catch(()=>{
            alert('something went wrong');
            setshowModal(false);
        })
    }
    return (
       <>
       <Container fluid className="py-4">
      <h1 className="mb-4 text-center text-dark fw-bold">📚 My Orders</h1>
      
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {myOrders.map((myOrder, i) => (
          <Card key={i} className="shadow-sm p-3 rounded" style={{ maxWidth: "450px", minHeight: "250px" }}>
            <Card.Body>
              <Card.Title className="fw-semibold text-dark">{myOrder.products[0].booknName}</Card.Title>
              
              <h5 className="text-success fw-bold">&#x20b9; {myOrder.products[0].finalPrice}</h5>
              
              <p className="mb-1 text-muted"><strong>Buyer:</strong> {myOrder.firstName}</p>
              <p className="mb-1 text-muted"><strong>Contact:</strong> {myOrder.mobileNo}</p>

              <h6 className="mt-3 text-dark">📍 Shipping Address</h6>
              <p className="text-muted">
                {myOrder.shippingAddressLine1}, <br />
                {myOrder.shippingAddressLine2}, <br />
                {myOrder.shippingAddressCity}, {myOrder.shippingAddressState}
              </p>

              <Button variant="dark" className="w-100 fw-bold mt-2" onClick={() => openRevieModal(myOrder.products[0]._id)}>
                ✍️ Write a Review
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Review Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Give Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Write your review here:</Form.Label>
            <Form.Control as="textarea" rows={4} onChange={(e) => setReview(e.target.value)} />
          </Form.Group>
          <Button variant="dark" className="w-100 fw-bold" onClick={submitReview}>
            Submit Review
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
       </>
    )

}
export default MyOrder
