const Attendence = require('../models/attendence');

const attendanceController = {};

// Mark Attendance
// Mark Attendance
attendanceController.mark = async (req, res) => {
    try {
        const body = req.body; // { employeeId, date, status }
        console.log(body, "body");

        // Auto-populate day, month, year from date
        const dateObj = new Date(body.date);
        body.day = dateObj.getDate();
        body.month = dateObj.getMonth() + 1; // 1-based month for storage/query simplicity? Or 0-based. Let's use 1-based to match typical human query.
        body.year = dateObj.getFullYear();

        const attendance = new Attendence(body);
        await attendance.save();
        res.status(201).json(attendance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Attendance (Filter by Employee or Date/Month)
attendanceController.list = async (req, res) => {
    try {
        const { employeeId, date, month, year } = req.query;
        const query = {};
        if (employeeId) query.employeeId = employeeId;

        if (date) {
            // Specific date
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            query.date = { $gte: startDate, $lte: endDate };
        } else if (month && year) {
            // Filter by month and year fields
            query.month = month;
            query.year = year;
        }

        const attendances = await Attendence.find(query).populate('employeeId', 'name email');
        res.json(attendances);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = attendanceController;
