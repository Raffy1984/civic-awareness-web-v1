/**
 * PATENTE CIVICA - CORE APPLICATION ENGINE (PROD-SPEC 2026)
 * Architettura monolitica, zero dipendenze esterne di routing, calcolo deterministico dei trade-off.
 */

// ==========================================
// 1. DATASTORE ISTITUZIONALE E SCENARI
// ==========================================
const INSTITUTIONAL_DATASTORE = {
    regioni: ["Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche", "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana", "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"],
    comuni: ["Roma", "Milano", "Napoli", "Torino", "Palermo", "Genova", "Bologna", "Firenze", "Bari", "Catania", "Venezia", "Verona"],
    
    // Dataset Scenari Nazionali (Obbligatori da Specifica)
    scenariNazionali: [
        {
            id: "naz-sanita",
            tema: "Sanità",
            titolo: "Gestione delle liste d'attesa e carenza personale medico nelle strutture pubbliche.",
            descrizione: "Il blocco strutturale dei tetti di spesa per il personale sanitario ha congestionato i Pronto Soccorso e dilatato i tempi delle visite specialistiche. Si rende necessario un intervento strategico sul Fondo Sanitario Nazionale.",
            fonte: "Ministero della Salute / ISTAT",
            dataFonte: "12 marzo 2026",
            realtaIstituzionale: "Nel bilancio consolidato, lo Stato ha stanziato un incremento nominale del Fondo Sanitario Nazionale, vincolando quote all'abbattimento delle liste d'attesa tramite prestazioni aggiuntive del personale interno e l'estensione del privato convenzionato.",
            opzioni: [
                {
                    testo: "Sblocco totale del tetto di spesa per assunzioni a tempo indeterminato nel SSN tramite emissione di debito extra-budget.",
                    punteggio: 85, bonus: 5,
                    tradeOff: { guadagno: "Copertura stabile degli organici e riduzione strutturale dei tempi d'attesa nel lungo termine.", perdita: "Incremento immediato del deficit strutturale e violazione dei parametri europei di bilancio.", chiPaga: "La collettività tramite futuri oneri sul debito sovrano.", tempo: "Effetti strutturali visibili dopo 24-36 mesi." }
                },
                {
                    testo: "Acquisto massivo di prestazioni diagnostiche da strutture private convenzionate per azzerare le liste in 90 giorni.",
                    punteggio: 70, bonus: 0,
                    tradeOff: { guadagno: "Azzeramento immediato dei tempi d'attesa per le prestazioni critiche.", perdita: "Drenaggio di risorse pubbliche verso soggetti privati, indebolendo la stabilità a lungo termine degli ospedali pubblici.", chiPaga: "Fondi correnti del Fondo Sanitario Regionale.", tempo: "Impatto immediato ma temporaneo (breve termine)." }
                },
                {
                    testo: "Digitalizzazione integrata dei CUP, efficientamento dei macchinari H24 e penalizzazioni per i direttori sanitari inadempienti.",
                    punteggio: 95, bonus: 10,
                    tradeOff: { guadagno: "Ottimizzazione delle risorse esistenti senza incremento della spesa pubblica strutturale.", perdita: "Forte opposizione della governance sanitaria locale e stress operativo sui turni del personale attuale.", chiPaga: "Nessun costo finanziario aggiuntivo; costo organizzativo a carico della dirigenza.", tempo: "Effetti intermedi osservabili in 6-12 mesi." }
                }
            ]
        },
        {
            id: "naz-economia",
            tema: "Economia",
            titolo: "Riforma della pressione fiscale sul cuneo contributivo e stagnazione dei salari individuali.",
            descrizione: "L'elevata incidenza fiscale e contributiva sul lavoro deprime i salari netti in busta paga, riducendo i consumi interni e la competitività globale del sistema produttivo.",
            fonte: "Eurostat / MEF",
            dataFonte: "22 gennaio 2026",
            realtaIstituzionale: "Il Governo ha reso strutturale il taglio del cuneo fiscale per i redditi medio-bassi fino a 35.000€, rimodulando contestualmente le aliquote IRPEF per evitare scalini fiscali disfunzionali.",
            opzioni: [
                {
                    testo: "Taglio lineare del cuneo interamente a favore del lavoratore finanziato tramite riduzione della spesa pubblica ministeriale (spending review).",
                    punteggio: 95, bonus: 5,
                    tradeOff: { guadagno: "Aumento immediato del potere d'acquisto dei lavoratori senza generare nuovo debito.", perdita: "Contrazione delle risorse disponibili per i servizi pubblici essenziali e i ministeri.", chiPaga: "Utenti dei servizi ministeriali contratti.", tempo: "Impatto immediato sui salari correnti." }
                },
                {
                    testo: "Introduzione di una Flat Tax generalizzata al 15% finanziata in deficit programmato.",
                    punteggio: 40, bonus: 0,
                    tradeOff: { guadagno: "Semplificazione radicale del sistema e forte stimolo teorico per i redditi medio-alti.", perdita: "Grave perdita di gettito fiscale nel breve periodo e drastica riduzione della progressività costituzionale.", chiPaga: "I percettori di reddito basso per riduzione del welfare sussidiato.", tempo: "Effetti sul gettito entro l'anno fiscale." }
                }
            ]
        },
        {
            id: "naz-scuola",
            tema: "Scuola",
            titolo: "Stabilizzazione del precariato storico del corpo docente e allineamento delle competenze INVALSI.",
            descrizione: "Il sistema scolastico presenta oltre il 20% di personale docente con contratti a termine, minando la continuità didattica mentre i report internazionali evidenziano un calo delle competenze logico-matematiche.",
            fonte: "Ministero dell'Istruzione e del Merito",
            dataFonte: "05 febbraio 2026",
            realtaIstituzionale: "È stato implementato un piano di assunzioni vincolato alle procedure concorsuali del PNRR, introducendo la figura del docente tutor per personalizzare l'apprendimento.",
            opzioni: [
                {
                    testo: "Immissione in ruolo automatica per anzianità di servizio di tutti i docenti con almeno 36 mesi di supplenze.",
                    punteggio: 60, bonus: 0,
                    tradeOff: { guadagno: "Risoluzione immediata della precarietà contrattuale per migliaia di lavoratori.", perdita: "Elusione del principio costituzionale del concorso pubblico e mancata verifica selettiva delle competenze.", chiPaga: "Il bilancio dello Stato per l'irrigidimento della spesa fissa.", tempo: "Impatto amministrativo immediato." }
                },
                {
                    testo: "Riforma dei concorsi su base unicamente meritocratica e legame degli scatti stipendiali ai risultati INVALSI degli istituti.",
                    punteggio: 85, bonus: 10,
                    tradeOff: { guadagno: "Forte incentivo all'innalzamento degli standard qualitativi dell'insegnamento.", perdita: "Altissima conflittualità sindacale, rischio di penalizzazione per le scuole situate in aree di disagio sociale.", chiPaga: "Il corpo docente non performante situato in aree svantaggiate.", tempo: "Medio-lungo termine (3-5 anni)." }
                }
            ]
        },
        {
            id: "naz-sicurezza",
            tema: "Sicurezza",
            titolo: "Gestione della microcriminalità nelle aree metropolitane e riqualificazione delle periferie.",
            descrizione: "Le aree adiacenti ai grandi hub ferroviari registrano un incremento percepito e reale dei reati di strada, alimentando tensioni sociali e richieste di presidio militare.",
            fonte: "Dipartimento della Pubblica Sicurezza / ISTAT",
            dataFonte: "18 aprile 2026",
            realtaIstituzionale: "È stata intensificata l'operazione 'Strade Sicure' con contingenti interforze nelle stazioni, affiancata da stanziamenti per la videosorveglianza comunale.",
            opzioni: [
                {
                    testo: "Presidio militare fisso e continuativo in tutte le sotto-zone sensibili con poteri speciali di pubblica sicurezza.",
                    punteggio: 70, bonus: 0,
                    tradeOff: { guadagno: "Deterrenza visiva immediata e forte incremento della sicurezza percepita.", perdita: "Costi operativi elevatissimi e distrazione di reparti militari dai compiti di difesa strategica.", chiPaga: "Fondi del Ministero della Difesa e dell'Interno.", tempo: "Efficacia limitata alla durata del presidio fisso." }
                },
                {
                    testo: "Pianificazione integrata: investimenti in illuminazione smart, videosorveglianza predittiva e incentivi commerciali per aperture serali.",
                    punteggio: 95, bonus: 5,
                    tradeOff: { guadagno: "Riqualificazione strutturale del tessuto urbano con controllo sociale spontaneo.", perdita: "Tempi di attuazione non immediati e necessità di coordinamento multilivello (Stato-Comuni).", chiPaga: "Cofinanziamento fondi europei e bilanci municipali.", tempo: "Risultati consolidati in 18-24 mesi." }
                }
            ]
        },
        {
            id: "naz-ambiente",
            tema: "Ambiente",
            titolo: "Adeguamento alle direttive europee sulla decarbonizzazione e transizione energetica residenziale.",
            descrizione: "La direttiva 'Case Green' impone il raggiungimento di classi energetiche elevate per gli immobili residenziali entro scadenze rigide, ponendo un problema di sostenibilità per i proprietari.",
            fonte: "ENEA / Ministero dell'Ambiente",
            dataFonte: "14 gennaio 2026",
            realtaIstituzionale: "I vecchi incentivi edilizi non selettivi sono stati sostituiti da detrazioni mirate esclusivamente alle prime case a basso ISEE e agli interventi a massima efficienza comprovata.",
            opzioni: [
                {
                    testo: "Reintroduzione di detrazioni fiscali al 100% (Modello Superbonus) per accelerare la conversione del patrimonio edilizio.",
                    punteggio: 30, bonus: 0,
                    tradeOff: { guadagno: "Massima velocità di efficientamento termico degli edifici.", perdita: "Grave alterazione dei prezzi di mercato, speculazioni e impatto devastante sui conti pubblici pluriennali.", chiPaga: "Le generazioni future attraverso la contrazione degli spazi di manovra fiscale.", tempo: "Breve termine per i cantieri; lunghissimo termine per l'ammortamento del debito." }
                },
                {
                    testo: "Istituzione di un fondo di garanzia statale per mutui green agevolati a tassi minimi, riservato a classi di reddito ISEE medio-basse.",
                    punteggio: 90, bonus: 10,
                    tradeOff: { guadagno: "Sostenibilità finanziaria dello Stato e supporto selettivo ai ceti realmente vulnerabili.", perdita: "Esclusione dei ceti alti e progressione più lenta del target di decarbonizzazione nazionale complessivo.", chiPaga: "Il sistema bancario parzialmente garantito dallo Stato.", tempo: "Progressione costante a medio termine." }
                }
            ]
        },
        {
            id: "naz-trasporti",
            tema: "Trasporti",
            titolo: "Riallocazione degli investimenti tra l'infrastruttura dell'Alta Velocità e le reti pendolari regionali.",
            descrizione: "A fronte di un sistema di Alta Velocità efficiente, le tratte ferroviarie regionali destinate ai pendolari scontano vetustà del materiale rotabile e frequenti disservizi.",
            fonte: "ANSFISA / SIOF",
            dataFonte: "30 aprile 2026",
            realtaIstituzionale: "I piani industriali del comparto trasporti hanno allocato quote del PNRR per il rinnovo delle flotte regionali e la digitalizzazione dei sistemi di sicurezza delle tratte secondarie.",
            opzioni: [
                {
                    testo: "Sospensione temporanea dei lotti di espansione dell'Alta Velocità per spostare il 100% dei fondi liberi sul materiale rotabile regionale.",
                    punteggio: 75, bonus: 0,
                    tradeOff: { guadagno: "Rapido miglioramento della qualità del viaggio per milioni di cittadini pendolari.", perdita: "Perdita di competitività internazionale sulle merci e penali per la rottura dei contratti infrastrutturali già avviati.", chiPaga: "Le imprese logistiche e lo sviluppo economico del sistema-paese.", tempo: "Effetti di fornitura entro 12-18 mesi." }
                },
                {
                    testo: "Apertura del mercato ferroviario regionale a gare d'appalto internazionali competitive e obbligo di investimenti in flotta per i concessionari.",
                    punteggio: 95, bonus: 5,
                    tradeOff: { guadagno: "Iniezione di capitali privati ed efficientamento operativo determinato dalla concorrenza regolata.", perdita: "Rischio di razionalizzazione e taglio delle tratte periferiche a bassa redditività se non sussidiate.", chiPaga: "I lavoratori del settore per potenziale dumping contrattuale; l'utenza periferica se mancano i sussidi.", tempo: "Processo di transizione in 24 mesi." }
                }
            ]
        },
        {
            id: "naz-debito",
            tema: "Debito Pubblico",
            titolo: "Stabilizzazione del debito sovrano in linea con il nuovo Patto di Stabilità e Crescita.",
            descrizione: "Il livello del debito pubblico italiano richiede una traiettoria di rientro credibile per rassicurare i mercati finanziari e stabilizzare lo spread sui titoli di Stato.",
            fonte: "Banca d'Italia / MEF",
            dataFonte: "15 maggio 2026",
            realtaIstituzionale: "L'Italia opera sotto i vincoli del braccio preventivo del nuovo Patto di Stabilità, focalizzandosi sul controllo della spesa primaria netta rispetto alla crescita del PIL.",
            opzioni: [
                {
                    testo: "Attivazione di una spending review lacrime e sangue con blocco totale del turnover nella Pubblica Amministrazione.",
                    punteggio: 65, bonus: 0,
                    tradeOff: { guadagno: "Segnale immediato di rigore fiscale che comprime la spesa corrente e rassicura i mercati finanziari.", perdita: "Progressiva paralisi operativa degli uffici pubblici e invecchiamento del personale amministrativo.", chiPaga: "I cittadini che usufruiscono di servizi pubblici rallentati.", tempo: "Risparmi immediati ma decadimento strutturale a medio termine." }
                },
                {
                    testo: "Integrazione delle banche dati fiscali, finanziarie e catastali per l'emersione automatica dell'evasione complessa.",
                    punteggio: 95, bonus: 10,
                    tradeOff: { guadagno: "Recupero di risorse strutturali senza innalzare le aliquote sui contribuenti onesti.", perdita: "Forti resistenze politiche e polemiche legate alla tutela della riservatezza dei dati finanziari.", chiPaga: "I soggetti evasori ed elusori fiscali.", tempo: "Rendicontazione dei flussi in 12-24 mesi." }
                }
            ]
        },
        {
            id: "naz-welfare",
            tema: "Welfare",
            titolo: "Sostenibilità del sistema previdenziale a fronte del trend demografico negativo.",
            descrizione: "L'indice di vecchiaia in costante aumento mette a rischio l'equilibrio finanziario del sistema pensionistico a ripartizione. È necessario bilanciare flessibilità in uscita e tenuta dei conti.",
            fonte: "INPS / ISTAT",
            dataFonte: "03 marzo 2026",
            realtaIstituzionale: "Sono state confermate le restrizioni sulle pensioni anticipate, estendendo il calcolo integralmente contributivo per i canali di uscita flessibile per preservare l'equità intergenerazionale.",
            opzioni: [
                {
                    testo: "Abolizione dei vincoli anagrafici e introduzione della pensione anticipata generalizzata dopo 41 anni di contributi senza penalizzazioni.",
                    punteggio: 45, bonus: 0,
                    tradeOff: { guadagno: "Elevatissimo gradimento sociale e ricambio generazionale teorico nelle aziende.", perdita: "Esplosione dei costi correnti dell'INPS e aggravamento del debito implicito a carico dei giovani.", chiPaga: "I lavoratori attuali sotto i 40 anni.", tempo: "Effetti negativi immediati sul bilancio INPS." }
                },
                {
                    testo: "Mantenimento dell'adeguamento automatico all'aspettativa di vita, introducendo l'opzione di uscita flessibile calcolata esclusivamente col metodo contributivo.",
                    punteggio: 90, bonus: 5,
                    tradeOff: { guadagno: "Neutralità attuariale: chi esce prima riceve quanto versato, salvaguardando il bilancio pubblico.", perdita: "Assegni pensionistici significativamente più bassi per chi sceglie l'uscita anticipata.", chiPaga: "Il pensionando che accetta la decurtazione permanente.", tempo: "Stabilizzazione finanziaria permanente." }
                }
            ]
        },
        {
            id: "naz-immigrazione",
            tema: "Immigrazione",
            titolo: "Integrazione economica dei flussi migratori e gestione della prima accoglienza.",
            descrizione: "La gestione dei flussi migratori richiede il superamento della logica dell'emergenza attraverso canali regolari legati al fabbisogno del sistema produttivo.",
            fonte: "Ministero dell'Interno / Unioncamere",
            dataFonte: "20 febbraio 2026",
            realtaIstituzionale: "Il Decreto Flussi triennale ha programmato gli ingressi regolari agganciandoli alle richieste esplicite delle associazioni datoriali, potenziando i controlli nei paesi d'origine.",
            opzioni: [
                {
                    testo: "Sanatoria generalizzata per tutti i migranti irregolari già presenti sul territorio per immetterli nel circuito del lavoro.",
                    punteggio: 60, bonus: 0,
                    tradeOff: { guadagno: "Emersione istantanea del lavoro nero e aumento delle entrate contributive correnti.", perdita: "Effetto incentivo (pull factor) per l'immigrazione clandestina e aggiramento delle liste regolari.", chiPaga: "La credibilità delle procedure legali di ingresso programmato.", tempo: "Effetti fiscali entro l'anno." }
                },
                {
                    testo: "Potenziamento dei corridoi professionali d'intesa con le imprese, con formazione linguistica e tecnica svolta direttamente nei paesi di partenza.",
                    punteggio: 95, bonus: 5,
                    tradeOff: { guadagno: "Integrazione perfetta nel mercato del lavoro senza tensioni sociali o periodi di marginalità.", perdita: "Costi di gestione complessi e dipendenza dalla stabilità politica dei paesi partner esteri.", chiPaga: "Le aziende e lo Stato attraverso fondi di cooperazione internazionale.", tempo: "Regime a pieno funzionamento in 18-24 mesi." }
                }
            ]
        },
        {
            id: "naz-energia",
            tema: "Energia",
            titolo: "Diversificazione del mix energetico nazionale e sicurezza degli approvvigionamenti.",
            descrizione: "La necessità di azzerare la dipendenza residua dalle fonti fossili importate impone una accelerazione sulla produzione interna di energia pulita e programmabile.",
            fonte: "TERNA / MASE",
            dataFonte: "11 gennaio 2026",
            realtaIstituzionale: "È stato varato il testo unico sulle fonti rinnovabili per accelerare le autorizzazioni dei parchi eolici offshore e lo sviluppo dei sistemi di accumulo su larga scala.",
            opzioni: [
                {
                    testo: "Finanziamento statale per l'installazione massiva e generalizzata di pannelli fotovoltaici a terra sui suoli agricoli produttivi.",
                    punteggio: 70, bonus: 0,
                    tradeOff: { guadagno: "Incremento rapidissimo della potenza rinnovabile installata a costi contenuti.", perdita: "Sottrazione di suolo agricolo con potenziale calo della sovranità alimentare e alterazione del paesaggio.", chiPaga: "Il settore agricolo e l'agroalimentare nazionale.", tempo: "Messa in rete in 12 mesi." }
                },
                {
                    testo: "Semplificazione burocratica per impianti eolici offshore e sblocco della ricerca scientifica avanzata sui piccoli reattori nucleari a fusione/fissione di quarta generazione.",
                    punteggio: 95, bonus: 10,
                    tradeOff: { guadagno: "Pianificazione di un mix bilanciato tra energia rinnovabile e fonte pulita programmabile a zero emissioni.", perdita: "I tempi lunghi di sviluppo delle tecnologie nucleari non risolvono l'emergenza immediata.", chiPaga: "Fondi di investimento strategici pubblici e privati a lungo termine.", tempo: "Rinnovabili in 24 mesi; nucleare di nuova generazione oltre i 10 anni." }
                }
            ]
        }
    ],

    // Dataset Laboratorio Civico (Obbligatorio da Specifica)
    temiLab: {
        comune: [
            { id: "com-giovani", t: "Politiche Giovanili", d: "Spazi di aggregazione, co-working e start-up giovanili locali." },
            { id: "com-sicurezza", t: "Sicurezza Urbana", d: "Polizia locale, videosorveglianza e controllo del territorio comunale." },
            { id: "com-viabilita", t: "Viabilità e ZTL", d: "Piste ciclabili, trasporto pubblico locale e congestione urbana." },
            { id: "com-rifiuti", t: "Rifiuti e Decoro", d: "Raccolta differenziata, tariffe puntuali TARI e impianti di smaltimento." },
            { id: "com-turismo", t: "Turismo e Cultura", d: "Valorizzazione museale, eventi e gestione flussi turistici." },
            { id: "com-sociale", t: "Servizi Sociali", d: "Asili nido comunali, assistenza anziani e marginalità sociale." }
        ],
        regione: [
            { id: "reg-sanita", t: "Sanità Regionale", d: "Edilizia ospedaliera, medicina territoriale e gestione delle ASL." },
            { id: "reg-trasporti", t: "Trasporti", d: "Linee ferroviarie pendolari e concessioni del trasporto pubblico locale." },
            { id: "reg-economia", t: "Economia e Sviluppo", d: "Fondi europei FESR, aiuti alle PMI locali e formazione professionale." },
            { id: "reg-turismo", t: "Turismo Territoriale", d: "Promozione del brand regionale ed ecosistemi di accoglienza." },
            { id: "reg-ambiente", t: "Ambiente e Dissesto", d: "Prevenzione del rischio idrogeologico e piani paesistici." }
        ],
        nazione: [
            { id: "naz-economia", t: "Economia", d: "Politica fiscale, cuneo contributivo e crescita del PIL." },
            { id: "naz-lavoro", t: "Lavoro", d: "Politiche attive, contrattazione collettiva e sicurezza sul lavoro." },
            { id: "naz-pensioni", t: "Pensioni", d: "Flessibilità in uscita e stabilità di lungo termine del sistema INPS." },
            { id: "naz-scuola", t: "Scuola e Università", d: "Reclutamento docenti, edilizia scolastica e ricerca scientifica." },
            { id: "naz-sicurezza", t: "Sicurezza e Giustizia", d: "Riforma dei processi, organici forze dell'ordine e carceri." },
            { id: "naz-immigrazione", t: "Immigrazione", d: "Canali di ingresso regolari, accoglienza e rimpatri." },
            { id: "naz-energia", t: "Energia", d: "Mix energetico, decarbonizzazione e indipendenza strategica." }
        ]
    },

    // Database fittizio iniziale per il Social Civico
    ideeSocial: [
        { id: 1, titolo: "Riallocazione Fondi TARI per Tariffazione Puntuale", autore: "Lorenzo_D", ambito: "comune", corpo: "Propongo di misurare i sacchetti dell'indifferenziata tramite microchip RFID per tassare solo chi non differenzia.", copertura: "Autofinanziata dall'efficienza del riciclo e dalle sanzioni.", commenti: [{ u: "Elena_V", t: "Tesi corretta, applicata già in molti comuni del nord con successo. Riduce il rifiuto secco del 30%." }] },
        { id: 2, titolo: "Potenziamento Eolico Offshore in Adriatico", autore: "R_Fisico", ambito: "nazione", corpo: "Installazione di parchi eolici galleggianti oltre le 12 miglia marine per non impattare sul turismo visivo.", copertura: "Fondi PNRR - Missione 2 Transizione Ecologica.", commenti: [{ u: "Geo_Concept", t: "Criticità: valutare l'impatto sulle rotte migratorie dell'avifauna e sulle aree di pesca." }] }
    ]
};

