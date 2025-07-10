import React, { useState , useEffect } from 'react'
import axios from 'axios'
import {  Container,Button, Table, Row, Form } from "react-bootstrap"
// import { Pencil } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import './UserList.css'

const UserList = () => {


    const navigate = useNavigate();
    let [users , setUsers] = useState([])
    let [searchInput , setSearchInput] = useState('')

    useEffect(() => {
        axios({
            url : 'http://localhost:3001/users',
            method : 'get',
            params: {
                
                search: searchInput,
               },

        }).then((res) => {
            // console.log(res.data.data)
            setUsers(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    } , [searchInput])


    function isStatusDisabled(status) {
        return status === 'Disabled'; // Assuming 'disabled' is the value for disabled status
      }



    function handleSearch(e) 
    {

        setSearchInput(e.target.value)

    }


    function gotoEdit(id)
    {

         navigate('/users/' + id)

    }


  return (
    <Container>
   <Row>
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       
                       <Form.Control type="text" placeholder="Search By Name" onChange = { handleSearch} />
                   </Form.Group>
                   
    </Row>



      <Table  bordered hover   className="mt-2">
    <thead>
        <tr>
        {/* <th> userImage </th> */}
        <th>S.No</th>    
        <th>First Name</th>    
        {/* <th>Last Name</th> */}
        <th>Email</th>
        <th>Mobile Number</th>
        <th> Status </th>
        <th>Action</th>
        {/* <th> lastLogin </th> */}

        </tr>
    </thead>
    <tbody>
    {
        users.map((user, i)=> 
            <tr key= {i} className={isStatusDisabled(user.status) ? 'disabled-row' : ''}>
                {/* <td><img src= {user.userImage} width="30px" height= "30px"></img></td> */}
                <td>{ i + 1 }</td>
                <td>{ user.firstName }</td>
                {/* <td>{ user.lastName }</td> */}
                <td>{ user.email }</td>
                <td>{ user.mobileNo }</td>
                <td>{ user.status }</td>
                <td><Button variant="warning" size="sm" onClick={()=> gotoEdit(user._id)}>Edit</Button></td>
                {/* <td>{ user.lastLogin }</td> */}
                {/* <td><Button variant="success" size="sm" onClick={()=> gotoEdit(book._id)}>edit</Button></td> */}
            </tr>
        )
    }
    </tbody>
</Table>
</Container>
  )
}

export default UserList
