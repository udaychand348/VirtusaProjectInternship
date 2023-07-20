import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import abstract1 from '../logos/abstract1.jpg'; 


const EditProfile = () => 
{

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');
    const [data,userData] = useState([]);
    const navigate = useNavigate();



    const [first,setFirstName] =  useState('');
    const [last,setLastName] =  useState('');
    const [phone,setPhoneNumber] =  useState('');
  
    useEffect(()=>
    {
    const getuserdetails = async() =>
    {
    try
    {
    const response = await fetch(`http://localhost:8088/api/profile/${userid}`,
    {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
    });

    if(response.ok)
    {
      const userdata = await response.json();
      userData(userdata);
      console.log(userdata);
      setFirstName(userdata.firstName);
      setLastName(userdata.lastName);
      setPhoneNumber(userdata.phoneNumber);
    }
   else
   {
        console.log("Response Failed",response.status);
   }
    }
    catch(error)
    {
        console.log(error);
    }
    };
    getuserdetails();
 } ,[userid,token])


  
 
  const submithandler = async(e) =>
  {
    e.preventDefault();
    if(phone.length>10 || phone.length<10)
    {
      alert("phone Number Should be 10 digits");
      return;
    }
    const User=
      {
        firstName:first,
        lastName:last,
        username:data.username,
        password:data.password,
        phoneNumber:phone
      }

      try
      {
        const response = await  fetch(`http://localhost:8088/api/profile/${userid}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(User),
          });
        if(response.ok)
        {
            const responseData = await response.json();
            console.log(responseData);
            navigate('/profile');

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
  }

  return (
    <div  style={{
      backgroundImage: `url(${abstract1})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', // Set minimum height to cover the entire viewport
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <center>
        <h2>Edit  User Details </h2>

        <table>
        <thead></thead>

        <tbody>
        <tr>
          <th>  Email  </th>
          <th>{data.username} </th>
       
        </tr>

        <tr>
           <th> First Name </th>
           <th>
            <input type="text" value={first}  onChange={(e)=>setFirstName(e.target.value)} />
           </th>
        
        </tr>

        
        <tr>
            <th> Last Name </th>
          <th>    <input type="text" value={last}  onChange={(e)=>setLastName(e.target.value)} /> </th>
        
        </tr>


        <tr>
            <th> Phone Number </th>
            <th> <input type="text" value={phone}  onChange={(e)=>setPhoneNumber(e.target.value)} /></th>
       
        </tr>


        </tbody>
        </table>
        <br/>

        <Button variant='success' type="submit"  onClick={submithandler} >Submit</Button>
      </center>

    </div>
  )
}

export default EditProfile
