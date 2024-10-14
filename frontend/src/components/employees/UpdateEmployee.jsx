import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState('');
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await axios.get(`https://2f07ef1f-af05-4f1e-a06d-8e9869c51966-00-1kpwza9d05l5m.sisko.replit.dev/api/employees/${id}`);
            const employee = response.data;
            setName(employee.name);
            setEmail(employee.email);
            setDesignation(employee.designation);
            setGender(employee.gender);
            setCourse(employee.course);
            setImageUrl(employee.image); // Assuming employee.image contains the image URL
        };

        fetchEmployee();
    }, [id]);

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'Employee_Management_System'); // Replace with your unsigned upload preset

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/daew9w5st/image/upload', // Replace with your Cloudinary cloud name
                formData
            );
            return response.data.secure_url; // Return the URL of the newly uploaded image
        } catch (error) {
            console.error('Error uploading image:', error);
            return null; // Return null if there's an error
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        let newImageUrl = imageUrl; // Default to the existing image URL

        // Upload the new image if a new file has been selected
        if (image) {
            const uploadedImageUrl = await handleImageUpload();
            if (uploadedImageUrl) {
                // If successful, update newImageUrl
                newImageUrl = uploadedImageUrl;
            }
        }

        try {
            const updatedEmployee = {
                name,
                email,
                designation,
                gender,
                course,
                image: newImageUrl, // Set the new image URL
            };

            await axios.put(`https://2f07ef1f-af05-4f1e-a06d-8e9869c51966-00-1kpwza9d05l5m.sisko.replit.dev/api/employees/${id}`, updatedEmployee);
            console.log('Employee updated:', updatedEmployee);
            navigate('/employees'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Employee</h2>
            <form onSubmit={handleUpdateSubmit} className="needs-validation" noValidate>
                <div className="mb-3 text-center">
                    <img
                        src={imageUrl}
                        alt="Current Employee"
                        style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
                    />
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <select
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">Update Employee</button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
