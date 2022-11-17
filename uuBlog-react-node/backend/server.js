const express = require("express")

const app = express()

const joi = require('joi')

//cors, before routing
const cors = require('cors')
app.use(cors())

// Configure middleware for parsing form data, only for application/x-www-form-urlencoded
// this is essential
app.use(express.urlencoded({extended: false}))

// package res.cc func before router 
app.use((req, res, next)=>{
    // default status is 1
    res.cc = function (err, status=1){
        res.status(400).send({
            status,
            // if err is instanceof Error : object; otherwise, err is string
            message: err instanceof Error? err.message : err,
        })
    }
    res.notAuth = (err, status =1 )=>{
        res.status(401).send({
            status,
            message: err instanceof Error? err.message : err,
        })
    }
    next()
})


const config = require('./config')
const { expressjwt: jwt } = require("express-jwt");
app.use(jwt({secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/home/] }))

// import and use userRouter
const userRouter = require('./router/user')
// Add uniform prefix
app.use('/home', userRouter)

const userInfo = require('./router/userinfo')
app.use('/my', userInfo)

app.use((err, req, res, next)=>{
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.notAuth('UnauthorizedError', 401)
    // res.statusCode = 404;
    res.cc(err)
})

app.listen(50000, ()=>{
    console.log("listen at 50000")
})