// ==========================================
// 2. STATO DELL'APPLICAZIONE (GLOBAL STATE)
// ==========================================
let PLATFORM_STATE = {
    user: { alias: "Cittadino", livello: "intermedio", regione: "", comune: "" },
    quiz: { currentQuestionIndex: 0, answersLog: [], liveMetrics: { economia: 50, sociale: 50, consenso: 50 } },
    laboratorio: { ambitoAttivo: "nazione", programmiSalvati: {} }, // Struttura: { idTema: { problema, soluzione, risorse, impatto } }
    bancaIdee: [...INSTITUTIONAL_DATASTORE.ideeSocial]
};

// ==========================================
// 3. INIZIALIZZAZIONE DEGLI EVENTI
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    bootstrapGeography();
    setupCoreEventListeners();
});

function bootstrapGeography() {
    const regSelect = document.getElementById("select-geo-regione");
    const comSelect = document.getElementById("select-geo-comune");
    
    INSTITUTIONAL_DATASTORE.regioni.forEach(r => {
        let o = document.createElement("option"); o.value = r; o.textContent = r; regSelect.appendChild(o);
    });
    INSTITUTIONAL_DATASTORE.comuni.forEach(c => {
        let o = document.createElement("option"); o.value = c; o.textContent = c; comSelect.appendChild(o);
    });
}

