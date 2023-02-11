const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT;
const DB = process.env.DB;
mongoose.set('strictQuery', true);
mongoose.connect(DB)
    .then(()=>{
        console.log(`MongoDB is ruuning on - mongodb://localhost:${DB_PORT}/Ecommerce`);
    })