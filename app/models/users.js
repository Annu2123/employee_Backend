const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['owner', 'super_admin'], default: 'owner' },
    designation: { type: String },
    phone: { type: String },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const User = model('User', UserSchema);
module.exports = User;
