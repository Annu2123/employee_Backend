const Employee = require('../models/employee');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {};

authController.register = async (req, res) => {
    try {
        const body = req.body;
        // Check if owner already exists if trying to register as owner (optional logic, for now simple register)
        const existingUser = await Employee.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const employee = new Employee(body);
        const salt = await bcryptjs.genSalt();
        employee.password = await bcryptjs.hash(employee.password, salt);

        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcryptjs.compare(password, employee.password);
        if (!isMatch) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        const tokenData = {
            id: employee._id,
            role: employee.role
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1d' });
        res.json({ token, role: employee.role, name: employee.name }); // Send key details
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

authController.getAccount = async (req, res) => {
    try {
        const employee = await Employee.findById(req.user.id).select('-password');
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = authController;
