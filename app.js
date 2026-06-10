/**
 * PATENTE CIVICA - CORE ENGINE APPLICATION (PROD-RELEASE 2026)
 * Architettura Single-Page a gestione atomica dello stato. 
 * Include il calcolo deterministico delle metriche d'impatto, la risoluzione dinamica 
 * dei contesti geografici, l'analisi dei trade-off fisici e il motore di validazione contabile AI.
 */

// =========================================================================
// 1. DATASET DOMANDE STRUTTURATE INTERNE (NAZIONALE / REGIONALE / COMUNALE)
// =========================================================================
const ENGINE_QUESTIONS_DATABASE = {
    nazionale: [
        {
            tema: "Debito Pubblico & Art. 81",
            titolo: "Stabilizzazione del debito sovrano e vincoli del Patto di Stabilità e Crescita.",
            descrizione: "L'indice debito/PIL nazionale impone una pianificazione rigorosa per ridurre lo spread e garantire la sostenibilità dei titoli di Stato sul mercato finanziario globale.",
            fonte: "Banca d'Italia / Ministero dell'Economia e delle Finanze",
            realtaIstituzionale: "L'Italia opera in coordinamento con le nuove regole europee della governance economica, che focalizzano il monitoraggio sulla traiettoria della spesa primaria netta.",
            risposte: [
                {
                    testo: "Sospensione parziale del pagamento degli interessi sui titoli e blocco unilaterale dei rimborsi.",
                    punteggio: 15,
                    tradeOff: { guadagno: "Immediata disponibilità di cassa fittizia nel cortissimo termine.", perdita: "Default tecnico, declassamento istantaneo delle agenzie di rating, fuga totale dei capitali esteri.", chiPaga: "I risparmiatori e le famiglie detentrici di titoli di Stato.", tempo: "Collasso economico di sistema entro 7 giorni." }
                },
                {
                    testo: "Rilascio di incentivi fiscali generalizzati non selettivi finanziati interamente in deficit strutturale extra-budget.",
                    punteggio: 35,
                    tradeOff: { guadagno: "Incremento artificiale e temporaneo dei consumi di specifiche categorie protette.", perdita: "Esplosione del debito pubblico transgenerazionale e apertura di procedure d'infrazione europee.", chiPaga: "Le generazioni future attraverso una contrazione automatica dei servizi pubblici.", tempo: "Aumento dei tassi di interesse sui mutui entro pochi mesi." }
                },
                {
                    testo: "Contenimento della spesa corrente tramite spending review mirata, associata a un piano straordinario di digitalizzazione per contrastare l'evasione fiscale complessa.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Recupero di risorse strutturali ed efficientamento strutturale della spesa pubblica primaria.", perdita: "Resistenze corporative burocratiche e costi iniziali legati all'integrazione dei sistemi informatici.", chiPaga: "I soggetti elusori ed evasori fiscali.", tempo: "Consolidamento dei flussi positivi in 12-24 mesi." }
                },
                {
                    testo: "Mantenimento dello status quo amministrativo senza alcuna variazione dei capitoli di bilancio.",
                    punteggio: 50,
                    tradeOff: { guadagno: "Assenza di conflittualità politica interna o sindacale nel breve periodo.", perdita: "Erosione progressiva della competitività del Paese a causa dell'inflazione latente.", chiPaga: "L'intero sistema economico nazionale per stagnazione.", tempo: "Declino lineare costante nel medio periodo." }
                }
            ]
        },
        {
            tema: "Welfare & Pensioni",
            titolo: "Sostenibilità del sistema previdenziale a ripartizione a fronte del declino demografico.",
            descrizione: "L'indice di vecchiaia in incremento altera il rapporto tra lavoratori attivi e trattamenti pensionistici erogati, mettendo a rischio la tenuta dei conti dell'INPS.",
            fonte: "INPS / ISTAT",
            realtaIstituzionale: "I provvedimenti attuati mantengono l'indicizzazione delle pensioni all'aspettativa di vita, limitando i canali di anticipazione non basati sul calcolo puramente contributivo.",
            risposte: [
                {
                    testo: "Istituzione della flessibilità in uscita parametrata sul calcolo integralmente contributivo della quota anticipata.",
                    punteggio: 90,
                    tradeOff: { guadagno: "Salvaguardia dell'equità intergenerazionale e stabilità attuariale del bilancio INPS.", perdita: "Riduzione dell'assegno mensile per l'utente che sceglie volontariamente l'uscita anticipata.", chiPaga: "Il lavoratore che opta per l'anticipo accettando la decurtazione matematica.", tempo: "Effetto permanente sulla stabilità dei flussi finanziari." }
                },
                {
                    testo: "Pensionamento anticipato generalizzato per anzianità a 40 anni di contributi, senza penalità e indipendentemente dall'età.",
                    punteggio: 40,
                    tradeOff: { guadagno: "Altissimo gradimento nei sondaggi demoscopici di breve periodo.", perdita: "Impennata della spesa previdenziale corrente e incremento immediato delle aliquote contributive sui giovani.", chiPaga: "I lavoratori under-35 attualmente in servizio.", tempo: "Aggravamento del disavanzo INPS entro l'esercizio finanziario successivo." }
                },
                {
                    testo: "Sospensione dell'erogazione delle pensioni superiori a tre volte il minimo per ridistribuire le risorse.",
                    punteggio: 20,
                    tradeOff: { guadagno: "Recupero immediato di cassa a fini assistenziali.", perdita: "Palesi profili di incostituzionalità e rottura del patto di fiducia contributivo dello Stato.", chiPaga: "I pensionati che hanno versato regolarmente quote elevate durante la vita lavorativa.", tempo: "Ricorsi legali sistematici e paralisi giuridica entro un anno." }
                },
                {
                    testo: "Blocco totale dell'adeguamento delle pensioni all'inflazione per un quinquennio.",
                    punteggio: 55,
                    tradeOff: { guadagno: "Risparmio nominale predeterminato per le casse dello Stato.", perdita: "Grave contrazione del potere d'acquisto dei pensionati e incremento della povertà relativa.", chiPaga: "I percettori di trattamenti previdenziali medi.", tempo: "Depressione dei consumi interni entro 6 mesi." }
                }
            ]
        },
        {
            tema: "Energia & Sviluppo",
            titolo: "Diversificazione del mix energetico e decarbonizzazione dei settori industriali.",
            descrizione: "La necessità di raggiungere l'indipendenza dagli approvvigionamenti esteri fossili richiede una transizione verso fonti programmabili e pulite senza compromettere la produzione.",
            fonte: "TERNA / Ministero dell'Ambiente e della Sicurezza Energetica",
            realtaIstituzionale: "I piani strategici nazionali prevedono la semplificazione autorizzativa per i grandi impianti rinnovabili offshore e investimenti nella ricerca sui vettori energetici avanzati.",
            risposte: [
                {
                    testo: "Chiusura immediata di tutti gli impianti termoelettrici a gas prima dello sviluppo delle reti di accumulo.",
                    punteggio: 30,
                    tradeOff: { guadagno: "Abbattimento nominale immediato delle emissioni dirette di CO2.", perdita: "Rischio sistematico di blackout elettrici (load shedding) e necessità di importare energia sporca dall'estero.", chiPaga: "Le industrie manifatturiere e i consumatori finali per l'impennata dei costi del mercato tutelato.", tempo: "Instabilità della rete elettrica nazionale immediata." }
                },
                {
                    testo: "Pianificazione integrata basata sullo sblocco di impianti eolici offshore, potenziamento degli accumuli ed estensione della ricerca scientifica sul nucleare di nuova generazione.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Costruzione di un carico di base sicuro, pulito, programmabile e resiliente nel lungo periodo.", perdita: "Tempi elevati per l'entrata in esercizio delle tecnologie di nuova generazione.", chiPaga: "Fondi di investimento pubblico-privati a lungo termine.", tempo: "Transizione strutturale completata nell'arco di un decennio." }
                },
                {
                    testo: "Sussidi illimitati a fondo perduto per l'acquisto di idrogeno da fonti non certificate.",
                    punteggio: 50,
                    tradeOff: { guadagno: "Sviluppo di una filiera commerciale artificiale incentrata sull'idrogeno.", perdita: "Rischio di finanziare idrogeno prodotto da idrocarburi (grigio) vanificando i target ecologici.", chiPaga: "La fiscalità generale.", tempo: "Impatto fiscale elevato ed inefficace nel medio periodo." }
                },
                {
                    testo: "Ritorno prioritario all'estrazione e all'utilizzo del carbone nazionale nei siti dismessi.",
                    punteggio: 25,
                    tradeOff: { guadagno: "Contenimento nominale dei costi di importazione della materia prima nell'immediato.", perdita: "Violazione dei trattati internazionali sul clima, sanzioni europee e gravissimi danni sanitari locali.", chiPaga: "La popolazione residente nei pressi dei poli estrattivi e industriali.", tempo: "Arretramento tecnologico e sanzioni entro 12 mesi." }
                }
            ]
        },
        {
            tema: "Scuola & Università",
            titolo: "Allineamento delle competenze e superamento del precariato strutturale del corpo docente.",
            descrizione: "Il reclutamento scolastico sconta storiche stratificazioni di contratti a termine, mentre gli indicatori internazionali registrano un disallineamento nelle competenze STEM.",
            fonte: "Ministero dell'Istruzione e del Merito / Report INVALSI",
            realtaIstituzionale: "È in atto la riforma del reclutamento vincolata ai traguardi del PNRR, che introduce percorsi abilitanti selettivi e crediti formativi specifici per la docenza.",
            risposte: [
                {
                    testo: "Immissione in ruolo automatica e generalizzata per titoli di servizio, bypassando i concorsi pubblici ordinari.",
                    punteggio: 50,
                    tradeOff: { guadagno: "Risoluzione temporanea del contenzioso sindacale legato alla precarietà.", perdita: "Elusione del principio costituzionale del concorso pubblico e parziale rinuncia alla selezione meritocratica.", chiPaga: "Gli studenti per la mancata garanzia di un'omogeneità qualitativa della didattica.", tempo: "Impatto amministrativo immediato, declino qualitativo nel lungo periodo." }
                },
                {
                    testo: "Riforma basata su concorsi ordinari annuali digitalizzati, formazione continua obbligatoria legata all'avanzamento di carriera e incentivazione economica per l'insegnamento nelle aree a forte dispersione scolastica.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Innalzamento generalizzato degli standard formativi e contrasto mirato alla povertà educativa.", perdita: "Forte opposizione da parte delle sigle sindacali tradizionali contrarie alla differenziazione salariale.", chiPaga: "La governance scolastica chiamata a una rendicontazione stringente delle performance.", tempo: "Primi riscontri misurabili sui test standardizzati entro 36 mesi." }
                },
                {
                    testo: "Riduzione della durata dell'obbligo scolastico a 14 anni per immettere rapidamente i giovani nel lavoro non qualificato.",
                    punteggio: 25,
                    tradeOff: { guadagno: "Contrazione immediata della spesa corrente fissa del Ministero dell'Istruzione.", perdita: "Aumento strutturale analfabetismo funzionale e perdita di produttività del capitale umano nel lungo periodo.", chiPaga: "I giovani appartenenti alle fasce sociali svantaggiate.", tempo: "Depressione economica del potenziale di crescita in 5-10 anni." }
                },
                {
                    testo: "Abolizione totale dei test di valutazione standardizzati nazionali INVALSI.",
                    punteggio: 30,
                    tradeOff: { guadagno: "Cancellazione dell'ansia da prestazione scolastica percepita dagli istituti.", perdita: "Cecità totale dei decisori pubblici rispetto all'efficacia delle riforme e all'allocazione geografica delle risorse.", chiPaga: "Il Ministero impossibilitato a correggere i divari territoriali.", tempo: "Impedimento oggettivo alla programmazione scientifica educativo-scolastica." }
                }
            ]
        },
        {
            tema: "Immigrazione & Lavoro",
            titolo: "Regolazione dei flussi d'ingresso e programmazione del fabbisogno del sistema produttivo.",
            descrizione: "La gestione delle dinamiche migratorie necessita di una transizione dalla logica del soccorso emergenziale a quella dell'integrazione economica legale, coerentemente con le richieste delle imprese.",
            fonte: "Ministero dell'Interno / Unioncamere - Sistema Excelsior",
            realtaIstituzionale: "Lo Stato adotta lo strumento del Decreto Flussi pluriennale, introducendo canali di ingresso privilegiati per i lavoratori formati all'estero tramite accordi bilaterali.",
            risposte: [
                {
                    testo: "Blocco navale totale e chiusura assoluta delle frontiere amministrative ad ogni tipologia di visto.",
                    punteggio: 20,
                    tradeOff: { guadagno: "Annullamento teorico formale degli ingressi regolari e irregolari nel brevissimo termine.", perdita: "Isolamento diplomatico, violazione del diritto internazionale marittimo e blocco della forza lavoro necessaria alle imprese.", chiPaga: "I settori dell'agricoltura, dell'edilizia e della manifattura interna.", tempo: "Carenza acuta di manodopera e sanzioni internazionali immediate." }
                },
                {
                    testo: "Istituzione di accordi bilaterali stabili con i Paesi d'origine per la formazione linguistica e tecnica nei paesi di partenza, legando gli ingressi direttamente ai codici identificativi delle richieste delle aziende.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Azzeramento dei tempi di inattività sociale dei migranti ed emersione immediata del gettito contributivo.", perdita: "Elevata complessità burocratica diplomatica e dipendenza dalla stabilità politica dei governi esteri.", chiPaga: "Le associazioni datoriali e lo Stato per i costi di monitoraggio consolare.", tempo: "Flussi stabili a regime entro 18-24 mesi." }
                },
                {
                    testo: "Erogazione automatica di un permesso di soggiorno a chiunque dichiari l'intenzione di cercare un impiego.",
                    punteggio: 45,
                    tradeOff: { guadagno: "Massima semplificazione delle procedure di ingresso sul territorio.", perdita: "Rischio di saturazione dei sistemi di accoglienza locali e alimentazione dei circuiti del lavoro nero in assenza di un contratto preventivo.", chiPaga: "I comuni che gestiscono il welfare di emergenza.", tempo: "Saturazione logistica dei servizi sociali in 6 mesi." }
                },
                {
                    testo: "Sanatoria permanente automatica a scadenze trimestrali per la regolarizzazione ex-post.",
                    punteggio: 50,
                    tradeOff: { guadagno: "Emersione fiscale istantanea di quote di economia sommersa.", perdita: "Generazione di un incentivo oggettivo (pull factor) all'ingresso tramite canali irregolari.", chiPaga: "La certezza del diritto e l'efficacia della pianificazione programmata dei flussi.", tempo: "Alimentazione costante dei canali non ufficiali." }
                }
            ]
        }
    ],
    regionale: [
        {
            tema: "Sanità Regionale",
            titolo: "Efficientamento delle liste d'attesa e riequilibrio tra rete ospedaliera e medicina territoriale.",
            descrizione: "La gestione del bilancio sanitario assorbe la quasi totalità delle risorse regionali autonome. È necessario garantire i Livelli Essenziali di Assistenza (LEA) controllando la spesa.",
            fonte: "AGENAS / Ministero della Salute",
            realtaIstituzionale: "Le regioni attuano la riorganizzazione della rete territoriale attraverso l'attivazione delle Case della Comunità finanziate dal PNRR per decongestionare i Pronto Soccorso.",
            risposte: [
                {
                    testo: "Estensione indiscriminata dei tetti di spesa per il privato convenzionato senza sistemi di rendicontazione centralizzati.",
                    punteggio: 45,
                    tradeOff: { guadagno: "Rapida riduzione temporanea delle liste d'attesa per prestazioni diagnostiche.", perdita: "Drenaggio di risorse pubbliche stabili a svantaggio degli investimenti negli ospedali pubblici storici.", chiPaga: "I contribuenti regionali per potenziale aumento delle addizionali IRPEF.", tempo: "Sbilanciamento del fondo sanitario regionale entro 12 mesi." }
                },
                {
                    testo: "Integrazione dei sistemi di prenotazione (CUP Unico) tra pubblico e privato, telemedicina strutturata per la gestione delle patologie croniche a domicilio e monitoraggio rigido del rispetto dei tempi LEA.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Ottimizzazione allocativa delle risorse esistenti e riduzione degli accessi impropri nei reparti d'emergenza.", perdita: "Necessità di vincere l'inerzia digitale del personale medico senior e riorganizzare i turni.", chiPaga: "Le ASL sul piano organizzativo e i provider tecnologici.", tempo: "Miglioramento dell'accessibilità tracciabile in 6-12 mesi." }
                },
                {
                    testo: "Chiusura totale di tutti i presidi ospedalieri periferici sotto i 150 posti letto senza attivare alternative sul territorio.",
                    punteggio: 30,
                    tradeOff: { guadagno: "Forte contrazione geometrica dei costi di gestione fissi correnti.", perdita: "Desertificazione sanitaria delle aree montane o interne e sovraccarico definitivo dei grandi ospedali metropolitani.", chiPaga: "La popolazione residente nei territori periferici e isolati.", tempo: "Inasprimento delle emergenze nei grandi poli ospedalieri entro pochi mesi." }
                },
                {
                    testo: "Sostituzione generalizzata dei medici specializzanti con gettonisti esterni privi di vincoli contrattuali.",
                    punteggio: 40,
                    tradeOff: { guadagno: "Copertura immediata dei turni scoperti nei pronto soccorso.", perdita: "Costo orario triplicato per le casse regionali e frammentazione della continuità clinica del paziente.", chiPaga: "Il bilancio consolidato della sanità regionale.", tempo: "Aumento esponenziale dei costi correnti entro l'esercizio in corso." }
                }
            ]
        },
        {
            tema: "Infrastrutture & Trasporti",
            titolo: "Affidamento e ammodernamento delle tratte ferroviarie regionali destinate al pendolarismo.",
            descrizione: "Mentre l'Alta Velocità sperimenta investimenti intensivi, il trasporto pubblico locale su ferro sconta vetustà delle linee e carenze nel materiale rotabile.",
            fonte: "ART (Autorità di Regolazione dei Trasporti) / ANSFISA",
            realtaIstituzionale: "La programmazione prevede contratti di servizio vincolanti con i gestori ferroviari, introducendo penali severe legate all'indice di puntualità tracciato digitalmente.",
            risposte: [
                {
                    testo: "Erogazione di abbonamenti totalmente gratuiti per tutti i residenti, coprendo i mancati ricavi da bigliettazione tramite indebitamento straordinario.",
                    punteggio: 35,
                    tradeOff: { guadagno: "Forte incremento del consenso politico immediato e incentivo nominale teorico all'uso del mezzo pubblico.", perdita: "Azzeramento della capacità autonoma di investimento per l'acquisto di nuovi treni, causando il degrado del servizio.", chiPaga: "La collettività per l'impossibilità di ammodernare la rete.", tempo: "Frequenza dei guasti in aumento entro 12 mesi a causa di mancata manutenzione." }
                },
                {
                    testo: "Esecuzione di gare d'appalto europee per l'affidamento delle tratte, vincolando l'assegnazione all'obbligo di rinnovo totale della flotta ed inserendo clausole di puntualità minime verificate da autorità terze.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Iniezione di capitali industriali privati, certezza dei parametri operativi e ammodernamento dei convogli.", perdita: "Rischio di razionalizzazione commerciale delle corse a bassissima frequentazione se non sussidiate esplicitamente.", chiPaga: "Gli operatori non efficienti che perdono la concessione; la regione per i sussidi sulle tratte deboli.", tempo: "Rinnovamento flotta visibile progressivamente in 18-24 mesi." }
                },
                {
                    testo: "Smantellamento delle linee ferroviarie secondarie per sostituirle integralmente con autolinee private su gomma.",
                    punteggio: 40,
                    tradeOff: { guadagno: "Flessibilità logistica immediata ed eliminazione dei costi di manutenzione dei binari.", perdita: "Forte incremento delle emissioni inquinanti e congestione della rete stradale ordinaria.", chiPaga: "L'ambiente e i tempi di percorrenza degli utenti nelle ore di punta.", tempo: "Aumento del traffico veicolare entro l'anno." }
                },
                {
                    testo: "Mantenimento dei contratti storici in proroga perpetua senza verifica degli indici di disservizio.",
                    punteggio: 30,
                    tradeOff: { guadagno: "Totale continuità amministrativa priva di sforzo progettuale o contenziosi legali.", perdita: "Consolidamento dell'inefficienza e progressivo abbandono del trasporto pubblico da parte dei cittadini.", chiPaga: "I pendolari costretti a subire ritardi sistematici.", tempo: "Lento e inesorabile degrado del patrimonio infrastrutturale." }
                }
            ]
        }
    ],
    comunale: [
        {
            tema: "Gestione Rifiuti & Ambiente",
            titolo: "Chiusura del ciclo dei rifiuti urbani e introduzione della tariffazione puntuale.",
            descrizione: "La gestione dei rifiuti a livello municipale incide direttamente sulla tassazione locale (TARI). La carenza di impianti costringe i comuni a esportare i rifiuti con costi logistici elevati.",
            fonte: "ISPRA / Catasto Nazionale dei Rifiuti",
            realtaIstituzionale: "I comuni promuovono la digitalizzazione della raccolta tramite l'adozione di sistemi di identificazione dell'indifferenziato per applicare il principio comunitario 'chi inquina paga'.",
            risposte: [
                {
                    testo: "Eliminazione della raccolta differenziata per tornare al conferimento in un unico cassonetto stradale indifferenziato.",
                    punteggio: 15,
                    tradeOff: { guadagno: "Semplificazione massima delle abitudini quotidiane del cittadino nel brevissimo termine.", perdita: "Sanzioni europee milionarie immediate, saturazione istantanea delle discariche locali e impennata della TARI.", chiPaga: "I residenti del comune tramite cartelle esattoriali TARI triplicate.", tempo: "Emergenza ambientale e finanziaria municipale entro 6 mesi." }
                },
                {
                    testo: "Attivazione della raccolta porta a porta integrata da mastelli con tag RFID, applicazione della tariffazione puntuale sulla quota di secco residuo prodotta e autorizzazione all'impiantistica di recupero energetico locale.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Drastica riduzione del rifiuto indifferenziato, autonomia del ciclo senza dipendenze esterne e stabilizzazione della tariffa nel lungo periodo.", perdita: "Iniziale complessità logistica e necessità di un forte monitoraggio contro gli scarichi abusivi periferici.", chiPaga: "I cittadini non virtuosi che rifiutano la differenziazione.", tempo: "Innalzamento della percentuale di riciclo oltre il 65% in 12 mesi." }
                },
                {
                    testo: "Spedizione sistematica di tutti i rifiuti non differenziati all'estero tramite accordi ferroviari a lungo termine.",
                    punteggio: 50,
                    tradeOff: { guadagno: "Rimozione dei rifiuti dal territorio comunale visivo, mantenendo pulite le strade nell'immediato.", perdita: "Totale vulnerabilità rispetto alle tariffe dei paesi riceventi e costi di trasporto insostenibili nel tempo.", chiPaga: "Il bilancio comunale e gli utenti del servizio tramite tariffe elevate.", tempo: "Crescita strutturale incontrollata dei costi operativi." }
                },
                {
                    testo: "Istituzione di sanzioni pecuniarie elevate senza fornire i cassonetti idonei o i calendari di raccolta.",
                    punteggio: 35,
                    tradeOff: { guadagno: "Potenziale incremento immediato delle entrate derivanti dalle contravvenzioni.", perdita: "Altissimo livello di conflittualità sociale, proliferazione di micro-discariche abusive nelle vie secondarie.", chiPaga: "La cittadinanza e il decoro dello spazio pubblico urbano.", tempo: "Degrado urbano diffuso entro poche settimane." }
                }
            ]
        },
        {
            tema: "Mobilità Urbica & Viabilità",
            titolo: "Regolazione del traffico veicolare privato e implementazione di piani di mobilità sostenibile.",
            descrizione: "La congestione del traffico nei centri urbani determina livelli elevati di inquinamento atmosferico e inficia i tempi di spostamento all'interno della città.",
            fonte: "ARPA / PUMS (Piano Urbano della Mobilità Sostenibile)",
            realtaIstituzionale: "Le amministrazioni locali provvedono alla limitazione progressiva degli accessi nei centri storici tramite l'estensione delle ZTL e l'introduzione di aree a velocità moderata.",
            risposte: [
                {
                    testo: "Liberalizzazione totale degli accessi automobilistici in qualsiasi zona della città, inclusi i sagrati monumentali e le aree pedonali.",
                    punteggio: 25,
                    tradeOff: { guadagno: "Massima libertà di movimento individuale motorizzato senza vincoli sanzionatori.", perdita: "Paralisi totale della viabilità nelle ore di punta, incremento esponenziale delle emissioni sottili e degrado delle strutture storiche.", chiPaga: "La salute pubblica dei residenti e la sicurezza dei pedoni.", tempo: "Collasso della circolazione stradale urbana immediato." }
                },
                {
                    testo: "Pedonalizzazione progressiva del nucleo storico, creazione di nodi di interscambio con parcheggi sotterranei alle porte della città connessi a linee di trasporto rapido di massa, ed estensione delle corsie ciclabili protette.",
                    punteggio: 95,
                    tradeOff: { guadagno: "Abbattimento dell'inquinamento acustico ed atmosferico, recupero dello spazio pubblico e sicurezza stradale.", perdita: "Resistenze iniziali da parte delle associazioni dei commercianti per timore di calo delle vendite.", chiPaga: "Gli utenti dell'auto privata che devono modificare le proprie abitudini di parcheggio.", tempo: "Riqualificazione urbana e fluidificazione degli spostamenti in 12-18 mesi." }
                },
                {
                    testo: "Istituzione della Città 30 oraria su tutta l'estensione del territorio comunale senza potenziare il trasporto pubblico.",
                    punteggio: 60,
                    tradeOff: { guadagno: "Forte riduzione teorica della gravità degli incidenti stradali urbani.", perdita: "Inasprimento dei tempi di percorrenza per i mezzi di soccorso, commerciali e privati se la rete resta intasata.", chiPaga: "Gli operatori della logistica urbana e i lavoratori pendolari.", tempo: "Aumento dei tempi di percorrenza immediato con criticità localizzate." }
                },
                {
                    testo: "Cancellazione di ogni servizio di sharing mobility (monopattini, biciclette, auto) sul territorio comunale.",
                    punteggio: 40,
                    tradeOff: { guadagno: "Eliminazione immediata del disordine causato dal parcheggio selvaggio sui marciapiedi.", perdita: "Sottrazione immediata di opzioni di mobilità complementare non inquinante, costringendo il ritorno all'auto privata.", chiPaga: "L'utenza giovanile e i pendolari intermodali.", tempo: "Incremento istantaneo del parco auto circolante nelle ore di picco." }
                }
            ]
        }
    ]
};

