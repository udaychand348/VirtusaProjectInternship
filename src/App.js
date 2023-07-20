import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import LandingPage from './components/LandingPage.js'
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Profile from './components/Profile.js';
import EditProfile from './components/EditProfile.js';
import Logout from './components/Logout.js';
import AdminDashboard from './components/AdminDashboard.js'
import Attendees from './components/Attendees.js';
import Graph from './components/Graph.js';
import Graph2 from './components/Graph2.js';

import AddEvents from './components/AddEvents.js'
import ListEvents from './components/ListEvents.js'
import EventDetails from './components/EventDetails.js'
import PaymentPage from './components/PaymentPage.js'
import RegisterPage from './components/RegisterPage.js'
import TicketPage from './components/TicketPage.js'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SalesReport from './components/SalesReport.js';



const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const role = localStorage.getItem('role');
  const isAdmin = role === 'ADMIN';


  return (
    <div>
      <BrowserRouter>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="home">EventManagement</Navbar.Brand>
            <Nav className="me-auto">
              {token ? (
                <>
                  <Nav.Link href="landingpage">Home</Nav.Link>
                  <Nav.Link href="profile">Profile</Nav.Link>
                  <Nav.Link href="event">Events</Nav.Link>
                  {isAdmin && <Nav.Link href="admindashboard">Admin Dashboard</Nav.Link>}
                  <Nav.Link href="logout">Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="landingpage">Home</Nav.Link>
                  <Nav.Link href="login">Login</Nav.Link>
                  <Nav.Link href="signup">Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/profile" /> : <Navigate to="/login" />}
          />

              <Route path="/landingpage" element={<LandingPage />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/logout" element={<Logout setToken={setToken} />} />
              <Route path="/admindashboard"  element={isAdmin ? <AdminDashboard /> : <Navigate to="/home" />} />
              <Route path="/attendees" element={<Attendees/>} />
              <Route path="/graph" element={<Graph />} />
              <Route path="/graph2" element={<Graph2 />} />
              <Route path="/salesreport" element={<SalesReport />} />

              <Route path = "/edit-event/:id" element = {<AddEvents/>} />
              {/* <Route path = "/edit-event" element = {<AddEvents/>} /> */}
              <Route path = "/event" element= {<ListEvents/>} />
              <Route path = "/add-event" element= {<AddEvents/>} />
              
              <Route path = "/viewevents" element={<EventDetails/>} />
              <Route path = "/registerpage" element={<RegisterPage/>} />
              
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/ticket" element={<TicketPage />} />

        </Routes>



      </BrowserRouter>
    </div>
  );
};

export default App;
