// const res = require("express/lib/response")
const db = require('../db/usersdb')

//  import bcryptjs
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')



exports.register = (req, res) => {
    const userinfo = req.body
    console.log(userinfo)

   
    const sqlStr = 'select * from users where username = ?'
    db.query(sqlStr, [userinfo.username], (err, results) => {
        
        if (err) {

            return res.cc(err)
        }
        if (results.length > 0) {
            // return res.send({ message: 'users exists' })
            return res.cc('users exists')
        }

        console.log(userinfo.password)
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        console.log(userinfo.password)
        const id = Math.random() * 100
        // add  new user
        const newuser = `insert into users set ?`
        console.log('in register')
        db.query(newuser, { id: id, username: userinfo.username, password: userinfo.password }, function (err, results) {
            // if (err) return res.send({status:1, message: err.message})
            console.log('error0')
            if (err) return res.cc(err)
            console.log('error1')
            // if(results.affectedRows !==1) return res.send({message: 'shibai'})
            if (results.affectedRows !== 1) return res.cc('registering error')
            console.log('error2')
           
            const user = { ...results[0], password: '', user_pic: '' }
            // 2、generate token
    
            const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn})
            console.log(tokenStr)
            console.log('error3')
            return res.send({
                status: 0,
                token: 'Bearer '+tokenStr,
                message: "login ok",
            })
        })
    })

}

// sql 

exports.login = (req, res) => {
    const userinfo = req.body
    console.log(userinfo)
    console.log('in login')
 
    const sqlStr = 'select * from users where username = ?'
    db.query(sqlStr, [userinfo.username], (err, results) => {
        if (err) {
            // return res.send({ message: err.message })
            // use the res.cc func
            return res.cc(err)
        }
        if (results.length !== 1) {
            // return res.send({ message: 'users exists' })
            console.log('query result !== 1, login fails')
            return res.cc('query result !== 1, login fails')
        }
        const comparePassword = bcrypt.compareSync(userinfo.password, results[0].password)
        if(!comparePassword) return res.cc('password error')

        // console.log(results[0])
        // token generate 
        // 1、hide pw and pic 
        const user = { ...results[0], password: '', user_pic: '' }
        // 2、generate token

        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn})
        console.log(tokenStr)
        return res.send({
            status: 0,
            token: 'Bearer '+tokenStr,
            message: "login ok",
        })
        // return res.send(req)

    })



    // console.log(req) 
}