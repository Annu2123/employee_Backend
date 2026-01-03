const { Schema, model } = require('mongoose');
const SalarayInAdvanceSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    reason: { type: String, required: true }
})
const SalarayInAdvance = model('SalarayInAdvance', SalarayInAdvanceSchema);
module.exports = SalarayInAdvance;