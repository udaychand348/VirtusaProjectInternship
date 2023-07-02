
import AddEvents from './components/AddEvents';
import {BrowserRouter , Route, Routes } from 'react-router-dom';
import ListEvents from './components/ListEvents';
import EventDetails from './components/EventDetails';
import RegisterPage from './components/RegisterPage';
import Payment from './components/Payment';
function App() {
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
      <Route path  ="/payment" element={<Payment/>} />
    </Routes>
        
   </BrowserRouter>

   </div>
  );
}

export default App;





