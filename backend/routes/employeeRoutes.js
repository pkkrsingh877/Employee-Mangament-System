const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Route to get all employees
router.get('/', employeeController.getAllEmployees);

// Route to get a single employee by ID
router.get('/:id', employeeController.getEmployeeById);

// Route to create a new employee
router.post('/', employeeController.createEmployee);

// Route to update an existing employee
router.put('/:id', employeeController.updateEmployee);

// Route to delete an employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
