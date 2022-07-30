const note = document.getElementById('note');
const note2 = document.getElementById('note2');
console.log(note2);

let avisDisplay = [];
const fetchMessage = async() => {
    avisDisplay = await fetch("http://localhost:3000/api/message/12345678").then((res) => res.json());
    let avisDisplayMessages = avisDisplay.messages
    avisDisplayMessages = avisDisplayMessages.filter((p) => p.formation.toLowerCase() == 'backend').sort((a, b) => b.note - a.note).sort((c, d) => d.date < c.date);
    let avisDisplayMessagesSplice = avisDisplayMessages.splice(0, 2);

    note.innerHTML = avisDisplayMessagesSplice.map((el) => (
            // el.avis + el.note
            `
       <li> ${el.note} <span style="font-size: 10px ">⭐</span> </br> 
      ${el.firstname}  : </br> <span style="font-style: normal; font-weight: bold;"> "${el.avis}" </span> </li> </br>

       `
        )

    ).join(' ');

    let avisDisplayMessagesSplice2 = avisDisplayMessages.splice(0, 2);
    note2.innerHTML = avisDisplayMessagesSplice2.map((el) => (
            // el.avis + el.note
            `
   <li> ${el.note} <span style="font-size: 25px ;text-align: left ;">⭐</span> </br> 
   ${el.firstname} : </br> <span style="font-style: normal; font-weight: bold;"> "${el.avis}" </span> </li> </br>

   `
        )

    ).join(' ');
};
fetchMessage();