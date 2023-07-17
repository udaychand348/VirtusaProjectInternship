import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Attendee.css'




const Attendees= () => {
  const [attendees, setAttendees] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAttendees();
  });

  const fetchAttendees = () => 
  {
    axios.get('http://localhost:8088/attendee',
    {
    method: 'GET',
    headers:
     {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
     },
    })
      .then(response => {
        setAttendees(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendees:', error);
      });
  };

//   const handleDelete = (attendeeId) => {
//     axios.delete(`http://localhost:8088/attendee/${attendeeId}`,
//     {
//         method: 'DELETE',
//         headers:
//          {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//          },
//         })
//       .then(response => {
       
//           fetchAttendees(); 
        
//       })
//       .catch(error => {
//         console.error(error);
       
//       });
//   };

  return (
   <div className="getAllAttendees-body">
 <div>
      <h2 className="getAllAttendees-heading">AttendeeList</h2>
      <div className="getAllAttendees-table">
      {attendees.length >0 ? (
        
        <table >
          <thead className="getAllAttendees-table-head">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>address</th> 
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.id}>
                <td className="getAllAttendees-td">{attendee.id}</td>
                <td className="getAllAttendees-td">{attendee.name}</td>
                <td className="getAllAttendees-td">{attendee.email}</td>
                <td className="getAllAttendees-td">{attendee.phone}</td>
                <td className="getAllAttendees-td">{attendee.address}</td>
                <td className="getAllAttendees-td">
                {/* <button className="getAllAttendees-delete-button" onClick={() => handleDelete(attendee.id)}>Remove</button> */}
              </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendees found.</p>
        
      )}
    </div>
    </div>
    </div>
  );
};

export default Attendees;