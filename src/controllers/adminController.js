const Admin  = require("../models/adminModel");
const bycrpt = require('bcrypt');
const ErrorHandler = require("../utils/errorHandler");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const genJwtToken = require("../utils/genJwtToken");
const Author = require("../models/authorModel");

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

exports.adminlogIn = catchAsyncError(async(req, res, next) => {
    var { email, password } = req.body;
    const admin = await Admin.findOne({email : email})
    if (!admin) {
        next(new ErrorHandler("Invalid Credentials"), 401);
    }
    const comparePass = await bycrpt.compare(password, admin.password);
    if (!comparePass) {
        next(new ErrorHandler("Invalid Credentials"), 401);
    }
    const accessToken = await genJwtToken(admin);
    admin._doc['jwtToken'] = accessToken;
    delete admin._doc.password;

    res.status(200).json({
        success: true,
        message: "Admin login successfully",
        admin
    })
})

exports.updateAuthorStatus = catchAsyncError(async(req, res, next) => {
    const { authorId , status } = req.query;
    const authorStatus = await Author.findOneAndUpdate({_id : authorId}, {
        $set : { status }
    }, {new : true})
    res.status(202).json({
        success : true,
        message : `You ${status} Author successfully`
    })
})