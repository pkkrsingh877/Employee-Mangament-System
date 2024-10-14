const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'] // Basic email validation
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'] // Limits gender to specific options
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true // Stores the URL of the uploaded image
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