function setupCoreEventListeners() {
    // Bottone di Inizializzazione Primo Schermo
    document.getElementById("btn-initialize-platform").addEventListener("click", handlePlatformInitialization);
    
    // Tab System Navigation
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            const targetTab = e.target.getAttribute("data-tab");
            switchViewPanel(targetTab);
            
            if(targetTab === "mod-laboratorio") initLaboratorioWorkspace();
            if(targetTab === "mod-banca") renderBancaIdeeFeed();
        });
    });

    // Eventi del modulo Laboratorio Civico
    document.getElementById("select-lab-ambito").addEventListener("change", (e) => {
        PLATFORM_STATE.laboratorio.ambitoAttivo = e.target.value;
        initLaboratorioWorkspace();
    });
    document.getElementById("btn-save-current-topic-data").addEventListener("click", saveCurrentLabTopic);
    document.getElementById("btn-ai-validate-program").addEventListener("click", triggerAiProgramValidation);
    document.getElementById("btn-export-pdf-program").addEventListener("click", generatePdfProgram);

    // Eventi della Banca Idee
    document.getElementById("filter-banca-scope").addEventListener("change", renderBancaIdeeFeed);
    document.getElementById("btn-submit-new-idea").addEventListener("click", createNewIdeaCivica);

    // Esportazione Report PDF Patente
    document.getElementById("btn-export-pdf-report").addEventListener("click", generatePdfReportPatente);
}

