const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Create a new employee
router.post('/employees', async (req, res) => {
    const { name, department, designation, salary, joiningDate } = req.body;

    try {
        const newEmployee = new Employee({
            name,
            department,
            designation,
            salary,
            joiningDate
        });
        
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error });
    }
});

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
});

// Update an employee
router.put('/employees/:id', async (req, res) => {
    const { name, department, designation, salary, joiningDate } = req.body;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, department, designation, salary, joiningDate },
            { new: true }
        );
        
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
});

// Delete an employee
router.delete('/employees/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
});

module.exports = router;
