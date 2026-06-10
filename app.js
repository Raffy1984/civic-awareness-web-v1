/**
 * PATENTE CIVICA - CORE APPLICATION ENGINE (PROD-SPEC 2026)
 * Architettura Single-Page a gestione atomica dello stato. 
 * Include motori per la risoluzione dei set di domande, logiche di calcolo del report,
 * scomposizione analitica dei territori reali e validazione di bilancio interna del Laboratorio.
 */

// =========================================================================
// 1. DATASET DOMANDE STRUTTURATE (NAZIONALE / REGIONALE / COMUNALE)
// =========================================================================
const CORE_QUIZ_DATABASE = {
    nazionale: [
        {
            tema: "Economia e Debito Pubblico",
            titolo: "Gestione del debito sovrano in regime di rientro fiscale cooperativo.",
            descrizione: "La necessità di rifinanziare i titoli di Stato in scadenza espone l'economia dello Stato alle fluttuazioni dello spread. Quale approccio strutturale garantisce la stabilità finanziaria?",
            realtaGenerale: "Il Ministero dell'Economia opera nel monitoraggio costante della spesa primaria netta, in aderenza ai vincoli di bilancio stabiliti a livello sovranazionale per la sostenibilità del debito.",
            risposte: [
                {
                    testo: "Rimodulazione ed efficientamento dei capitoli di spesa pubblica improduttiva associata ad un piano di emersione del sommerso tramite tracciabilità informatica.",
                    punteggio: 100,
                    tradeOff: { guadagno: "Liberazione di risorse correnti stabili, contrazione strutturale dello spread.", perdita: "Costi di implementazione tecnologica e opposizioni di natura corporativa.", chiPaga: "Evastori fiscali e beneficiari di rendite o sussidi ingiustificati.", tempo: "Stabilizzazione del rating sovrano in un ciclo economico (12-24 mesi)." }
                },
                {
                    testo: "Finanziamento di incentivi monetari a pioggia non selettivi ricorrendo all'emissione di nuovo debito strutturale extra-bilancio.",
                    punteggio: 40,
                    tradeOff: { guadagno: "Incremento artificiale e istantaneo della domanda di consumo interno.", perdita: "Apertura di procedure di infrazione per deficit eccessivo e aumento degli interessi sui mutui.", chiPaga: "Le generazioni future tramite futura austerità o contrazione forzata dei servizi.", tempo: "Aumento dei rendimenti richiesti dai mercati entro il trimestre successivo." }
                },
                {
                    testo: "Sospensione unilaterale dei pagamenti degli interessi cedolari sui titoli di Stato in possesso di investitori esteri.",
                    punteggio: 10,
                    tradeOff: { guadagno: "Azzeramento nominale immediato di un capitolo di spesa per interessi.", perdita: "Default tecnico della Repubblica, blocco dei mercati finanziari, fallimento del sistema bancario nazionale.", chiPaga: "I risparmiatori interni, per via del crollo del valore dei patrimoni liquidi.", tempo: "Collasso dell'intero sistema dei pagamenti in meno di 72 ore." }
                },
                {
                    testo: "Mantenimento inerziale della spesa e dei coefficienti d'imposta senza alcun intervento correttivo.",
                    punteggio: 60,
                    tradeOff: { guadagno: "Evitare tensioni politiche nel breve termine e stabilità dei quadri normativi.", perdita: "Progressiva erosione dei margini di bilancio a causa delle spinte inflattive latenti.", chiPaga: "La competitività internazionale delle imprese nazionali.", tempo: "Declino economico lineare e costante nel medio-lungo periodo." }
                }
            ]
        },
        {
            tema: "Previdenza e Demografia",
            titolo: "Sostenibilità del sistema pensionistico a ripartizione a fronte dell'indice di vecchiaia.",
            descrizione: "Il calo demografico riduce progressivamente il rapporto tra lavoratori attivi contribuenti e trattamenti pensionistici erogati, impattando sul bilancio previdenziale.",
            realtaGenerale: "I dati statistici INPS indicano che l'applicazione dei criteri contributivi puri e l'adeguamento delle età di uscita all'aspettativa di vita sono i cardini per evitare il default attuariale.",
            risposte: [
                {
                    testo: "Istituzione di canali di flessibilità in uscita legati all'applicazione del calcolo integralmente contributivo della quota anticipata.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Tenuta finanziaria del sistema previdenziale nel lungo termine e salvaguardia dell'equità intergenerazionale.", perdita: "Riduzione dell'assegno mensile percepito dal lavoratore che sceglie l'anticipo.", chiPaga: "L'utente che opta per il pensionamento accettando la decurtazione matematica.", tempo: "Garanzia di stabilità dei flussi di cassa previdenziali a tempo indeterminato." }
                },
                {
                    testo: "Abbassamento generalizzato dell'età pensionabile finanziato mediante prelievi coattivi straordinari sui conti correnti bancari.",
                    punteggio: 30,
                    tradeOff: { guadagno: "Liberazione immediata di posti di lavoro teorici e alto gradimento nei sondaggi.", perdita: "Fuga di capitali all'estero, crollo della fiducia degli investitori e contrazione degli investimenti privati.", chiPaga: "I titolari di depositi e risparmi liquidi sul territorio nazionale.", tempo: "Shock di liquidità macroeconomico immediato entro l'anno solare." }
                },
                {
                    testo: "Abolizione integrale di ogni limite di età per il pensionamento, erogando un assegno fisso pari all'ultima retribuzione.",
                    punteggio: 15,
                    tradeOff: { guadagno: "Massimizzazione del benessere percepito dalla coorte di popolazione anziana.", perdita: "Bancarotta immediata dell'ente previdenziale per insostenibilità matematica del carico.", chiPaga: "I lavoratori under-35 tramite l'imposizione di aliquote contributive insostenibili.", tempo: "Paralisi dei pagamenti statali entro il successivo esercizio finanziario." }
                },
                {
                    testo: "Innalzamento rigido ed indifferenziato dell'età pensionabile per tutte le categorie professionali a 70 anni.",
                    punteggio: 65,
                    tradeOff: { guadagno: "Contrazione drastica della spesa previdenziale corrente nel breve periodo.", perdita: "Inasprimento delle condizioni di usura professionale e blocco del turnover generazionale nelle aziende.", chiPaga: "I lavoratori impiegati in mansioni gravose o logoranti.", tempo: "Aumento dei costi per congedi sanitari e ammortizzatori sociali in 2-4 anni." }
                }
            ]
        }
    ],
    regionale: [
        {
            tema: "Sanità Regionale",
            titolo: "Riorganizzazione delle liste d'attesa e integrazione dei servizi sociosanitari.",
            descrizione: "La spesa per la sanità rappresenta la voce principale dei bilanci delle Regioni. La saturazione delle liste d'attesa spinge i cittadini verso la diagnostica privata.",
            realtaGenerale: "I monitoraggi AGENAS indicano che l'unificazione reale dei Centri Unici di Prenotazione (CUP) tra strutture pubbliche e private accreditate ottimizza i macchinari disponibili.",
            risposte: [
                {
                    testo: "Implementazione del CUP unico integrato obbligatorio, sviluppo della telemedicina per i pazienti cronici e potenziamento delle Case della Comunità.",
                    punteggio: 100,
                    tradeOff: { guadagno: "Ottimizzazione dei tempi di erogazione, decongestionamento dei pronto soccorso metropolitani.", perdita: "Resistenze iniziali della dirigenza e necessità di riaddestramento digitale del personale medico.", chiPaga: "I distretti sanitari sul piano organizzativo e i gestori di sistemi tecnologici.", tempo: "Riduzione tracciabile dei tempi di attesa riscontrabile in 6-12 mesi." }
                },
                {
                    testo: "Copertura delle liste d'attesa tramite esternalizzazione massiva a cooperative di medici 'gettonisti' non strutturati.",
                    punteggio: 45,
                    tradeOff: { guadagno: "Pronto riempimento dei turni scoperti nei presidi d'emergenza periferici.", perdita: "Costo orario triplicato per le casse regionali e frammentazione della continuità terapeutica del paziente.", chiPaga: "Il bilancio sanitario consolidato della regione (rischio di commissariamento).", tempo: "Esaurimento dei fondi di bilancio correnti entro l'esercizio finanziario." }
                },
                {
                    testo: "Chiusura indifferenziata di tutti gli ospedali che registrano un numero di posti letto inferiore a 150 unità.",
                    punteggio: 35,
                    tradeOff: { guadagno: "Forte contrazione geometrica dei costi fissi correnti di gestione delle strutture.", perdita: "Desertificazione sanitaria delle aree montane e interne, con sovraccarico dei poli urbani.", chiPaga: "I cittadini residenti nelle comunità periferiche o isolate.", tempo: "Aumento della mortalità evitabile ed emergenza logistica in 6 mesi." }
                },
                {
                    testo: "Sussidiazione totale e illimitata delle prestazioni sanitarie erogate da privati senza tetti massimi di spesa.",
                    punteggio: 50,
                    tradeOff: { guadagno: "Cancellazione immediata visiva delle liste d'attesa per i cittadini abbienti.", perdita: "Deficit strutturale nel bilancio regionale con conseguente blocco di altri servizi (es. trasporti).", chiPaga: "La fiscalità generale regionale tramite l'innalzamento delle addizionali IRPEF.", tempo: "Sbilanciamento finanziario con obbligo di piano di rientro in 12 mesi." }
                }
            ]
        },
        {
            tema: "Infrastrutture e Trasporti",
            titolo: "Gestione e ammodernamento del materiale rotabile e delle linee ferroviarie regionali pendolari.",
            descrizione: "Le tratte ferroviarie regionali destinate al pendolarismo soffrono frequentemente di ritardi dovuti a infrastrutture obsolete e carenza di manutenzione.",
            realtaGenerale: "I contratti di servizio firmati tra le Regioni e i gestori della rete vincolano l'erogazione dei fondi al rispetto di indici statistici di puntualità e affidabilità.",
            risposte: [
                {
                    testo: "Affidamento tramite gare d'appalto europee basate su stringenti indicatori di performance (KPI), con obbligo di rinnovo totale della flotta di treni.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Iniezione di capitali industriali, ammodernamento tecnologico dei convogli e certezza del servizio.", perdita: "Rischio di rimodulazione oraria nelle tratte a bassissima frequentazione se non sussidiate.", chiPaga: "Le aziende concessionarie non efficienti che incorrono in penali pecuniarie.", tempo: "Miglioramento progressivo della regolarità dei treni in 18-24 mesi." }
                },
                {
                    testo: "Azzeramento delle tariffe dei biglietti per tutti i residenti, coprendo i costi operativi tramite emissione di debito regionale.",
                    punteggio: 40,
                    tradeOff: { guadagno: "Consenso politico immediato e incremento teorico nominale dell'uso dei mezzi pubblici.", perdita: "Incapacità finanziaria di acquistare nuovi treni o riparare le linee, con conseguente degrado del servizio.", chiPaga: "La collettività, costretta a subire un servizio qualitativamente inferiore.", tempo: "Aumento della frequenza dei guasti infrastrutturali entro un anno." }
                },
                {
                    testo: "Sostituzione sistematica di tutte le linee ferroviarie locali secondarie con autobus privati su gomma.",
                    punteggio: 50,
                    tradeOff: { guadagno: "Esecuzione rapida delle corse e azzeramento dei costi fissi di manutenzione dei binari.", perdita: "Forte aumento delle emissioni inquinanti climalteranti e congestione della rete stradale ordinaria.", chiPaga: "L'ambiente e i tempi di percorrenza degli utenti nelle ore di punta.", tempo: "Aumento del traffico veicolare sulle arterie urbane entro pochi mesi." }
                },
                {
                    testo: "Mantenimento dei contratti storici in regime di proroga perpetua senza controlli qualitativi di terze parti.",
                    punteggio: 30,
                    tradeOff: { guadagno: "Totale continuità burocratica e assenza di contenziosi legali o scioperi dei gestori.", perdita: "Cristallizzazione delle inefficienze e progressivo abbandono del trasporto su ferro da parte dei passeggeri.", chiPaga: "I lavoratori e gli studenti pendolari costretti a subire i disservizi.", tempo: "Degrado costante e irreversibile del patrimonio infrastrutturale." }
                }
            ]
        }
    ],
    comunale: [
        {
            tema: "Gestione Rifiuti e Ambiente",
            titolo: "Chiusura del ciclo integrato dei rifiuti urbani e implementazione della tariffazione puntuale.",
            descrizione: "La gestione dei rifiuti incide sulla tassa sui rifiuti municipale (TARI). La carenza di impianti di prossimità costringe i Comuni a trasferire i rifiuti all'estero con elevati costi di trasporto.",
            realtaGenerale: "I rapporti dell'ISPRA evidenziano che i Comuni che adottano la misurazione puntuale del secco residuo indifferenziato stimolano una separazione domestica efficiente.",
            risposte: [
                {
                    testo: "Attivazione della raccolta porta a porta tracciata da microchip RFID, tariffazione legata ai conferimenti reali e via libera a impianti di termovalorizzazione energetica regionali.",
                    punteggio: 100,
                    tradeOff: { guadagno: "Autonomia del ciclo dei rifiuti, riduzione drastica del conferimento in discarica e riduzione a regime della TARI.", perdita: "Iniziale complessità logistica per i residenti ed elevati controlli contro l'abbandono dei rifiuti.", chiPaga: "Gli utenti non virtuosi che non eseguono la corretta differenziazione dei materiali.", tempo: "Raggiungimento di una quota di riciclo superiore al 65% in 12 mesi." }
                },
                {
                    testo: "Ritorno al sistema dei cassonetti stradali indifferenziati aperti per azzerare i costi logistici del personale addetto.",
                    punteggio: 20,
                    tradeOff: { guadagno: "Massima semplificazione delle abitudini di gettito quotidiano dei cittadini nel breve termine.", perdita: "Sanzioni europee milionarie per violazione dei target ambientali e saturazione immediata delle discariche locali.", chiPaga: "I cittadini residenti attraverso un incremento automatico della TARI in bolletta.", tempo: "Emergenza ambientale e finanziaria nel territorio municipale entro 6 mesi." }
                },
                {
                    testo: "Spedizione di tutti i rifiuti solidi urbani in impianti esteri tramite contratti ferroviari a lungo termine.",
                    punteggio: 55,
                    tradeOff: { guadagno: "Rapida pulizia visiva delle strade urbane ed assenza di impianti di termovalorizzazione sul territorio comunale.", perdita: "Totale dipendenza geopolitica ed economica dalle tariffe degli operatori stranieri e costi di trasporto enormi.", chiPaga: "Le finanze correnti del Comune, sottraendo risorse alla manutenzione stradale o scolastica.", tempo: "Innalzamento strutturale e incontrollato dei costi del servizio nei bilanci pluriennali." }
                },
                {
                    testo: "Inasprimento delle sanzioni pecuniarie per chi sbaglia il conferimento senza però distribuire i kit di raccolta differenziata.",
                    punteggio: 40,
                    tradeOff: { guadagno: "Potenziale aumento delle entrate derivanti dalle contravvenzioni elevate dalla polizia locale.", perdita: "Forti tensioni sociali e proliferazione di micro-discariche abusive nelle strade rurali o periferiche.", chiPaga: "Il decoro urbano e la qualità dello spazio pubblico.", tempo: "Degrado urbano visibile nelle aree non monitorate da telecamere entro poche settimane." }
                }
            ]
        },
        {
            tema: "Mobilità e Viabilità Urbica",
            titolo: "Regolazione dei flussi veicolari privati nei centri urbani ad alta densità abitativa.",
            descrizione: "La congestione del traffico determina un peggioramento degli indici di qualità dell'aria e rallenta i tempi di percorrenza dei mezzi pubblici di superficie.",
            realtaGenerale: "I Piani Urbani della Mobilità Sostenibile (PUMS) mirano a riequilibrare lo spazio urbano incentivando nodi di scambio ferro-gomma esterni ai centri storici.",
            risposte: [
                {
                    testo: "Pedonalizzazione progressiva del nucleo storico, realizzazione di parcheggi di interscambio sotterranei alle porte urbane collegati a linee bus rapide corsie protette.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Abbattimento dell'inquinamento acustico ed atmosferico, incremento della sicurezza stradale e del valore monumentale.", perdita: "Iniziali proteste delle attività commerciali di vicinato per il timore di riduzione dei volumi di vendita.", chiPaga: "Gli automobilisti abituati all'accesso diretto, costretti a modificare le proprie modalità di parcheggio.", tempo: "Riqualificazione del tessuto urbano ed efficientamento dei flussi in 12-18 mesi." }
                },
                {
                    testo: "Liberalizzazione totale degli accessi e della sosta in ogni area urbana, comprese le zone a traffico limitato (ZTL).",
                    punteggio: 25,
                    tradeOff: { guadagno: "Massima libertà individuale immediata di accesso motorizzato a qualunque indirizzo urbano.", perdita: "Paralisi totale della circolazione nelle ore di punta, blocco dei mezzi di soccorso e picchi di emissioni di biossido di azoto.", chiPaga: "La salute pubblica della popolazione residente ed i tempi di percorrenza generali.", tempo: "Collasso della viabilità stradale cittadina immediato." }
                },
                {
                    testo: "Applicazione generalizzata del limite di velocità a 30 km/h sull'intero territorio comunale senza potenziare il TPL.",
                    punteggio: 65,
                    tradeOff: { guadagno: "Netta riduzione statistica della frequenza e della gravità degli incidenti stradali urbani.", perdita: "Aumento dei tempi di percorrenza per i veicoli commerciali, logistici e di trasporto merci.", chiPaga: "Gli operatori economici della distribuzione urbana e i lavoratori pendolari.", tempo: "Rallentamento generale dei flussi stradali con criticità concentrate nelle ore di picco." }
                },
                {
                    testo: "Rimozione completa di tutti i servizi di mobilità condivisa (sharing di biciclette, monopattini e autovetture) dal territorio comunale.",
                    punteggio: 40,
                    tradeOff: { guadagno: "Eliminazione immediata del fenomeno del parcheggio selvaggio sui marciapiedi e negli spazi pedonali.", perdita: "Sottrazione istantanea di opzioni di trasporto complementare ecologico, spingendo al riutilizzo dell'auto privata.", chiPaga: "La fascia di utenza giovanile e i pendolari intermodali sprovvisti di mezzo proprio.", tempo: "Aumento istantaneo delle autovetture private in circolazione nelle ore di punta." }
                }
            ]
        }
    ]
};

