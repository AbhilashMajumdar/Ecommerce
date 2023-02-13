const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const ErrorMiddleware = require('./middleware/error');
const CatchAsyncErrorMiddleware = require('./middleware/catchAsyncError');

const app = express();
app.use(express.json());

// importing config file 
dotenv.config({path:'./config/config.env'})

// connected with db 
require('./conn/db');

// importing cookie-parser
app.use(cookieParser());

// importing product routes 
app.use('/Ecommerce/api/v1', productRouter);

// importing user routes 
app.use('/Ecommerce/api/v1', userRouter);

// middleware for error 
app.use(ErrorMiddleware);
app.use(CatchAsyncErrorMiddleware);

module.exports = app;