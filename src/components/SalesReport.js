import React, { useEffect, useState } from 'react'
import abstract2 from '../logos/abstract1.jpg'; 
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SalesReport = () => {
   const navigate = useNavigate();
    const eventid = localStorage.getItem('sid');
    const token = localStorage.getItem('token');

    const [tickeSales,setSalesReport] = useState([]);

    useEffect(()=>
    {
     
      const tickeSalesDetails = async() =>
      {
         try
         {
            const response = await fetch(`http://localhost:8088/ticket/sales-report/eventId/${eventid}`,
            {
              method: 'GET',
              headers:
              {
                'Content-Type':'application/json',
                Authorization :`Bearer ${token}`,

              },
            });
            if(response.ok)
            {
              const responseData = await response.json();
              setSalesReport(responseData);
              console.log("Ticekt Sales Report",responseData);
            }
            else
            {
                console.log(response.status);
            }
         }
         catch(error)
         {
            console.log("Error is",error);
         }
      };



     tickeSalesDetails();
    },[token,eventid]);

  return (
    <div style={{
      backgroundImage: `url(${abstract2})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', 
      position:'top',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    
    <center>
        <table style={{border:"2px solid black",}}>
            <thead>
            </thead>
            <tbody>
                <tr>
                    <th>Tickets Booked For Event are </th>
                    <th>{tickeSales.totalTicketsBooked}</th>
                </tr>
                <tr>
                    <th>Remaining Tickets for the Event </th>
                    <th>{tickeSales.availableTickets}</th>
                </tr>
                <tr>
                    <th>Number of Attendees for the event</th>
                    <th>{tickeSales.noOfAttendees}</th>
                </tr>
                <tr>
                    <th>Total Price : </th>
                    <th>{tickeSales.totalPrice}</th>
                </tr>
            </tbody>
        </table>
        <br/>
        <br/>
      <Button variant='success' onClick={()=>navigate('/event')}>Back</Button>
    </center>



      
    </div>
  )
}

export default SalesReport
