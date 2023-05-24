const { body, validationResult } = require('express-validator');


const authorRegisterValidation = [
    body('first_name').notEmpty().withMessage('first name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    body('phone').notEmpty().withMessage('phone number is required').matches(/^\d{10}$/).withMessage('phone number. should be 10 digit (eg : 9876543210).'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(400).json({ success: false, error: errorMessages });
        }
        next();
    },
];

module.exports = authorRegisterValidation;