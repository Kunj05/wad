const mongoose = require('mongoose');

// Employee Schema
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    salary: { type: Number, required: true },
    joiningDate: { type: Date, required: true }
});

// Create Employee model from the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
