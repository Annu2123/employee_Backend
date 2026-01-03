const Salary = require('../models/salaray');
const SalarayInAdvance = require('../models/salarayInAdvance');

const salaryController = {};

// Create/Update Salary Structure
salaryController.upsert = async (req, res) => {
    try {
        const body = req.body; // { employeeId, basicSalary, allowances, deductions }
        // Calculate net salary
        body.netSalary = (body.basicSalary || 0) + (body.allowances || 0) - (body.deductions || 0);

        const salary = await Salary.findOneAndUpdate(
            { employeeId: body.employeeId },
            body,
            { new: true, upsert: true }
        );
        res.json(salary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Salary Details
salaryController.get = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const salary = await Salary.findOne({ employeeId }).populate('employeeId', 'name');
        res.json(salary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add Advance Salary
salaryController.addAdvance = async (req, res) => {
    try {
        const body = req.body;
        const advance = new SalarayInAdvance(body);
        await advance.save();
        res.status(201).json(advance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Advances for Employee
salaryController.getAdvances = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const advances = await SalarayInAdvance.find({ employeeId }).sort({ date: -1 });
        res.json(advances);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = salaryController;
