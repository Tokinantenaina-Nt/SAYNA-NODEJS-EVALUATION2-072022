const mysql = require('mysql');
var conn = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASS,
    database: process.env.MYSQLDATABASE
});
conn.connect(function(err) {
    if (err) throw err;
    console.log('connected!!');
})