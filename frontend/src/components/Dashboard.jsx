import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    used_codes: 0,
    not_used_codes: 0,
    total_students: 0,
  });
  const [modalData, setModalData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    code: "",
    year: "",
    city: "",
    specialty: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (student) => {
    setModalData(student);
    setFormData({
      full_name: student.full_name || "",
      phone_number: student.phone_number || "",
      code: student.code || "",
      year: student.year || "",
      city: student.city || "",
      specialty: student.specialty || "",
      email: student.email || "",
      password: "", // Clear password field for security
    });
  };

  const handleAdd = () => {
    setShowAddModal(true);
    setFormData({
      full_name: "",
      phone_number: "",
      code: "",
      year: "",
      city: "",
      specialty: "",
      email: "",
      password: "",
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/students",
        formData
      );

      setStudents([...students, response.data]);
      setShowAddModal(false);
      await fetchData(); // Refresh the data
      Swal.fire("Success!", "Student added successfully.", "success");
    } catch (error) {
      console.error("Add error:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to add student.",
        "error"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      full_name: formData.full_name,
      phone_number: formData.phone_number,
      code: formData.code,
      year: formData.year,
      city: formData.city,
      specialty: formData.specialty,
      email: formData.email,
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/students/${modalData.student_id}`,
        updateData
      );

      const updatedStudents = students.map((student) =>
        student.student_id === modalData.student_id ? response.data : student
      );

      setStudents(updatedStudents);
      setModalData(null);
      Swal.fire("Success!", "Student updated successfully.", "success");
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to update student.",
        "error"
      );
    }
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

      <div className="header-actions">
        <h2>Student List</h2>
        <button className="shared-button" onClick={handleAdd}>
          Add Student
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Code</th>
            <th>Year</th>
            <th>City</th>
            <th>Specialty</th>
            <th>Email</th>
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
              <td>{student.email}</td>
              <td>
                <button
                  className="shared-button"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="shared-button"
                  onClick={() => handleDelete(student.student_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {modalData && (
        <div className="modal show">
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
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password (leave empty to keep current)"
              />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal show">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>
              &times;
            </span>
            <h2>Add New Student</h2>
            <form onSubmit={handleAddSubmit}>
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
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              <button type="submit">Add Student</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
