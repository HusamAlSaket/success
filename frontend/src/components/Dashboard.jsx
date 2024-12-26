import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Dashboard.css"; // Assuming the style is in the same folder
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    used_codes: 0,
    not_used_codes: 0,
    total_students: 0,
  });
  const [modalData, setModalData] = useState(null); // For edit modal
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    code: "",
    year: "",
    city: "",
    specialty: "",
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

  // Handle delete confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the student permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/students/${id}`)
          .then(() => {
            setStudents(students.filter((student) => student.id !== id));
            Swal.fire("Deleted!", "The student has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was an error deleting the student.",
              "error"
            );
          });
      }
    });
  };

  // Handle modal input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open modal with student data for editing
  const handleEdit = (student) => {
    console.log(student); // Check if the student data is passed correctly
    setModalData(student);
    setFormData({
      full_name: student.full_name,
      phone_number: student.phone_number,
      code: student.code,
      year: student.year,
      city: student.city,
      specialty: student.specialty,
    });
  };

  // Submit the edited student data
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Submitting form with data:", formData);
  axios
    .put(`http://localhost:8000/api/students/${modalData.student_id}`, formData)
    .then((response) => {
      console.log("Update response:", response.data);
      const updatedStudents = students.map((student) =>
        student.student_id === response.data.student_id
          ? response.data
          : student
      );
      setStudents(updatedStudents);
      setModalData(null); // Close the modal
      Swal.fire("Success!", "Student updated successfully.", "success");
    })
    .catch((error) => {
      console.error("Error updating student", error);
      Swal.fire("Error!", "Failed to update student.", "error");
    });
};


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
            <th>Phone Number</th>
            <th>Code</th>
            <th>Year</th>
            <th>City</th>
            <th>Speciality</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.full_name}</td>
              <td>{student.phone_number}</td>
              <td>{student.code}</td>
              <td>{student.year}</td>
              <td>{student.city}</td>
              <td>{student.specialty}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.student_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalData && (
        <div className="modal show">
          {" "}
          {/* Add the 'show' class */}
          <div className="modal-content">
            <span className="close" onClick={() => setModalData(null)}>
              &times;
            </span>
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
              />
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
              />
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Code"
                required
              />
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="Year"
                required
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                placeholder="Specialty"
                required
              />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
