const express = require('express');
const {adminSignUp, adminlogIn, updateAuthorStatus} = require('../controllers/adminController');
const authorization = require('../middlewares/authorization');
const { admimAuth } = require('../middlewares/adminAuth');
const router = express.Router();

router.post('/signup', adminSignUp );
router.post('/login', adminlogIn );
router.put('/review/author', authorization, admimAuth, updateAuthorStatus );

// router.post('/login', logIn );
// router.get('/profile',authorization, getProfile);

module.exports = router;