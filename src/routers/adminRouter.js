const express = require('express');
const {adminSignUp} = require('../controllers/adminController');
const router = express.Router();

router.post('/signup', adminSignUp );
// router.post('/login', logIn );
// router.get('/profile',authorization, getProfile);

module.exports = router;