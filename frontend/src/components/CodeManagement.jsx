import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Code.css";

const CodeManagement = () => {
  const [codes, setCodes] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    subject: "",
    year: "",
    semester: "1st",
    status: "unused", // Added status field with default value
  });
  const [modal, setModalData] = useState(null);

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/codes");
      console.log("Fetched codes:", response.data);
      setCodes(response.data);
    } catch (error) {
      console.error("Error fetching codes:", error.response || error);
      Swal.fire("Error!", "Failed to fetch codes.", "error");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modal) {
        console.log("Updating code with ID:", modal.code_id);
        console.log("Update data:", formData);

        const response = await axios.put(
          `http://localhost:8000/api/codes/${modal.code_id}`,
          formData
        );
        console.log("Update response:", response.data);

        await fetchCodes();
        setModalData(null);
        setFormData({
          code: "",
          subject: "",
          year: "",
          semester: "1st",
          status: "unused",
        });
        Swal.fire("Success!", "Code updated successfully.", "success");
      } else {
        console.log("Creating new code:", formData);

        const response = await axios.post(
          "http://localhost:8000/api/codes",
          formData
        );
        console.log("Create response:", response.data);

        await fetchCodes();
        setFormData({
          code: "",
          subject: "",
          year: "",
          semester: "1st",
          status: "unused",
        });
        Swal.fire("Success!", "Code added successfully.", "success");
      }
    } catch (error) {
      console.error("Operation error:", error.response || error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Operation failed.",
        "error"
      );
    }
  };

  const handleEdit = (code) => {
    console.log("Editing code:", code);
    setModalData(code);
    setFormData({
      code: code.code,
      subject: code.subject,
      year: code.year,
      semester: code.semester,
      status: code.status || "unused", // Set status if it's available
    });
  };

  const handleDelete = async (codeId) => {
    try {
      console.log("Attempting to delete code with ID:", codeId);

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will delete the code permanently.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        console.log("Delete confirmed for ID:", codeId);
        const response = await axios.delete(
          `http://localhost:8000/api/codes/${codeId}`
        );
        console.log("Delete response:", response.data);

        await fetchCodes();
        Swal.fire("Deleted!", "Code deleted successfully.", "success");
      }
    } catch (error) {
      console.error("Delete error:", error.response || error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to delete code.",
        "error"
      );
    }
  };

  return (
    <div>
      <h2>Code Management</h2>
      <form onSubmit={handleSubmit}>
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
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Subject"
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
        <select
          name="semester"
          value={formData.semester}
          onChange={handleInputChange}
          required
        >
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="unused">Unused</option>
          <option value="used">Used</option>
        </select>
        <button className="shared-button" type="submit">
          {modal ? "Update Code" : "Add Code"}
        </button>
        {modal && (
          <button
            className="shared-button"
            type="button"
            onClick={() => {
              setModalData(null);
              setFormData({
                code: "",
                subject: "",
                year: "",
                semester: "1st",
                status: "unused",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Subject</th>
            <th>Year</th>
            <th>Semester</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => (
            <tr key={code.code_id}>
              <td>{code.code}</td>
              <td>{code.subject}</td>
              <td>{code.year}</td>
              <td>{code.semester}</td>
              <td>{code.status}</td>
              <td>
                <button
                  className="shared-button"
                  onClick={() => handleEdit(code)}
                >
                  Edit
                </button>
                <button
                  className="shared-button"
                  onClick={() => handleDelete(code.code_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeManagement;
