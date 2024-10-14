import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        const response = await axios.get('https://2f07ef1f-af05-4f1e-a06d-8e9869c51966-00-1kpwza9d05l5m.sisko.replit.dev/api/employees');
        setEmployees(response.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://2f07ef1f-af05-4f1e-a06d-8e9869c51966-00-1kpwza9d05l5m.sisko.replit.dev/api/employees/${id}`);
            fetchEmployees(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Employees</h2>
            <div className="list-group">
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <div key={employee._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                {employee.image && (
                                    <img
                                        src={employee.image}
                                        alt={`${employee.name}'s profile`}
                                        className="rounded-circle me-3"
                                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                    />
                                )}
                                <div>
                                    <h5 className="mb-1">
                                        <Link to={`/employees/${employee._id}`} className="text-decoration-none">
                                            {employee.name}
                                        </Link>
                                    </h5>
                                    <p className="mb-1">{employee.email}</p>
                                    <small>Created at {new Date(employee.createdAt).toLocaleString()}</small>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/employees/edit/${employee._id}`)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(employee._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info" role="alert">
                        No employees available to view!
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeesList;
