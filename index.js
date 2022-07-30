const messageBackend = require('./bdd_formulaire/messageBackend')
const avisBackend = (messageBackend.messages.avis);
console.log((avisBackend).map());
const avisBackendDisplay = document.getElementById("avisBackendDisplay")
avisBackendDisplay.innerHTML = `
<>
`