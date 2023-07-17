// import axios from 'axios'

// const base_url='http://localhost:8088/event'

// class eventservice{
  
//     getAllEvent(){
//         return axios.get(base_url);
//     }

//      createEvent(event){
//         return axios.post(base_url,event);
//      }
    

//     getEventById(eventId){
//         return axios.get(base_url + '/' + eventId);
//     }

//     updateEvent(event)
//     {
//         return axios.put(base_url, event);
//     }

//     deleteEvent(eventId){
//         return axios.delete(base_url + '/' + eventId);
//     }
// }

// const eventService = new eventservice();

// export default eventService;

import axios from 'axios';

const baseURL = 'http://localhost:8088/event';

class EventService {
  getAllEvents() {
    return axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createEvent(event) {
    return axios.post(baseURL, event, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getEventById(eventId) {
    return axios.get(`${baseURL}/${eventId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateEvent(event) {
    return axios.put(baseURL, event, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  deleteEvent(eventId) {
    return axios.delete(`${baseURL}/${eventId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

const eventService = new EventService();

export default eventService;
