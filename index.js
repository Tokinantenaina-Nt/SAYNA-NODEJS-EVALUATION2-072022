let note_ = document.getElementById('note_');
let note2_ = document.getElementById('note2_');
const lireTous = document.getElementById('lireTous');



let avisDisplay = [];
const fetchMessage = async(params) => {
    avisDisplay = await fetch("http://localhost:3000/api/message/12345678").then((res) => res.json());
    let avisDisplayMessages = avisDisplay.messages
        // les avis sont tries par ordre de : belle note (en face), puis les commentaires récents(en arriere) 
        // ---------------TRI1: 
    avisDisplayMessages = avisDisplayMessages.filter((p) => p.formation.toLowerCase() == params).sort((a, b) => a.note - b.note).reverse();
    let avisDisplayMessagesSplice = avisDisplayMessages.splice(0, 2);

    // ------------------- inner html ---------------
    // front messages -----
    function inner() {
        note_.innerHTML = avisDisplayMessagesSplice.map((el) => (
            // el.avis + el.note     

            `
                    <li> 
                            ${el.note} <span style="font-size: 10px ">⭐</span> 
                                </br> 
                            <span style="font-style: normal; "> ${el.firstname}  : </span> 
                                </br>
                                <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.date).substring(1, 26)} </span>
                                </br> 
                            <span style=""> "${el.avis}" </span> 
                    </li> 
                    </br>

                `
        )).join(' ');
    }
    inner()
        // back messages -------------
        // TRI2 : ---------
    avisDisplay = await fetch("http://localhost:3000/api/message/12345678").then((res) => res.json());
    let avisDisplayMessagesSplice2 = avisDisplay.messages.filter((p) => p.formation.toLowerCase() == params).reverse().splice(0, 2);

    function inner2() {
        note2_.innerHTML = avisDisplayMessagesSplice2.map((el) => (
            `
                        <li> 
                            ${el.note} <span style="font-size: 10px ">⭐</span> 
                                </br> 
                            <span style="font-style: normal; "> ${el.firstname}  : </span> 
                                </br>
                                <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.date).substring(1, 26)} </span>
                                </br> 
                            <span style=""> "${el.avis}" </span> 
                    </li> 
                    </br>

                `
        )).join(' ');
    }
    inner2()

    // --------------------   evenemment  --------------------------------
    const flipBoxInner = document.querySelector('#flip-box-inner')
    const flipBoxLi = document.querySelector('#flip-box')


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
    const close = document.querySelector('#close')


    avisDisplay = await fetch("http://localhost:3000/api/message/12345678").then((res) => res.json());


    // innerHTML all messages ------------- 
    // TRI3 : -------------
    let avisDisplayMessagesSplice3 = avisDisplay.messages.filter((p) => p.formation.toLowerCase() == params).reverse()
    const lireTousIndexPage = document.querySelector('#lireTousIndexPage');

    if (lireTous && lireTousIndexPage == null) {

        lireTous.addEventListener("click", () => {

            close.classList.toggle('opacity1')
            flipBoxLi.classList = ('flip-box-lireTous')
            note_.innerHTML = avisDisplayMessagesSplice3.map((el) => (
                    `
                    <li> 
                    ${el.note} <span style="font-size: 10px ">⭐</span> 
                        </br> 
                    <span style="font-style: normal; "> ${el.firstname}  : </span> 
                        </br>
                        <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.date).substring(1, 26)} </span>
                        </br> 
                    <span style=""> "${el.avis}" </span> 
            </li> 
            </br>

            `
                )

            ).join(' ');
        })
    }

    // TRI4 : ---------------- HomePage ---------
    if (lireTousIndexPage && lireTous == null) {

        avisDisplay = await fetch("http://localhost:3000/api/message/12345678").then((res) => res.json());

        let avisDisplayMessagesHome = avisDisplay.messages.filter((p) => p.note > 3.5).reverse().splice(0, 2);


        note_.innerHTML = avisDisplayMessagesHome.map((el) => (
                `
                <li> 
                ${el.note} <span style="font-size: 10px ">⭐</span> 
                    </br> 
                <span style="font-style: normal; "> ${el.firstname}  : </span> 
                    </br>
                    <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.date).substring(1, 26)} </span>
                    </br> 
                <span style=""> "${el.avis}" </span> 
                </li> 
                </br>

            `
            )

        ).join(' ');
        avisDisplayMessagesHome = avisDisplay.messages.filter((p) => p.note > 3.5).reverse().splice(2, 2);
        note2_.innerHTML = avisDisplayMessagesHome.map((el) => (
            `
                    <li> 
                        ${el.note} <span style="font-size: 10px ">⭐</span> 
                            </br> 
                        <span style="font-style: normal; "> ${el.firstname}  : </span> 
                            </br>
                            <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.date).substring(1, 26)} </span>
                            </br> 
                        <span style=""> "${el.avis}" </span> 
                </li> 
                </br>

            `
        )).join(' ');
        avisDisplayMessagesHome = avisDisplay.messages.filter((p) => p.note > 3.5).reverse()
        lireTousIndexPage.addEventListener("click", () => {

            close.classList.add('opacity1')
            flipBoxLi.classList = ('flip-box-lireTous')
            note_.innerHTML = avisDisplayMessagesHome.map((el) => (
                    `
                <li> 
                ${el.note} <span style="font-size: 10px ">⭐</span> 
                    </br> 
                <span style="font-style: normal; "> ${el.firstname}  : </span> 
                    </br>
                    <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.date).substring(1, 26)} </span>
                    </br> 
                <span style=""> "${el.avis}" </span> 
        </li> 
        </br>

        `
                )

            ).join(' ');
        })
    }
    // -------------------------------------------------------------------------------------
    const flipBoxFront = document.querySelector('.flip-box-front')
    flipBoxFront.addEventListener("click", () => {
        flipBoxInner.style.height = '100%';
    })
    close.addEventListener("click", () => {
        close.classList.toggle('opacity1')
        flipBoxLi.classList = 'flip-box'
        flipBoxInner.classList = 'flip-box-inner'
        inner();
        inner2();
    })

};
// ------------------- Verification de saisie page formulaire ---------------------
const form = document.querySelector('#form')
if (form && lireTous == null) {

    const fname = document.querySelector('#fname')
    const avis = document.querySelector('#avis')
    const note = document.querySelector('#note')
    const formation = document.querySelector('#formation')
    const submit = document.querySelector('#submit')

    console.log('s', submit);
    console.log('fname is', fname);
    console.log('form is', form);
    let fnameInput, avisInput, noteInput, formationInput, messageDeConfirmation;
    fnameInput = fname.value;
    avisInput = avis.value;
    noteInput = note.value;
    formationInput = formation.value;

    function conf() {
        return confirm("ok or not?");
    };
    let errorChamp = true;
    console.log(fnameInput);


    form.addEventListener("submit", (e) => {
        if (errorChamp === true) {
            e.preventDefault();
        }
    })
    submit.addEventListener("click", () => {
        fnameInput = fname.value;
        avisInput = avis.value;
        noteInput = note.value;
        formationInput = formation.value;
        if (fnameInput == '' || avisInput == '' || noteInput == '' || formationInput == '') {
            console.log('null!!');
            messageDeConfirmation = ' Attention !!! * des champs obligatoire ne sont pas remplis '
            alert(messageDeConfirmation)
            console.log('error', errorChamp);

        } else {
            messageDeConfirmation = 'Votre commentaires est pris. Merci pour votre intéré!'
            alert(messageDeConfirmation)
            errorChamp = false;
        }
        console.log(fnameInput);
    })

}