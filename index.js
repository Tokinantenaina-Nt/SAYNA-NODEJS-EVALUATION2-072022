let note_ = document.getElementById('note_');
let note2_ = document.getElementById('note2_');
const lireTous = document.getElementById('lireTous');

// ----------- affichage des avis par formation

let avisDisplay

const fetchMessage = async(par) => {
    avisDisplay = await fetch(`/api/message/12345678/formation=${par}/orderbynote`).then((res) => res.json());
    // les avis sont tries par ordre de : belle note (en face), puis les commentaires récents(en arriere) 
    // ---------------TRI1: 
    // ------------------- inner html ---------------
    // front messages -----

    function inner() {
        avisDisplay.splice(2)
        note_.innerHTML = avisDisplay.map((el) => (
            `    <li> ${el.note}
            <span style="font-size: 10px "> ⭐
                    </span>
            </br>
            <span style="font-style: normal; "> ${el.firstName} :</span>
            </br>
            <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.datePost)}</span>
            </br>
            <span>"${el.avis}"</span>
        </li>
        </br>`

        )).join(' ');
    }
    inner()

    // back messages -------------
    // TRI2 : ---------
    avisDisplay = await fetch(`/api/message/12345678/formation=${par}/orderbyid`).then((res) => res.json());

    function inner2() {
        avisDisplay.splice(2)
        note2_.innerHTML = avisDisplay.map((el) => (
            ` 
                <li> ${el.note}
                    <span style="font-size: 10px "> ⭐</span>
                    </br>
                    <span style="font-style: normal; "> ${el.firstName} :</span>
                    </br>
                    <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.datePost)}</span>
                    </br>
                    <span>"${el.avis}"</span>
                </li>
                </br>
            `
        )).join(' ');
    }
    inner2()
        // --------------------   evenemment  --------------------------------
    const flipBoxInner = document.querySelector('#flip-box-inner')
    const flipBox = document.querySelector('#flip-box')


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


    avisDisplay = await fetch(`/api/message/12345678/formation=${par}/orderbyid`).then((res) => res.json());


    // innerHTML all messages ------------- 
    // TRI3 : -------------

    const lireTousIndexPage = document.querySelector('#lireTousIndexPage');
    let avisDisplayAll = avisDisplay

    if (lireTous && lireTousIndexPage == null) {

        lireTous.addEventListener("click", () => {

            close.classList.toggle('opacity1')
            flipBox.classList = ('flip-box-lireTous')
            note_.innerHTML = avisDisplayAll.map((el) => (
                    `
                    <li> ${el.note}
                        <span style="font-size: 10px "> ⭐</span>
                        </br>
                        <span style="font-style: normal; "> ${el.firstName} :</span>
                        </br>
                        <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.datePost)}</span>
                        </br>
                        <span>"${el.avis}"</span>
                    </li>
                    </br>
                `
                )

            ).join(' ');
        })
    }

    // TRI4 : ---------------- HomePage ---------
    if (lireTousIndexPage && lireTous == null) {
        // ------------ le meilleur avis de note superieur à 3.5
        // fetch(`/api/message/allFormation/:authAdmin/bynote&notesup/:note`)
        avisDisplayHomePage = await fetch(`/api/message/${par}/12345678/bynote&notesup/3.5`).then((res) => res.json());
        avisDisplayHomePage = avisDisplayHomePage.splice(0, 2);
        note_.innerHTML = avisDisplayHomePage.map((el) => (
                `
                <li> ${el.note}
                    <span style="font-size: 10px "> ⭐</span>
                    </br>
                    <span style="font-style: normal; "> ${el.firstName} :</span>
                    </br>
                    <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.datePost)}</span>
                    </br>
                    <span>"${el.avis}"</span>
                </li>
                    </br>

                `
            )

        ).join(' ');
        // --- order by date
        avisDisplayHomePage = await fetch(`/api/message/${par}/12345678/bynote&notesup/3.5`).then((res) => res.json());
        avisDisplayHomePage = avisDisplayHomePage.splice(2, 2)
        note2_.innerHTML = avisDisplayHomePage.map((el) => (
            ` 
            <li> ${el.note}
                <span style="font-size: 10px "> ⭐</span>
                </br>
                <span style="font-style: normal; "> ${el.firstName} :</span>
                </br>
                <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.datePost)}</span>
                </br>
                <span>"${el.avis}"</span>
            </li>
            </br>

                `
        )).join(' ');

        avisDisplayHomePage = await fetch(`/api/message/${par}/12345678/bynote&notesup/3.5`).then((res) => res.json());
        lireTousIndexPage.addEventListener("click", () => {
            close.classList.add('opacity1')
            flipBox.classList = ('flip-box-lireTous')
            note_.innerHTML = avisDisplayHomePage.map((el) => (
                    ` 
                    <li> ${el.note}
                        <span style="font-size: 10px "> ⭐</span>
                        </br>
                        <span style="font-style: normal; "> ${el.firstName} :</span>
                        </br>
                        <span style="opacity : 50% ; font-size : 11px ; padding: 10px 0; "> ${JSON.stringify(el.datePost)}</span>
                        </br>
                        <span>"${el.avis}"</span>
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
        flipBox.classList = 'flip-box'
        flipBoxInner.classList = 'flip-box-inner'
        inner();
        inner2();
        if (lireTousIndexPage && lireTous == null) { fetchMessage('allFormation') }

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

    let fnameInput, avisInput, noteInput, formationInput, messageDeConfirmation;
    fnameInput = fname.value;
    avisInput = avis.value;
    noteInput = note.value;
    formationInput = formation.value;

    function conf() {
        return confirm("ok or not?");
    };
    let errorChamp = true;


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

            messageDeConfirmation = ' Attention !!! * des champs obligatoire ne sont pas remplis '
            alert(messageDeConfirmation)


        } else {
            messageDeConfirmation = 'Votre commentaires est pris. Merci pour votre intéré!'
            alert(messageDeConfirmation)
            errorChamp = false;
        }

    })

}