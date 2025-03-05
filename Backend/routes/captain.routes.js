const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname should be atleast 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Lastname should be atleast 3 characters'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password should be atleast 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color should be atleast 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate should be atleast 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity should be atleast 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], captainController.registerCaptain);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password should be atleast 6 characters long')
], captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports = router;