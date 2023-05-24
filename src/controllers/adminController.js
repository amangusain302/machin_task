const Admin  = require("../models/adminModel");
const bycrpt = require('bcrypt');
const ErrorHandler = require("../utils/errorHandler");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const genJwtToken = require("../utils/genJwtToken");

exports.adminSignUp = catchAsyncError(async(req, res, next) => {
     var { email, password} = req.body

    password = await bycrpt.hash(password, 10)
    console.log(password);

    var newAdmin = await new Admin({ email, password }).save().catch(err => {
        if (err.code === 11000) {
            next(new ErrorHandler("email or user_name already used", 400))
        }
    })
    res.status(201).json({
        success: true,
        message: "Admin account created successfully",
        newAdmin
    })
})