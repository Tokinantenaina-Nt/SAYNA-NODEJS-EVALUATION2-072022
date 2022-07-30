const { json } = require('body-parser');
const express = require('express');
const { parse } = require('path');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require('fs');
const message = require('./bdd_formulaire/message.js')
const messageBackend = require('./bdd_formulaire/messageBackend.js')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + `/`)
})
app.get('/index', function(req, res) {
    res.sendFile(__dirname + `/pages/index.html`)
})
app.get('/backend', function(req, res) {
    res.sendFile(__dirname + `/pages/backend.html`)
})
app.get('/contact', function(req, res) {
    res.sendFile(__dirname + `/pages/contact.html`)
})
app.get('/frontend', function(req, res) {
    res.sendFile(__dirname + `/pages/frontend.html`)
})
app.get('/marketing', function(req, res) {
    res.sendFile(__dirname + `/pages/marketing.html`)
})
app.get('/uxui', function(req, res) {
    res.sendFile(__dirname + `/pages/uxui.html`)
})
app.get('/contact', function(req, res) {
    res.sendFile(__dirname + `/pages/contact.html`)
})



app.post('/contact', function(req, res) {
        let firstname, lastname, avis, note, formation, date;
        let avisData = {}
        let i = 0;


        firstname = req.body.firstname;
        lastname = req.body.lastname;
        avis = req.body.avis;
        note = req.body.note;
        formation = req.body.formation;

        if (firstname && avis && note && formation) {
            i++;
            avisData = {
                    // "id": 0,
                    "firstname": firstname,
                    "lastname": lastname,
                    "avis": avis,
                    "note": note,
                    "formation": formation,
                    "date": Date()
                }
                //------
            let avisDataStr = JSON.stringify(avisData)
            let messageStr = JSON.stringify(message),
                messageStrMoins1;


            //----
            const moduleExportStr = 'module.exports = messages'
            let moduleExportStrLength = moduleExportStr.length
            const constMessageStr = 'const messages ='

            // ----
            messageStrMoins1 = messageStr.substring(0, messageStr.length - 2)

            console.log('******', messageStr, '***********');
            messageStr = constMessageStr + messageStrMoins1 + ',' + avisDataStr + ']}' + 'module.exports = messages'
            console.log(messageStr);
            fs.writeFileSync('./bdd_formulaire/message.js', messageStr, function(erreur) {
                if (erreur) {
                    console.log(erreur)
                } else {
                    console.log(messageStr);
                }
            })
            if (formation === 'Backend') {
                fs.writeFileSync('./bdd_formulaire/messageBackend.json', messageStr, function(erreur) {
                    if (erreur) {
                        console.log(erreur)
                    } else {
                        console.log('---------------------', messageStr);
                    }
                })
                res.send('formation backend')
            }

            if (formation === 'Frontend') {
                fs.writeFileSync('./bdd_formulaire/messageFrontend.json', messageStr, function(erreur) {
                    if (erreur) {
                        console.log(erreur)
                    } else {
                        console.log('---------------------', messageStr);
                    }
                })
                res.send('formation Frontend')

            }
            if (formation === 'Marketing') {
                fs.writeFileSync('./bdd_formulaire/messageMarketing.json', messageStr, function(erreur) {
                    if (erreur) {
                        console.log(erreur)
                    } else {
                        console.log('---------------------', messageStr);

                    }
                })
                res.send('formation Marketing')

            }
            if (formation === 'UXUI') {
                fs.writeFileSync('./bdd_formulaire/messageUxui.json', messageStr, function(erreur) {
                    if (erreur) {
                        console.log(erreur)
                    } else {
                        console.log('---------------------', messageStr);

                    }
                })
                res.send('formation UXUI')

            }
            if (formation == '') {
                console.log('Formation non rempli !!!!!!');
                console.log('---------------------', messageStr);

            }
        } else {

            console.log('y a non rempli!!!!');
            // res.sendFile(__dirname + '/pages/contact.html')

        }


    })
    // -------- AFFICHAGE DES AVIS -----

const avisBackend = (messageBackend.messages.find((p) => p.note == 5).avis);
console.log(avisBackend)

app.listen(port, () => console.log(
    'notre application tourne au http://localhost:' + port
));