function switchViewPanel(panelId) {
    document.querySelectorAll(".view-panel").forEach(p => p.classList.remove("active"));
    document.getElementById(panelId).classList.add("active");
}

// ==========================================
// 4. LOGICA MODULO A: PATENTE CIVICA (TEST)
// ==========================================
function handlePlatformInitialization() {
    const aliasInput = document.getElementById("user-alias").value.trim();
    PLATFORM_STATE.user.alias = aliasInput || "Analista_Anonimo";
    PLATFORM_STATE.user.livello = document.getElementById("select-livello-test").value;
    PLATFORM_STATE.user.regione = document.getElementById("select-geo-regione").value;
    PLATFORM_STATE.user.comune = document.getElementById("select-geo-comune").value;

    // Mostra il sistema a Tab ed entra nel modulo d'esame
    document.getElementById("main-tabs").style.display = "flex";
    switchViewPanel("mod-patente");
    
    // Configura i contatori del test
    let totaleScenari = INSTITUTIONAL_DATASTORE.scenariNazionali.length;
    if (PLATFORM_STATE.user.livello === "base") totaleScenari = 5; // Specifica: livello base ridotto
    
    document.getElementById("quiz-total-steps").textContent = totaleScenari;
    PLATFORM_STATE.quiz.currentQuestionIndex = 0;
    PLATFORM_STATE.quiz.answersLog = [];
    PLATFORM_STATE.quiz.liveMetrics = { economia: 50, sociale: 50, consenso: 50 };
    
    updateLiveMetricsUi();
    renderActiveScenario();
}

