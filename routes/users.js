const express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
require('dotenv').config()


//importing mongodb connection
require('../database/connect')


//importing the mongodb Model
const Test = require('../model/schema');


//using passport
require('../config/passport')






const router = express.Router();


router.use(bodyParser.json())
router.use(bodyParser.urlencoded(
    {extended:false}
))




router.get('/' , (req,res)=>{
    res.render('main',{status_for_notlogin:true})
})


router.get('/login',(req,res)=>{
    res.render('login')
})



router.get('/google/signup',passport.authenticate('google',{scope:['profile','email']}),(req,res)=>{
    res.send('donee')
})


router.get('/google/welcome',passport.authenticate('google',{failureRedirect:'/register'}),
(req,res)=>{
    res.redirect('/curr')
}

)


router.get('/curr',(req,res)=>{
    if(req.user == null){
        res.send("<H1>Please Login First</H1>")
    }
    else{

        res.render('profile',
        {Fullname:req.user.name,
        Myemail:req.user.Email,
        username:req.user.user,
        key:req.user.id})
        // console.log(req.user.id)
    }
    // res.send(req.user)
})




router.get('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/')
    // res.send(req.user)
})





router.get('/register',(req,res)=>{
    res.render('register')
})




router.post('/register',async(req,res)=>{
    // console.log(req.body)
    if(req.body.pass == req.body.cpass){
        await new Test({
            name:req.body.fullname,
            Date:req.body.date,
            Email:req.body.email,
            user:req.body.username,
            pass:req.body.pass
        }).save((err)=>{
            if(err){
                throw err
            }else{
                console.log('Inserted')
            }
        })

        res.render('register',{status:true,btn_type:'success',message:'Registration Done..'})
    }
    else{
        res.send('not done')
    }
})



module.exports = router;