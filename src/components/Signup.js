import React from 'react'
import { Form,Button } from 'react-bootstrap';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate =useNavigate();
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [lastName,setLastName] = useState('');
    const [phoneNumber,setPhoneNumber]= useState('');
    const [username,setUserName]=useState('');
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      if(password.length<8)
      {
        alert('Password should be atleast 8 characters');
        return;

      }
      const User=
      {
        firstName:firstName,
        lastName:lastName,
        username:username,
        password:password,
        phoneNumber:phoneNumber
      }

      try
      {
        const response = await  fetch('http://localhost:8088/api/register',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(User),
          });
        if(response.ok)
        {
            const responseData = await response.json();
           // console.log(responseData);
            console.log(responseData.userId);
            navigate('/login');

        }
        else
        {
          console.log('response',response.status);
           alert('Registration unsuccessful Try again'); 
        }

      }
      catch(error)
      {
        console.log("Error",error);
      }

    
    };



  return (
    <div>
      
       <Form onSubmit={handleSubmit} autoComplete='off'>


       <Form.Group className="mb-3" controlId="formBasicfirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control  type="text"
          placeholder="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} />
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasiclastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control  type="text"
          placeholder="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  type="email"
          placeholder="email"
          value={username}
          onChange={(e) => setUserName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control  type="text"
          placeholder="phone Number"
          value={phoneNumber}
          onChange={(e) =>setPhoneNumber(e.target.value)} />
      </Form.Group>


 

      <div className="d-grid gap-2">
      <Button variant="success"  size="lg" type="submit" > 
        Submit
      </Button>
      </div>

    </Form>
    </div>
  )
}

export default Signup