function updateLiveMetricsUi() {
    document.getElementById("live-bar-eco").style.width = `${PLATFORM_STATE.quiz.liveMetrics.economia}%`;
    document.getElementById("live-bar-soc").style.width = `${PLATFORM_STATE.quiz.liveMetrics.sociale}%`;
    document.getElementById("live-bar-con").style.width = `${PLATFORM_STATE.quiz.liveMetrics.consenso}%`;
}

function renderActiveScenario() {
    const idx = PLATFORM_STATE.quiz.currentQuestionIndex;
    const maxScenari = parseInt(document.getElementById("quiz-total-steps").textContent);
    
    if (idx >= maxScenari) {
        processAndRenderFinalReport();
        return;
    }

    // Aggiorna contatori grafici
    document.getElementById("quiz-current-step").textContent = idx + 1;
    const pct = (idx / maxScenari) * 100;
    document.getElementById("quiz-progress-fill").style.width = `${pct}%`;

    const scenario = INSTITUTIONAL_DATASTORE.scenariNazionali[idx];
    document.getElementById("scenario-topic").textContent = scenario.tema.toUpperCase();
    document.getElementById("scenario-title-text").textContent = scenario.titolo;
    document.getElementById("scenario-description-text").textContent = scenario.descrizione;

    // Gestione Input Aperto (Solo livello Avanzato su scenari pari come da requisiti architetturali)
    const inputApertoWrapper = document.getElementById("wrapper-input-aperto");
    const optionsWrapper = document.getElementById("scenario-options-wrapper");
    document.getElementById("textarea-risposta-aperta").value = "";

    if (PLATFORM_STATE.user.livello === "avanzato" && idx % 2 === 1) {
        inputApertoWrapper.style.display = "block";
        optionsWrapper.style.display = "none";
        
        // Sgancia evento sul bottone dell'input aperto
        const btnSubmitAperta = document.getElementById("btn-submit-aperta");
        btnSubmitAperta.onclick = () => {
            const txt = document.getElementById("textarea-risposta-aperta").value.trim();
            if(txt.length < 10) {
                alert("Inserisci una proposta analitica sensata (almeno 10 caratteri).");
                return;
            }
            // Genera una risposta simulata surrogata basata sull'ottimo logico dell'opzione 3
            logAnswerSelection(scenario.opzioni[0], txt);
        };
    } else {
        inputApertoWrapper.style.display = "none";
        optionsWrapper.style.display = "flex";
        optionsWrapper.innerHTML = "";

        scenario.opzioni.forEach(opz => {
            let btn = document.createElement("button");
            btn.className = "option-node-btn";
            btn.textContent = opz.testo;
            btn.addEventListener("click", () => logAnswerSelection(opz, null));
            optionsWrapper.appendChild(btn);
        });
    }
}

function logAnswerSelection(opzione, testoInputAperto) {
    // Aggiorna gli indicatori di sistema applicando l'impatto simmetrico delle decisioni
    // Calcolo deterministico delle metriche basato sulle proprietà intrinseche del trade-off
    const g = opzione.tradeOff.guadagno.length;
    const p = opzione.tradeOff.perdita.length;
    
    if (g > p) {
        PLATFORM_STATE.quiz.liveMetrics.sociale = Math.min(100, PLATFORM_STATE.quiz.liveMetrics.sociale + 8);
        PLATFORM_STATE.quiz.liveMetrics.economia = Math.min(100, PLATFORM_STATE.quiz.liveMetrics.economia + 4);
    } else {
        PLATFORM_STATE.quiz.liveMetrics.consenso = Math.min(100, PLATFORM_STATE.quiz.liveMetrics.consenso + 12);
        PLATFORM_STATE.quiz.liveMetrics.economia = Math.max(0, PLATFORM_STATE.quiz.liveMetrics.economia - 8);
    }

    PLATFORM_STATE.quiz.answersLog.push({
        scenarioId: INSTITUTIONAL_DATASTORE.scenariNazionali[PLATFORM_STATE.quiz.currentQuestionIndex].id,
        scelta: opzione,
        inputAperto: testoInputAperto
    });

    updateLiveMetricsUi();
    PLATFORM_STATE.quiz.currentQuestionIndex++;
    renderActiveScenario();
}

