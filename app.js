// 1. DATABASE ESPANSO DELLE DOMANDE (Percezione vs Realtà)
const databaseDomande = [
    {
        id: "bil1",
        sezione: "Bilancio e Finanze",
        testo: "Qual è la principale voce di spesa corrente nel bilancio del tuo Comune?",
        opzioni: [
            { testo: "Personale e macchina amministrativa", corretta: true, feedback: "Esatto. Spesso oltre il 35% delle risorse correnti va nella gestione interna del personale.", impatto: "Ottimizzazione della macchina comunale, digitalizzazione dei processi amministrativi e riduzione dei tempi di attesa per i cittadini." },
            { testo: "Manutenzione di strade e verde pubblico", corretta: false, feedback: "Falso. Questa è spesa in conto capitale o, purtroppo, spesso sotto-finanziata.", impatto: "Piano straordinario di manutenzione stradale con reperimento di fondi extra-bilancio e monitoraggio costante dell'asfalto." },
            { testo: "Servizi culturali e turismo", corretta: false, feedback: "Magari! Nei piccoli comuni spesso non supera il 2-3% del bilancio totale.", impatto: "Rilancio dell'attrattività culturale tramite reti di partenariato pubblico-privato e sponsorizzazioni." }
        ]
    },
    {
        id: "bil2",
        sezione: "Bilancio e Finanze",
        testo: "A quanto ammonta mediamente l'indebitamento pro-capite nei piccoli comuni italiani?",
        opzioni: [
            { testo: "Circa 300-500€ per cittadino", corretta: true, feedback: "Corretto. È una media nazionale che condiziona pesantemente la capacità di fare nuovi investimenti.", impatto: "Piano pluriennale di rientro del debito e rinegoziazione dei mutui storici con Cassa Depositi e Prestiti." },
            { testo: "Quasi zero, sono tutti virtuosi", corretta: false, feedback: "Inesatto. Quasi tutti i comuni hanno mutui accesi per vecchie opere pubbliche da pagare.", impatto: "Istituzione di un audit straordinario dei debiti per bloccare gli sprechi occulti." }
        ]
    },
    {
        id: "terr1",
        sezione: "Territorio e Ambiente",
        testo: "Quale percentuale di piccoli comuni italiani ha aree classificate a rischio idrogeologico medio-alto?",
        opzioni: [
            { testo: "Oltre il 70% (con picchi del 90% in zone collinari)", corretta: true, feedback: "Purtroppo è vero. Il dissesto è la vera emergenza silenziosa del territorio italiano.", impatto: "Istituzione del 'Fascicolo Digitale del Territorio' e monitoraggio predittivo tramite droni per la prevenzione di frane e smottamenti nelle frazioni." },
            { testo: "Meno del 15%", corretta: false, feedback: "Dato troppo ottimista. I report ISPRA evidenziano una fragilità nazionale estrema.", impatto: "Interventi di somma urgenza solo ad emergenza conclamata, massimizzando l'efficienza della Protezione Civile locale." }
        ]
    },
    {
        id: "terr2",
        sezione: "Territorio e Ambiente",
        testo: "Cosa prevede l'obiettivo europeo 'Consumo di Suolo Zero' entro il 2050?",
        opzioni: [
            { testo: "Bloccare l'espansione su aree agricole e rigenerare l'esistente", corretta: true, feedback: "Esatto! Recuperare l'abbandonato prima di colare nuovo cemento.", impatto: "Stop a nuovi piani di lottizzazione su aree verdi e introduzione di sgravi IMU per chi ristruttura gli immobili sfitti del centro storico." },
            { testo: "Vietare qualsiasi tipo di ristrutturazione o lavoro edile", corretta: false, feedback: "Sbagliato, l'efficientamento e il recupero dell'esistente sono incentivati.", impatto: "Semplificazione burocratica radicale per i bonus edilizi gestiti dall'ufficio tecnico comunale." }
        ]
    },
    {
        id: "serv1",
        sezione: "Servizi Pubblici",
        testo: "Qual è la percentuale media di acqua potabile che va persa nelle reti idriche comunali?",
        opzioni: [
            { testo: "Si perde circa il 42% dell'acqua immessa", corretta: true, feedback: "Dato reale ISTAT. Quasi metà dell'acqua potabile si disperde nel terreno prima di arrivare ai rubinetti.", impatto: "Digitalizzazione della rete idrica comunale con sensori acustici di perdita e sostituzione delle tubature ammalorate tramite fondi regionali." },
            { testo: "Meno del 5%, le reti sono moderne", corretta: false, feedback: "Falso. Le infrastrutture idriche italiane sono storicamente obsolete.", impatto: "Campagne di sensibilizzazione nelle scuole sul risparmio idrico domestico, in attesa di riforme strutturali." }
        ]
    },
    {
        id: "pnrr1",
        sezione: "Fondi e PNRR",
        testo: "Qual è il collo di bottiglia principale per un piccolo Comune che si aggiudica un bando PNRR?",
        opzioni: [
            { testo: "La carenza di personale tecnico interno per gestire appalti e rendicontazioni", corretta: true, feedback: "Centro. La mancanza di ingegneri, architetti e segretari comunali blocca i progetti.", impatto: "Costituzione di una 'Task Force Tecnico-Amministrativa' in convenzione con i Comuni limitrofi per condividere le competenze professionali." },
            { testo: "La mancanza di interesse da parte delle ditte locali", corretta: false, feedback: "Sbagliato. Le ditte partecipano, ma mancano i bandi pubblicati in tempo.", impatto: "Esternalizzazione totale della progettazione esecutiva a studi professionali esterni per accelerare le tempistiche." }
        ]
    },
    {
        id: "soc1",
        sezione: "Sociale e Demografia",
        testo: "Qual è l'indice di vecchiaia attuale nei piccoli comuni (rapporto anziani/giovani)?",
        opzioni: [
            { testo: "Ci sono oltre 200 anziani ogni 100 giovani sotto i 14 anni", corretta: true, feedback: "Dato reale. Lo spopolamento e l'invecchiamento sono le minacce principali per la sopravvivenza dei servizi.", impatto: "Potenziamento del 'Welfare di Prossimità' con telemedicina di base e servizi di trasporto sociale per gli anziani residenti nelle frazioni isolate." },
            { testo: "Il rapporto è quasi in perfetto equilibrio (100 a 100)", corretta: false, feedback: "Inesatto. Questo scenario demografico manca in Italia da più di trent'anni.", impatto: "Erogazione di bonus 'una tantum' per i nuovi nati residenti, per incentivare la natalità nel breve termine." }
        ]
    }
];

