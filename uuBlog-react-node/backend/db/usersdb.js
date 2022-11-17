const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user: 'lynn',
    password:'zhudaniu',
    database:'uublog',
})
// var connection = mysql.createConnection({
//     host:'127.0.0.3',
//     user: 'root',
//     password:'123',
//     database:'testtest',
//     port:5000,
// })

// connection.connect()


module.exports = db