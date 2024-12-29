import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css"; // Add this import for the CSS

const Sidebar = () => {
  const navigate = useNavigate();

  // Function to handle the logout action
  const handleLogout = async () => {
    try {
      // Send the logout request to the backend API
      const response = await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add the token from local storage
          },
        }
      );

      // If successful, remove the token from localStorage and navigate to login page
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
