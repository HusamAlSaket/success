import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Add this import for the CSS

const Sidebar = () => {
  return (
    <div className="sidenav">
      <div className="sidenav-header">
        <h2>Admin Panel</h2>
      </div>
      <div className="sidenav-links">
        <Link to="/dashboard" className="sidenav-link">
          Dashboard
        </Link>
        <Link to="/codes" className="sidenav-link">
          Code Management
        </Link>
        <Link to="/packages" className="sidenav-link">
         Package Management
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
