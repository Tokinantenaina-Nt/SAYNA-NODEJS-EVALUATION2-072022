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

app.get("/api/message/:mdpAdmin/:formation", function(req, res) {
    let mdpAdmin = req.params.mdpAdmin;
    var formation = req.params.formation.toLowerCase();
    const messageDisplay = message.messages.filter(p => p.formation.toLowerCase() === formation);
    if (mdpAdmin === '12345678') {
        res.send(messageDisplay);

    }
})
app.get("/api/sayna/best_avis", function(req, res) {

    const messageDisplay = message.messages.filter(p => p.note > 3.5);

    res.send(messageDisplay);

})
app.get("/api/message/:mdpAdmin", function(req, res) {
    let mdpAdmin = req.params.mdpAdmin;
    if (mdpAdmin === '12345678') {
        res.send(message);

    }
})
app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + `/style.css`)
})
app.get('/index.js', function(req, res) {
    res.sendFile(__dirname + `/index.js`)
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
app.get('/backend', function(req, res) {
    res.sendFile(__dirname + `/pages/backend.html`)
})

app.get('/indexAPI', function(req, res) {
    res.sendFile(__dirname + `/pages/indexAPI.html`)
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

    firstname = req.body.firstname;
    lastname = req.body.lastname;
    avis = req.body.avis;
    note = req.body.note;
    formation = req.body.formation;

    if (firstname && avis && note && formation) {

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
        messageStr = constMessageStr + messageStrMoins1 + ',' + avisDataStr + ']}' + ' ; ' + 'module.exports = messages'
        console.log(messageStr);
        fs.writeFileSync('./bdd_formulaire/message.js', messageStr, function(erreur) {
            if (erreur) {
                console.log(erreur)
            } else {
                res.status(200).send(message);
            }
        })
    } else {

        res.status(400).send(message);
    }
    res.send(message)
});


app.listen(port, () => console.log(
    'notre application tourne au http://localhost:' + port
));