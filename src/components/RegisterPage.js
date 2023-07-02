import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/RegisterPage.css'
const RegisterPage = () => 
{
const navigate =useNavigate();
  const[data,setData]=useState(
    {
      attendeename:'',
      attendeemail:'',
      attendeephone:'',
      attendeeaddress:'',
  });

  const{attendeename,attendeemail,attendeephone,attendeeaddress} = data;


  const { id } = useParams();
  const Id = parseInt(id);
    //console.log(id);

const handler = e =>
{
  setData({...data,[e.target.name]:e.target.value});
}


const submithandler = async (e) => {
  e.preventDefault();
  if(attendeephone.length !== 10)
  {
    alert("Phone Number Should be 10 digits !!!");
    return;
  }
  else
  {
  const attendeedata = {
    name: data.attendeename,
    email: data.attendeemail,
    phone: data.attendeephone,
    address: data.attendeeaddress,
    event: {
      id: Id
    }
  };

  try 
  {
    const response = await fetch('http://localhost:8088/attendee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendeedata),
    }
    );
   
    if (response.ok)
     {
      console.log('Data sent successfully');
      navigate('/payment');
    } 
    else 
    {
      console.error('Error sending data:', response.status);
    }
  } 
  catch (error)
   {
    console.error('Error:', error);
  }
}
};



  return (
    <div>
      <h2> Event Registration </h2>
      <div className='containerregi'>
      <div className='apply_box'>
      
      <form onSubmit={submithandler} autoComplete='off'>
        <center><h2>Event Details</h2></center>
        <div className='inputinfo' >
          <label> Enter  your Name - </label>
          <br/>
          <input type="text" name="attendeename"  value={attendeename} onChange={handler}  />
           <br/>
           <br/>

          <label> Enter  your Mail - </label>
          <br/>
          <input type="email" name="attendeemail" value={attendeemail} onChange={handler} />
          <br/>
          <br/>

          <label> Enter  your Phone - </label>
          <br/>
          <input type="text" name="attendeephone" value={attendeephone} onChange={handler}/>
          <br/>
          <br/>

          <label> Enter  your Address - </label>
          <br/>
          <input type="text" name="attendeeaddress" value={attendeeaddress} onChange={handler}/>
          <br/>
          <br/>
          <input type="hidden" name="id" value={Id} />
          <br/>

          </div>

          <div className='button-input'> 
          <input type='submit' name="Submit"  />
          <input type="reset" name="Reset" />
          <input type="button" value="Back" onClick={() => navigate('/')}  />
          </div>

       
      </form>
      </div>
      </div>
      
    </div>
  )
}

export default RegisterPage
