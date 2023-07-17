import React from 'react'
import '../styles/AdminDashboard.css'
import { Link } from 'react-router-dom';

const AdminCard = ({ path, background, heading }) => {
    return (
      <Link to={path} className="cardadmin" style={{ backgroundImage: `url(${background})` }}>
        <div className="card-content">
          <h3 className="card-heading">{heading}</h3>
        </div>
      </Link>
    );
  };

export default AdminCard
