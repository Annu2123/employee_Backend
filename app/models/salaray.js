const { Schema, model } = require('mongoose');
const SalarySchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    basicSalary: Number,
    allowances: Number,
    deductions: Number,
    netSalary: Number
})
const Salary = model('Salary', SalarySchema);
module.exports = Salary;