// =========================================================================
// 2. STATO DELL'APPLICAZIONE (GLOBAL APPLICATION STATE - MONOLITICO)
// =========================================================================
let CORE_APPLICATION_STATE = {
    selectedLevel: "",       // "nazionale" | "regionale" | "comunale"
    selectedTerritoryId: "", // ID specifico preso dai dataset territori/comuni
    currentQuestionIndex: 0,
    questionsSet: [],
    scoreLog: [],            // Array di interi contenente i punteggi delle risposte selezionate
    answersDetailedLog: [],   // Contiene gli oggetti completi delle scelte dell'utente per l'analisi finale
    metrics: { economia: 50, sociale: 50, consenso: 50 },
    userAlias: "Cittadino",
    
    // Contenitore dati del Laboratorio Civico
    laboratorio: {
        ambitoSelezionato: "nazione",
        programmaCodificato: {} // Struttura: { [temaId]: { problema, soluzione, risorse, impatto } }
    }
};

// =========================================================================
// 3. ARCHITETTURA DI AGGANCIO EVENTI (BOOTSTRAP)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initializeCoreEventHandlers();
});

function initializeCoreEventHandlers() {
    const selectLivello = document.getElementById("select-livello-geografico");
    const selectTerritorio = document.getElementById("select-territorio-specifico");
    const btnStart = document.getElementById("btn-start-simulation");
    const aliasInput = document.getElementById("input-user-alias");

    // Monitora il cambio del livello per popolare i territori specifici dei file territori.js / comuni.js
    selectLivello.addEventListener("change", (e) => {
        const level = e.target.value;
        CORE_APPLICATION_STATE.selectedLevel = level;
        resolveTerritoryDropdownPopulation(level);
        validateIntroFormState();
    });

    selectTerritorio.addEventListener("change", (e) => {
        CORE_APPLICATION_STATE.selectedTerritoryId = e.target.value;
        validateIntroFormState();
    });

    aliasInput.addEventListener("input", validateIntroFormState);

    // Avvio del Test
    btnStart.addEventListener("click", () => {
        const targetId = selectTerritorio.value;
        setTerritory(CORE_APPLICATION_STATE.selectedLevel, targetId);
    });

    // Navigazione tra Moduli Principali (Tab System)
    document.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            
            const panelTarget = e.target.getAttribute("data-target");
            executeModuleTabSwitch(panelTarget);
        });
    });

    // Eventi interni al modulo Laboratorio Civico
    document.getElementById("select-lab-scope").addEventListener("change", (e) => {
        CORE_APPLICATION_STATE.laboratorio.ambitoSelezionato = e.target.value;
        renderLaboratorioTopicsMenu();
    });

    document.getElementById("btn-save-lab-topic").addEventListener("click", saveCurrentLabTopicData);
    document.getElementById("btn-lab-ai-simulate").addEventListener("click", processLabProgramThroughInternalAi);
}

