import React, { useEffect, useState } from "react";
import axios from "axios";
import './Dashboard.css'; // Same folder, so just use the relative path
const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    used_codes: 0,
    not_used_codes: 0,
    total_students: 0,
  });

  // Fetch student data and stats on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get(
          "http://localhost:8000/api/students"
        );
        setStudents(studentsResponse.data);

        const statsResponse = await axios.get(
          "http://localhost:8000/api/students/stats"
        );
        setStats(statsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>{stats.total_students}</p>
        </div>
        <div className="card">
          <h3>Codes Used</h3>
          <p>{stats.used_codes}</p>
        </div>
        <div className="card">
          <h3>Codes Not Used</h3>
          <p>{stats.not_used_codes}</p>
        </div>
      </div>

      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Email</th> */}
            <th>Phone Number</th>
            <th>Code</th>
            <th>Year</th>
            <th>City</th>
            <th>Speciality</th>
            {/* <th>Password</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.full_name}</td>
              {/* <td>{student.email}</td> */}
              <td>{student.phone_number}</td>
              <td>{student.code}</td>
              <td>{student.year}</td>
              <td>{student.city}</td>
              <td>{student.specialty}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
