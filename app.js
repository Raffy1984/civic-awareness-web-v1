// --- UNIFICAZIONE DEL ARCHIVIO DATI (Elimina problemi CORS / Caricamento locale asincrono) ---
const DATA_STORE = {
    regioni: [
        "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", 
        "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche", 
        "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana", 
        "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"
    ],
    comuni: [
        "Roma", "Milano", "Napoli", "Torino", "Palermo", "Genova", "Bologna", 
        "Firenze", "Bari", "Catania", "Venezia", "Verona", "Messina", "Padova", 
        "Trieste", "Brescia", "Prato", "Parma", "Modena", "Reggio Calabria", 
        "Reggio Emilia", "Perugia", "Ravenna", "Livorno", "Cagliari", "Foggia", 
        "Rimini", "Salerno", "Ferrara", "Sassari", "Latina", "Giugliano in Campania", 
        "Monza", "Siracusa", "Pescara", "Bergamo", "Forlì", "Trento", "Vicenza"
    ],
    
    // Database dei 10 Temi di pancia Nazionali (Sanità, Economia, Scuola, Ambiente, Sicurezza, Trasporti, Debito, Welfare, Immigrazione, Energia)
    domandeNazionali: [
        {
            t: "Sanità",
            q: "Liste d'attesa bloccate nei pronto soccorso e specialistica intasata. Dai talk show si invoca un cambio di rotta. Come ti muovi?",
            o: [
                { t: "Finanzio in extra-deficit un piano straordinario di assunzioni stabili per medici e infermieri. (Consenso immediato alto, bilancio a rischio)", p: 2, v: [-3, 3, 3] },
                { t: "Estendo in via strutturale i fondi e le prestazioni rimborsate alle cliniche private convenzionate. (Efficienza rapida, critiche sociali a sinistra)", p: 2, v: [1, 1, 1] },
                { t: "Riorganizzo la rete tramite la sanità territoriale (Case della Salute) e introduco incentivi legati alle prestazioni fisiche reali. (Lungo termine)", p: 3, v: [2, 2, -1] },
                { t: "Aumento la quota di compartecipazione (ticket) a carico del cittadino sopra i 40.000€ di reddito per disincentivare esami inutili.", p: 1, v: [3, -2, -3] }
            ]
        },
        {
            t: "Economia",
            q: "Pressione fiscale record sulle imprese commerciali e stagnazione dei salari. La piazza chiede un segnale forte. Quale decreto firmi?",
            o: [
                { t: "Introduco la Flat Tax generalizzata per autonomi e dipendenti, sperando nell'effetto emersione e stimolo consumi.", p: 1, v: [-2, -1, 3] },
                { t: "Taglio drastico e mirato del cuneo fiscale interamente in busta paga ai redditi sotto i 35.000 euro.", p: 3, v: [1, 3, 2] },
                { t: "Istituisco un nuovo pacchetto di sussidi a fondo perduto e crediti d'imposta per le imprese che non delocalizzano.", p: 1, v: [-3, 1, 2] },
                { t: "Varo una patrimoniale dello 0.8% sui patrimoni mobiliari superiori a un milione per redistribuire risorse.", p: 2, v: [1, 2, -3] }
            ]
        },
        {
            t: "Scuola",
            q: "Il precariato storico dei docenti paralizza l'avvio dell'anno scolastico, mentre crollano le competenze minime degli studenti. Come agisci?",
            o: [
                { t: "Assunzione automatica per anzianità di servizio di tutti i precari con tre anni di supplenze, senza concorso selettivo.", p: 1, v: [-2, 2, 3] },
                { t: "Blocco i sindacati, impongo concorsi nazionali stringenti sul merito e lego gli scatti di stipendio alle valutazioni INVALSI.", p: 2, v: [2, -2, -3] },
                { t: "Aumento gli stanziamenti ordinari per ammodernare l'edilizia scolastica e rilancio gli istituti tecnici professionali legati alle aziende.", p: 3, v: [0, 3, 2] },
                { t: "Istituisco il buono scuola (Voucher) per permettere alle famiglie di iscrivere i figli nelle scuole paritarie private.", p: 1, v: [1, -1, 0] }
            ]
        },
        {
            t: "Ambiente",
            q: "Direttive UE impongono lo stop alle caldaie a gas e alle auto endotermiche. Il dibattito pubblico tra transizione e difesa dell'industria esplode. Tu che fai?",
            o: [
                { t: "Applico tasse ecologiche immediate sui carburanti fossili per forzare il passaggio all'elettrico.", p: 1, v: [1, -2, -4] },
                { t: "Reintroduco un super-bonus statale al 100% per l'efficientamento e il cappotto termico degli edifici privati.", p: 1, v: [-4, 2, 3] },
                { t: "Prevedo incentivi progressivi di rottamazione solo per ceti a basso ISEE e finanzio esclusivamente le infrastrutture di ricarica pubbliche.", p: 3, v: [1, 2, 1] },
                { t: "Mi oppongo ai vincoli europei a tutela della filiera produttiva automotive e manifatturiera nazionale.", p: 1, v: [1, -2, 2] }
            ]
        },
        {
            t: "Sicurezza",
            q: "Stazioni ferroviarie fuori controllo e periferie delle grandi aree urbane segnate da spaccio e microcriminalità. La cittadinanza è esasperata.",
            o: [
                { t: "Esercito permanente (Strade Sicure) in pianta stabile in tutti gli hub ferroviari e piazze critiche.", p: 2, v: [-1, 1, 3] },
                { t: "Riforma penale per azzerare i benefici di pena per la flagranza di reati da strada (scippi, borseggi) e nuove carceri.", p: 1, v: [-2, -1, 2] },
                { t: "Riqualificazione urbana commerciale, incremento dell'illuminazione pubblica e potenziamento dei servizi sociali di recupero.", p: 3, v: [1, 3, 1] },
                { t: "Controllo capillare tramite telecamere a riconoscimento facciale centralizzato gestito dalle forze dell'ordine.", p: 2, v: [1, -1, 1] }
            ]
        },
        {
            t: "Trasporti",
            q: "Le grandi tratte dell'Alta Velocità assorbono tutte le risorse operative, mentre i treni dei pendolari regionali offrono condizioni indecenti.",
            o: [
                { t: "Sospendo l'avvio di nuove macro-opere ferroviarie per girare tutti i fondi PNRR sul materiale rotabile locale.", p: 3, v: [1, 3, 2] },
                { t: "Porto a compimento i corridoi infrastrutturali strategici per rendere attrattivo il sistema industriale logistico all'estero.", p: 2, v: [2, 0, 1] },
                { t: "Liberalizzo totalmente le tratte regionali permettendo l'ingresso di operatori privati in concorrenza commerciale.", p: 2, v: [2, -2, 0] },
                { t: "Pongo i biglietti e gli abbonamenti a tariffa minima calmierata per legge, coprendo le perdite delle ferrovie con fondi pubblici.", p: 1, v: [-3, 2, 2] }
            ]
        },
        {
            t: "Debito Pubblico",
            q: "Lo Spread sale e i mercati azionari speculano sulla sostenibilità delle nostre emissioni di BTP. Come rassicuri gli osservatori internazionali?",
            o: [
                { t: "Varo una spending review lacrime e sangue con il blocco immediato delle assunzioni e indicizzazione delle pensioni.", p: 2, v: [3, -3, -4] },
                { t: "Incrocio automatico delle banche dati di conti correnti, utenze e catasto per far emergere l'evasione fiscale di massa.", p: 3, v: [3, 2, -2] },
                { t: "Innalzo l'aliquota IVA ordinaria dal 22% al 24% per fare cassa immediata e blindare i conti.", p: 1, v: [2, -3, -4] },
                { t: "Emetto titoli di stato speciali esentasse dedicati ai soli risparmiatori interni facendo leva sul patriottismo finanziario.", p: 1, v: [-1, 1, 2] }
            ]
        },
        {
            t: "Welfare",
            q: "Il crollo delle nascite mina la previdenza ordinaria. C'è chi chiede di anticipare l'uscita pensionistica e chi teme il default dell'INPS.",
            o: [
                { t: "Innalzamento rigido dell'età pensionabile minima a 68 anni senza deroghe, agganciata all'aspettativa biologica.", p: 3, v: [3, -2, -4] },
                { t: "Varo scivoli pensionistici generalizzati (es. Quota 41) senza ricalcolo contributivo per liberare posti per i giovani.", p: 1, v: [-3, 1, 3] },
                { t: "Prevedo la pensione anticipata flessibile ma solo accettando il calcolo puramente contributivo dell'assegno calato.", p: 2, v: [2, -1, 1] },
                { t: "Sostituisco i bonus una-tantum con un assegno unico familiare strutturale raddoppiato per ogni figlio nato dal secondo in poi.", p: 2, v: [-2, 3, 2] }
            ]
        },
        {
            t: "Immigrazione",
            q: "Sbarchi costanti sulle coste e centri di prima accoglienza al collasso. La gestione dei flussi spacca l'opinione pubblica. Come intervieni?",
            o: [
                { t: "Accordi economici e finanziamenti ai governi di transito del Nord Africa per bloccare le partenze via terra.", p: 3, v: [1, 0, 2] },
                { t: "Blocco navale militare e respingimento immediato in mare aperto senza identificazione.", p: 1, v: [-1, -3, 3] },
                { t: "Distribuzione vincolante e obbligatoria in tutti i piccoli comuni italiani con percorsi di inserimento lavorativo.", p: 2, v: [-2, 3, -2] },
                { t: "Sanatoria ampia per regolarizzare chi è già inserito nel circuito economico sommerso (agricoltura, assistenza anziani).", p: 2, v: [2, 2, -1] }
            ]
        },
        {
            t: "Energia",
            q: "I costi delle bollette mettono a rischio le aziende manifatturiere. Il dibattito energetico si accende sulle fonti strategiche. Su cosa punti?",
            o: [
                { t: "Inserisco nel piano energetico nazionale la costruzione di centrali nucleari di ultima generazione sul territorio.", p: 2, v: [2, -1, -2] },
                { t: "Deregulation burocratica per installazioni massive di pannelli fotovoltaici a terra e parchi eolici offshore.", p: 3, v: [2, 2, 1] },
                { t: "Autorizzo nuove trivellazioni nei mari italiani per estrarre gas nazionale abbattendo i costi di importazione.", p: 1, v: [1, -2, 1] },
                { t: "Istituisco un tetto massimo ai prezzi energetici al consumo coprendo la differenza con debito pubblico a carico dello Stato.", p: 0, v: [-4, 2, 3] }
            ]
        }
    ],
    
    // Database Regionale (Sanità territoriale, Trasporti, Ambiente)
    domandeRegionaliGeneriche: [
        {
            t: "Sanità Territoriale",
            q: "Le opposizioni e i sindacati nella regione {TERRITORIO} denunciano liste d'attesa di oltre un anno per esami diagnostici salvavita nelle ASL.",
            o: [
                { t: "Attivo un piano straordinario imponendo turni straordinari notturni e festivi ai medici dipendenti.", p: 2, v: [-2, 2, 2] },
                { t: "Compro pacchetti di prestazioni dalle strutture private accreditate della regione per azzerare le liste in 60 giorni.", p: 2, v: [1, 1, 2] },
                { t: "Riorganizzo i Cup e sanziono i direttori generali delle ASL che non ottimizzano i macchinari fermi nei fine settimana.", p: 3, v: [2, 1, -1] },
                { t: "Sospendo l'erogazione di esami non urgenti per i codici bianchi per alleggerire la pressione sui laboratori.", p: 1, v: [1, -3, -3] }
            ]
        },
        {
            t: "Trasporti Locali",
            q: "I treni regionali e le linee di trasporto pubblico locale di {TERRITORIO} sono quotidianamente oggetto di proteste per ritardi e scarsa pulizia.",
            o: [
                { t: "Emetto sanzioni miliardarie contro la società di gestione e apro il mercato regionale a una gara d'appalto internazionale.", p: 3, v: [1, 1, 0] },
                { t: "Stanzio fondi dal bilancio regionale per acquistare treni di ultima generazione aumentando i canoni di leasing.", p: 2, v: [-2, 2, 3] },
                { t: "Aumento il prezzo dei biglietti per i non residenti in regione in modo da finanziare le manutenzioni interne.", p: 1, v: [1, 0, -1] },
                { t: "Riduco le frequenze delle corse nei fine settimana e nelle ore serali per recuperare risorse sul personale.", p: 1, v: [1, -2, -2] }
            ]
        },
        {
            t: "Ambiente & Dissesto",
            q: "I report scientifici indicano che la regione {TERRITORIO} è una delle aree a più alto rischio idrogeologico ed edilizio del Paese.",
            o: [
                { t: "Blocco immediato di qualsiasi variante urbanistica che preveda nuovo consumo di suolo, congelando i cantieri.", p: 3, v: [1, 2, -1] },
                { t: "Assegno fondi ai consorzi di bonifica regionali per la pulizia meccanica sistematica di alvei e sponde fluviali.", p: 2, v: [-1, 2, 2] },
                { t: "Emetto bond regionali per costruire vasche di laminazione e dighe di contenimento nelle valli instabili.", p: 2, v: [-2, 1, 1] },
                { t: "Ordino lo sgombero e la demolizione delle strutture residenziali edificate abusivamente nelle aree a rischio R4.", p: 1, v: [-1, 1, -3] }
            ]
        }
    ],
    
    // Database Comunale (Rifiuti, Viabilità, Tasse e Bilancio)
    domandeComunaliGeneriche: [
        {
            t: "Rifiuti & Decoro",
            q: "I quartieri del comune di {TERRITORIO} mostrano cumuli di immondizia stradale e la percentuale di raccolta differenziata è ferma.",
            o: [
                { t: "Riformulo la TARI applicando la tariffa puntuale (chi più indifferenziata produce, più paga) e installo fototrappole.", p: 3, v: [2, 1, -1] },
                { t: "Rimuovo tutti i cassonetti stradali e introduco la raccolta porta a porta spinta, modificando i calendari di ritiro.", p: 2, v: [-1, 2, 0] },
                { t: "Punto sulla pianificazione di un moderno termovalorizzatore comunale per azzerare i costi di export del pattume.", p: 2, v: [3, -1, 1] },
                { t: "Eseguo un'ordinanza per assumere addetti alla pulizia interinali attingendo a fondi straordinari di riserva.", p: 1, v: [-2, 1, 2] }
            ]
        },
        {
            t: "Viabilità & Commercio",
            q: "A {TERRITORIO} infuria la polemica tra associazioni di ciclisti che chiedono aree pedonali e negozianti che difendono l'accesso alle auto.",
            o: [
                { t: "Varo il piano 'Città 30' riducendo i limiti di velocità urbani e pedonalizzo l'intero centro storico commerciale.", p: 2, v: [0, 2, -2] },
                { t: "Cancello i progetti di piste ciclabili sulle arterie stradali principali per salvaguardare i parcheggi a spina di pesce.", p: 1, v: [0, -1, 3] },
                { t: "Realizzo parcheggi di interscambio sotterranei esterni connessi al centro tramite navette elettriche ad alta frequenza.", p: 3, v: [-2, 2, 2] },
                { t: "Concedo l'uso gratuito e permanente del suolo pubblico per i dehors di bar e ristoranti sacrificando i posti auto.", p: 1, v: [1, 1, 2] }
            ]
        },
        {
            t: "Bilancio & Welfare",
            q: "Il bilancio del comune di {TERRITORIO} rischia il pre-dissesto finanziario. Devi tagliare la spesa o recuperare entrate d'urgenza.",
            o: [
                { t: "Innalzo l'addizionale comunale IRPEF e applico aliquote IMU massime sulle seconde case sfitte per salvare i servizi.", p: 2, v: [2, 1, -3] },
                { t: "Riduco i contributi economici comunali alle associazioni del terzo settore, asili nido assistiti e mense sociali.", p: 1, v: [2, -3, -2] },
                { t: "Affido la gestione della riscossione coattiva delle multe stradali arretrate a una agenzia esterna spietata.", p: 3, v: [3, 0, -2] },
                { t: "Piazzo autovelox fissi e varchi elettronici per incrementare le entrate del codice della strada in modo massivo.", p: 1, v: [2, -1, 1] }
            ]
        }
    ]
};

