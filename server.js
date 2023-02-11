const app = require('./app');
const PORT = process.env.PORT;

// uncaught exception error 
process.on('uncaughtException', (err)=>{
    console.log(`Error : ${err}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
})

const server = app.listen(5000, (err)=>{
    if(!err){
        console.log(`Server is running on - http://localhost:${PORT}`);
    }else{
        console.log('Error while running the server');
    }
})

// unhandled promise rejection error 
process.on("unhandledRejection", (err)=>{
    console.log(`Error : ${err}`);
    console.log('Shutting down the server due to unhandled promise rejection error');
    server.close(()=>{
        process.exit(1);
    })
})

