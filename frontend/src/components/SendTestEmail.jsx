import React from "react";
import axios from "axios";

const SendTestEmail = () => {
  // Function to send the email when the button is clicked
  const sendEmail = async () => {
    try {
      // Make GET request to your Laravel backend (API route)
      const response = await axios.get("http://localhost:8000/send-email");
      console.log(response.data); // Logs: 'Test email has been sent!'
    } catch (error) {
      console.error("Error sending email:", error); // Logs errors if the request fails
    }
  };

  return (
    <div>
      {/* Button to trigger the sendEmail function */}
      <button onClick={sendEmail}>Send Test Email</button>
    </div>
  );
};

export default SendTestEmail;
