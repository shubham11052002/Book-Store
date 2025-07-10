import React, { useEffect, useState } from 'react'
import { Container, Button, Form } from "react-bootstrap" 
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"

const EditUser = () => {

    const navigate = useNavigate();
    let [user , setUser] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        status: 'Active'

    });
    let [status , setStatus] = useState('Active');


    let params = useParams()

    let id = params.id;


    useEffect(() => {
        
        axios({
            url : 'http://localhost:3001/users/'+id,
            method : 'get',
            

        }).then((res) => {
            console.log(res.data.data)
            setUser(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    } , [id])


// Handle status change
  const handleStatusChange = (e) => {
    // setStatus(e.target.value);
    setUser((prevUser) => ({
      ...prevUser,
      status: e.target.value
    }));
  };



    function editUser(id)
    {

        

        
        axios({
            url : `http://localhost:3001/users/${id}`,
            method : 'put',
            data : user,
            

        }).then((res) => {
            navigate('/users')
        }).catch((err) => {
            console.log(err)
        })
    }



  return (
    <Container>
        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"  name="firstName" value={ user.firstName } placeholder="Enter First Name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" value={ user.lastName } placeholder="Enter Last Name"  />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control type="text" name="mobileNo" value={ user.mobileNo }  placeholder="Enter Mobile No" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={ user.email } placeholder="Enter Email"  />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select aria-label="Default select example" onChange =  {handleStatusChange}>
                                           <option value="Active">Active</option>
                                           <option value="Disabled">Disabled</option>
                                       </Form.Select>
                                      
                        </Form.Group>
                        
                       
                        <Button variant="dark" onClick={ () => editUser(user._id) }>Edit</Button>
                        
                    </Form>
    </Container>
  )
}

export default EditUser
