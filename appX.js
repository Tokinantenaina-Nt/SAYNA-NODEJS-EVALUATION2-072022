const { json } = require('body-parser');
const express = require('express');
const { parse } = require('path');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require('fs');
const message = require('./bdd_formulaire/message.js')
const messageBackend = require('./bdd_formulaire/messageBackend.js')
const messageFrontend = require('./bdd_formulaire/messageFrontend.js')
const messageMarketing = require('./bdd_formulaire/messageMarketing.js')
const messageUxui = require('./bdd_formulaire/messageUxui.js')

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
    //---------
app.get('/backend/:formation', function(req, res) {
    res.sendFile(messageBackend)
})
app.get("/backend/:mdpAdmin/:formation", function(req, res) {
    let mdpAdmin = req.params.mdpAdmin;
    var formation = req.params.formation;
    // messageFrontendDisplay = message.messages.filter(p => p.formation === "Frontend");

    if (mdpAdmin === '00000000' && formation === "Frontend") {
        // On verifie ici si le demandeur a le droit de voir les information de bdd (c-à-d il possède le mdp "00000000") 
        res.send(messageFrontend)
        console.log(messageFrontend);
    }
    if (mdpAdmin === '00000000' && formation === "BackendmessageBackend") {
        // On verifie ici si le demandeur a le droit de voir les information de bdd (c-à-d il possède le mdp "00000000") 
        res.send(messageBackend)
        console.log(messageBackend);
    }
    if (mdpAdmin === '00000000' && formation === "Marketing") {
        // On verifie ici si le demandeur a le droit de voir les information de bdd (c-à-d il possède le mdp "00000000") 
        res.send(messageMarketing)
        console.log(messageMarketing);
    }
    if (mdpAdmin === '00000000' && formation === "uxui" || mdpAdmin === '00000000' && formation === "Uxui") {
        // On verifie ici si le demandeur a le droit de voir les information de bdd (c-à-d il possède le mdp "00000000") 
        res.send(messageUxui)
        console.log(messageUxui);
    } else {
        res.send('error mdp admin ou formation non trouver')
    }
    // console.log(messageFrontend);
})

//--------
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
            messageStr = constMessageStr + messageStrMoins1 + ',' + avisDataStr + ']}' + ' ; ' + 'module.exports = messages'
            console.log(messageStr);
            fs.writeFileSync('./bdd_formulaire/message.js', messageStr, function(erreur) {
                if (erreur) {
                    console.log(erreur)
                } else {
                    console.log(messageStr);
                }
            })
            if (formation === 'Backend') {
                fs.writeFileSync('./bdd_formulaire/messageBackend.js', messageStr, function(erreur) {
                    if (erreur) {
                        console.log(erreur)
                    } else {
                        console.log('---------------------', messageStr);
                    }
                })
                res.send(messageBackend)
            }

            if (formation === 'Frontend') {
                fs.writeFileSync('./bdd_formulaire/messageFrontend.js', messageStr, function(erreur) {
                    if (erreur) {
                        console.log(erreur)
                    } else {
                        console.log('---------------------', messageStr);
                    }
                })
                res.send(messageBackend)

            }
            if (formation === 'Marketing') {
                fs.writeFileSync('./bdd_formulaire/messageMarketing.js', messageStr, function(erreur) {
                    if (erreur) {
                        console.log(erreur)
                    } else {
                        console.log('---------------------', messageStr);

                    }
                })
                res.send('formation Marketing')

            }
            if (formation === 'UXUI') {
                fs.writeFileSync('./bdd_formulaire/messageUxui.js', messageStr, function(erreur) {
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