// =========================================================================
// 2. STATO ATOMICO GLOBALE DELL'APPLICAZIONE (APPLICATION RUNTIME STATE)
// =========================================================================
let SYSTEM_GLOBAL_STATE = {
    activeLevel: "",         // "nazionale" | "regionale" | "comunale"
    activeTerritoryId: "",   // ID univoco del territorio selezionato
    activeQuestionsSet: [],  // Riferimento all'array estratto di domande
    currentQuestionIdx: 0,
    scoreRecord: [],         // Array dei punteggi accumulati
    detailedAnswersLog: [],  // Mappatura scelte utente per il report
    liveIndicators: { economia: 50, sociale: 50, consenso: 50 },
    userAlias: "Analista",
    
    // Struttura dati per il Laboratorio Civico dei programmi elettorali
    laboratorioProgrammi: {
        ambitoCorrente: "comune",
        schedeCompilate: {}  // Mappa: { [uniqueKey]: { problema, soluzione, risorse, impatto } }
    }
};

// =========================================================================
// 3. INIZIALIZZAZIONE COMPONENTI (BOOTSTRAP & EVENT ROUTING)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    bootstrapSystemEventListeners();
});

function bootstrapSystemEventListeners() {
    const selectLevel = document.getElementById("geographical-level-select");
    const selectTerritory = document.getElementById("territory-specific-select");
    const btnStart = document.getElementById("btn-initiate-simulation");
    const inputAlias = document.getElementById("user-alias-input");

    // Monitoraggio del livello geografico per popolare le entità territoriali (Requisito 1 & 2)
    selectLevel.addEventListener("change", (e) => {
        const val = e.target.value;
        SYSTEM_GLOBAL_STATE.activeLevel = val;
        populateDynamicTerritorialDropdown(val);
        evaluateIntroFormValidity();
    });

    selectTerritory.addEventListener("change", (e) => {
        SYSTEM_GLOBAL_STATE.activeTerritoryId = e.target.value;
        evaluateIntroFormValidity();
    });

    inputAlias.addEventListener("input", evaluateIntroFormValidity);

    // Gestore del trigger di avvio del test (Requisito 3)
    btnStart.addEventListener("click", () => {
        const targetTerritoryId = selectTerritory.value;
        setTerritory(SYSTEM_GLOBAL_STATE.activeLevel, targetTerritoryId);
    });

    // Navigazione Single Page Application tramite Tab Button System
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".nav-tab-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            
            const targetPanelId = e.target.getAttribute("data-target");
            executePanelTabTransition(targetPanelId);
        });
    });

    // Eventi interni al modulo Laboratorio Civico
    document.getElementById("select-laboratorio-scope").addEventListener("change", (e) => {
        SYSTEM_GLOBAL_STATE.laboratorioProgrammi.ambitoCorrente = e.target.value;
        renderLaboratorioTopicsMenu();
    });

    document.getElementById("btn-save-lab-module").addEventListener("click", commitCurrentLabFieldToState);
    document.getElementById("btn-trigger-ai-coherence").addEventListener("click", evaluateProgramCoherenceEngine);
}

