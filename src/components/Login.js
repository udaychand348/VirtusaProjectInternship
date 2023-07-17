import React from 'react'
import { Form,Button } from 'react-bootstrap';
import { useState } from 'react';


const Login = ({setToken}) =>
 {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isloggedIn, setisloggedIn] = useState(false);
  const [errormessage, setErrorMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const LoginRequest =
    {
      username:username,
      password:password,
    }
    
    try
    {
      const response = await  fetch('http://localhost:8088/api/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(LoginRequest),
        });
      if(response.ok)
      {
          const responseData = await response.json();
          console.log(responseData);
          localStorage.setItem('token',responseData.jwtToken);
          localStorage.setItem('role', responseData.user.roles[0].roleName);
          localStorage.setItem('userid',responseData.user.userId);
          setToken(responseData.jwtToken);
          console.log(responseData.jwtToken);
          setisloggedIn(true);

      }
      else
      {
          console.log('Login Failed');
          setErrorMessage("Login Failed Enter Correct Details");
      }

    }
    catch(error)
    {
      console.log("Error",error);
      setErrorMessage("Login Failed Enter Correct Details");
    }

  
  };

  return (
    <div>
      {
      isloggedIn? (<h2> successfully Logged into the application </h2>) :
      (
      <Form onSubmit={handleSubmit} autoComplete='off'>


        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  type="email"
          placeholder="Email"
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


        <div className="d-grid gap-2">
                  <Button variant="success"  size="lg" type="submit" > 
                  Submit
                  </Button>
        </div>

        { <p> {errormessage}</p>}

</Form>


     ) }

    </div>
  )
}

export default Login
