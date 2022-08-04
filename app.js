require('dotenv').config({ path: './config/.env' })
const cors = require('cors')
const port = 3000;
const { json } = require('body-parser');
const express = require('express');
const { parse } = require('path');
const mysql = require('mysql2');
const app = express();
const bodyParser = require("body-parser");
const fs = require('fs');

// ------------ connexion au bdd
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
    // -------
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// ----------------------
const mysqldump = require('mysqldump')

// dump the result straight to a file
mysqldump({
    connection: {
        host: 'localhost',
        user: 'root',
        password: process.env.MYSQLPASS,
        database: 'sayna',
    },
    dumpToFile: './config/sql/dump.sql',
});



// ------------- API avis par formation

app.get("/api/message/:authAdmin/formation=:formation", function(req, res) {
        let avis = [];


        let authAdmin = req.params.authAdmin;
        let formation = req.params.formation;


        var sql1 = "Select distinct * from ??.?? WHERE ?? = ?";
        var replaces = [`${process.env.MYSQLDATABASE}`, 'avis_utilisateur', `formation`, formation]
        sql = mysql.format(sql1, replaces);
        conn.query(sql, function(err, rows, fields, result) {

            if (err) throw err;
            for (var i = 0; i < rows.length; i++) {
                avis[i] = rows[i].avis;
            }
            if (authAdmin === '12345678') {
                res.status(200).send(avis)
            } else {
                res.status(400)
            }

        })
    })
    //  ------------

// ----------- avis par formation order by note
app.get("/api/message/:authAdmin/formation=:formation/orderbynote", function(req, res) {
        let note = [];
        let avis = [];
        let authAdmin = req.params.authAdmin;
        let formation = req.params.formation;
        var sql1 = "Select distinct * from ??.?? WHERE ?? = ? and `note` > '3.5' ORDER BY `idAvis` DESC, `note`";
        var replaces = [`${process.env.MYSQLDATABASE}`, 'avis_utilisateur', `formation`, formation]
        sql = mysql.format(sql1, replaces);
        conn.query(sql, function(err, rows, fields, result) {

            if (err) throw err;
            for (var i = 0; i < rows.length; i++) {
                avis[i] = rows[i];
            }
            // const obj = [{...rows }]
            if (authAdmin === '12345678') {
                res.status(200).send(avis)
            } else {
                res.status(400)
            }

        })
    })
    // -------------------------- avis par formation order by date(id)
app.get("/api/message/:authAdmin/formation=:formation/orderbyid", function(req, res) {
    let note = [];
    let avis = [];
    let authAdmin = req.params.authAdmin;
    let formation = req.params.formation;
    var sql1 = "Select distinct * from ??.?? WHERE ?? = ? ORDER BY `idAvis` DESC";
    var replaces = [`${process.env.MYSQLDATABASE}`, 'avis_utilisateur', `formation`, formation]
    sql = mysql.format(sql1, replaces);
    conn.query(sql, function(err, rows, fields, result) {
        let authAdmin = req.params.authAdmin;
        if (err) throw err;
        for (var i = 0; i < rows.length; i++) {
            avis[i] = rows[i];
        }
        // const obj = [{...rows }]
        if (authAdmin === '12345678') {
            res.status(200).send(avis)
        } else {
            res.status(400)
        }



    })
})



// ------- API tous les avis order by note 
app.get("/api/message/allFormation/:authAdmin/bynote&notesup/:note", function(req, res, next) {
    let avis = [];
    let authAdmin = req.params.authAdmin;
    let note = req.params.note;
    // Select * from `sayna`.`avis_utilisateur` where `note`>'3.5' ORDER BY `idAvis` DESC , `note`  
    var sql1 = "Select * from ??.?? WHERE `note`> " + note + " ORDER BY `idAvis` DESC, `note`";
    var replaces = [`${process.env.MYSQLDATABASE}`, 'avis_utilisateur']
    sql = mysql.format(sql1, replaces);
    conn.query(sql, function(err, rows, fields, result) {
        if (err) throw err;
        for (var i = 0; i < rows.length; i++) {
            avis[i] = rows[i]
        }
        if (authAdmin === '12345678') {
            res.status(200).send(avis)
        } else {
            res.status(400)
        }



    })

});
// ---------------------
// ------------- API avis/nom par note
app.get("/api/message/:authAdmin/formation/note=:note/:col", function(req, res, next) {
    let authAdmin = req.params.authAdmin;
    let noteReq = req.params.note
    let avisReq = req.params.col
    var sql2 = "Select ?? from `sayna`.`avis_utilisateur` WHERE `note` = ?"
    var rpl = [avisReq, noteReq]
    sql = mysql.format(sql2, rpl)
    conn.query(sql, function(err, rows, fields, result) {

        if (err) throw err;
        for (var i = 0; i < rows.length; i++) {
            avis[i] = rows[i]
        }

        if (authAdmin === '12345678') {
            res.status(200).send(avis)
        } else {
            res.status(400)
        }


    })


});











// ----------
app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + `/style.css`)
})
app.get('/index.js', function(req, res) {
    res.sendFile(__dirname + `/index.js`)
})
app.get('/js/:page.js', function(req, res) {
    const page = req.params.page
    res.sendFile(__dirname + `/js/` + page + `.js`)
})
app.get('/Assets/image/:image.jpg', function(req, res) {
    const image = req.params.image
    res.sendFile(__dirname + `/Assets/image/` + image + `.jpg`)
})
app.get('/', function(req, res) {
    res.sendFile(__dirname + `/`)
})
app.get('/index', function(req, res) {
    res.sendFile(__dirname + `/index.html`)
})
app.get('/:page', function(req, res) {
    const page = req.params.page
    res.sendFile(__dirname + `/pages/` + page + `.html`)
})


// --------- API post
app.post('/contact', function(req, res) {
    let firstname, lastname, avis, note, formation, date;

    firstname = req.body.firstname;
    lastname = req.body.lastname;
    avis = req.body.avis;
    note = req.body.note;
    formation = req.body.formation;

    const sql1 = " INSERT INTO ??.`avis_utilisateur` (`firstName`, `lastName`, `avis`, `note`, `formation`, `datePost`) VALUE (?,?,?,?,?,?);"
    const replaces = [`${process.env.MYSQLDATABASE}`, `${req.body.firstname}`, `${req.body.lastname}`, `${req.body.avis}`, `${req.body.note}`, `${req.body.formation}`, new Date()]


    const myRequest = async function(r) {
        var conn = mysql.createConnection({
            host: process.env.MYSQLHOST,
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASS,
            database: process.env.MYSQDATABASE
        });
        sql = mysql.format(r, replaces)
        conn.connect(function(err) {
            if (err) throw err;
            console.log('connected!!');
        })

        conn.query(sql, function(err) {
            if (err) throw err;
            res.status(200).sendFile(__dirname + `/pages/contact.html`);

        })
    }


    if (firstname && avis && note && formation) {
        myRequest(sql1)
    } else {
        res.status(400).sendFile(__dirname + `/pages/contact.html`);
    }

});

// ------ server
app.listen(port, () => console.log(
    'notre application tourne au http://localhost:' + port
));