import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const Eventprice = () => {
  const { id } = useParams();
  const Id = parseInt(id);
  const [data, setEventData] = useState([]);

  const [price, setPrice] = useState('');

const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8088/event/${id}`);
        const jsonData = await response.json();
        setEventData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData =
     {
      price:  parseFloat(price),
      event: {
        id: Id,
      },
    };

    try {
      const response = await fetch('http://localhost:8088/eventprice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

    if (response.ok)
     {
      console.log('price set successfully for event');
      console.log('Submitted data:', eventData);
      navigate('/event');
    } 
    else 
    {
      console.error('Error sending data:', response.status);
    }
    } catch (error) 
    {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Pricing Page</h2>
      <center>
        <h2>{data.name}</h2>
        <form onSubmit={handleSubmit}>
          <h2>Set Ticket Price for event : </h2>
          <input
            type="text"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <br/>
          <br/>
          <button type="submit">Submit</button>
        </form>
      </center>
    </div>
  );
};

export default Eventprice;
