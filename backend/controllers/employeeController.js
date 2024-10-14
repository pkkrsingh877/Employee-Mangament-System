const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching employees', details: error.message });
    }
};

// Get a single employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching employee', details: error.message });
    }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const { name, email, designation, gender, course, image } = req.body;
        const newEmployee = new Employee({ name, email, designation, gender, course, image });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Error creating employee', details: error.message });
    }
};

// Update an existing employee
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, designation, gender, course, image } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, email, designation, gender, course, image },
            { new: true, runValidators: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Error updating employee', details: error.message });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting employee', details: error.message });
    }
};
