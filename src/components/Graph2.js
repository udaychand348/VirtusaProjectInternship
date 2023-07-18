import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Chart } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
Chart.register()

const Graph2 = () => {
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
        console.error('Error fetching event adata:', error);
      });
  }, [token]);

  const eventData = events.map((event) => ({
    eventName: event.name,
    ticketsCount: event.tickets.length,
  }));

  const eN = eventData.map((data) => data.eventName);
  const tC = eventData.map((data) => data.ticketsCount);

  const data = {
    labels: eN,
    datasets: [
      {
        label: 'Tickets Count ',
        data: tC,
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
        title:'Events and Tickets Data'
     },
   }
    

  };

  return (
    <div style={{"height":400,"width":800,margin:"auto"}}>
      <h2>Event Tickets Graph</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default Graph2;