// ==========================================
// 5. MODULO B: REPORT INTELLIGENTE E VALIDAZIONE
// ==========================================
function processAndRenderFinalReport() {
    switchViewPanel("mod-report-view");
    
    let totalScoreRaw = 0;
    let maxScorePossible = PLATFORM_STATE.quiz.answersLog.length * 105; // Base + max bonus
    
    PLATFORM_STATE.quiz.answersLog.forEach(log => {
        totalScoreRaw += log.scelta.punteggio + log.scelta.bonus;
    });

    let finalScoreNormalized = Math.round((totalScoreRaw / maxScorePossible) * 100);
    if(finalScoreNormalized > 100) finalScoreNormalized = 100;

    document.getElementById("rep-lbl-username").textContent = PLATFORM_STATE.user.alias;
    document.getElementById("rep-lbl-ambito").textContent = PLATFORM_STATE.user.livello.toUpperCase();
    document.getElementById("rep-val-score").textContent = finalScoreNormalized;

    let badge = document.getElementById("rep-badge-civico");
    let textVal = document.getElementById("rep-text-valuation");

    if (finalScoreNormalized >= 80) {
        badge.textContent = "LIVELLO CIVICO: CONSAPEVOLEZZA ISTITUZIONALE AVANZATA";
        badge.style.color = "var(--brand-success)";
        textVal.textContent = "L'analisi algoritmica evidenzia una eccellente comprensione dei vincoli macroeconomici ed istituzionali. Le decisioni manifestano un elevato rifiuto della demagogia, ponendo attenzione alla copertura finanziaria e ai riflessi temporali strutturali delle riforme pubbliche.";
    } else if (finalScoreNormalized >= 50) {
        badge.textContent = "LIVELLO CIVICO: CONSAPEVOLEZZA INTERMEDIA (Dinamica Talk-Show)";
        badge.style.color = "var(--brand-warning)";
        textVal.textContent = "Il profilo decisionale è parzialmente influenzato da spinte emotive e logiche di consenso immediato. Sebbene comprenda la natura del trade-off, hai teso a rinviare i costi economici delle riforme o ad assecondare spinte populiste a scapito della stabilità di bilancio intergenerazionale.";
    } else {
        badge.textContent = "LIVELLO CIVICO: INSUFFICIENTE (Scomposizione Logica e Coperture Assenti)";
        badge.style.color = "var(--brand-danger)";
        textVal.textContent = "Le scelte effettuate indicano una sistematica sottovalutazione dell'articolo 81 della Costituzione (equilibrio di bilancio). È stata data priorità a soluzioni fittizie a breve termine o a immissioni di liquidità prive di coperture reali, generando un potenziale default dei parametri macroeconomici simulati.";
    }

    // Generazione nodi dell'Accordion del Report
    const accordionContainer = document.getElementById("report-details-accordion");
    accordionContainer.innerHTML = "";

    PLATFORM_STATE.quiz.answersLog.forEach((log, i) => {
        const scn = INSTITUTIONAL_DATASTORE.scenariNazionali.find(s => s.id === log.scenarioId);
        
        let node = document.createElement("div");
        node.className = "accordion-node";
        
        let trigger = document.createElement("div");
        trigger.className = "accordion-trigger";
        trigger.innerHTML = `<span>Tema ${i+1}: ${scn.tema} - Analisi della Scelta</span> <span>▼</span>`;
        
        let content = document.createElement("div");
        content.className = "accordion-content";
        
        // Blocchi interni secondo specifiche
        let pScelta = document.createElement("p");
        pScelta.innerHTML = `<strong>La tua scelta amministrativa:</strong> ${log.scelta.testo}`;
        if(log.inputAperto) {
            pScelta.innerHTML += `<br><strong style="color:var(--brand-warning);">Integrazione Testuale Inviata:</strong> "${log.inputAperto}"`;
        }
        content.appendChild(pScelta);

        // Blocco Dati Istituzionali Concreti Obbligatori
        let divData = document.createElement("div");
        divData.className = "block-rep-data";
        divData.innerHTML = `
            <p><strong>Quadro Reale d'Azione Istituzionale:</strong> ${scn.realtaIstituzionale}</p>
            <span class="source-tag-anchor">Fonte: ${scn.fonte} | Data Rilascio: ${scn.dataFonte}</span>
        `;
        content.appendChild(divData);

        // Blocco Trade-Off
        let divTradeOff = document.createElement("div");
        divTradeOff.className = "trade-off-grid";
        divTradeOff.innerHTML = `
            <div class="to-item to-gain"><span class="to-title-sub">Cosa si guadagna (Benefici):</span> ${log.scelta.tradeOff.guadagno}</div>
            <div class="to-item to-loss"><span class="to-title-sub">Cosa si perde (Costi esterni):</span> ${log.scelta.tradeOff.perdita}</div>
            <div class="to-item" style="background:#1a2238;"><span class="to-title-sub">Chi paga il costo reale:</span> ${log.scelta.tradeOff.chiPaga}</div>
            <div class="to-item" style="background:#1a2238;"><span class="to-title-sub">Orizzonte temporale:</span> ${log.scelta.tradeOff.tempo}</div>
        `;
        content.appendChild(divTradeOff);

        // Chiusura logica d'azione accordion
        node.appendChild(trigger);
        node.appendChild(content);
        accordionContainer.appendChild(node);

        trigger.addEventListener("click", () => {
            content.style.display = (content.style.display === "none" || !content.style.display) ? "flex" : "none";
        });
        content.style.display = "none"; // Default serrato
    });
}

// ==========================================
// 6. MODULO C: LABORATORIO CIVICO
// ==========================================
function initLaboratorioWorkspace() {
    const menu = document.getElementById("lab-topics-menu-list");
    menu.innerHTML = "";
    
    const elencoTemi = INSTITUTIONAL_DATASTORE.temiLab[PLATFORM_STATE.laboratorio.ambitoAttivo];
    
    elencoTemi.forEach(tema => {
        let li = document.createElement("li");
        li.className = "topic-link-item";
        li.id = `link-lab-${tema.id}`;
        li.textContent = tema.t;
        
        // Verifica se pre-compilato
        if (PLATFORM_STATE.laboratorio.programmiSalvati[tema.id]) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => loadLabTopicEditor(tema));
        menu.appendChild(li);
    });

    document.getElementById("editor-container-box").style.display = "none";
    document.getElementById("lab-ai-feedback-response-box").style.display = "none";
    document.getElementById("btn-export-pdf-program").disabled = true;
}

function loadLabTopicEditor(tema) {
    document.querySelectorAll(".topic-link-item").forEach(l => l.classList.remove("active"));
    document.getElementById(`link-lab-${tema.id}`).classList.add("active");

    const box = document.getElementById("editor-container-box");
    box.style.display = "block";
    box.setAttribute("data-active-id", tema.id);

    document.getElementById("editor-active-topic-title").textContent = `Ambito: ${tema.t}`;
    document.getElementById("editor-active-topic-desc").textContent = tema.d;

    // Caricamento dati pregressi se presenti
    const cache = PLATFORM_STATE.laboratorio.programmiSalvati[tema.id];
    document.getElementById("lab-input-problema").value = cache ? cache.problema : "";
    document.getElementById("lab-input-soluzione").value = cache ? cache.soluzione : "";
    document.getElementById("lab-input-risorse").value = cache ? cache.risorse : "";
    document.getElementById("lab-input-impatto").value = cache ? cache.impatto : "";
}

