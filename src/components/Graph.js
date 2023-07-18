import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
Chart.register()

const Graph = () => {
  const [events, setEvents] = useState([]);
  const token =localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:8088/event',{
        method: 'GET',
        headers:
         {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  }, [token]);

  const eventData = events.map((event) => ({
    eventName: event.name,
    attendeesCount: event.attendees.length,
  }));

  const eventNames = eventData.map((data) => data.eventName);
  const attendeesCount = eventData.map((data) => data.attendeesCount);

  const data = {
    labels: eventNames,
    datasets: [
      {
        label: 'Attendees Count ',
        data: attendeesCount,
        backgroundColor: 'brown',
        hoverBackgroundColor: 'yellow',
      },
    ],
  };

  const options = {
   plugins:
   {
     legend:{
        position:'top',
     },
     title:
     {
        display:true,
        title:'Events and Attendees Data'
     },
   }
    

  };

  return (
    <div style={{"height":400,"width":800,margin:"auto"}}>
      <h2>Event Attendees Graph</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;

