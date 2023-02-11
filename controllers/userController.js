const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const User = require('../models/userModel');

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

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        user,
        token
    })
})