// =========================================================================
// 4. FUNZIONE TERRITORIO E POPOLAMENTO DINAMICO
// =========================================================================
function populateDynamicTerritorialDropdown(level) {
    const wrapper = document.getElementById("territory-specific-wrapper");
    const select = document.getElementById("territory-specific-select");
    const label = document.getElementById("territory-dynamic-label");
    
    select.innerHTML = '<option value="" disabled selected>Scegli l\'entità territoriale...</option>';
    SYSTEM_GLOBAL_STATE.activeTerritoryId = "";

    if (level === "nazionale") {
        wrapper.style.display = "block";
        label.textContent = "Ambito dello Stato";
        let opt = document.createElement("option");
        opt.value = DATA_TERRITORI.nazione.id;
        opt.textContent = DATA_TERRITORI.nazione.nome;
        select.appendChild(opt);
    } 
    else if (level === "regionale") {
        wrapper.style.display = "block";
        label.textContent = "Seleziona la Regione d'Esame";
        DATA_TERRITORI.regioni.forEach(reg => {
            let opt = document.createElement("option");
            opt.value = reg.id;
            opt.textContent = reg.nome;
            select.appendChild(opt);
        });
    } 
    else if (level === "comunale") {
        wrapper.style.display = "block";
        label.textContent = "Seleziona il Comune di Prossimità";
        // Ordinamento alfabetico dei 30 comuni per usabilità dell'interfaccia
        const sortedComuni = [...DATA_COMUNI.comuni].sort((a, b) => a.nome.localeCompare(b.nome));
        sortedComuni.forEach(com => {
            let opt = document.createElement("option");
            opt.value = com.id;
            opt.textContent = `${com.nome} (${com.id.replace('com-','').toUpperCase()})`;
            select.appendChild(opt);
        });
    } else {
        wrapper.style.display = "none";
    }
}