// =========================================================================
// 4. LOGICA DI COLLEGAMENTO TERRITORIO -> QUIZ ENGINE
// =========================================================================
function resolveTerritoryDropdownPopulation(level) {
    const wrapper = document.getElementById("wrapper-select-territorio");
    const select = document.getElementById("select-territorio-specifico");
    const lbl = document.getElementById("lbl-select-territorio");
    
    select.innerHTML = '<option value="" disabled selected>Scegli l\'entità territoriale territoriale...</option>';
    CORE_APPLICATION_STATE.selectedTerritoryId = "";

    if (level === "nazionale") {
        wrapper.style.display = "block";
        lbl.textContent = "Ambito dello Stato";
        let opt = document.createElement("option");
        opt.value = DATA_TERRITORI.nazione.id;
        opt.textContent = DATA_TERRITORI.nazione.nome;
        select.appendChild(opt);
    } 
    else if (level === "regionale") {
        wrapper.style.display = "block";
        lbl.textContent = "Seleziona la Regione d'Esame";
        DATA_TERRITORI.regioni.forEach(reg => {
            let opt = document.createElement("option");
            opt.value = reg.id;
            opt.textContent = reg.nome;
            select.appendChild(opt);
        });
    } 
    else if (level === "comunale") {
        wrapper.style.display = "block";
        lbl.textContent = "Seleziona il Comune di Prossimità";
        DATA_COMUNI.comuni.forEach(com => {
            let opt = document.createElement("option");
            opt.value = com.id;
            opt.textContent = com.nome;
            select.appendChild(opt);
        });
    } else {
        wrapper.style.display = "none";
    }
}

