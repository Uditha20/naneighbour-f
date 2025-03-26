import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Neighbour</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            <i className="bi bi-house me-2"></i>
            Dashboard
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle text-white" id="userManagementDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-people me-2"></i>
            User Management
          </a>
          <ul className="dropdown-menu bg-dark" aria-labelledby="userManagementDropdown">
            <li>
              <Link to="/users" className="dropdown-item text-white">
                <i className="bi bi-person me-2"></i>
                User List
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <i className="bi bi-gear me-2"></i>
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;