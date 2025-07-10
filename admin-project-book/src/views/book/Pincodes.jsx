import React from 'react'
import {  Container,Button, Table, Row, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
const Pincodes = () => {

   const navigate = useNavigate();
    let [pinCodes , setPincodes] = useState([]);
    let [searchInput, setSearchInput] = useState('')


    useEffect(()=> {
        axios({
            url: 'http://localhost:3001/deleivery',
            method: 'get',
            params: {
                
                search: searchInput,
               },
            
        }).then((res)=> {
            setPincodes(res.data.data)
            
        }).catch((err)=> {
            console.log(err)
            alert("something went wrong....")
        })
    }, [searchInput])


  const renderBoolean = (value) => {
    return value ? 'Active' : 'Not Active';
  };

  function handleSearch(e) {
    
    setSearchInput(e.target.value)
}


  function goToAddPage(){

    navigate('/add/delievery')
    
  }




  return (
    <>
       <Container>
            <Row>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                               
                               <Form.Control type="text" placeholder="Search By Area" onChange = { handleSearch } />
                           </Form.Group>
                       </Row>
            <div style={{ float: 'right',marginBottom: '10px' }}>
            <Button variant="primary" onClick={ goToAddPage } >Add Pincode</Button>
            </div>
            
            
              <Table  bordered hover   className="mt-2">
            <thead>
                <tr>
                <th>Pincode</th>    
                <th>Delievery Time</th>
                <th>Currently Service Available Status</th>
                <th>Area Covered</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {
                pinCodes.map((pin, i)=> 
                    <tr key= {i}>
                        
                        <td>{ pin.pincode }</td>
                        <td>{ pin.deliveryTime }</td>
                        <td>{renderBoolean(pin.serviceAvailable)}</td>
                        
                        <td>{ pin.areasCovered }</td>
                        <td>{renderBoolean(pin.isActive)}</td>
                        
                    </tr>
                )
            }
            </tbody>
        </Table>
        </Container>
    </>
  )
}

export default Pincodes