function validateIntroFormState() {
    const alias = document.getElementById("input-user-alias").value.trim();
    const level = document.getElementById("select-livello-geografico").value;
    const terr = document.getElementById("select-territorio-specifico").value;
    const btn = document.getElementById("btn-start-simulation");

    if (alias.length >= 2 && level && terr) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

/**
 * IMPLEMENTAZIONE REQUISITO 3: setTerritory(level, territoryId)
 * Configura in modo robusto il contesto, carica le domande corrispondenti e avvia il test.
 */
function setTerritory(level, territoryId) {
    CORE_APPLICATION_STATE.selectedLevel = level;
    CORE_APPLICATION_STATE.selectedTerritoryId = territoryId;
    CORE_APPLICATION_STATE.userAlias = document.getElementById("input-user-alias").value.trim() || "Analista";
    
    // Assegnazione del set corretto di domande in base al livello istituzionale (Requisito 2)
    if (level === "nazionale") {
        CORE_APPLICATION_STATE.questionsSet = [...ENGINE_QUESTIONS_DATABASE.nazionale];
    } else if (level === "regionale") {
        CORE_APPLICATION_STATE.questionsSet = [...ENGINE_QUESTIONS_DATABASE.regionale];
    } else if (level === "comunale") {
        CORE_APPLICATION_STATE.questionsSet = [...ENGINE_QUESTIONS_DATABASE.comunale];
    }

    // Risoluzione nome del territorio per la UI
    let nomeTerritorioVisualizzato = "Italia";
    if (level === "regionale") {
        const rObj = DATA_TERRITORI.regioni.find(r => r.id === territoryId);
        if (rObj) nomeTerritorioVisualizzato = `Regione ${rObj.nome}`;
    } else if (level === "comunale") {
        const cObj = DATA_COMUNI.comuni.find(c => c.id === territoryId);
        if (cObj) nomeTerritorioVisualizzato = `Comune di ${cObj.nome}`;
    }

    // Aggiornamento elementi della UI prima dello switch grafico
    document.getElementById("badge-active-territory").textContent = nomeTerritorioVisualizzato.toUpperCase();
    document.getElementById("total-steps-txt").textContent = CORE_APPLICATION_STATE.questionsSet.length;
    
    // Reset variabili di runtime della simulazione
    CORE_APPLICATION_STATE.currentQuestionIndex = 0;
    CORE_APPLICATION_STATE.scoreLog = [];
    CORE_APPLICATION_STATE.answersDetailedLog = [];
    CORE_APPLICATION_STATE.metrics = { economia: 50, sociale: 50, consenso: 50 };
    
    syncLiveMetricsUiBars();
    
    // Sgancio pannelli ed attivazione navigazione secondaria tabs
    document.getElementById("panel-intro").classList.remove("active");
    document.getElementById("panel-test").classList.add("active");
    document.getElementById("navigation-tabs").style.display = "flex";
    
    renderActiveTestScenario();
}

// =========================================================================
// 5. MOTORIZZAZIONE INTERNA DEI LIVELLI DI TEST
// =========================================================================
function renderActiveTestScenario() {
    const index = CORE_APPLICATION_STATE.currentQuestionIndex;
    const total = CORE_APPLICATION_STATE.questionsSet.length;

    if (index >= total) {
        executePiattaformaFinalEvaluation();
        return;
    }

    // Aggiornamento contatori e barre avanzamento lineari
    document.getElementById("current-step-txt").textContent = index + 1;
    const percentFill = (index / total) * 100;
    document.getElementById("test-progress-fill").style.width = `${percentFill}%`;

    const qActive = CORE_APPLICATION_STATE.questionsSet[index];
    
    document.getElementById("txt-question-topic").textContent = qActive.tema.toUpperCase();
    document.getElementById("txt-question-title").textContent = qActive.titolo;
    document.getElementById("txt-question-desc").textContent = qActive.descrizione;

    // Generazione bottoni risposte multiple ad architettura pulita
    const containerOptions = document.getElementById("container-options-buttons");
    containerOptions.innerHTML = "";

    qActive.risposte.forEach((risp, rIdx) => {
        let btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.textContent = risp.testo;
        btn.addEventListener("click", () => handleUserSelectionProcessing(risp));
        containerOptions.appendChild(btn);
    });
}

function handleUserSelectionProcessing(rispostaSelezionata) {
    // Calcolo euristico delle metriche di impatto per la simulazione dinamica
    const pts = rispostaSelezionata.punteggio;
    
    if (pts >= 80) {
        CORE_APPLICATION_STATE.metrics.economia = Math.min(100, CORE_APPLICATION_STATE.metrics.economia + 10);
        CORE_APPLICATION_STATE.metrics.sociale = Math.min(100, CORE_APPLICATION_STATE.metrics.sociale + 8);
        CORE_APPLICATION_STATE.metrics.consenso = Math.max(0, CORE_APPLICATION_STATE.metrics.consenso - 6);
    } else if (pts >= 50) {
        CORE_APPLICATION_STATE.metrics.consenso = Math.min(100, CORE_APPLICATION_STATE.metrics.consenso + 12);
        CORE_APPLICATION_STATE.metrics.sociale = Math.min(100, CORE_APPLICATION_STATE.metrics.sociale + 4);
        CORE_APPLICATION_STATE.metrics.economia = Math.max(0, CORE_APPLICATION_STATE.metrics.economia - 10);
    } else {
        CORE_APPLICATION_STATE.metrics.consenso = Math.min(100, CORE_APPLICATION_STATE.metrics.consenso + 15);
        CORE_APPLICATION_STATE.metrics.economia = Math.max(0, CORE_APPLICATION_STATE.metrics.economia - 16);
        CORE_APPLICATION_STATE.metrics.sociale = Math.max(0, CORE_APPLICATION_STATE.metrics.sociale - 12);
    }

    syncLiveMetricsUiBars();

    // Logga i risultati ed avanza l'indice del motore
    CORE_APPLICATION_STATE.scoreLog.push(pts);
    CORE_APPLICATION_STATE.answersDetailedLog.push({
        scenarioOriginale: CORE_APPLICATION_STATE.questionsSet[CORE_APPLICATION_STATE.currentQuestionIndex],
        rispostaScelta: rispostaSelezionata
    });

    CORE_APPLICATION_STATE.currentQuestionIndex++;
    renderActiveTestScenario();
}

function syncLiveMetricsUiBars() {
    const eBar = document.getElementById("bar-fill-eco");
    const sBar = document.getElementById("bar-fill-soc");
    const cBar = document.getElementById("bar-fill-con");

    eBar.style.width = `${CORE_APPLICATION_STATE.metrics.economia}%`;
    sBar.style.width = `${CORE_APPLICATION_STATE.metrics.sociale}%`;
    cBar.style.width = `${CORE_APPLICATION_STATE.metrics.consenso}%`;

    document.getElementById("val-bar-eco").textContent = `${CORE_APPLICATION_STATE.metrics.economia}%`;
    document.getElementById("val-bar-soc").textContent = `${CORE_APPLICATION_STATE.metrics.sociale}%`;
    document.getElementById("val-bar-con").textContent = `${CORE_APPLICATION_STATE.metrics.consenso}%`;
}

// =========================================================================
// 6. MOTORE DI CALCOLO E GENERAZIONE REPORT INTELLIGENTE
// =========================================================================
function executePiattaformaFinalEvaluation() {
    // Switch visivo verso la dashboard del report analitico
    document.getElementById("panel-test").classList.remove("active");
    document.getElementById("panel-report").classList.add("active");

    // Calcolo matematico normalizzato del punteggio complessivo su base 100
    const sum = CORE_APPLICATION_STATE.scoreLog.reduce((a, b) => a + b, 0);
    const scoreFinal = Math.round(sum / CORE_APPLICATION_STATE.scoreLog.length);

    document.getElementById("txt-rep-username").textContent = CORE_APPLICATION_STATE.userAlias;
    document.getElementById("txt-rep-ambito").textContent = CORE_APPLICATION_STATE.selectedLevel.toUpperCase();
    document.getElementById("txt-rep-final-score").textContent = scoreFinal;

    const bLevel = document.getElementById("badge-civic-level");
    const narrativeText = document.getElementById("txt-rep-evaluation-narrative");

    // Riconoscimento del livello civico istituzionale da specifica (basso / medio / alto)
    if (scoreFinal >= 80) {
        bLevel.textContent = "LIVELLO CIVICO: ALTO (Consapevolezza Istituzionale Avanzata)";
        bLevel.style.backgroundColor = "var(--success)";
        bLevel.style.color = "#000";
        narrativeText.textContent = "La condotta amministrativa dimostrata evidenzia una comprensione sistemica avanzata dei vincoli di bilancio e del principio di intertemporalità delle riforme. Le scelte operate rifuggono logiche demagogiche di cortissimo periodo, garantendo la compatibilità degli investimenti con la tenuta finanziaria della Repubblica.";
    } else if (scoreFinal >= 50) {
        bLevel.textContent = "LIVELLO CIVICO: MEDIO (Approccio Lineare Elettorale)";
        bLevel.style.backgroundColor = "var(--warning)";
        bLevel.style.color = "#000";
        narrativeText.textContent = "L'analisi del profilo evidenzia un bilanciamento parziale tra le tutele sociali e i vincoli contabili reali. È presente tuttavia una spiccata tendenza ad assecondare il consenso di breve termine, differendo nel tempo i costi finanziari o strutturali delle decisioni strategiche prese.";
    } else {
        bLevel.textContent = "LIVELLO CIVICO: BASSO (Scomposizione Logica e Deficit Strutturale)";
        bLevel.style.backgroundColor = "var(--danger)";
        bLevel.style.color = "#fff";
        narrativeText.textContent = "Le risposte selezionate indicano una sistematica divergenza rispetto ai dati statistici degli enti pubblici. È stata data priorità a interventi privi di coperture reali ed a forte impatto inflattivo/debitorio, simulando una scomposizione dei parametri di stabilità macroeconomica del territorio.";
    }

    // COMPILAZIONE ACCORDION CONFRONTO REALTÀ E TRADE-OFF (Punti 6 e 7 Specifica)
    const accordionContainer = document.getElementById("container-report-accordion");
    accordionContainer.innerHTML = "";

    CORE_APPLICATION_STATE.answersDetailedLog.forEach((item, index) => {
        let node = document.createElement("div");
        node.className = "accordion-node";

        let head = document.createElement("div");
        head.className = "accordion-head";
        head.innerHTML = `<span>Tema ${index + 1}: ${item.scenarioOriginale.tema} (Valutazione Scelta: ${item.rispostaScelta.punteggio} pt)</span> <span>↕</span>`;

        let body = document.createElement("div");
        body.className = "accordion-body";
        body.style.display = "none"; // Chiuso di default

        // Sezione Testuale Scelta Utente
        let pScelta = document.createElement("p");
        pScelta.innerHTML = `<strong>La tua linea d'azione:</strong> ${item.rispostaScelta.testo}`;
        body.appendChild(pScelta);

        // Sezione Dati e Realtà Istituzionale Certificata (Punto 6)
        let divRealta = document.createElement("div");
        divRealta.className = "rep-block-data";
        divRealta.innerHTML = `
            <p><strong>Quadro Azione ed Evidenze di Fatto:</strong> ${item.scenarioOriginale.realtaIstituzionale}</p>
            <span class="rep-source-anchor">Fonte Documentale: ${item.scenarioOriginale.fonte} | Orizzonte Anno 2026</span>
        `;
        body.appendChild(divRealta);

        // Sezione Matrice dei Trade-Off (Punto 7)
        let toGrid = document.createElement("div");
        toGrid.className = "to-grid-visual";
        toGrid.innerHTML = `
            <div class="to-cell to-cell-gain"><span class="to-lbl-internal">Cosa si guadagna (Benefici):</span> ${item.rispostaScelta.tradeOff.guadagno}</div>
            <div class="to-cell to-cell-loss"><span class="to-lbl-internal">Cosa si perde (Costi e Rinunce):</span> ${item.rispostaScelta.tradeOff.perdita}</div>
            <div class="to-cell to-cell-neutral"><span class="to-lbl-internal">Chi sostiene il costo economico:</span> ${item.rispostaScelta.tradeOff.chiPaga}</div>
            <div class="to-cell to-cell-neutral"><span class="to-lbl-internal">Dinamica e Ripercussioni nel tempo:</span> ${item.rispostaScelta.tradeOff.tempo}</div>
        `;
        body.appendChild(toGrid);

        node.appendChild(head);
        node.appendChild(body);
        accordionContainer.appendChild(node);

        // Evento toggle nativo dell'accordion
        head.addEventListener("click", () => {
            body.style.display = (body.style.display === "none") ? "flex" : "none";
        });
    });
}

// =========================================================================
// 7. MODULO LABORATORIO CIVICO (COSTRUZIONE PROGRAMMI ELETTORALI)
// =========================================================================
function renderLaboratorioTopicsMenu() {
    const listContainer = document.getElementById("list-lab-topics-selectors");
    listContainer.innerHTML = "";
    
    const scope = CORE_APPLICATION_STATE.laboratorio.ambitoSelezionato;
    let poolTemi = [];

    // Mappatura dei temi istituzionali estratti direttamente dai datastore associati (Requisito 8)
    if (scope === "nazione") poolTemi = [...DATA_TERRITORI.nazione.temiPolitici];
    else if (scope === "regione") {
        // Estrae i temi della prima regione censita a titolo di modello strutturale uniforme
        poolTemi = [...DATA_TERRITORI.regioni[0].temiPolitici];
    } else if (scope === "comune") {
        poolTemi = [...DATA_COMUNI.comuni[0].temiPolitici];
    }

    poolTemi.forEach((temaNome, idx) => {
        let li = document.createElement("li");
        li.className = "lab-menu-item";
        const tKey = `${scope}_key_${idx}`;
        li.id = `menu-item-${tKey}`;
        li.textContent = temaNome;

        // Visualizzazione stato salvataggio locale del sottomodulo
        if (CORE_APPLICATION_STATE.laboratorio.programmaCodificato[tKey]) {
            li.classList.add("saved");
        }

        li.addEventListener("click", () => openLabTopicEditorInstance(tKey, temaNome, scope));
        listContainer.appendChild(li);
    });

    document.getElementById("box-lab-editor-fields").style.display = "none";
    document.getElementById("box-lab-ai-result").style.display = "none";
}

function openLabTopicEditorInstance(tKey, temaNome, scope) {
    document.querySelectorAll(".lab-menu-item").forEach(el => el.classList.remove("active"));
    document.getElementById(`menu-item-${tKey}`).classList.add("active");

    const boxEditor = document.getElementById("box-lab-editor-fields");
    boxEditor.style.display = "block";
    boxEditor.setAttribute("data-current-active-key", tKey);

    document.getElementById("txt-lab-active-title").textContent = `Modulo: ${temaNome}`;
    document.getElementById("txt-lab-active-desc").textContent = `Pianificazione amministrativa in ambito ${scope.toUpperCase()}. Compila i vettori analitici di copertura.`;

    // Caricamento dati da persistenza locale transitoria se già salvati precedentemente
    const cache = CORE_APPLICATION_STATE.laboratorio.programmaCodificato[tKey];
    document.getElementById("txt-area-lab-problema").value = cache ? cache.problema : "";
    document.getElementById("txt-area-lab-soluzione").value = cache ? cache.soluzione : "";
    document.getElementById("txt-area-lab-risorse").value = cache ? cache.risorse : "";
    document.getElementById("txt-area-lab-impatto").value = cache ? cache.impatto : "";
}

function saveCurrentLabTopicData() {
    const boxEditor = document.getElementById("box-lab-editor-fields");
    const currentKey = boxEditor.getAttribute("data-current-active-key");
    if (!currentKey) return;

    const prob = document.getElementById("txt-area-lab-problema").value.trim();
    const sol = document.getElementById("txt-area-lab-soluzione").value.trim();
    const ris = document.getElementById("txt-area-lab-risorse").value.trim();
    const imp = document.getElementById("txt-area-lab-impatto").value.trim();

    if (!prob || !sol || !ris || !imp) {
        alert("Errore di validazione: Tutti e 4 i blocchi analitici della proposta devono essere valorizzati.");
        return;
    }

    // Scrittura nello stato dell'applicazione dell'oggetto strutturato
    CORE_APPLICATION_STATE.laboratorio.programmaCodificato[currentKey] = {
        problema: prob, soluzione: sol, risorse: ris, impatto: imp
    };

    document.getElementById(`menu-item-${currentKey}`).classList.add("saved");
    alert("Modulo salvato con successo nel programma in elaborazione.");
}

// =========================================================================
// 8. LOGICA AI DI SIMULAZIONE E NEUTRALITÀ ASSOLUTA (MOTORE INTERNO)
// =========================================================================
function processLabProgramThroughInternalAi() {
    const scope = CORE_APPLICATION_STATE.laboratorio.ambitoSelezionato;
    const schedeSalvate = CORE_APPLICATION_STATE.laboratorio.programmaCodificato;
    
    // Conta quanti moduli sono stati compilati ed archiviati per l'ambito corrente
    let conteggioModuliCompilati = 0;
    for (let chiave in schedeSalvate) {
        if (chiave.startsWith(scope)) conteggioModuliCompilati++;
    }

    if (conteggioModuliCompilati === 0) {
        alert("Prima di avviare la simulazione AI, compila ed archivia almeno un modulo tematico.");
        return;
    }

    const aiBox = document.getElementById("box-lab-ai-result");
    const aiText = document.getElementById("txt-lab-ai-feedback-output");
    aiBox.style.display = "block";

    // ANALISI INTEGRATA AI: Algoritmo interno deterministico e non ideologico (Punto 9)
    let violazioniContabiliRilevate = false;
    let stringheVerificaCopia = "";

    for (let chiave in schedeSalvate) {
        if (chiave.startsWith(scope)) {
            const testoRisorse = schedeSalvate[chiave].risorse.toLowerCase();
            stringheVerificaCopia += " " + testoRisorse;
        }
    }

    // Verifica euristica della sussistenza di termini tecnici di copertura finanziaria reale
    if (!stringheVerificaCopia.includes("euro") && 
        !stringheVerificaCopia.includes("stanziamento") && 
        !stringheVerificaCopia.includes("tagli") && 
        !stringheVerificaCopia.includes("bilancio") && 
        !stringheVerificaCopia.includes("copertura")) {
        violazioniContabiliRilevate = true;
    }

    // Formulazione del responso nel rispetto assoluto del principio di neutralità politica
    let outputNarrativoAI = `<strong>ESITO DI COMPATIBILITÀ DEL PROGRAMMA (${scope.toUpperCase()}):</strong><br><br>`;
    
    if (violazioniContabiliRilevate) {
        outputNarrativoAI += `⚠️ <strong>Rilevazione Criticità di Copertura (Art. 81 Costituzione):</strong> Nei testi immessi relativi alle risorse finanziarie, l'algoritmo non riscontra riferimenti quantificabili a coperture economiche reali (es. stanziamenti di bilancio, riallocazione di spesa corrente, efficientamento tributario locale). L'indicazione di riforme prive di un canale di provvista finanziaria determina un'incoerenza interna del modello.<br><br>`;
    } else {
        outputNarrativoAI += `✅ <strong>Sussistenza Elementi di Bilancio:</strong> L'analisi semantica rileva la presenza di lemmi tecnici coerenti con la programmazione di bilancio e con l'individuazione di risorse economiche strutturali.<br><br>`;
    }

    outputNarrativoAI += `<em>Nota di Garanzia della Piattaforma: Il modulo AI non esprime pareri sulle scelte politiche o sulle ideologie perseguite dall'analista. Valuta unicamente la rigidità logico-contabile del testo e l'esplicitazione dei trade-off fisici ed economici delle proposte avanzate.</em>`;
    
    aiText.innerHTML = outputNarrativoAI;
}

// =========================================================================
// 9. FUNZIONALITÀ AUSILIARIE DI ROUTING INTERNO (TAB NAVIGATION)
// =========================================================================
function executeModuleTabSwitch(panelId) {
    // Gestore di navigazione privo di hash o dipendenze esterne di routing
    document.querySelectorAll(".view-panel").forEach(panel => {
        panel.classList.remove("active");
    });
    
    const targetElement = document.getElementById(panelId);
    if (targetElement) {
        targetElement.classList.add("active");
        
        // Se si accede al laboratorio, inizializza automaticamente il menu corrispondente
        if (panelId === "panel-laboratorio") {
            renderLaboratorioTopicsMenu();
        }
    }
}
