import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import eventService from '../services/eventservice'
import { useNavigate } from 'react-router-dom'

const ListEvents = () => {
  const navigate=useNavigate();
  //const role = localStorage.getItem('role');
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => 
  {
    const storedRole = localStorage.getItem('role');
    setIsAdmin(storedRole === 'ADMIN');
  }, []);


    const [events, setevents] = useState([])
    useEffect(() => {

      getAllEvent();
  }, [])

  const getAllEvent = () => {
      eventService.getAllEvents().then((response) => {
          setevents(response.data)
          console.log(response.data);
      }).catch(error =>{
          console.log(error);
      })
  }
  const deleteEvent = (eventId) => {
    eventService.deleteEvent(eventId).then((response) =>{
     getAllEvent();

    }).catch(error =>{
        console.log(error);
    })
}
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
    }
    
    const filteredEvents = events.filter(event => {
      const eventName = event.name.toLowerCase();
      const eventDate = event.startDate.toLowerCase();
      const eventLocation = event.location.toLowerCase();
      const query = searchQuery.toLowerCase();
      
      return eventName.includes(query) || eventDate.includes(query) || eventLocation.includes(query);
    });
 
return(

<> 
<div className="event-container">
    <div className="search-container">
  <input
    type="text"
    value={searchQuery}
    onChange={handleSearch}
    className="search-input"
    placeholder="Search by event, date, or location"
  />
</div>
<div className="card-container">
 {filteredEvents.map(event=>(
<div className="card" key={event.id}>
  
  <div className="card-text">
   
    <h2 className="card-title">{event.name}</h2>
<div className="box">
    <p className="card-body">DATE: {event.startDate}</p>
    <p className="card-body">LOCATION: {(event.location)} </p>
    </div>
  <hr/>
  
 
   
  { isAdmin &&<Link className="btn btn-info" to={`/edit-event/${event.id}`} ><button className="btn btn-default">Update</button></Link>}
  { isAdmin &&  <button className="btn btn-default" onClick = {() => deleteEvent(event.id)}> Delete</button>} <div>
                                            <br/>
{/* <button  className="btn-default block" onClick={()=> navigate('/viewevents/'+ event.id )} >View</button> */}
<button className="btn-default block" onClick={() => {
  localStorage.setItem('eventId', event.id);
  navigate('/viewevents');
}}>View</button>

            </div>
</div>
</div>
))
}
</div>

 
{ isAdmin &&<div className="add-event">
<Link className="btn btn-info" to ="/add-event">
<button  className="btn btn-default">Add Event</button>
 
</Link>
</div>
}
</div>


</>
)
}
export default ListEvents;