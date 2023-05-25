const express = require('express');
const {authorRegisterValidation} = require('../middlewares/validation');
const { authorSignUp, logIn, getProfile } = require('../controllers/authorController');
const authorization = require('../middlewares/authorization');
const router = express.Router();

router.post('/signup', authorRegisterValidation, authorSignUp );
router.post('/login', logIn );
router.get('/profile',authorization, getProfile);

module.exports = router;