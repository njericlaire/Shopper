const express = require('express');
const router = express.Router();
const { register, login, checkEmail , makeCloth } = require('../controllers/authController');
const {getProducts} =require('../controllers/DashboardController')
// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('auth/register', register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('auth/login', login);

router.post('auth/checkEmail', checkEmail);
router.get('/getProducts', getProducts);

router.post('/makeCloth', makeCloth);



module.exports = router;