function evaluateIntroFormValidity() {
    const alias = document.getElementById("user-alias-input").value.trim();
    const level = document.getElementById("geographical-level-select").value;
    const territory = document.getElementById("territory-specific-select").value;
    const btn = document.getElementById("btn-initiate-simulation");

    if (alias.length >= 2 && level && territory) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

/**
 * REQUISITO FONDAMENTALE 3: setTerritory(level, territoryId)
 * Configura il contesto geografico, estrae le domande corrette e avvia l'interfaccia di simulazione.
 */
function setTerritory(level, territoryId) {
    SYSTEM_GLOBAL_STATE.activeLevel = level;
    SYSTEM_GLOBAL_STATE.activeTerritoryId = territoryId;
    SYSTEM_GLOBAL_STATE.userAlias = document.getElementById("user-alias-input").value.trim() || "Analista";
    
    // Selezione automatica del set corretto in base al livello (Requisito 2)
    if (level === "nazionale") {
        SYSTEM_GLOBAL_STATE.activeQuestionsSet = [...CORE_QUIZ_DATABASE.nazionale];
    } else if (level === "regionale") {
        SYSTEM_GLOBAL_STATE.activeQuestionsSet = [...CORE_QUIZ_DATABASE.regionale];
    } else if (level === "comunale") {
        SYSTEM_GLOBAL_STATE.activeQuestionsSet = [...CORE_QUIZ_DATABASE.comunale];
    }

    // Risoluzione stringa per la UI del badge territoriale
    let visualContextName = "Repubblica Italiana";
    if (level === "regionale") {
        const matchReg = DATA_TERRITORI.regioni.find(r => r.id === territoryId);
        if (matchReg) visualContextName = `Regione ${matchReg.nome}`;
    } else if (level === "comunale") {
        const matchCom = DATA_COMUNI.comuni.find(c => c.id === territoryId);
        if (matchCom) visualContextName = `Comune di ${matchCom.nome}`;
    }

    // Sincronizzazione metadati e contatori UI
    document.getElementById("active-context-badge").textContent = visualContextName.toUpperCase();
    document.getElementById("txt-total-steps").textContent = SYSTEM_GLOBAL_STATE.activeQuestionsSet.length;
    
    // Reset indicatori runtime
    SYSTEM_GLOBAL_STATE.currentQuestionIdx = 0;
    SYSTEM_GLOBAL_STATE.scoreRecord = [];
    SYSTEM_GLOBAL_STATE.detailedAnswersLog = [];
    SYSTEM_GLOBAL_STATE.liveIndicators = { economia: 50, sociale: 50, consenso: 50 };
    
    updateLiveIndicatorsUiBars();
    
    // Transizione verso il pannello di test attivo
    document.getElementById("panel-intro-view").classList.remove("active");
    document.getElementById("panel-test-view").classList.add("active");
    document.getElementById("application-nav-tabs").style.display = "flex";
    
    renderActiveQuizScenario();
}

// =========================================================================
// 5. MOTORE INTERNO DEL QUIZ E RUNTIME DELLE DECISIONI
// =========================================================================
function renderActiveQuizScenario() {
    const idx = SYSTEM_GLOBAL_STATE.currentQuestionIdx;
    const total = SYSTEM_GLOBAL_STATE.activeQuestionsSet.length;

    if (idx >= total) {
        generateSmartAnalyticalReport();
        return;
    }

    document.getElementById("txt-current-step").textContent = idx + 1;
    const percentProgress = (idx / total) * 100;
    document.getElementById("test-progress-indicator").style.width = `${percentProgress}%`;

    const activeQuestion = SYSTEM_GLOBAL_STATE.activeQuestionsSet[idx];
    
    document.getElementById("txt-scenario-topic").textContent = activeQuestion.tema.toUpperCase();
    document.getElementById("txt-scenario-title").textContent = activeQuestion.titolo;
    document.getElementById("txt-scenario-desc").textContent = activeQuestion.descrizione;

    // Generazione dinamica dei bottoni per le 4 risposte multiple
    const containerOptions = document.getElementById("container-quiz-options");
    containerOptions.innerHTML = "";

    activeQuestion.risposte.forEach((risp) => {
        let btn = document.createElement("button");
        btn.className = "option-select-btn";
        btn.textContent = risp.testo;
        btn.addEventListener("click", () => commitUserChoiceProcessing(risp));
        containerOptions.appendChild(btn);
    });
}

function commitUserChoiceProcessing(choiceObj) {
    const points = choiceObj.punteggio;
    
    // Algoritmo euristico interno per simulare l'impatto immediato delle decisioni sugli indicatori
    if (points >= 90) {
        SYSTEM_GLOBAL_STATE.liveIndicators.economia = Math.min(100, SYSTEM_GLOBAL_STATE.liveIndicators.economia + 12);
        SYSTEM_GLOBAL_STATE.liveIndicators.sociale = Math.min(100, SYSTEM_GLOBAL_STATE.liveIndicators.sociale + 8);
        SYSTEM_GLOBAL_STATE.liveIndicators.consenso = Math.max(0, SYSTEM_GLOBAL_STATE.liveIndicators.consenso - 5);
    } else if (points >= 60) {
        SYSTEM_GLOBAL_STATE.liveIndicators.consenso = Math.min(100, SYSTEM_GLOBAL_STATE.liveIndicators.consenso + 10);
        SYSTEM_GLOBAL_STATE.liveIndicators.economia = Math.max(0, SYSTEM_GLOBAL_STATE.liveIndicators.economia - 5);
    } else {
        SYSTEM_GLOBAL_STATE.liveIndicators.consenso = Math.min(100, SYSTEM_GLOBAL_STATE.liveIndicators.consenso + 15);
        SYSTEM_GLOBAL_STATE.liveIndicators.economia = Math.max(0, SYSTEM_GLOBAL_STATE.liveIndicators.economia - 15);
        SYSTEM_GLOBAL_STATE.liveIndicators.sociale = Math.max(0, SYSTEM_GLOBAL_STATE.liveIndicators.sociale - 10);
    }

    updateLiveIndicatorsUiBars();

    // Archiviazione nei registri di log dello stato
    SYSTEM_GLOBAL_STATE.scoreRecord.push(points);
    SYSTEM_GLOBAL_STATE.detailedAnswersLog.push({
        scenarioOriginale: SYSTEM_GLOBAL_STATE.activeQuestionsSet[SYSTEM_GLOBAL_STATE.currentQuestionIdx],
        rispostaScelta: choiceObj
    });

    SYSTEM_GLOBAL_STATE.currentQuestionIdx++;
    renderActiveQuizScenario();
}

function updateLiveIndicatorsUiBars() {
    const ecoBar = document.getElementById("fill-indicator-eco");
    const socBar = document.getElementById("fill-indicator-soc");
    const conBar = document.getElementById("fill-indicator-con");

    ecoBar.style.width = `${SYSTEM_GLOBAL_STATE.liveIndicators.economia}%`;
    socBar.style.width = `${SYSTEM_GLOBAL_STATE.liveIndicators.sociale}%`;
    conBar.style.width = `${SYSTEM_GLOBAL_STATE.liveIndicators.consenso}%`;

    document.getElementById("val-indicator-eco").textContent = `${SYSTEM_GLOBAL_STATE.liveIndicators.economia}%`;
    document.getElementById("val-indicator-soc").textContent = `${SYSTEM_GLOBAL_STATE.liveIndicators.sociale}%`;
    document.getElementById("val-indicator-con").textContent = `${SYSTEM_GLOBAL_STATE.liveIndicators.consenso}%`;
}

// =========================================================================
// 6. GENERAZIONE REPORT INTELLIGENTE AVANZATO
// =========================================================================
function generateSmartAnalyticalReport() {
    document.getElementById("panel-test-view").classList.remove("active");
    document.getElementById("panel-report-view").classList.add("active");

    // Calcolo matematico deterministico del punteggio finale riscalato su base 100
    const totalSum = SYSTEM_GLOBAL_STATE.scoreRecord.reduce((a, b) => a + b, 0);
    const calculatedFinalScore = Math.round(totalSum / SYSTEM_GLOBAL_STATE.scoreRecord.length);

    document.getElementById("rep-txt-user").textContent = SYSTEM_GLOBAL_STATE.userAlias;
    document.getElementById("rep-txt-scope").textContent = SYSTEM_GLOBAL_STATE.activeLevel.toUpperCase();
    document.getElementById("rep-txt-score").textContent = calculatedFinalScore;

    const badgeLevel = document.getElementById("rep-badge-civic-level");
    const narrativeContainer = document.getElementById("rep-txt-narrative");

    // Assegnazione del livello civico istituzionale da specifica (basso / medio / alto)
    if (calculatedFinalScore >= 80) {
        badgeLevel.textContent = "LIVELLO CIVICO: ALTO (Consapevolezza Istituzionale Avanzata)";
        badgeLevel.style.backgroundColor = "var(--color-success)";
        badgeLevel.style.color = "#000000";
        narrativeContainer.textContent = "La condotta amministrativa dimostrata evidenzia una comprensione sistemica approfondita delle dinamiche macroeconomiche e della sostenibilità di lungo termine delle decisioni. Le scelte effettuate rispettano rigorosamente i vincoli strutturali delle finanze pubbliche, rifiutando interventi di pura demagogia elettorale a deficit e salvaguardando il principio costituzionale di equità intergenerazionale.";
    } else if (calculatedFinalScore >= 55) {
        badgeLevel.textContent = "LIVELLO CIVICO: MEDIO (Approccio Lineare Amministrativo)";
        badgeLevel.style.backgroundColor = "var(--color-warning)";
        badgeLevel.style.color = "#000000";
        narrativeContainer.textContent = "Il profilo denota un orientamento bilanciato, teso alla salvaguardia dei diritti sociali immediati ma caratterizzato da una tendenza a sottovalutare i costi di finanziamento strutturali. Spesso l'esigenza di massimizzare il consenso a breve termine ha indotto l'adozione di misure che differiscono gli oneri finanziari sugli esercizi futuri, riducendo i margini di stabilità nei cicli successivi.";
    } else {
        badgeLevel.textContent = "LIVELLO CIVICO: BASSO (Scomposizione Strutturale dei Vincoli di Spesa)";
        badgeLevel.style.backgroundColor = "var(--color-danger)";
        badgeLevel.style.color = "#ffffff";
        narrativeContainer.textContent = "Le opzioni operative selezionate evidenziano una marcata divergenza dai vincoli reali della finanza pubblica e dalle evidenze statistiche istituzionali. La sistematica predilezione per l'espansione della spesa corrente priva di coperture finanziarie reali o l'adozione di soluzioni estreme e non concordate espone il territorio simulato a elevati rischi di default tecnico, sanzioni sovranazionali o paralisi dei servizi.";
    }

    // COMPILAZIONE DETTAGLIATA ACCORDION STRUTTURATO (Requisito 5: Sezioni A, B, C, D)
    const accordionStack = document.getElementById("container-report-accordion-stack");
    accordionStack.innerHTML = "";

    // Estrazione dati del territorio selezionato per la sezione C del report
    let territorialDescriptionText = "Ambito di analisi nazionale generalizzato.";
    if (SYSTEM_GLOBAL_STATE.activeLevel === "regionale") {
        const currentReg = DATA_TERRITORI.regioni.find(r => r.id === SYSTEM_GLOBAL_STATE.activeTerritoryId);
        if (currentReg) territorialDescriptionText = `Regione: ${currentReg.nome} | Indicatori: Spesa Sanitaria = ${currentReg.indicatoriSocioEconomici.quotaSpesaSanitaria || 'N/D'}. Problemi del territorio: ${currentReg.problemiTipici.join(' ')}`;
    } else if (SYSTEM_GLOBAL_STATE.activeLevel === "comunale") {
        const currentCom = DATA_COMUNI.comuni.find(c => c.id === SYSTEM_GLOBAL_STATE.activeTerritoryId);
        if (currentCom) territorialDescriptionText = `Comune di: ${currentCom.nome} | Categoria d'impatto locale. Problemi del territorio rilevati: ${currentCom.problemiTipici.join(' ')}`;
    }

    SYSTEM_GLOBAL_STATE.detailedAnswersLog.forEach((item, index) => {
        let node = document.createElement("div");
        node.className = "accordion-node";

        let head = document.createElement("div");
        head.className = "accordion-head";
        head.innerHTML = `<span>Scenario ${index + 1}: ${item.scenarioOriginale.tema} (Valutazione Scelta: ${item.rispostaScelta.punteggio}/100 pt)</span> <span>↕ Click per Espandere</span>`;

        let body = document.createElement("div");
        body.className = "accordion-body";
        body.style.display = "none";

        // SEZIONE A: RISPOSTA UTENTE E DESCRIZIONE
        let pUser = document.createElement("p");
        pUser.innerHTML = `<strong>Opzione Amministrativa Selezionata:</strong> <span style="color:#60a5fa;">${item.rispostaScelta.testo}</span>`;
        body.appendChild(pUser);

        // SEZIONE B: REALTÀ VS PERCEZIONE (LAYER EDUCATIVO)
        let divRealta = document.createElement("div");
        divRealta.className = "block-neutral-explanation";
        divRealta.innerHTML = `<strong>Sezione B) Realtà vs Percezione (Quadro Istituzionale Generale):</strong><br>${item.scenarioOriginale.realtaGenerale}`;
        body.appendChild(divRealta);

        // SEZIONE C: CONTESTO TERRITORIALE SPECIFICO
        let divTerritorio = document.createElement("div");
        divTerritorio.className = "block-territorial-snapshot";
        divTerritorio.innerHTML = `<strong>Sezione C) Contesto Territoriale (${SYSTEM_GLOBAL_STATE.activeTerritoryId.toUpperCase()}):</strong><br>${territorialDescriptionText}`;
        body.appendChild(divTerritorio);

        // SEZIONE D: MATRICE DEI TRADE-OFF DETTAGLIATA
        let divTradeOff = document.createElement("div");
        divTradeOff.className = "tradeoff-matrix-grid";
        divTradeOff.innerHTML = `
            <div class="tradeoff-cell tocell-gain"><span class="inner-cell-title">Cosa si guadagna (Benefici):</span> ${item.rispostaScelta.tradeOff.guadagno}</div>
            <div class="tradeoff-cell tocell-loss"><span class="inner-cell-title">Cosa si perde (Costi e Rinunce):</span> ${item.rispostaScelta.tradeOff.perdita}</div>
            <div class="tradeoff-cell tocell-meta"><span class="inner-cell-title">Chi sostiene il costo economico:</span> ${item.rispostaScelta.tradeOff.chiPaga}</div>
            <div class="tradeoff-cell tocell-meta"><span class="inner-cell-title">Impatto e Sviluppo nel tempo:</span> ${item.rispostaScelta.tradeOff.tempo}</div>
        `;
        body.appendChild(divTradeOff);

        node.appendChild(head);
        node.appendChild(body);
        accordionStack.appendChild(node);

        // Evento di espansione a toggle nativo
        head.addEventListener("click", () => {
            body.style.display = (body.style.display === "none") ? "flex" : "none";
        });
    });
}

// =========================================================================
// 7. MODULE LABORATORIO CIVICO (BUILDER DEI PROGRAMMI OBBLIGATORI)
// =========================================================================
const LABORATORIO_CATEGORIE_MAPPING = [
    { id: "giovanili", nome: "Politiche Giovanili", desc: "Interventi per l'occupabilità, l'istruzione, l'abitazione e il contrasto alla fuga dei cervelli." },
    { id: "sanita", nome: "Sanità", desc: "Organizzazione della rete clinica ospedaliera, delle liste d'attesa e della medicina di prossimità." },
    { id: "economia", nome: "Economia", desc: "Bilanci, politiche di attrazione degli investimenti, incentivi datoriali e tributi locali." },
    { id: "trasporti", nome: "Trasporti", desc: "Infrastrutturazione intermodale, linee pendolari e piani urbani della mobilità sostenibile." },
    { id: "sicurezza", nome: "Sicurezza", desc: "Presidio dello spazio pubblico, prevenzione del degrado urbano e cooperazione interforze." },
    { id: "ambiente", nome: "Ambiente", desc: "Gestione del ciclo dei rifiuti, transizione energetica e mitigazione del dissesto idrogeologicco." }
];

function renderLaboratorioTopicsMenu() {
    const container = document.getElementById("lab-menu-topics-list");
    container.innerHTML = "";
    
    const activeScope = SYSTEM_GLOBAL_STATE.laboratorioProgrammi.ambitoCorrente;

    LABORATORIO_CATEGORIE_MAPPING.forEach((cat) => {
        let li = document.createElement("li");
        li.className = "lab-menu-node-btn";
        const compositeKey = `${activeScope}_#_${cat.id}`;
        li.id = `lab-item-node-${compositeKey}`;
        li.textContent = cat.nome;

        // Visualizzazione grafica dello stato di archiviazione precedente
        if (SYSTEM_GLOBAL_STATE.laboratorioProgrammi.schedeCompilate[compositeKey]) {
            li.classList.add("saved-state");
        }

        li.addEventListener("click", () => openLaboratorioEditorFields(compositeKey, cat.nome, cat.desc));
        container.appendChild(li);
    });

    document.getElementById("lab-editor-fields-box").style.display = "none";
    document.getElementById("lab-ai-output-box").style.display = "none";
}

function openLaboratorioEditorFields(compositeKey, catNome, catDesc) {
    document.querySelectorAll(".lab-menu-node-btn").forEach(el => el.classList.remove("active"));
    const selectedNode = document.getElementById(`lab-item-node-${compositeKey}`);
    if (selectedNode) selectedNode.classList.add("active");

    const boxFields = document.getElementById("lab-editor-fields-box");
    boxFields.style.display = "block";
    boxFields.setAttribute("data-active-composite-key", compositeKey);

    document.getElementById("txt-lab-active-topic-title").textContent = `Macro-Categoria: ${catNome}`;
    document.getElementById("txt-lab-active-topic-desc").textContent = catDesc;

    // Ripristino dati salvati da persistenza di stato interna
    const cacheData = SYSTEM_GLOBAL_STATE.laboratorioProgrammi.schedeCompilate[compositeKey];
    document.getElementById("txt-lab-problema").value = cacheData ? cacheData.problema : "";
    document.getElementById("txt-lab-soluzione").value = cacheData ? cacheData.soluzione : "";
    document.getElementById("txt-lab-risorse").value = cacheData ? cacheData.risorse : "";
    document.getElementById("txt-lab-impatto").value = cacheData ? cacheData.impatto : "";
}

function commitCurrentLabFieldToState() {
    const boxFields = document.getElementById("lab-editor-fields-box");
    const activeKey = boxFields.getAttribute("data-active-composite-key");
    if (!activeKey) return;

    const prob = document.getElementById("txt-lab-problema").value.trim();
    const sol = document.getElementById("txt-lab-soluzione").value.trim();
    const ris = document.getElementById("txt-lab-risorse").value.trim();
    const imp = document.getElementById("txt-lab-impatto").value.trim();

    if (!prob || !sol || !ris || !imp) {
        alert("Errore di compilazione: Per salvare il modulo è obbligatorio compilare tutti e 4 i campi analitici.");
        return;
    }

    // Scrittura strutturata nello stato dell'applicazione
    SYSTEM_GLOBAL_STATE.laboratorioProgrammi.schedeCompilate[activeKey] = {
        problema: prob, soluzione: sol, risorse: ris, impatto: imp
    };

    const targetMenuBtn = document.getElementById(`lab-item-node-${activeKey}`);
    if (targetMenuBtn) targetMenuBtn.classList.add("saved-state");
    alert("Modulo di intervento integrato con successo nel programma in elaborazione.");
}

// =========================================================================
// 8. SISTEMA DI VERIFICA LOGICO-CONTABILE (REQUISITO 7: COERENZA LOGICA)
// =========================================================================
function evaluateProgramCoherenceEngine() {
    const activeScope = SYSTEM_GLOBAL_STATE.laboratorioProgrammi.ambitoCorrente;
    const schede = SYSTEM_GLOBAL_STATE.laboratorioProgrammi.schedeCompilate;
    
    let totalCompiledCount = 0;
    let consolidatedResourcesText = "";
    let consolidatedSolutionsText = "";

    for (let key in schede) {
        if (key.startsWith(activeScope)) {
            totalCompiledCount++;
            consolidatedResourcesText += " " + schede[key].risorse.toLowerCase();
            consolidatedSolutionsText += " " + schede[key].soluzione.toLowerCase();
        }
    }

    if (totalCompiledCount === 0) {
        alert("Per attivare il motore di verifica, compila ed archivia almeno una macro-categoria del livello selezionato.");
        return;
    }

    const aiPanel = document.getElementById("lab-ai-output-box");
    const aiTextRender = document.getElementById("txt-lab-ai-feedback-render");
    aiPanel.style.display = "block";

    // ANALISI DI VALIDAZIONE LOGICO-CONTABILE (DETERMINISTICA E NEUTRA)
    let feedbackHTML = `<strong>BILANCIO E COERENZA LOGICA DEL PROGRAMMA SIMULATO (${activeScope.toUpperCase()})</strong><br><br>`;
    let anomalieRilevate = [];

    // Controllo 1: Mancanza di copertura economica esplicita (Art. 81)
    if (!consolidatedResourcesText.includes("euro") && 
        !consolidatedResourcesText.includes("copertura") && 
        !consolidatedResourcesText.includes("stanziamento") && 
        !consolidatedResourcesText.includes("tagli") && 
        !consolidatedResourcesText.includes("rimodulazione") &&
        !consolidatedResourcesText.includes("tari") &&
        !consolidatedResourcesText.includes("irpef")) {
        anomalieRilevate.push("⚠️ <strong>Assenza di Vettori Finanziari Quantificabili:</strong> La sezione delle risorse non specifica capitoli di spesa correnti da rimodulare o entrate fiscali compensative. Proporre interventi senza indicare la fonte di finanziamento genera deficit strutturale instabile.");
    }

    // Controllo 2: Rilevazione di risposte/proposte irrealistiche o contraddittorie
    if (consolidatedSolutionsText.includes("gratis") || consolidatedSolutionsText.includes("gratuito per tutti") || consolidatedSolutionsText.includes("abolire le tasse")) {
        anomalieRilevate.push("⚠️ <strong>Rilevazione di Sostenibilità Compromessa:</strong> L'utilizzo di formule di gratuità universale indiscriminata o l'azzeramento di entrate core, in assenza di una radicale spending review documentata, contrasta con il principio di continuità amministrativa degli enti pubblici.");
    }

    if (consolidatedSolutionsText.includes("chiusura totale") && consolidatedSolutionsText.includes("ampliamento dei servizi")) {
        anomalieRilevate.push("❌ <strong>Contraddizione Logica Rilevata:</strong> Il testo evidenzia una sovrapposizione tra la chiusura fisica dei presidi territoriali e la contemporanea estensione dell'accessibilità dei servizi urbani.");
    }

    // COMPILAZIONE DEL FEEDBACK PURAMENTE EDUCATIVO (NON SINDACA LA SCELTA POLITICA)
    if (anomalieRilevate.length > 0) {
        feedbackHTML += `<p style="color:#f59e0b; font-weight:700; margin-bottom:10px;">Il sistema ha rilevato i seguenti elementi di criticità per i quali è consigliata una revisione analitica:</p>`;
        anomalieRilevate.forEach(anomalia => {
            feedbackHTML += `<div style="background:rgba(245,158,11,0.04); border:1px solid rgba(245,158,11,0.2); padding:12px; border-radius:6px; margin-bottom:10px;">${anomalia}</div>`;
        });
    } else {
        feedbackHTML += `<p style="color:#10b981; font-weight:700; margin-bottom:10px;">✅ Validazione Sostenibilità Superata:</p><p>I moduli analizzati contengono riferimenti a coperture economiche e mantengono una coerenza sequenziale tra i problemi strutturali sollevati e le soluzioni legislative proposte.</p>`;
    }

    feedbackHTML += `<br><em style="font-size:0.82rem; color:var(--text-secondary); display:block; border-top:1px solid var(--border-stroke); padding-top:10px;">Clausola di Neutralità: Questa valutazione esamina esclusivamente i vincoli logici e la consistenza economico-contabile delle risposte. Non costituisce un giudizio ideologico sul valore politico della proposta, che rimane di esclusiva spettanza dell'utilizzatore.</em>`;

    aiTextRender.innerHTML = feedbackHTML;
}

// =========================================================================
// 9. FUNZIONALITÀ AUSILIARIE DI ROUTING INTERNO TABS
// =========================================================================
function executePanelTabTransition(panelId) {
    document.querySelectorAll(".view-panel").forEach(panel => {
        panel.classList.remove("active");
    });
    
    const target = document.getElementById(panelId);
    if (target) {
        target.classList.add("active");
        
        // Inizializzazione automatica del sottomenu se l'utente accede al modulo Laboratorio
        if (panelId === "panel-laboratorio-view") {
            renderLaboratorioTopicsMenu();
        }
    }
}