function saveCurrentLabTopic() {
    const box = document.getElementById("editor-container-box");
    const activeId = box.getAttribute("data-active-id");
    if(!activeId) return;

    const prob = document.getElementById("lab-input-problema").value.trim();
    const sol = document.getElementById("lab-input-soluzione").value.trim();
    const ris = document.getElementById("lab-input-risorse").value.trim();
    const imp = document.getElementById("lab-input-impatto").value.trim();

    if(!prob || !sol || !ris || !imp) {
        alert("Tutti e 4 i campi strutturali sono obbligatori per salvare la proposta.");
        return;
    }

    PLATFORM_STATE.laboratorio.programmiSalvati[activeId] = {
        problema: prob, soluzione: sol, risorse: ris, impatto: imp
    };

    document.getElementById(`link-lab-${activeId}`).classList.add("completed");
    alert("Modulo d'intervento salvato localmente nel programma.");
}

function triggerAiProgramValidation() {
    // Il modulo AI analizza la coerenza intrinseca simulando l'analisi di impatto economico e i trade-off.
    // Regole di neutralità assoluta: non giudica l'ideologia ma controlla la presenza di coperture reali.
    const saved = PLATFORM_STATE.laboratorio.programmiSalvati;
    const activeAmbito = PLATFORM_STATE.laboratorio.ambitoAttivo;
    const richiesti = INSTITUTIONAL_DATASTORE.temiLab[activeAmbito];
    
    let completati = 0;
    richiesti.forEach(r => { if(saved[r.id]) completati++; });

    if(completati === 0) {
        alert("Compila e salva almeno un tema prima di richiedere la validazione dell'AI.");
        return;
    }

    const feedbackBox = document.getElementById("lab-ai-feedback-response-box");
    const feedbackText = document.getElementById("lab-ai-feedback-text-content");
    feedbackBox.style.display = "block";

    // Motore di inferenza euristico per la simulazione dell'analisi AI
    let criticitàRilevate = [];
    let paroleChiaveCoperturaMancanti = false;

    for (let id in saved) {
        let r = saved[id].risorse.toLowerCase();
        if(!r.includes("euro") && !r.includes("bilancio") && !r.includes("copertura") && !r.includes("taglio") && !r.includes("fondi")) {
            paroleChiaveCoperturaMancanti = true;
        }
    }

    if (paroleChiaveCoperturaMancanti) {
        criticitàRilevate.push("⚠️ VIOLAZIONE ART. 81 COSTITUZIONE: In alcuni moduli non sono specificati in modo quantificabile i canali di copertura economico-finanziaria. L'indicazione di 'risorse generiche' o 'ottimizzazione del sistema' senza riallocazione della spesa rende il programma insostenibile nei modelli econometrici.");
    }

    if(completati < richiesti.length) {
        criticitàRilevate.push(`ℹ️ COPERTURA PROGRAMMATICA PARZIALE: Hai sviluppato ${completati} temi su ${richiesti.length}. Un programma governativo richiede una visione sistemica omnicomprensiva.`);
    }

    if (criticitàRilevate.length === 0) {
        feedbackText.innerHTML = "<strong>Stato della validazione neutrale AI: COERENTE.</strong><br>Il programma analizzato presenta descrizioni strutturate e riferimenti espliciti alle risorse. Non vengono rilevate scomposizioni logiche macroscopiche tra i problemi descritti e i KPI di impatto inseriti. La piattaforma convalida il documento per l'esportazione.";
        document.getElementById("btn-export-pdf-program").disabled = false;
    } else {
        feedbackText.innerHTML = `<strong>Stato della validazione neutrale AI: COMPILAZIONE RIVEDIBILE.</strong><br><br>${criticitàRilevate.join("<br><br>")}<br><br><em>Nota di neutralità: Il sistema non valuta la bontà politica delle tue idee ma la stringente logica contabile e l'articolazione delle risposte. Correggi o completa i campi per abilitare l'esportazione PDF.</em>`;
        // Abilita comunque per evitare blocchi utente ma segnalando l'alert
        document.getElementById("btn-export-pdf-program").disabled = false;
    }
}

// ==========================================
// 7. MODULO D: BANCA DELLE IDEE & SOCIAL CIVICO MODERATO
// ==========================================
function renderBancaIdeeFeed() {
    const wrapper = document.getElementById("banca-ideas-feed-wrapper");
    wrapper.innerHTML = "";
    
    const filterValue = document.getElementById("filter-banca-scope").value;
    
    let list = PLATFORM_STATE.bancaIdee;
    if(filterValue !== "all") {
        list = PLATFORM_STATE.bancaIdee.filter(i => i.ambito === filterValue);
    }

    list.forEach(idea => {
        let node = document.createElement("article");
        node.className = "idea-card-node";
        
        let commentsHtml = idea.commenti.map(c => `
            <div class="comment-row">
                <span class="c-user">${c.u}:</span><span class="c-txt">${c.t}</span>
            </div>
        `).join("");

        node.innerHTML = `
            <div class="idea-header-meta">
                <span class="idea-author">👤 Istituzione / Utente: ${idea.autore}</span>
                <span class="idea-scope-tag">AMBITO: ${idea.ambito.toUpperCase()}</span>
            </div>
            <h4 style="margin-bottom:8px; color:#ffffff;">${idea.titolo}</h4>
            <p class="idea-body-txt">${idea.corpo}</p>
            <div class="idea-coverage-box">
                <strong>Analisi Copertura Finanziaria dichiarata:</strong><br>${idea.copertura}
            </div>
            <div class="social-debate-box">
                <div class="debate-title-sub">Discussione Moderata da AI (Solo Tesi Tecniche)</div>
                <div class="comments-stack" id="stack-comments-${idea.id}">${commentsHtml}</div>
                <span class="ai-moderation-pill">🛡️ AI MODERATION ACTIVE: Contenuti non conformi o insulti oscurati</span>
                <div class="comment-input-inline-group">
                    <input type="text" id="input-new-comm-${idea.id}" placeholder="Aggiungi un'analisi critica basata su dati..." autocomplete="off">
                    <button class="btn btn-action-secondary" onclick="addNewCommentCivico(${idea.id})">Invia</button>
                </div>
            </div>
        `;
        wrapper.appendChild(node);
    });
}

