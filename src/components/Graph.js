import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Graph = () => {
  const [attendeesData, setAttendeesData] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventNames, setEventNames] = useState('');

  const token = localStorage.getItem('token');
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:8088/event', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching attendee data:', error);
      });
  });

  const eventIds = events.map((val) => val.id);

  useEffect(() => {
    fetchData();
    return () => {
      destroyChart();
    };
  });

  const fetchData = () => {
    setAttendeesData([]);
    setEventNames('');
    eventIds.forEach((eventId) => {
      fetchAttendeesData(eventId);
      fetchEventNameById(eventId);
    });
  };

  const fetchAttendeesData = (id) => {
    axios
      .get(`http://localhost:8081/attendee/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAttendeesData((prevAttendees) => [
          ...prevAttendees,
          { id, attendees: response.data },
        ]);
      })
      .catch((error) => {
        console.error('Error fetching attendee data:', error);
      });
  };

  const fetchEventNameById = (id) => {
    axios
      .get(`http://localhost:8081/event/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEventNames((prevEventNames) => ({
          ...prevEventNames,
          [id]: response.data.name,
        }));
      })
      .catch((error) => {
        console.error(`Error fetching event name for event ID ${id}:`, error);
      });
  };

  const processAttendeesData = () => {
    const eventData = {
      eventNames: [],
      attendeesCount: [],
    };

    attendeesData.forEach((attendee) => {
      const eventName = eventNames[attendee.id];
      const attendeeCount = attendee.attendees.length;

      eventData.eventNames.push(eventName);
      eventData.attendeesCount.push(attendeeCount);
    });

    console.log(eventData.eventNames);
    console.log(eventData.attendeesCount);

    return eventData;
  };

  const attendeesChartData = processAttendeesData();

  const data = {
    labels: attendeesChartData.eventNames,
    datasets: [
      {
        label: 'Number of Attendees',
        data: attendeesChartData.attendeesCount,
        backgroundColor: 'rgb(145, 95, 109)',
        hoverBackgroundColor: 'rgb(119, 7, 55)',
        barPercentage: 0.3,
        barThickness: 90,
      },
    ],
  };

//   const options = {
//     scales: {
//       x: {
//         ticks: {
//           color: '#630330',
//           font: {
//             size: 14,
//             weight: 'bold',
//           },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           color: '#630330',
//           stepSize: 1,
//           font: {
//             size: 12,
//             weight: 'bold',
//           },
//         },
//       },
//     },
//   };

const options = {
    scales: {
      x: {
        type: 'category', // Add this line to define the scale type as 'category'
        ticks: {
          color: '#630330',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#630330',
          stepSize: 1,
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
  };
  

  const destroyChart = () => {
    if (chartRef.current !== null && chartRef.current !== undefined) {
      chartRef.current.chartInstance.destroy();
    }
  };

  return (
    <div>
      <h2>Event Attendees Graph</h2>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default Graph;
