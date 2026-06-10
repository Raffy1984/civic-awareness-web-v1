// --- DATABASE INTEGRATO (Risolve i conflitti di caricamento locali e CORS) ---
const DATA_STORE = {
    regioni: [
        "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", 
        "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche", 
        "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana", 
        "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"
    ],
    comuni: [
        "Roma", "Milano", "Napoli", "Torino", "Palermo", 
        "Genova", "Bologna", "Firenze", "Bari", "Catania",
        "Venezia", "Verona", "Messina", "Padova", "Trieste"
    ],
    domandeNazionali: [
        {
            t: "Sanità",
            q: "Il Servizio Sanitario Nazionale soffre di carenza di organico e liste d'attesa interminabili. Come intervieni finanziariamente?",
            o: [
                { t: "Aumento immediato del fondo sanitario nazionale in deficit per assumere medici e infermieri.", p: 2, v: [-2, 3, 2] },
                { t: "Estensione drastica delle convenzioni con strutture private per smaltire le liste d'attesa in tempi record.", p: 2, v: [1, 1, 1] },
                { t: "Digitalizzazione dei processi, telemedicina e razionalizzazione dei piccoli ospedali inefficienti sul territorio.", p: 3, v: [2, 1, -1] },
                { t: "Imposizione di ticket sanitari progressivi legati al reddito ISEE per frenare l'iper-afflusso non urgente.", p: 1, v: [2, -2, -3] }
            ]
        },
        {
            t: "Economia",
            q: "La crescita del PIL è stagnante e la pressione fiscale sulle imprese frena gli investimenti. Quale manovra approvi?",
            o: [
                { t: "Introduzione di una Flat Tax per le società per attrarre capitali e stimolare l'occupazione.", p: 2, v: [1, -1, 2] },
                { t: "Taglio mirato del cuneo fiscale interamente a beneficio dei lavoratori a basso reddito per rilanciare i consumi.", p: 3, v: [1, 2, 2] },
                { t: "Sussidi statali diretti e incentivi a fondo perduto ai settori industriali strategici in crisi.", p: 1, v: [-2, 1, 2] },
                { t: "Aumento della patrimoniale sui grandi patrimoni per finanziare investimenti infrastrutturali pubblici.", p: 2, v: [1, 2, -2] }
            ]
        },
        {
            t: "Scuola",
            q: "Il sistema scolastico soffre di abbandono precoce e strutture fatiscenti. Come allochi i fondi dedicati?",
            o: [
                { t: "Aumento lineare degli stipendi di tutto il personale docente per ristabilire la dignità del ruolo.", p: 2, v: [-2, 2, 3] },
                { t: "Finanziamenti legati al merito e alle performance degli istituti basati sui test INVALSI.", p: 1, v: [1, -2, -2] },
                { t: "Piano straordinario di edilizia scolastica per la sicurezza e cablaggio digitale di tutte le aule.", p: 3, v: [-1, 3, 2] },
                { t: "Incentivi e bonus diretti alle famiglie meno abbienti (voucher scuola) spendibili anche in istituti privati.", p: 1, v: [0, 1, 1] }
            ]
        },
        {
            t: "Ambiente",
            q: "Gli obiettivi europei impongono una netta riduzione delle emissioni nocive entro i primi anni. Quale politica attui?",
            o: [
                { t: "Blocco progressivo della circolazione dei veicoli endotermici diesel e benzina nelle grandi arterie.", p: 1, v: [-1, 1, -3] },
                { t: "Erogazione di eco-incentivi statali per l'efficientamento termico degli edifici privati (Cappotti termici).", p: 2, v: [-3, 2, 2] },
                { t: "Carbon Tax sulle grandi industrie inquinanti con redistribuzione dei proventi in sgravi fiscali green.", p: 3, v: [2, 1, -1] },
                { t: "Nessuna forzatura normativa; si delega la transizione ai tempi di adeguamento spontaneo del mercato.", p: 0, v: [1, -2, 1] }
            ]
        },
        {
            t: "Sicurezza",
            q: "Si registra una forte percezione di insicurezza legata a fenomeni di microcriminalità nelle aree metropolitane.",
            o: [
                { t: "Dispiegamento permanente dell'Esercito (Operazione Strade Sicure) nei punti nevralgici e nelle stazioni.", p: 2, v: [-1, 1, 3] },
                { t: "Inasprimento generalizzato delle pene detentive e costruzione di nuovi istituti penitenziari.", p: 1, v: [-2, 0, 2] },
                { t: "Riqualificazione urbana, illuminazione LED diffusa e potenziamento dei servizi sociali di strada.", p: 3, v: [0, 2, 1] },
                { t: "Investimenti massicci in sistemi di videosorveglianza predittiva gestiti da intelligenze artificiali.", p: 2, v: [1, 0, 1] }
            ]
        },
        {
            t: "Trasporti",
            q: "La rete ferroviaria ad alta velocità e i collegamenti intermodali mostrano profonde asimmetrie geografiche.",
            o: [
                { t: "Concentrazione delle risorse sul completamento delle grandi opere strategiche infrastrutturali interregionali.", p: 2, v: [2, 0, 1] },
                { t: "Priorità assoluta al rinnovo del parco mezzi dei treni pendolari e delle linee regionali secondarie.", p: 3, v: [0, 3, 2] },
                { t: "Liberalizzazione totale del mercato ferroviario per favorire l'ingresso di competitor privati e abbassare i prezzi.", p: 2, v: [2, -1, 1] },
                { t: "Nazionalizzazione e statalizzazione completa dei vettori di trasporto per garantire tariffe fisse minime.", p: 1, v: [-2, 2, 2] }
            ]
        },
        {
            t: "Debito Pubblico",
            q: "Il rapporto Debito/PIL espone la nazione alla volatilità dei mercati finanziari e all'innalzamento dello Spread.",
            o: [
                { t: "Adozione di una seria spending review con tagli lineari ai ministeri e blocco totale del turnover pubblico.", p: 2, v: [3, -2, -3] },
                { t: "Contrasto serrato all'evasione fiscale incrociando le banche dati e limitando severamente l'uso del contante.", p: 3, v: [3, 1, -1] },
                { t: "Aumento temporaneo dell'aliquota IVA ordinaria per garantire entrate immediate e rassicurare i mercati.", p: 1, v: [2, -2, -4] },
                { t: "Emissione di titoli di stato speciali riservati esclusivamente ai risparmiatori residenti nel territory nazionale.", p: 2, v: [-1, 1, 2] }
            ]
        },
        {
            t: "Welfare",
            q: "L'invecchiamento demografico mette a rischio la tenuta del sistema previdenziale e assistenziale. Come ti muovi?",
            o: [
                { t: "Innalzamento progressivo dell'età pensionabile agganciata rigorosamente alle aspettative di vita reali.", p: 3, v: [3, -1, -3] },
                { t: "Creazione di schemi di flessibilità in uscita (es. Quota 100/103) finanziati tramite ricalcolo contributivo.", p: 2, v: [-1, 1, 2] },
                { t: "Potenziamento esclusivo degli assegni sociali minimi per prevenire la povertà assoluta degli anziani.", p: 2, v: [-2, 2, 2] },
                { t: "Istituzione di un fondo pensionistico complementare obbligatorio privato gestito per via aziendale.", p: 1, v: [2, -2, -2] }
            ]
        },
        {
            t: "Immigrazione",
            q: "La gestione dei flussi migratori irregolari mette sotto pressione le strutture di prima accoglienza e i bilanci.",
            o: [
                { t: "Finanziamento di hotspot internazionali nei paesi di transito per esaminare le domande d'asilo prima degli sbarchi.", p: 3, v: [1, 1, 2] },
                { t: "Chiusura dei porti e blocco navale in coordinamento o autonomia rispetto alle agenzie internazionali.", p: 1, v: [-1, -2, 3] },
                { t: "Distribuzione obbligatoria e inclusione nei piccoli comuni tramite micro-accoglienza diffusa e corsi di lingua.", p: 2, v: [-2, 2, -2] },
                { t: "Regolarizzazione di massa legata a contratti di lavoro preesistenti nei settori agricolo e assistenziale.", p: 2, v: [2, 1, -1] }
            ]
        },
        {
            t: "Energia",
            q: "La dipendenza energetica dall'estero espone il sistema produttivo a shock dei prezzi e instabilità geopolitiche.",
            o: [
                { t: "Riapertura immediata del dossier sul nucleare pulito di ultima generazione con un piano di siti nazionali.", p: 2, v: [2, -1, -1] },
                { t: "Semplificazione burocratica radicale per autorizzare mega-impianti solari ed eolici commerciali.", p: 3, v: [2, 2, 1] },
                { t: "Sussidi e defiscalizzazione per l'estrazione di gas naturale dai giacimenti nazionali già esistenti.", p: 1, v: [1, -1, 1] },
                { t: "Calmiere statale sulle bollette elettriche di famiglie e imprese coperto mediante scostamento di bilancio.", p: 0, v: [-3, 2, 3] }
            ]
        }
    ],
    domandeRegionaliGeneriche: [
        {
            t: "Sanità Regionale",
            q: "Il bilancio della regione {TERRITORIO} è assorbitò per l'80% dalla sanità. La Corte dei Conti rileva buchi strutturali.",
            o: [
                { t: "Commissariamento delle ASL inefficienti e accorpamento dei distretti sanitari per tagliare i costi amministrativi.", p: 3, v: [3, -1, -2] },
                { t: "Aumento delle addizionali IRPEF regionali al massimo consentito per non tagliare le prestazioni.", p: 2, v: [1, 2, -3] },
                { t: "Riduzione dei posti letto nei presidi ospedalieri minori, convertendoli in case della comunità per malati cronici.", p: 2, v: [2, 1, -1] },
                { t: "Privatizzazione della gestione dei servizi non sanitari (mense, pulizie, lavanderie) tramite appalti al ribasso.", p: 1, v: [2, -2, -1] }
            ]
        },
        {
            t: "Trasporti Locali",
            q: "I pendolari della regione {TERRITORIO} lamentano continui disservizi e sovraffollamento sulle linee di competenza regionale.",
            o: [
                { t: "Risoluzione del contratto con l'attuale gestore unico e indizione di una gara d'appalto europea aperta.", p: 3, v: [1, 1, -1] },
                { t: "Stanziamento straordinario di fondi regionali per l'acquisto immediato di nuovi treni e vagoni.", p: 2, v: [-2, 2, 3] },
                { t: "Aumento controllato del costo del biglietto singolo per finanziare la manutenzione straordinaria dei binari.", p: 1, v: [2, -1, -2] },
                { t: "Riduzione delle corse nelle fasce orarie di morbida per concentrare il personale nei momenti di punta.", p: 1, v: [1, -2, -2] }
            ]
        },
        {
            t: "Ambiente & Territorio",
            q: "Il rischio idrogeologico minaccia ampie zone di {TERRITORIO}. Dissesti e alluvioni si ripetono ciclicamente.",
            o: [
                { t: "Moratoria totale sul consumo di suolo: divieto assoluto di nuove edificazioni commerciali in tutta la regione.", p: 3, v: [1, 2, -1] },
                { t: "Istituzione di un piano di sfoltimento vegetazione e pulizia straordinaria dei letti dei fiumi tramite consorzi di bonifica.", p: 2, v: [-1, 2, 2] },
                { t: "Finanziamenti di grandi opere di ingegneria idraulica (vasche di laminazione) tramite emissione di bond regionali.", p: 2, v: [-2, 1, 1] },
                { t: "Delocalizzazione forzata e indennizzata delle abitazioni private costruite in aree classificate a rischio R4.", p: 1, v: [-3, 2, -3] }
            ]
        }
    ],
    domandeComunaliGeneriche: [
        {
            t: "Rifiuti Urbani",
            q: "La gestione della raccolta rifiuti a {TERRITORIO} mostra forti criticità: la raccolta differenziata è bassa e i costi della TARI aumentano.",
            o: [
                { t: "Passaggio alla tariffazione puntuale (paghi solo per l'indifferenziata che produci) e sanzioni severe con fototrappole.", p: 3, v: [2, 1, -1] },
                { t: "Estensione del porta a porta spinto in tutti i quartieri, eliminando definitivamente i cassonetti stradali.", p: 2, v: [-1, 2, 0] },
                { t: "Costruzione rapida di un impianto di termovalorizzazione comunale per azzerare i costi di trasferimento all'estero.", p: 2, v: [3, -1, 1] },
                { t: "Aumento temporaneo del personale della municipalizzata tramite contratti stagionali per pulizie straordinarie.", p: 1, v: [-2, 1, 2] }
            ]
        },
        {
            t: "Viabilità Urbana",
            q: "Il centro storico e le direttrici commerciali di {TERRITORIO} sono costantemente intasati dal traffico privato e dalla sosta selvaggia.",
            o: [
                { t: "Ampliamento drastico della ZTL h24 e trasformazione di intere vie in isole pedonali permanenti.", p: 2, v: [1, 1, -2] },
                { t: "Istituzione di zone con limite di velocità a 30 km/h estese a tutti i quartieri residenziali non arteriosi.", p: 2, v: [0, 2, -1] },
                { t: "Costruzione di parcheggi sotterranei scambiatori alle porte della città e potenziamento delle corsie preferenziali bus.", p: 3, v: [-2, 2, 2] },
                { t: "Sanatoria e pedonalizzazione parziale consentendo ai commercianti l'occupazione di suolo pubblico gratuita per i tavolini.", p: 1, v: [1, 1, 3] }
            ]
        },
        {
            t: "Welfare di Prossimità",
            q: "Il bilancio del comune di {TERRITORIO} presenta margini ridotti, ma aumentano le richieste di assistenza e alloggi popolari.",
            o: [
                { t: "Assegnazione degli alloggi e dei sussidi comunali basata rigorosamente sulla storicità di residenza nel comune.", p: 1, v: [0, -1, 3] },
                { t: "Partenariato con il terzo settore e fondazioni bancarie per creare empori solidali e co-housing assistito.", p: 3, v: [2, 2, 2] },
                { t: "Esternalizzazione totale degli asili nido e dei centri diurni per anziani a cooperative private per abbattere i costi storici.", p: 1, v: [2, -3, -2] },
                { t: "Rimodulazione ed elevazione dell'addizionale comunale IRPEF per non tagliare l'assistenza domiciliare ai disabili.", p: 2, v: [1, 2, -2] }
            ]
        }
    ]
};

