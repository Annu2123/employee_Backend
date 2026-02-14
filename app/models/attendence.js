const { Schema, model } = require('mongoose');
const AttendenceSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    date: Date,
    day: Number,
    month: Number,
    year: Number,
    status: String
})
const Attendence = model('Attendence', AttendenceSchema);
module.exports = Attendence;