const mongoose = require('mongoose')


//Mongoose Schema
let schema = new mongoose.Schema({
    name:String,
    Date:String,
    Email:String,
    user:String,
    pass:String
})


// Mongoose Model
let Test =  mongoose.model('Test',schema,'Passport');



module.exports = Test;