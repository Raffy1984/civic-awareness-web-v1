// Funzione per caricare TUTTI i comuni italiani da un'API pubblica open-data
export async function caricaTuttiIComuni() {
    try {
        // Utilizziamo un endpoint open-source affidabile per i comuni italiani
        const response = await fetch('https://raw.githubusercontent.com/matteocontrini/comuni-italiani/master/comuni.json');
        if (!response.isOk && response.status !== 200) {
            throw new Error("Impossibile scaricare l'elenco dei comuni.");
        }
        const comuni = await response.json();
        
        // Mappiamo i dati per averli pronti con Nome, Regione, Provincia
        return comuni.map(c => ({
            nome: c.nome,
            regione: c.regione,
            provincia: c.provincia.nome,
            sigla: c.provincia.sigla
        }));
    } catch (error) {
        console.error("Errore nel caricamento del database comuni:", error);
        // Fallback locale di emergenza se l'API è offline
        return [
            { nome: "Roma", regione: "Lazio", provincia: "Roma", sigla: "RM" },
            { nome: "Milano", regione: "Lombardia", provincia: "Milano", sigla: "MI" }
        ];
    }
}

// Generatore dinamico di quiz basato sul livello (Comune, Regione, Nazione)
export function generaQuiz(livello, entita) {
    // Database di modelli di domande che si adattano dinamicamente a QUALSIASI comune o regione
    const databaseDomande = {
        comunali: [
            {
                domanda: `Qual è l'organo principale che approva il bilancio del Comune di ${entita}?`,
                opzioni: ["Il Consiglio Comunale", "La Giunta", "Il Sindaco da solo", "Il Prefetto"],
                risposta: 0,
                spiegazione: "Il Consiglio Comunale rappresenta l'organo di indirizzo e controllo politico-amministrativo del Comune."
            },
            {
                domanda: `Chi nomina gli assessori che compongono la Giunta a ${entita}?`,
                opzioni: ["Il Consiglio", "Il Sindaco", "I Cittadini tramite voto", "La Regione"],
                risposta: 1,
                spiegazione: "Gli assessori sono nominati direttamente dal Sindaco, che può anche revocare le loro deleghe."
            }
        ],
        regionali: [
            {
                domanda: `Quale di queste materie è di competenza concorrente o esclusiva della Regione ${entita}?`,
                opzioni: ["Politica Estera", "Tutela della Salute e Sanità", "Forze Armate", "Moneta e Battere moneta"],
                risposta: 1,
                spiegazione: "La gestione e l'organizzazione del Servizio Sanitario è una delle principali competenze delle Regioni."
            }
        ],
        nazionali: [
            {
                domanda: "In Italia, da quanti membri è composto attualmente il Parlamento (Deputati + Senatori elettivi)?",
                opzioni: ["945", "630", "600", "500"],
                risposta: 2,
                spiegazione: "A seguito della riforma costituzionale, i deputati sono 400 e i senatori elettivi sono 200, per un totale di 600."
            }
        ]
    };

    return databaseDomande[livello] || databaseDomande.nazionali;
}
