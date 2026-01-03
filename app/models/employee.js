const { Schema, model } = require('mongoose');

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['owner', 'employee'], default: 'employee' },
    designation: { type: String },
    phone: { type: String },
    salary: { type: Number, default: 0 },
    joiningDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const Employee = model('Employee', EmployeeSchema);
module.exports = Employee;