// --- CONFIGURAZIONE E ENGINE INTERNO ---
const CONFIG = {
    SCORE_MAX_RAW: 30, 
    VECT_MAX_RAW: 20   
};

let appState = {
    username: "Cittadino",
    level: "nazionale",
    territory: "",
    currentQuestionIndex: 0,
    rawScore: 0,
    vectors: { economia: 10, sociale: 10, consenso: 10 },
    sessionQuestions: []
};

document.addEventListener("DOMContentLoaded", () => {
    initEventHandlers();
});

function initEventHandlers() {
    document.getElementById("btn-start").addEventListener("click", handleStart);
    
    document.querySelectorAll(".btn-level").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const level = e.currentTarget.getAttribute("data-level");
            handleLevelSelection(level);
        });
    });
    
    document.getElementById("btn-confirm-territorio").addEventListener("click", handleTerritoryConfirmation);
    document.getElementById("btn-restart").addEventListener("click", resetApp);
    
    document.querySelectorAll(".btn-back").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const target = e.currentTarget.getAttribute("data-target");
            switchScreen(target);
        });
    });
}

function switchScreen(screenId) {
    document.querySelectorAll(".screen").forEach(scr => scr.classList.remove("active"));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add("active");
    }
}

function handleStart() {
    const inputVal = document.getElementById("input-username").value.trim();
    appState.username = inputVal || "Cittadino Anonimo";
    switchScreen("screen-level");
}

