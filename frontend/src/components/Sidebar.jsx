import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
const handleLogout = async (e) => {
  e.preventDefault();

  // Clear local state and redirect to login page immediately
  localStorage.removeItem("authToken");
  setIsAuthenticated(false);
  navigate("/login");

  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (error) {
    console.error("Logout API call failed:", error);
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
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
