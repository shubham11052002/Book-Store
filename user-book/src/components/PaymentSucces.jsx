import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { Container,Row ,Col} from 'react-bootstrap';

const PaymentSucces = () => {
  let [transactionId, setTransactionId] = useState('');
  transactionId = localStorage.getItem('transactionId');
  useEffect(()=>{
   setTransactionId(transactionId)
    let url = import.meta.env.VITE_BASE_API + '/update/transaction'
    let data = {
      transactionId : transactionId
    }
    axios({
      url:url,
      method:'put',
      data:data,
    }).then(()=>{

    }).catch((err)=>{
      console.log(err," error")
    })
  },[transactionId]);

  return (
   <Container>
    <Row>
  <Col>
  <div style={{border:'2px solid black'}}>
  <h1>Your Transection has been Succesfully Done...</h1>
  <h3>TransectionId : {transactionId} </h3>
  <h3>Status : Complete 👍</h3>
  </div>
  </Col>
    </Row>
   </Container>
  )
}
export default PaymentSucces
