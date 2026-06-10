// --- CONFIGURAZIONE E STATO APPLICAZIONE ---
const CONFIG = {
    SCORE_MAX_RAW: 30, // 10 domande * 3 punti max l'una
    VECT_MAX_RAW: 20   // Punteggio massimo teorico per singoli vettori impatto
};

let appState = {
    username: "Cittadino",
    level: "nazionale",
    territory: "",
    currentQuestionIndex: 0,
    rawScore: 0,
    vectors: {
        economia: 10,  // Base di partenza neutra
        sociale: 10,
        consenso: 10
    },
    sessionQuestions: []
};

// --- INIZIALIZZAZIONE ---
document.addEventListener("DOMContentLoaded", () => {
    initEventHandlers();
});

function initEventHandlers() {
    // Navigazione Start
    document.getElementById("btn-start").addEventListener("click", handleStart);
    
    // Selezione Livello
    document.querySelectorAll(".btn-level").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const level = e.currentTarget.getAttribute("data-level");
            handleLevelSelection(level);
        });
    });
    
    // Conferma Territorio
    document.getElementById("btn-confirm-territorio").addEventListener("click", handleTerritoryConfirmation);
    
    // Riavvia App
    document.getElementById("btn-restart").addEventListener("click", resetApp);
    
    // Pulsanti Indietro Generici
    document.querySelectorAll(".btn-back").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const target = e.currentTarget.getAttribute("data-target");
            switchScreen(target);
        });
    });
}

// --- LOGICA DI NAVIGAZIONE SCHERMATE ---
function switchScreen(screenId) {
    document.querySelectorAll(".screen").forEach(scr => scr.classList.remove("active"));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add("active");
    }
}

// --- FUNZIONI DI FLUSSO ---
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
    
    const datasource = (level === "regionale") ? DATA_TERRITORI.regioni : DATA_COMUNI.comuniEsempio;
    
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

// --- GENERATORE SESSIONE QUIZ ---
function generateQuizSession() {
    appState.currentQuestionIndex = 0;
    appState.rawScore = 0;
    appState.vectors = { economia: 10, sociale: 10, consenso: 10 };
    appState.sessionQuestions = [];
    
    // Recupero il blocco domande generico o specifico
    let baseQuestions = [];
    if (appState.level === "nazionale") {
        baseQuestions = DATA_TERRITORI.domandeNazionali;
    } else if (appState.level === "regionale") {
        baseQuestions = DATA_TERRITORI.domandeRegionaliGeneriche;
    } else {
        baseQuestions = DATA_COMUNI.domandeComunaliGeneriche;
    }
    
    // Copia profonda per evitare mutazioni dei dati sorgente
    appState.sessionQuestions = JSON.parse(JSON.stringify(baseQuestions));
    
    // Personalizzazione contestuale del testo della domanda basato sul territorio scelto
    appState.sessionQuestions.forEach(q => {
        q.q = q.q.replace(/{TERRITORIO}/g, appState.territory);
    });
    
    switchScreen("screen-quiz");
    renderCurrentQuestion();
}

// --- RENDERIZZA QUESITI ---
function renderCurrentQuestion() {
    const q = appState.sessionQuestions[appState.currentQuestionIndex];
    if (!q) {
        evaluateAndFinish();
        return;
    }
    
    // Aggiornamento Metadati
    document.getElementById("quiz-category").textContent = q.t;
    document.getElementById("quiz-progress").textContent = `Domanda ${appState.currentQuestionIndex + 1} di ${appState.sessionQuestions.length}`;
    
    // Aggiornamento Progress Bar
    const progressPercent = (appState.currentQuestionIndex / appState.sessionQuestions.length) * 100;
    document.getElementById("quiz-progress-bar").style.width = `${progressPercent}%`;
    
    // Scrittura Testo Quesito
    document.getElementById("quiz-question-text").textContent = q.q;
    
    // Generazione Opzioni di Risposta
    const optionsContainer = document.getElementById("quiz-options");
    optionsContainer.innerHTML = "";
    
    q.o.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-option";
        btn.textContent = option.t;
        btn.addEventListener("click", () => handleAnswerSelection(option));
        optionsContainer.appendChild(btn);
    });
}

// --- ELABORAZIONE RISPOSTA ---
function handleAnswerSelection(selectedOption) {
    // Accumulo punteggio lineare
    appState.rawScore += selectedOption.p;
    
    // Aggiornamento vettori di impatto sistemico
    appState.vectors.economia += selectedOption.v[0];
    appState.vectors.sociale += selectedOption.v[1];
    appState.vectors.consenso += selectedOption.v[2];
    
    // Clamp dei vettori per evitare overflow grafici [0, CONFIG.VECT_MAX_RAW]
    appState.vectors.economia = Math.max(0, Math.min(appState.vectors.economia, CONFIG.VECT_MAX_RAW));
    appState.vectors.sociale = Math.max(0, Math.min(appState.vectors.sociale, CONFIG.VECT_MAX_RAW));
    appState.vectors.consenso = Math.max(0, Math.min(appState.vectors.consenso, CONFIG.VECT_MAX_RAW));
    
    // Avanzamento indice
    appState.currentQuestionIndex++;
    renderCurrentQuestion();
}

// --- ELABORAZIONE REPORT FINALE ---
function evaluateAndFinish() {
    // Normalizzazione punteggio finale su scala 0-100
    let finalScoreNormalized = Math.round((appState.rawScore / CONFIG.SCORE_MAX_RAW) * 100);
    if (finalScoreNormalized < 0) finalScoreNormalized = 0;
    if (finalScoreNormalized > 100) finalScoreNormalized = 100;
    
    // Determinazione del livello di consapevolezza civica
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
    
    // Aggiornamento Interfaccia Grafica Report
    document.getElementById("result-username").textContent = appState.username;
    document.getElementById("result-score").textContent = finalScoreNormalized;
    
    const badgeEl = document.getElementById("result-badge");
    badgeEl.textContent = levelBadge;
    badgeEl.className = `result-badge ${cssClass}`;
    
    document.getElementById("result-message").textContent = message;
    
    // Aggiornamento Grafico Barre dei Vettori d'Impatto (conversione in percentuale)
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
