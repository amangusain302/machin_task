const Admin = require("../models/adminModel");
const ErrorHandler = require("../utils/errorHandler");
const { catchAsyncError } = require("./catchAsyncError");

exports.admimAuth = catchAsyncError(async(req, res, next) => {
    const isAdmin = await Admin.findOne({ _id : req.user._id});
    if(!isAdmin)
    {
        next(new ErrorHandler("You can't access this, Only admin have privilege to access", 403))
    }
    next()
})