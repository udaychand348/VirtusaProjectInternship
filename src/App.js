import AddEvents from './components/AddEvents';
import {BrowserRouter , Route, Routes } from 'react-router-dom';
import ListEvents from './components/ListEvents';
import EventDetails from './components/EventDetails';
import RegisterPage from './components/RegisterPage';
import PaymentPage from './components/PaymentPage';
import TicketPage from './components/TicketPage';
import Eventprice from './components/Eventprice';

import React from 'react'

const App = () => {
  return (
    <div>
      <BrowserRouter>
            <Routes>  
              <Route path = "/"  element={<ListEvents/>} />
              <Route path = "/edit-event/:id" element = {<AddEvents/>} />
              <Route path = "/event" element= {<ListEvents/>} />
              <Route path = "/add-event" element= {<AddEvents/>} />
              
              <Route path = "/viewevents/:id" element={<EventDetails/>} />
              <Route path = "/registerpage/:id" element={<RegisterPage/>} />
              <Route path = "/eventprice/:id"  element={<Eventprice/>} /> 
              
              <Route path="/payment/:id/:aid" element={<PaymentPage />} />
              <Route path="/ticket/:id/:aid/:tid" element={<TicketPage />} />

            </Routes>
       
  </BrowserRouter>
      
    </div>
  )
}

export default App



