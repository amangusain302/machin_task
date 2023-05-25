const Author = require("../models/authorModel");
const bycrpt = require('bcrypt');
const ErrorHandler = require("../utils/errorHandler");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const genJwtToken = require("../utils/genJwtToken");

exports.authorSignUp = catchAsyncError(async(req, res, next) => {
     var { first_name, last_name, email, password, phone } = req.body

    password = await bycrpt.hash(password, 10)
    console.log(password);

    var newUser = await new Author({ first_name, last_name, email, password, phone }).save().catch(err => {
        if (err.code === 11000) {
            next(new ErrorHandler("email or user_name already used", 400))
        }
    })
    res.status(201).json({
        success: true,
        message: "Account created successfully, But please wait for approval of Admin",
        newUser
    })
})

exports.logIn = catchAsyncError(async(req, res, next) => {
    var { email, phone, password } = req.body;
    const filter = (phone) ? {phone} : {email}
    const author = await Author.findOne(filter)
    if (!author) {
        next(new ErrorHandler("Invalid Credentials"), 401);
    }
    if(author.status == 'pending')
    {
        next(new ErrorHandler("Your account is not approved yet! "), 403);
    }
    else if(author.status == 'rejected')
    {
        next(new ErrorHandler("Your account is rejected! you cannot login "), 403);
    }
    const comparePass = await bycrpt.compare(password, author.password);
    if (!comparePass) {
        next(new ErrorHandler("Invalid Credentials"), 401);
    }
    const accessToken = await genJwtToken(author);
    author._doc['jwtToken'] = accessToken;
    delete author._doc.password;

    res.status(200).json({
        success: true,
        message: "Author login successfully",
        author
    })
})

exports.getProfile = catchAsyncError(async(req, res, next) => {
    const userId = req.user._id;
    const profile = await Author.findOne({ _id: userId }).select({ _id : 0 ,first_name : 1, last_name : 1, email: 1});
    res.status(200).json({
        success: true,
        profile
    })
})
