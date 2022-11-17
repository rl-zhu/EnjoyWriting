const { readdirSync } = require('fs')
const db = require('../db/usersdb')

exports.getUserInfo= (req, res)=>{
    console.log("getUserInfo")
    const sql = `select id, username, nickname, email, user_pic from users where id=?`
    console.log("req.auth", req.auth)
    
    db.query (sql, req.auth.id, (err, results)=>{
        // console.log(results.length)
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('query error')
        res.send({
            status:0,
            message: 'get user infor',
            data:results[0],

        })
    })
    
}


exports.updateUserInfo = (req, res)=>{
    res.send('updateUserInfo')
}