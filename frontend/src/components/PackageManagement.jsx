import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const PackageManagement = () => {
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        package_name: "",
        content: "",
        price: "",
    });
    const [modalData, setModalData] = useState(null);

    const fetchPackages = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/packages");
            setPackages(response.data);
        } catch (error) {
            console.error("Error fetching packages:", error);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/packages", formData);
            setPackages([...packages, response.data]);
            setFormData({ package_name: "", content: "", price: "" });
            Swal.fire("Success!", "Package added successfully.", "success");
        } catch (error) {
            Swal.fire("Error!", "Failed to add package.", "error");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8000/api/packages/${modalData.package_id}`,
                formData
            );
            setPackages(
                packages.map((pkg) =>
                    pkg.package_id === modalData.package_id ? response.data : pkg
                )
            );
            setModalData(null);
            setFormData({ package_name: "", content: "", price: "" });  // Reset form after update
            Swal.fire("Success!", "Package updated successfully.", "success");
        } catch (error) {
            Swal.fire("Error!", "Failed to update package.", "error");
        }
    };

    const handleDelete = (package_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action will delete the package permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8000/api/packages/${package_id}`)
                    .then(() => {
                        setPackages(packages.filter((pkg) => pkg.package_id !== package_id));
                        Swal.fire("Deleted!", "Package has been deleted.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to delete package.", "error");
                    });
            }
        });
    };

    const handleEdit = (pkg) => {
        setModalData(pkg);
        setFormData({
            package_name: pkg.package_name,
            content: pkg.content,
            price: pkg.price,
        });
    };

    return (
        <div>
            <h2>Package Management</h2>
            <form onSubmit={modalData ? handleEditSubmit : handleAddSubmit}>
                <input
                    type="text"
                    name="package_name"
                    value={formData.package_name}
                    onChange={handleInputChange}
                    placeholder="Package Name"
                    required
                />
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Content"
                    required
                ></textarea>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    step="0.01"
                    required
                />
                <button type="submit">{modalData ? "Update" : "Add"} Package</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>Content</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((pkg) => (
                        <tr key={pkg.package_id}>
                            <td>{pkg.package_name}</td>
                            <td>{pkg.content}</td>
                            <td>${pkg.price}</td>
                            <td>
                                <button onClick={() => handleEdit(pkg)}>Edit</button>
                                <button onClick={() => handleDelete(pkg.package_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PackageManagement;
