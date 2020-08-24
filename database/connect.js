const mongoose = require('mongoose')
const keys = require('../config/keys')
 






module.exports=mongoose.connect(keys.url ,
    { useNewUrlParser: true , useUnifiedTopology: true } ,
    (err,res)=>{
    if(err){
        throw err
    }
    else{
        // console.log(res)
        console.log('connected')
    }
})