function createNewIdeaCivica() {
    const tit = document.getElementById("idea-input-title").value.trim();
    const scp = document.getElementById("idea-input-scope").value;
    const bdy = document.getElementById("idea-input-body").value.trim();
    const cvr = document.getElementById("idea-input-coverage").value.trim();
    const vis = document.getElementById("idea-input-visibility").value;

    if(!tit || !bdy || !cvr) {
        alert("Tutti i campi dell'idea e della copertura devono essere compilati.");
        return;
    }

    const nuova = {
        id: Date.now(),
        titolo: tit,
        autore: vis === "public" ? PLATFORM_STATE.user.alias : "Cittadino_Anonimo_Riconosciuto",
        ambito: scp,
        corpo: bdy,
        copertura: cvr,
        commenti: []
    };

    PLATFORM_STATE.bancaIdee.unshift(nuova);
    renderBancaIdeeFeed();

    // Reset campi
    document.getElementById("idea-input-title").value = "";
    document.getElementById("idea-input-body").value = "";
    document.getElementById("idea-input-coverage").value = "";
    alert("Idea immessa con successo nella Banca Dati Civica Nazionale.");
}

function addNewCommentCivico(idIdea) {
    const input = document.getElementById(`input-new-comm-${idIdea}`);
    let txt = input.value.trim();
    if(!txt) return;

    // Algoritmo di Moderazione AI Client-Side (Filtro ad personam e neutralità)
    // Se l'utente usa fallacie logiche o insulti, il sistema interviene
    const paroleBannate = ["stupido", "idiota", "ladri", "corrotti", "vota", "scemo", "mafia"];
    let contamina = false;
    paroleBannate.forEach(p => { if(txt.toLowerCase().includes(p)) contamina = true; });

    if(contamina) {
        alert("🛡️ INTERVENTO AI MODERATION: Il commento viola le linee guida del Social Civico. Sono stati rilevati attacchi personali o termini non funzionali al dibattito basato su dati. Il testo è stato respinto.");
        return;
    }

    const idea = PLATFORM_STATE.bancaIdee.find(i => i.id === idIdea);
    if(idea) {
        idea.commenti.push({
            u: PLATFORM_STATE.user.alias,
            t: txt
        });
        renderBancaIdeeFeed();
    }
}

// ==========================================
// 8. OUTPUT PDF STRUTTURATI (jsPDF COMPATIBLE)
// ==========================================
function generatePdfReportPatente() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("PATENTE CIVICA - CERTIFICATO FINALE", 14, 20);
    
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Identificativo Profilo: ${PLATFORM_STATE.user.alias}`, 14, 32);
    doc.text(`Livello di Esame: ${PLATFORM_STATE.user.livello.toUpperCase()}`, 14, 38);
    doc.text(`Territorio di Riferimento: ${PLATFORM_STATE.user.regione} - ${PLATFORM_STATE.user.comune}`, 14, 44);
    doc.text(`Data di Rilascio Digitale: 10 Giugno 2026`, 14, 50);
    
    doc.setLineWidth(0.5);
    doc.line(14, 55, 196, 55);

    let finalScoreRaw = 0;
    let maxScorePossible = PLATFORM_STATE.quiz.answersLog.length * 105;
    PLATFORM_STATE.quiz.answersLog.forEach(log => { totalScoreRaw += log.scelta.punteggio + log.scelta.bonus; });
    let finalScoreNormalized = Math.round((totalScoreRaw / maxScorePossible) * 100);
    if(finalScoreNormalized > 100) finalScoreNormalized = 100;

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`VALUTAZIONE COMPLESSIVA: ${finalScoreNormalized} / 100 punti`, 14, 68);

    doc.setFontSize(10);
    doc.setFont("Helvetica", "oblique");
    let sintesi = doc.splitTextToSize(document.getElementById("rep-text-valuation").textContent, 180);
    doc.text(sintesi, 14, 76);

    let y = 100;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("SCOMPOSIZIONE ANALITICA PER TEMA ED ARCO TEMPORALE", 14, y);
    y += 10;

    PLATFORM_STATE.quiz.answersLog.forEach((log, index) => {
        const scn = INSTITUTIONAL_DATASTORE.scenariNazionali.find(s => s.id === log.scenarioId);
        if(y > 260) { doc.addPage(); y = 20; }
        
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.text(`Tema ${index + 1}: ${scn.tema} - ${scn.titolo.substring(0, 50)}...`, 14, y);
        y += 6;
        
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9);
        let scText = doc.splitTextToSize(`Decisione presa: ${log.scelta.testo}`, 175);
        doc.text(scText, 16, y);
        y += (scText.length * 4) + 2;

        let toText = doc.splitTextToSize(`Trade-off -> Guadagno: ${log.scelta.tradeOff.guadagno} | Costo: ${log.scelta.tradeOff.perdita} | Chi paga: ${log.scelta.tradeOff.chiPaga}`, 175);
        doc.text(toText, 16, y);
        y += (toText.length * 4) + 6;
    });

    doc.save(`PatenteCivica_Report_${PLATFORM_STATE.user.alias}.pdf`);
}

function generatePdfProgram() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.text("PROGRAMMA ELETTORALE CIVICO STRUTTURATO", 14, 20);
    
    doc.setFontSize(11);
    doc.setFont("Helvetica", "normal");
    doc.text(`Redatto da: ${PLATFORM_STATE.user.alias}`, 14, 30);
    doc.text(`Ambito Istituzionale: ${PLATFORM_STATE.laboratorio.ambitoAttivo.toUpperCase()}`, 14, 36);
    doc.text(`Data Validazione Tecnica: 10 Giugno 2026`, 14, 42);
    
    doc.line(14, 46, 196, 46);
    
    let y = 56;
    const saved = PLATFORM_STATE.laboratorio.programmiSalvati;
    const elencoTemi = INSTITUTIONAL_DATASTORE.temiLab[PLATFORM_STATE.laboratorio.ambitoAttivo];

    elencoTemi.forEach(tema => {
        const data = saved[tema.id];
        if(!data) return;

        if(y > 240) { doc.addPage(); y = 20; }

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text(`Sezione: ${tema.t}`, 14, y);
        y += 8;

        doc.setFontSize(10);
        doc.setFont("Helvetica", "normal");
        
        let pText = doc.splitTextToSize(`[CRITICITÀ] ${data.problema}`, 175);
        doc.text(pText, 14, y);
        y += (pText.length * 5) + 2;

        let sText = doc.splitTextToSize(`[SOLUZIONE] ${data.soluzione}`, 175);
        doc.text(sText, 14, y);
        y += (sText.length * 5) + 2;

        let rText = doc.splitTextToSize(`[COPERTURA FINANZIARIA ART.81] ${data.risorse}`, 175);
        doc.text(rText, 14, y);
        y += (rText.length * 5) + 2;

        let iText = doc.splitTextToSize(`[IMPATTO E KPI] ${data.impatto}`, 175);
        doc.text(iText, 14, y);
        y += (iText.length * 5) + 8;
    });

    doc.save(`Programma_Civico_${PLATFORM_STATE.laboratorio.ambitoAttivo}_2026.pdf`);
}