function handleLevelSelection(selectedLevel) {
    appState.level = selectedLevel;
    
    if (selectedLevel === "nazionale") {
        appState.territory = "Italia";
        generateQuizSession();
    } else {
        populateTerritorySelect(selectedLevel);
        const titleEl = document.getElementById("territorio-title");
        const labelEl = document.getElementById("label-select-territorio");
        
        if (selectedLevel === "regionale") {
            titleEl.textContent = "Seleziona la tua Regione";
            labelEl.textContent = "Scegli l'ente regionale su cui applicare le riforme:";
        } else {
            titleEl.textContent = "Seleziona il tuo Comune";
            labelEl.textContent = "Scegli l'amministrazione locale da governare:";
        }
        switchScreen("screen-territorio");
    }
}

function populateTerritorySelect(level) {
    const select = document.getElementById("select-territorio");
    select.innerHTML = "";
    
    const datasource = (level === "regionale") ? DATA_STORE.regioni : DATA_STORE.comuni;
    
    datasource.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.textContent = item;
        select.appendChild(opt);
    });
}

function handleTerritoryConfirmation() {
    appState.territory = document.getElementById("select-territorio").value;
    generateQuizSession();
}

function generateQuizSession() {
    appState.currentQuestionIndex = 0;
    appState.rawScore = 0;
    appState.vectors = { economia: 10, sociale: 10, consenso: 10 };
    appState.sessionQuestions = [];
    
    let baseQuestions = [];
    if (appState.level === "nazionale") {
        baseQuestions = DATA_STORE.domandeNazionali;
    } else if (appState.level === "regionale") {
        baseQuestions = DATA_STORE.domandeRegionaliGeneriche;
    } else {
        baseQuestions = DATA_STORE.domandeComunaliGeneriche;
    }
    
    appState.sessionQuestions = JSON.parse(JSON.stringify(baseQuestions));
    
    appState.sessionQuestions.forEach(q => {
        q.q = q.q.replace(/{TERRITORIO}/g, appState.territory);
    });
    
    CONFIG.SCORE_MAX_RAW = appState.sessionQuestions.length * 3;
    
    switchScreen("screen-quiz");
    renderCurrentQuestion();
}

