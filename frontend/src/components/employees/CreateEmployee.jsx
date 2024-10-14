import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(''); // Store the Cloudinary URL

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        // Call the image upload function right after selecting an image
        if (selectedImage) {
            await handleImageUpload(selectedImage);
        }
    };

    const handleImageUpload = async (selectedImage) => {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', 'Employee_Management_System'); // Replace with your unsigned upload preset

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/daew9w5st/image/upload', // Replace with your Cloudinary cloud name
                formData
            );
            setImageUrl(response.data.secure_url);
            console.log('Image uploaded:', response.data.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        // Ensure the image URL is set before form submission
        if (!imageUrl) {
            console.error('Image upload failed. Please select a valid image.');
            return; // Prevent submission if the image URL is not available
        }

        try {
            const employeeData = {
                name,
                email,
                designation,
                gender,
                course,
                image: imageUrl
            };

            const response = await axios.post('https://2f07ef1f-af05-4f1e-a06d-8e9869c51966-00-1kpwza9d05l5m.sisko.replit.dev/api/employees', employeeData);
            console.log('Employee created:', response.data);
            navigate('/employees');
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Create Employee</h2>
            <form onSubmit={handlePostSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="designation" className="form-label">Designation</label>
                    <input
                        type="text"
                        className="form-control"
                        id="designation"
                        placeholder="Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                        className="form-select"
                        id="gender"
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
                    <label htmlFor="course" className="form-label">Course</label>
                    <input
                        type="text"
                        className="form-control"
                        id="course"
                        placeholder="Course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success">Create Employee</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