// 2. STATO DELL'APPLICAZIONE
let indiceDomandaCorrente = 0;
let punteggioCorretto = 0;
let nomeCandidato = "";
// Oggetto che conterrà le proposte programmatiche scelte dall'utente per ogni sezione
let programmaElettoraleUtente = [];

// 3. LOGICA DI GIOCO
function iniziaSimulazione() {
    const inputNome = document.getElementById("nome-candidato").value.trim();
    nomeCandidato = inputNome !== "" ? inputNome : "Candidato Anonimo";

    // Cambiamento schermata
    document.getElementById("config-iniziale").classList.add("hidden");
    document.getElementById("area-quiz").classList.remove("hidden");

    // Reset variabili
    indiceDomandaCorrente = 0;
    punteggioCorretto = 0;
    programmaElettoraleUtente = [];

    mostraDomanda();
}

function mostraDomanda() {
    // Nascondi il feedback della domanda precedente
    document.getElementById("feedback-risposta").classList.add("hidden");

    const domanda = databaseDomande[indiceDomandaCorrente];

    // Aggiorna Avanzamento e Scrittura Intestazioni
    document.getElementById("badge-sezione").innerText = `Sezione: ${domanda.sezione}`;
    const percentualeAvanzamento = ((indiceDomandaCorrente) / databaseDomande.length) * 100;
    document.getElementById("barra-avanzamento").style.width = `${percentualeAvanzamento}%`;

    // Testo Domanda
    document.getElementById("testo-domanda").innerText = `${indiceDomandaCorrente + 1}. ${domanda.testo}`;

    // Generazione Bottoni Risposta
    const containerOpzioni = document.getElementById("opzioni-risposta");
    containerOpzioni.innerHTML = ""; // Svuota

    domanda.opzioni.forEach((opzione, index) => {
        const bottone = document.createElement("button");
        bottone.className = "btn-opzione";
        bottone.innerText = opzione.testo;
        // Passiamo i dati della scelta alla funzione di verifica
        bottone.onclick = () => verificaRisposta(index, bottone);
        containerOpzioni.appendChild(bottone);
    });
}

