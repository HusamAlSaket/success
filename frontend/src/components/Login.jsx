import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  // Handle initial login (email + password)
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      // Only set OTP sent if we get a successful response
      if (response.data && response.status === 200) {
        setIsOtpSent(true);
      }
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data && err.response.data.email) {
          setError(err.response.data.email[0]);
        } else {
          setError("Invalid email or password");
        }
      } else if (err.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post(
        "http://localhost:8000/api/verify-otp",
        {
          otp,
          email,
        }
      );

      if (response.data && response.data.access_token) {
        // Store token with the correct key name
        localStorage.setItem("authToken", response.data.access_token);
        // Update authentication state
        setIsAuthenticated(true);
        // Navigate to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to verify OTP. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      {!isOtpSent ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleOtpVerification}>
          <h2>Enter OTP</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default Login;
