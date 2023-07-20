import React, {useState, useEffect} from 'react'
import {Link,  useNavigate,useParams } from 'react-router-dom';
import '../styles/EventListingAdding.css'
import eventService from '../services/eventservice';
const AddEvents = () => {
   
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [location, setLocation] = useState('')
    const [totalTicket, setTotalTickets] = useState('')

    const navigate =  useNavigate();
    const {id} = useParams();
    // const id = Number(localStorage.getItem('eid'));

    const saveOrUpdateEvent = (e) =>
     {
        e.preventDefault();

        const event = 
        {
            name,
            description,
            startDate,
            endDate,
            location,
            totalTicket
        }

        if(id)
        {
        event.id = id;
        
          eventService.updateEvent(event).then((response) => {
            console.log(response.data);
            navigate('/event');
            }).catch(error => {
                console.log(error)
            })

        }
        else
        {
            eventService.createEvent(event).then((response) =>{

                console.log(response.data)
    
               navigate('/event');
    
            }).catch(error => {
                console.log(error)
            })
        }
        
    }
    useEffect(() => {
        if (id) {
          eventService
            .getEventById(id)
            .then((response) => {
              setName(response.data.name);
              setDescription(response.data.description);
              setStartDate(response.data.startDate);
              setEndDate(response.data.endDate);
              setLocation(response.data.location);
              setTotalTickets(response.data.totalTicket);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, [id]);
      

    const value = () => {

        if(id){
            return <h2 >Update Event</h2>
        }else{
            return <h2 >Add Event</h2>
        }
    }

    return (
        <div>
           <br /><br />
          
                <div className = "event-img-section card">
                    <div className = "event-form-card">
                       {
                           value()
                       }
                        <div className = "event-form-card-body">
                            <form>
                            
                                <div className = "event-form-group">
                                    <label htmlFor= "name"> Name </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the event name"
                                        name = "name"
                                        className = "event-form-control"
                                        value = {name}
                                        onChange = {(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>
                               
                                <div className = "event-form-group">
                                    <label htmlFor= "description">Description</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the description"
                                        name = "description"
                                        className = "event-form-control"
                                        value = {description}
                                        onChange = {(e) => setDescription(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "event-form-group ">
                                    <label htmlFor= "startdate"> StartDate </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the startdate in yyyy-mm-dd"
                                        name = "startdate"
                                        className = "event-form-control"
                                        value = {startDate}
                                        onChange = {(e) => setStartDate(e.target.value)}
                                    >
                                    </input>
                                </div>


                                <div className = "event-form-group ">
                                    <label htmlFor= "enddate"> EndDate </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the enddate in yyyy-mm-dd"
                                        name = "enddate"
                                        className = "event-form-control"
                                        value = {endDate}
                                        onChange = {(e) => setEndDate(e.target.value)}
                                    >
                                    </input>
                                </div>


                                <div className = "event-form-group">
                                    <label htmlFor = "location"> Location </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter the location"
                                        name = "location"
                                        className = "event-form-control"
                                        value = {location}
                                        onChange = {(e) => setLocation(e.target.value)}
                                    >
                                    </input>
                                </div>
                                
                                
                                <div className = "event-form-group">
                                    <label htmlFor= "totalTicket"> TotalTickets </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter total no.of.tickets"
                                        name = "totalTicket"
                                        className = "event-form-control"
                                        value = {totalTicket}
                                        onChange = {(e) => setTotalTickets(Number(e.target.value))}
                                    >
                                    </input>
                                </div>

                                <button className = "event-btn event-btn-default" onClick = {(e) => saveOrUpdateEvent(e)} >Submit </button>
                                <Link to="/event" className="event-btn event-btn-default" style={{marginLeft:20+'px'}}> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

    
    )
}

export default AddEvents;