function renderCurrentQuestion() {
    const q = appState.sessionQuestions[appState.currentQuestionIndex];
    if (!q) {
        evaluateAndFinish();
        return;
    }
    
    document.getElementById("quiz-category").textContent = q.t;
    document.getElementById("quiz-progress").textContent = `Scenario ${appState.currentQuestionIndex + 1} di ${appState.sessionQuestions.length}`;
    
    const progressPercent = (appState.currentQuestionIndex / appState.sessionQuestions.length) * 100;
    document.getElementById("quiz-progress-bar").style.width = `${progressPercent}%`;
    
    document.getElementById("quiz-question-text").textContent = q.q;
    
    const optionsContainer = document.getElementById("quiz-options");
    optionsContainer.innerHTML = "";
    
    q.o.forEach((option) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-option";
        btn.textContent = option.t;
        btn.addEventListener("click", () => handleAnswerSelection(option));
        optionsContainer.appendChild(btn);
    });
}

function handleAnswerSelection(selectedOption) {
    appState.rawScore += selectedOption.p;
    
    appState.vectors.economia += selectedOption.v[0];
    appState.vectors.sociale += selectedOption.v[1];
    appState.vectors.consenso += selectedOption.v[2];
    
    appState.vectors.economia = Math.max(0, Math.min(appState.vectors.economia, CONFIG.VECT_MAX_RAW));
    appState.vectors.sociale = Math.max(0, Math.min(appState.vectors.sociale, CONFIG.VECT_MAX_RAW));
    appState.vectors.consenso = Math.max(0, Math.min(appState.vectors.consenso, CONFIG.VECT_MAX_RAW));
    
    appState.currentQuestionIndex++;
    renderCurrentQuestion();
}

