import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
  const { id } = useParams();  // Get the employee id from the URL
  const [employee, setEmployee] = useState(null);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`https://2f07ef1f-af05-4f1e-a06d-8e9869c51966-00-1kpwza9d05l5m.sisko.replit.dev/api/employees/${id}`);
      setEmployee(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch the employee data when the component mounts
  useEffect(() => {
    fetchEmployee();
  }, [id]);

  return (
    <div className="container mt-5">
      {employee ? (
        <div className="card p-4">
          {/* Employee Image */}
          {employee.image && (
            <img
              src={employee.image}
              alt={`${employee.name}'s profile`}
              className="rounded-circle me-3"
              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            />
          )}
          <h2 className="card-title mt-3">{employee.name}</h2>
          <div className="card-body">
            <p className="card-text"><strong>Email:</strong> {employee.email}</p>
            <p className="card-text"><strong>Designation:</strong> {employee.designation}</p>
            <p className="card-text"><strong>Gender:</strong> {employee.gender}</p>
            <p className="card-text"><strong>Course:</strong> {employee.course}</p>
            <p className="card-text"><strong>Joined On:</strong> {new Date(employee.createdAt).toLocaleString()}</p>
            <Link to="/employees" className="btn btn-primary">All Employees</Link>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning mt-3" role="alert">
          No user information available
        </div>
      )}
    </div>
  );
};

export default Employee;
