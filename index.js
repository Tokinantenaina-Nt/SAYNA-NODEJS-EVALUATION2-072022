let note_ = document.getElementById('note_');
let note2_ = document.getElementById('note2_');
// const note_frontend = document.getElementById('note2_frontend');
// const note2_frontend = document.getElementById('note2_frontend');
// const note_marketing = document.getElementById('note2_marketing');
// const note2_marketing = document.getElementById('note2_marketing');
// const note_uxui = document.getElementById('note2_uxui');
// const note2_uxui = document.getElementById('note2_uxui');

// var dir = loc.substring(0, loc.lastIndexOf('/'));


let avisDisplay = [];
const fetchMessage = async(params) => {
    avisDisplay = await fetch("http://localhost:3000/api/message/12345678").then((res) => res.json());
    let avisDisplayMessages = avisDisplay.messages
    avisDisplayMessages = avisDisplayMessages.filter((p) => p.formation.toLowerCase() == params).sort((a, b) => b.note - a.note).sort((c, d) => d.date < c.date);
    let avisDisplayMessagesSplice = avisDisplayMessages.splice(0, 2);
    if (params) {

    }
    note_.innerHTML = avisDisplayMessagesSplice.map((el) => (
            // el.avis + el.note
            `
                <li> 
                        ${el.note} <span style="font-size: 10px ">⭐</span> 
                            </br> 
                        <span style="font-style: normal; "> ${el.firstname}  : </span> 
                            </br>
                            </br> 
                        <span style=""> "${el.avis}" </span> 
                </li> 
                </br>

            `
        )

    ).join(' ');
    avisDisplayMessages.sort((c, d) => d.date < c.date);
    let avisDisplayMessagesSplice2 = avisDisplayMessages.splice(0, 2);
    note2_.innerHTML = avisDisplayMessagesSplice2.map((el) => (
            `
                <li> 
                        ${el.note} <span style="font-size: 10px">⭐</span> 
                            </br> 
                        <span style="font-style: normal;">${el.firstname} : </span> 
                            </br>
                            </br>
                        <span style= ""> "${el.avis}" </span> 
                </li> 
                </br>

            `
        )

    ).join(' ');
};


if (window.location.href == window.location.origin + '/backend') {
    fetchMessage('backend');
    console.log(window.location.href);

}
if (window.location.href == window.location.origin + '/frontend') {
    fetchMessage('frontend');
    console.log(window.location.href);

}
if (window.location.href == window.location.origin + '/marketing') {
    fetchMessage('marketing');
    console.log(window.location.href);
}
if (window.location.href == window.location.origin + '/uxui') {
    fetchMessage('uxui');
    console.log(window.location.href);

}