function evaluateAndFinish() {
    let finalScoreNormalized = Math.round((appState.rawScore / CONFIG.SCORE_MAX_RAW) * 100);
    if (finalScoreNormalized < 0) finalScoreNormalized = 0;
    if (finalScoreNormalized > 100) finalScoreNormalized = 100;
    
    let levelBadge = "MEDIO";
    let cssClass = "medio";
    let message = "";
    
    if (finalScoreNormalized >= 75) {
        levelBadge = "ALTO (PROMOSSO)";
        cssClass = "alto";
        message = `Egregio ${appState.username}, le tue decisioni indicano una profonda refrattarietà alla demagogia da bar. Dimostri di comprendere l'interconnessione strutturale tra entrate e uscite dello Stato o dell'amministrazione locale di ${appState.territory}, anteponendo la sostenibilità e la logica sistemica al mero opportunismo elettorale temporaneo.`;
    } else if (finalScoreNormalized >= 40) {
        levelBadge = "MEDIO (RIVEDIBILE)";
        cssClass = "medio";
        message = `Gentile ${appState.username}, le tue risposte riflettono l'andamento tipico del dibattito nei talk show televisivi. Hai alternato decisioni tecnicamente razionali a concessioni emotive finalizzate ad assecondare la 'pancia della piazza'. Per ottenere la massima promozione amministrativa devi evitare di finanziare riforme strutturali ricorrendo a disavanzi o deficit insostenibili.`;
    } else {
        levelBadge = "BASSO (BOCCIATO)";
        cssClass = "basso";
        message = `Attenzione ${appState.username}. Le scelte operate presentano forti scomposizioni logiche. Hai sistematicamente optato per soluzioni iper-populiste, mirate a massimizzare il consenso immediato della platea o ad applicare interventi drastici privi di coperture reali di bilancio. Ricorda che ogni servizio pubblico erogato possiede costi vivi che qualcuno deve finanziare.`;
    }
    
    document.getElementById("result-username").textContent = appState.username;
    document.getElementById("result-score").textContent = finalScoreNormalized;
    
    const badgeEl = document.getElementById("result-badge");
    badgeEl.textContent = levelBadge;
    badgeEl.className = `result-badge ${cssClass}`;
    
    document.getElementById("result-message").textContent = message;
    
    const pctEco = Math.round((appState.vectors.economia / CONFIG.VECT_MAX_RAW) * 100);
    const pctSoc = Math.round((appState.vectors.sociale / CONFIG.VECT_MAX_RAW) * 100);
    const pctCon = Math.round((appState.vectors.consenso / CONFIG.VECT_MAX_RAW) * 100);
    
    document.getElementById("bar-eco").style.width = `${pctEco}%`;
    document.getElementById("bar-soc").style.width = `${pctSoc}%`;
    document.getElementById("bar-con").style.width = `${pctCon}%`;
    
    switchScreen("screen-result");
}

function resetApp() {
    document.getElementById("input-username").value = "";
    switchScreen("screen-home");
}
