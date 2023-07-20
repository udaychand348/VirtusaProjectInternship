import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import abstract1 from '../logos/abstract1.jpg'; 

const Profile = () => {
  const [data, setData] = useState([]);


  const userid = localStorage.getItem('userid');
  const token =localStorage.getItem('token');
  console.log("JWT TOKEN in Profile page ",token);
  // const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => 
  // {
  //   const storedRole = localStorage.getItem('role');
  //   setIsAdmin(storedRole === 'ADMIN');
  // }, []);

 const navigate = useNavigate();


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userid = localStorage.getItem('userid');
        console.log(userid);
        const response = await fetch(`http://localhost:8088/api/profile/${userid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log(setData);
          setData(userData);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserProfile();
  }, [userid,token]);

  return (
    <div  style={{
      backgroundImage: `url(${abstract1})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <center>
        <h2> User Details </h2>

        <table>
        <thead></thead>

        <tbody>
        <tr>
          <th>  Email  </th>
          <th> {data.username} </th>
       
        </tr>

        <tr>
           <th> First Name </th>
           <th>{data.firstName} </th>
        
        </tr>

        
        <tr>
            <th> Last Name </th>
            <th>{data.lastName}</th>
        
        </tr>


        <tr>
            <th> Phone Number </th>
            <th>{data.phoneNumber}</th>
       
        </tr>

        </tbody>
        </table>

        <Button variant='success' style={{textAlign:"center"}} onClick={()=> navigate("/editprofile")}>Edit</Button>
      </center>
    </div>
  );
};

export default Profile;
