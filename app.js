const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const keys = require('./config/keys')
require('dotenv').config()
require('./config/keys')



const app = express();



app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,   // 24 hours
        keys:[keys.cookie_key]
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine' , 'pug')


app.use('/' , require('./routes/users'))


app.listen(3000 || process.env.PORT)