// Recupero di tutti i 7.900+ comuni italiani tramite API Open Data
export async function caricaTuttiIComuni() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/matteocontrini/comuni-italiani/master/comuni.json');
        if (!response.ok) throw new Error("Errore nel caricamento del server");
        const comuni = await response.json();
        return comuni.map(c => ({
            nome: c.nome,
            regione: c.regione,
            provincia: c.provincia.nome,
            sigla: c.provincia.sigla
        }));
    } catch (error) {
        console.error("Uso del database di emergenza locale:", error);
        return [
            { nome: "Roma", regione: "Lazio", provincia: "Roma", sigla: "RM" },
            { nome: "Milano", regione: "Lombardia", provincia: "Milano", sigla: "MI" },
            { nome: "Napoli", regione: "Campania", provincia: "Napoli", sigla: "NA" },
            { nome: "Torino", regione: "Piemonte", provincia: "Torino", sigla: "TO" }
        ];
    }
}

// SEZIONE 1: Quiz per l'Abilitazione al Voto (Generati dinamicamente per ogni livello)
export function ottieniQuizAbilitazione(livello, entita) {
    const database = {
        comunali: [
            {
                domanda: `Quale organo approva ufficialmente il Bilancio Comunale di ${entita}?`,
                opzioni: ["Il Consiglio Comunale", "La Giunta", "Il Sindaco", "Il Segretario Comunale"],
                risposta: 0,
                spiegazione: "Il Consiglio è l'organo di indirizzo e controllo, ed è l'unico che può approvare il bilancio."
            },
            {
                domanda: `A chi spettano le ordinanze d'urgenza per la sicurezza stradale o l'igiene pubblica a ${entita}?`,
                opzioni: ["Al Prefetto", "Al Sindaco come ufficiale di Governo", "Al Comandante dei Vigili", "Alla Regione"],
                risposta: 1,
                spiegazione: "Il Sindaco ha il potere di emettere ordinanze contingibili e urgenti per tutelare i cittadini."
            }
        ],
        regionali: [
            {
                domanda: `Qual è la principale voce di spesa nel bilancio della Regione ${entita}?`,
                opzioni: ["Trasporti", "Tutela della Salute e Sanità", "Turismo e Cultura", "Agricoltura"],
                risposta: 1,
                spiegazione: "La sanità pubblica assorbe mediamente oltre il 70-80% del bilancio di una Regione."
            }
        ],
        nazionali: [
            {
                domanda: "In Italia, come viene eletto il Presidente della Repubblica?",
                opzioni: ["Dal popolo a suffragio universale", "Dal Parlamento in seduta comune insieme ai delegati regionali", "Dal Presidente del Consiglio", "Dalla Corte Costituzionale"],
                risposta: 1,
                spiegazione: "L'art. 83 della Costituzione prevede l'elezione da parte del Parlamento unito ai delegati delle Regioni."
            }
        ]
    };
    return database[livello] || database.nazionali;
}

// SEZIONE 2: Problemi e Soluzioni per il Programma Elettorale (Candidato per un Giorno)
export function ottieniScenariPolitici(livello, entita) {
    const scenari = {
        comunali: [
            {
                problema: `A ${entita} i cittadini lamentano una gestione inefficiente dei rifiuti urbani e scarso verde pubblico.`,
                opzioni: [
                    { testo: "Introdurre la tariffazione puntuale (paghi quanto produci) e avviare patti di collaborazione per i parchi.", tipo: "Progressista/Ecologista" },
                    { testo: "Affidare totalmente il servizio a un colosso privato esterno e privatizzare la gestione dei parchi storici.", tipo: "Liberale/Manageriale" },
                    { testo: "Aumentare le sanzioni con fototrappole e videosorveglianza senza modificare il sistema di raccolta.", tipo: "Sicurezza/Conservatore" }
                ]
            }
        ],
        regionali: [
            {
                problema: `Nella Regione ${entita} le liste d'attesa negli ospedali pubblici sono troppo lunghe.`,
                opzioni: [
                    { testo: "Finanziare massicciamente le strutture pubbliche aumentando i turni diagnostici anche di notte.", tipo: "Pubblico/Sociale" },
                    { testo: "Convenzionare nuove cliniche private per smaltire i pazienti pagando con voucher regionali.", tipo: "Privato/Sussidiario" }
                ]
            }
        ],
        nazionali: [
            {
                problema: "L'Italia affronta una crisi energetica e deve raggiungere gli obiettivi di decarbonizzazione.",
                opzioni: [
                    { testo: "Sbloccare i vincoli burocratici per parchi eolici e solari diffusi sul territorio.", tipo: "Rinnovabili" },
                    { testo: "Investire nella ricerca e nella costruzione di centrali nucleari di nuova generazione.", tipo: "Tecnologico/Nucleare" }
                ]
            }
        ]
    };
    return scenari[livello] || scenari.nazionali;
}
