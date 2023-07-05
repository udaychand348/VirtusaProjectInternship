import React, { useEffect } from 'react';
import bookinglogo from '../logos/success.png';
import {  useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import '../styles/TicketPage.css'
const TicketPage = () =>
{
  const{id, aid,tid}  = useParams();
  console.log("Ticket Page event id",id);
  console.log("Ticket Page attendee id",aid);
  console.log("Ticket page tid is",tid);

  const navigate = useNavigate();
  //const location = useLocation();
  //console.log(location.state)

  const handlehome = () => {
    navigate('/')

  };

  const handleDownload = () =>
  {
    const ticketpagedownload = document.getElementById('ticketpage-download');

    html2canvas(ticketpagedownload).then((canvas) =>
    {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData,'PNG',0,0,pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('ticket.pdf');
    });
  };

  
  
  const [event, setEvent] = useState('');
  const [attendee,setAttendee] = useState('');
  const [ticket, setTicket] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8088/event/${id}`);
        const jsonData = await response.json();
        setEvent(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAttendeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8088/attendee/attendee/${aid}`);
        const jsonData = await response.json();
        setAttendee(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8088/ticket/ticket/${tid}`);
        const jsonData = await response.json();
        setTicket(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventDetails();
    fetchAttendeeDetails();
    fetchTicketDetails();
  }, [id, aid,tid]);
 
 

  return (
    <div id="ticketpage-download">
    <div className="ticket-confirmation">
      <div className="ticket">
        <h2>Booking Confirmation</h2>
        <img src={bookinglogo} alt="Booking Logo" style={{maxHeight: '200px', width: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block'}}/>
        <div className="ticket-info">
          <div className="ticket-field">
            <span className="ticket-label">Event:</span>
            <span className="ticket-value">{event.name}</span>
          </div>
          <div className="ticket-field">
            <span className="ticket-label">startDate:</span>
            <span className="ticket-value">{event.startDate}</span>
          </div>
          <div className="ticket-field">
            <span className="ticket-label">End Date</span>
            <span className="ticket-value">{event.endDate}</span>
          </div>
          <div className="ticket-field">
            <span className="ticket-label">Venue:</span>
            <span className="ticket-value">{event.location}</span>
          </div>
          <div className="ticket-field">
            <span className="ticket-label">Price :</span>
            <span className="ticket-value">{ticket.price}</span>
          </div>
          <div className="ticket-field">
            <span className="ticket-label">Attendee Name:</span>
            <span className="ticket-value">{attendee.name}</span> 
          </div>
          <div className="ticket-field">
            <span className="ticket-label">Attendee Email:</span>
            <span className="ticket-value">{attendee.email}</span> 
          </div>
          <div className="ticket-field">
            <span className="ticket-label">Attendee Phone Number:</span>
            <span className="ticket-value">{attendee.phone}</span> 
          </div>
          <div className="ticket-field">
            <span className="ticket-label">Status:</span>
            <span className="ticket-value">{ticket.status}</span>
          </div>
        </div>
        <button onClick={handlehome} style={{display: 'block', marginRight: 'auto', marginLeft: 'auto', bottom: '0px'}}>
        Home
        </button>
        <br/>
        <button onClick={handleDownload} style={{display: 'block', marginRight: 'auto', marginLeft: 'auto', marginTop:'auto',bottom: '0px'}}>
        Download
        </button>
      </div>
    </div>
    </div>
  )
}


export default TicketPage;