// --- CONFIGURAZIONE E STATO APPLICAZIONE ---
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

// --- INIZIALIZZAZIONE ---
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
            titleEl.textContent = "Seleziona la Regione";
            labelEl.textContent = "Scegli l'ente regionale di riferimento";
        } else {
            titleEl.textContent = "Seleziona il Comune";
            labelEl.textContent = "Scegli l'amministrazione locale di riferimento";
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
    
    // Aggiorna il calcolo del punteggio massimo in base al numero di domande del livello caricato
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
    document.getElementById("quiz-progress").textContent = `Domanda ${appState.currentQuestionIndex + 1} di ${appState.sessionQuestions.length}`;
    
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
        message = `Egregio ${appState.username}, le tue decisioni denotano una solida comprensione delle complesse interconnessioni istituzionali, economiche e sociali. Dimostri di ponderare gli effetti a lungo termine di ogni riforma e di comprendere che la spesa pubblica necessita di coperture reali, rifiutando facili soluzioni demagogiche o populiste.`;
    } else if (finalScoreNormalized >= 40) {
        levelBadge = "MEDIO (RIVEDIBILE)";
        cssClass = "medio";
        message = `Gentile ${appState.username}, il tuo profilo decisionale mostra sprazzi di razionalità e senso civico, alternati tuttavia a scelte emotive o sbilanciate. In alcuni scenari hai teso a massimizzare il consenso immediato a spese della sostenibilità di bilancio, oppure hai applicato riforme rigide ignorandone gli impatti sociali sui ceti deboli. Trova un maggior equilibrio sistemico.`;
    } else {
        levelBadge = "BASSO (BOCCIATO)";
        cssClass = "basso";
        message = `Attenzione ${appState.username}. Il simulatore ha rilevato una forte scomposizione logica nelle scelte operate. Le opzioni da te selezionate tendono ad assecondare la pancia del paese o a implementare risposte drastiche non supportate da analisi di sostenibilità economica reale. Ricorda che ogni diritto erogato possiede un costo di copertura e ogni tassa tagliata impatta i servizi essenziali.`;
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
