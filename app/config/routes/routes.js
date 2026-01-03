const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const employeeController = require('../../controllers/employeeController');
const attendanceController = require('../../controllers/attendanceController');
const salaryController = require('../../controllers/salaryController');
const { authenticateUser, authorizeRoles } = require('../middlewares/authentication');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/account', authenticateUser, authController.getAccount);

// Employee Routes (Owner only for management)
router.post('/employees', authenticateUser, authorizeRoles('owner'), employeeController.create);
router.get('/employees', authenticateUser, authorizeRoles('owner'), employeeController.list);
router.put('/employees/:id', authenticateUser, authorizeRoles('owner'), employeeController.update);
router.delete('/employees/:id', authenticateUser, authorizeRoles('owner'), employeeController.destroy);

// Attendance Routes
// Mark attendance (Owner marks for everyone, or employee marks for self - assuming Owner marks for now based on req)
router.post('/attendance', authenticateUser, authorizeRoles('owner'), attendanceController.mark);
router.get('/attendance', authenticateUser, attendanceController.list);

// Salary Routes
router.post('/salary', authenticateUser, authorizeRoles('owner'), salaryController.upsert);
router.get('/salary/:employeeId', authenticateUser, authorizeRoles('owner', 'employee'), salaryController.get);
router.post('/salary/advance', authenticateUser, authorizeRoles('owner'), salaryController.addAdvance);
router.get('/salary/advance/:employeeId', authenticateUser, authorizeRoles('owner', 'employee'), salaryController.getAdvances);

module.exports = router;
