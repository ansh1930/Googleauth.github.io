var passport = require('passport');
const keys = require('./keys');
const Test = require('../model/schema');
const router = require('../routes/users');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
require('../database/connect')
require('../model/schema')





passport.use(
    new GoogleStrategy({
        clientID :   keys.Passport_clientKey,
        clientSecret  :  keys.passport_secretKey,
        callbackURL:"http://localhost:3000/google/welcome"
    },async(accessToken, refreshToken, profile, done)=>{
        // console.log('token : '+accessToken)
        // console.log('tokenSecret : '+refreshToken)
        console.log('profile : '+ profile)
        // console.log('done : '+ done)


       Test.findOne({user:profile.id}).then(user=>{
            if (user) {
                // return null
                console.log(user)
                done(null,user)

                
            } else {
                 new Test({
                    name:profile._json.name,
                    Email:profile._json.email,
                    user:profile.id
                }).save()
            }
        })
        
    })
)


passport.serializeUser((user,done)=>{
    done(null,user.id)
})


passport.deserializeUser((id,done)=>{
    Test.findById(id, (err,user)=>{
        done(err,user)
    })
})



// Passport 
module.exports=passport