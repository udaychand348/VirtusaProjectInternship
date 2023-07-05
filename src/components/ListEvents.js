import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import eventService from '../services/eventservice'
import '../styles/EventListingAdding.css'

const ListEvents = () => {

    const navigate = useNavigate();

    const [events, setevents] = useState([])
    useEffect(() => {

      getAllEvent();
  }, [])

  const getAllEvent = () => {
      eventService.getAllEvent().then((response) => {
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
return(
<> <div className="container"> {events.map(event=>(
<div className="card" key={event.id}>
  
  <div className="card-text">
   
    <h2 className="card-title">{event.name}</h2>
<div className="box">
    <p className="card-body">DATE: {event.startDate}</p>
    <p className="card-body">LOCATION: {event.location} </p>
    </div>
  <hr/>
  
 
   
<Link className="btn btn-info" to={`/edit-event/${event.id}`} ><button className="btn btn-default">Update</button></Link>
                                    <button className="btn btn-default" onClick = {() => deleteEvent(event.id)}> Delete</button><div>
                                            <br/>
                <button  className="btn-default block" onClick={()=> navigate('/viewevents/'+ event.id )} >View</button>
                
                <button  className="btn-default block" onClick={()=> navigate('/eventprice/'+ event.id )} >Set Price </button>
            </div>
</div>
</div>
))
}
</div>

 
<div className="add-event">
<Link className="btn btn-info" to ="/add-event">
<button  className="btn btn-default">Add Event</button>
 
</Link>
</div>

</>
)
}
export default ListEvents;