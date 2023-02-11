const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const userRouter = express.Router();

// for register user 
userRouter.route('/register').post(registerUser);

// for login user 
userRouter.route('/login').post(loginUser);

module.exports = userRouter;