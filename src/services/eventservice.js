import axios from 'axios'

const base_url='http://localhost:8088/event'

class eventservice{
  
    getAllEvent(){
        return axios.get(base_url);
    }

     createEvent(event){
        return axios.post(base_url,event);
     }
    

    getEventById(eventId){
        return axios.get(base_url + '/' + eventId);
    }

    updateEvent(event)
    {
        return axios.put(base_url, event);
    }

    deleteEvent(eventId){
        return axios.delete(base_url + '/' + eventId);
    }
}

const eventService = new eventservice();

export default eventService;