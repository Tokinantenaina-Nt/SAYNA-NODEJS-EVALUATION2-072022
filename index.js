let note_ = document.getElementById('note_');
let note2_ = document.getElementById('note2_');


let avisDisplay = [];
const fetchMessage = async(params) => {
    avisDisplay = await fetch("http://localhost:3000/api/message/12345678").then((res) => res.json());
    let avisDisplayMessages = avisDisplay.messages
        // --------------- les avis sont tries par ordre de : belle note (en face), puis les commentaires récents(en arriere) 
    avisDisplayMessages = avisDisplayMessages.filter((p) => p.formation.toLowerCase() == params).sort((a, b) => a.note - b.note).reverse();
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
    avisDisplay = await fetch("http://localhost:3000/api/message/12345678").then((res) => res.json());
    let avisDisplayMessagesSplice2 = avisDisplay.messages.filter((p) => p.formation.toLowerCase() == params).reverse().splice(0, 2);
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

    // --------------------   evenemment  --------------------------------
    const lireTous = document.getElementById('lireTous');
    const flipBoxFront = document.querySelector('.flip-box-inner')
    const flipBoxLi = document.querySelector('.flip-box')
        // --------------------- Les fonction qui attendent 3000ms --------------
    setTimeout(() => {
        // ---------------------- scroll auto ---------------
        const li = document.querySelector('.flip-box-front ul').children;
        for (let i = 0; i < li.length; i++) {
            const el = li[i];

            setInterval(function() {
                el.scrollBy(0, 1);

            }, 100);
        }



    }, 3000);

    // ------------- onclick ---------------------
    const allAvis = document.querySelector('#allAvis')

    avisDisplay = await fetch("http://localhost:3000/api/message/12345678").then((res) => res.json());
    let avisDisplayMessagesSplice3 = avisDisplay.messages.filter((p) => p.formation.toLowerCase() == params).reverse()
    console.log(avisDisplayMessagesSplice3);
    lireTous.addEventListener("click", () => {
        flipBoxFront.style.width = '200%';
        flipBoxFront.style.height = '200%';
        flipBoxLi.classList = ('flip-box-lireTous li')
        flipBoxLi.style.width = '20em'
        allAvis.innerHTML = avisDisplayMessagesSplice3.map((el) => (
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
    })


};
if (window.location.href == window.location.origin + '/backend') {
    fetchMessage('backend');
}
if (window.location.href == window.location.origin + '/frontend') {
    fetchMessage('frontend');
}
if (window.location.href == window.location.origin + '/marketing') {
    fetchMessage('marketing');
}
if (window.location.href == window.location.origin + '/uxui') {
    fetchMessage('uxui');
}