function verificaRisposta(indexScelto, bottoneSelezionato) {
    const domanda = databaseDomande[indiceDomandaCorrente];
    const opzioneScelta = ...domanda.opzioni[indexScelto];
    const bottoni = document.querySelectorAll(".btn-opzione");

    // Disabilita tutti i bottoni per evitare doppi click
    bottoni.forEach(btn => btn.disabled = true);

    // Salva l'impatto politico nel programma dell'utente (Laboratorio)
    programmaElettoraleUtente.push({
        sezione: domanda.sezione,
        politica: opzioneScelta.impatto
    });

    // Controllo correttezza logica/amministrativa
    if (opzioneScelta.corretta) {
        punteggioCorretto++;
        bottoneSelezionato.classList.add("correct");
    } else {
        bottoneSelezionato.classList.add("wrong");
        // Evidenzia comunque quella corretta per scopi didattici
        bottoni.forEach((btn, idx) => {
            if (domanda.opzioni[idx].corretta) {
                btn.classList.add("correct");
            }
        });
    }

    // Mostra il feedback box con la spiegazione dei dati reali
    document.getElementById("testo-feedback").innerText = opzioneScelta.feedback;
    document.getElementById("feedback-risposta").classList.remove("hidden");
}

function prossimaDomanda() {
    indiceDomandaCorrente++;

    if (indiceDomandaCorrente < databaseDomande.length) {
        mostraDomanda();
    } else {
        mostraProgrammaFinale();
    }
}

// 4. GENERATORE DEL PROGRAMMA ELETTORALE REALE (IL LABORATORIO)
function mostraProgrammaFinale() {
    document.getElementById("area-quiz").classList.add("hidden");
    const areaRisultato = document.getElementById("area-resultado"); // Fallback se id differisce
    const areaRisultatoReale = document.getElementById("area-risultato");
    
    const percentualeIdoneita = Math.round((punteggioCorretto / databaseDomande.length) * 100);

    // Costruzione dinamica del documento programmatico
    let htmlProgramma = `
        <div class="programma-documento">
            <div class="programma-header">
                <span class="badge-documento">DOCUMENTO UFFICIALE</span>
                <h2>Linee Guida del Programma di Mandato</h2>
                <p class="sottotitolo">Candidato Sindaco: <strong>${nomeCandidato}</strong></p>
                <div class="punteggio-box">
                    <strong>Idoneità Amministrativa Conseguita: ${percentualeIdoneita}%</strong>
                    <p>Hai risposto correttamente a ${punteggioCorretto} quesiti normativi e finanziari su ${databaseDomande.length}.</p>
                </div>
            </div>
            
            <div class="programma-corpo">
                <p class="intro-programma">Sulla base delle risposte e delle analisi strategiche effettuate durante la simulazione, si delineano i seguenti punti programmatici prioritari per l'amministrazione del territorio:</p>
                
                <ol class="lista-punti-programma">
    `;

    // Ciclo all'interno delle scelte fatte nel laboratorio per popolare il testo del manifesto
    programmaElettoraleUtente.forEach((item, index) => {
        htmlProgramma += `
            <li>
                <strong>Punto ${index + 1} - ${item.sezione}:</strong> 
                <span class="testo-politica">${item.politica}</span>
            </li>
        `;
    });

    htmlProgramma += `
                </ol>
            </div>

            <div class="programma-footer">
                <p class="nota-virale">Pensi che i candidati reali del tuo comune saprebbero fare di meglio? Sfida i tuoi concittadini o condividi il tuo programma sui canali social.</p>
                <div class="Azioni-Riquadro">
                    <button class="btn-azione stampa" onclick="window.print()">Stampa / Salva in PDF</button>
                    <button class="btn-azione condividi" onclick="condividiRisultato(${percentualeIdoneita})">Condividi Sfida</button>
                </div>
            </div>
        </div>
    `;

    areaRisultatoReale.innerHTML = htmlProgramma;
    areaRisultatoReale.classList.remove("hidden");
}

function condividiRisultato(percentuale) {
    alert(`Copiato negli appunti: "Ho ottenuto il ${percentuale}% di Idoneità Civica simulando la carica di Sindaco! Sfida il mio programma elettorale!"`);
}
