const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const User = require('../models/userModel');
const { JWTtoken } = require("../utils/JWTtoken");

//register a user
exports.registerUser = catchAsyncError(async(req, res, next)=>{
    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "this is a sample url"
        }
    })

    JWTtoken(user, 200, res);
})

// login - user 
exports.loginUser = catchAsyncError(async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 401));
    }

    const user = await User.findOne({email});
    if(!user){
        return next(new ErrorHandler('Invalid email & password', 401));
    }

    const isMatchPassword = user.comparePassword(password);
    if(!isMatchPassword){
        return next(new ErrorHandler('Invalid email & password', 401));
    }

    JWTtoken(user, 201, res);
})