const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('Connected to database')
    })
    .catch((err)=>{
        console.log('Error connecting to database')
        console.log(err)
    })
} 

module.exports=connectToDb;