const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { logout } = require('../middleware/auth');
const userRouter = express.Router();

// for register user 
userRouter.route('/register').post(registerUser);

// for login user 
userRouter.route('/login').post(loginUser);

//for logout user
userRouter.route('/logout').get(logout);

module.exports = userRouter;