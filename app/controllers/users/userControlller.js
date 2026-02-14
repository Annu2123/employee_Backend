const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const userCount = await User.countDocuments({})
        let userRole
        if (userCount === 0) {
            userRole = "super_admin"
        } else {
            userRole = role
        }
        const user = {
            name,
            email,
            password: hashedPassword,
            role: userRole
        }
        const newUser = await User.create(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password, "email")
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        if (user.role === "super_admin") {
            const tokenData = {
                id: user._id,
                role: user.role
            }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1d' })
            res.status(200).json({ token, role: user.role, name: user.name, _id: user._id })
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOwners = async (req, res) => {
    try {
        const owners = await User.find({ role: "owner", isVerified: true }).select("_id name email role isVerified");
        const empl_count = await Employee.
            res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = await User.findOne({ _id: id });
        if (!owner) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        const updateOwner = await User.updateOne({ _id: id }, { $set: { isVarified: false } })
        if (!updateOwner) {
            return res.status(500).json({ error: 'Owner not deleted' });
        }

        res.status(200).json({ message: "Owner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const UpdateVarified = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = await User.findOne({ _id: id });
        if (!owner) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        const updateOwner = await User.updateOne({ _id: id }, { $set: { isVerified: true } })
        if (!updateOwner) {
            return res.status(500).json({ error: 'Owner not Varified' });
        }

        res.status(200).json({ message: "Owner   Varified successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { register, login, getOwners, deleteOwner, UpdateVarified };
