import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Health Insurance DApp</NavLink>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="policiesDropdown" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                Policies
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/policies">View All Policies</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/policies/create">Create Policy</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="claimsDropdown" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                Claims
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/claims">View All Claims</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/claims/submit">Submit Claim</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;