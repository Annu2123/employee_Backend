const Employee = require('../models/employee');
const bcryptjs = require('bcryptjs');
const User = require("../models/users")
const employeeController = {};

// Create Employee (Owner only)
employeeController.create = async (req, res) => {

    try {
        const body = req.body;
        const user = req.user;
        const findOwner = await User.findOne({ email: user.email });
        const existingEmployee = await Employee.findOne({ email: body.email });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const employee = new Employee(body);
        const salt = await bcryptjs.genSalt();
        employee.password = await bcryptjs.hash(employee.password, salt);
        employee.ownerId = findOwner._id
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get All Employees (Owner only)
employeeController.list = async (req, res) => {
    try {
        const employees = await Employee.find({ role: 'employee' }); // Only list employees, not other owners if any
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update Employee
employeeController.update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        // If updating password, hash it
        if (body.password) {
            const salt = await bcryptjs.genSalt();
            body.password = await bcryptjs.hash(body.password, salt);
        }

        const employee = await Employee.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete Employee
employeeController.destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = employeeController;
