import React from 'react';
import AdminCard from './AdminCard';

import abstract1 from '../logos/abstract1.jpg'; 
import abstract2 from '../logos/abstract2.jpg';

const AdminDashboard = () => {
 

  return (
    <div className="dashboard">
      <h1> Admin Dashboard </h1>
      <div className="card-containeradmin">
        <AdminCard path="/attendees" background={abstract1} heading="View All Attendees" />
        <AdminCard path="/event" background={abstract2} heading="View All Events" />
        <AdminCard path="/graph" background={abstract2} heading="View Bar Graph" />
      </div>
    </div>
  );
};

export default AdminDashboard;
