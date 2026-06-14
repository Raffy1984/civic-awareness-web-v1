// Recupero asincrono di tutti i 7.896 comuni italiani tramite API Open Data ufficiale
export async function caricaTuttiIComuni() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/matteocontrini/comuni-italiani/master/comuni.json');
        if (!response.ok) throw new Error("Errore di rete durante il recupero dei comuni.");
        const comuni = await response.json();
        return comuni.map(c => ({
            nome: c.nome,
            regione: c.regione,
            provincia: c.provincia.nome,
            sigla: c.provincia.sigla
        }));
    } catch (error) {
        console.warn("⚠️ Server Open Data non raggiungibile. Caricamento database locale di emergenza...");
        return [
            { nome: "Roma", regione: "Lazio", provincia: "Roma", sigla: "RM" },
            { nome: "Milano", regione: "Lombardia", provincia: "Milano", sigla: "MI" },
            { nome: "Napoli", regione: "Campania", provincia: "Napoli", sigla: "NA" },
            { nome: "Torino", regione: "Piemonte", provincia: "Torino", sigla: "TO" },
            { nome: "Palermo", regione: "Sicilia", provincia: "Palermo", sigla: "PA" },
            { nome: "Bari", regione: "Puglia", provincia: "Bari", sigla: "BA" },
            { nome: "Bologna", regione: "Emilia-Romagna", provincia: "Bologna", sigla: "BO" },
            { nome: "Firenze", regione: "Toscana", provincia: "Firenze", sigla: "FI" }
        ];
    }
}

// SEZIONE 1: Database Domande per l'Abilitazione Civica al Voto
export function ottieniQuizAbilitazione(livello, entita) {
    const database = {
        comunali: [
            {
                domanda: `Il Comune di ${entita} deve approvare il Documento Unico di Programmazione (DUP). Quale organo detiene la competenza esclusiva per la sua approvazione definitiva?`,
                opzioni: [
                    "Il Consiglio Comunale, in quanto organo di indirizzo e controllo politico-amministrativo.",
                    "La Giunta Comunale, su proposta esclusiva dell'Assessore al Bilancio.",
                    "Il Sindaco, mediante decreto sindacale d'urgenza indifferibile.",
                    "Il Collegio dei Revisori dei Conti del Comune."
                ],
                risposta: 0,
                spiegazione: "Il DUP costituisce il presupposto necessario di tutti gli altri documenti di programmazione. Essendo un atto di indirizzo strategico, la competenza esclusiva della sua approvazione formale spetta al Consiglio Comunale."
            },
            {
                domanda: `In caso di gravi e persistenti violazioni di legge da parte degli organi del Comune di ${entita}, chi può decretare lo scioglimento del Consiglio Comunale?`,
                opzioni: [
                    "Il Presidente della Repubblica, su proposta del Ministro dell'Interno.",
                    "Il Presidente della Giunta Regionale della regione di appartenenza.",
                    "Il Prefetto della provincia, con atto autonomo e definitivo.",
                    "La Corte Costituzionale previa consultazione della cittadinanza."
                ],
                risposta: 0,
                spiegazione: "Lo scioglimento del Consiglio Comunale è disposto con decreto del Presidente della Repubblica, su proposta del Ministro dell'Interno, ai sensi dell'art. 141 del TUEL (D.Lgs. 267/2000)."
            }
        ],
        regionali: [
            {
                domanda: `La Regione ${entita} intende legiferare in materia di tutela della salute. Qual è il limite costituzionale di questa potestà legislativa?`,
                opzioni: [
                    "La Regione ha potestà concorrente: definisce l'organizzazione, ma deve rispettare i principi fondamentali stabiliti dalle leggi dello Stato.",
                    "La Regione ha potestà esclusiva e può ignorare le normative nazionali sul finanziamento sanitario.",
                    "La Regione non ha alcun potere legislativo in sanità, potendo emanare solo regolamenti attuativi.",
                    "La Regione deve attendere l'approvazione preventiva del bilancio da parte della Corte dei Conti dello Stato."
                ],
                risposta: 0,
                spiegazione: "L'articolo 117 della Costituzione inserisce la tutela della salute tra le materie di potestà legislativa concorrente, in cui lo Stato fissa i principi fondamentali (es. i LEA) e le Regioni la normativa di dettaglio."
            }
        ],
        nazionali: [
            {
                domanda: "In base all'ordinamento costituzionale italiano, in quale caso specifico il Governo può adottare provvedimenti provvisori con forza di legge (Decreti-Legge)?",
                opzioni: [
                    "Solo in casi straordinari di necessità e d'urgenza, sotto la sua responsabilità.",
                    "Ogni qualvolta le Camere siano temporaneamente in ferie o sciolte.",
                    "Su richiesta esplicita della maggioranza assoluta dei Presidenti di Regione.",
                    "Quando è necessario accelerare l'approvazione del Bilancio dello Stato."
                ],
                risposta: 0,
                spiegazione: "Ai sensi dell'art. 77 della Costituzione, il Governo può adottare decreti-legge solo in casi straordinari di necessità e urgenza. Devono essere presentati il giorno stesso alle Camere per la conversione, che deve avvenire entro 60 giorni, pena la perdita di efficacia sin dall'inizio."
            }
        ]
    };
    return database[livello] || database.nazionali;
}

// SEZIONE 2: Simulazione Politica Avanzata (Scenari Complessi, Problemi e Scelte di Governance)
export function ottieniScenariPolitici(livello, entita) {
    const scenari = {
        comunali: [
            {
                id: "com_1",
                titolo: "Crisi della Gestione Rifiuti e Transizione Ecologica",
                problema: `Il Comune di ${entita} registra un calo drastico nella percentuale di raccolta differenziata. Le discariche saturate e le proteste dei cittadini richiedono un intervento immediato sul piano industriale e tariffario.`,
                opzioni: [
                    {
                        testo: "Implementare la tariffazione puntuale (TARIP) basata sul principio 'chi inquina paga', digitalizzando i cassonetti e internalizzando il servizio tramite municipalizzata in house.",
                        impatto: "Sostenibilità ambientale elevata, investimenti tecnologici iniziali gravosi sul bilancio comunale, forte controllo pubblico.",
                        orientamento: "Ecologista / Pubblicista"
                    },
                    {
                        testo: "Esternalizzare il ciclo dei rifiuti tramite gara d'appalto internazionale a un grande gruppo privato operante nel settore delle multiutility, puntando sulla massima efficienza dei costi di scala.",
                        impatto: "Riduzione immediata della spesa corrente, rischio di perdita di controllo sul territorio e potenziale aumento delle tariffe per i cittadini a lungo termine.",
                        orientamento: "Liberale / Manageriale"
                    },
                    {
                        testo: "Mantenere il sistema attuale ma incrementare massicciamente le sanzioni amministrative, installando fototrappole e impiegando ispettori ambientali h24 per colpire i conferimenti illeciti.",
                        impatto: "Aumento delle entrate da sanzioni nel breve termine, nessun cambiamento strutturale sul ciclo dei rifiuti, focus sulla sicurezza urbana.",
                        orientamento: "Legalitario / Conservatore"
                    }
                ]
            }
        ],
        regionali: [
            {
                id: "reg_1",
                titolo: "Riforma dei Criteri di Finanziamento delle Strutture Sanitarie",
                problema: `Nel territorio della Regione ${entita}, le liste d'attesa per esami diagnostici critici hanno superato i 12 mesi di attesa media, spingendo la popolazione verso la mobilità passiva extra-regionale.`,
                opzioni: [
                    {
                        testo: "Riallocare i fondi regionali bloccando i tetti di spesa per il privato accreditato e investire tutto sul personale pubblico, estendendo l'orario di utilizzo dei macchinari ospedalieri (RM/TC) anche nelle ore notturne.",
                        impatto: "Rafforzamento della sanità pubblica universale, opposizione da parte dei sindacati medici per i turni gravosi, tempi di implementazione medi.",
                        orientamento: "Sociale / Centralità Pubblica"
                    },
                    {
                        testo: "Istituire un sistema di 'Voucher Salute' regionali spendibili liberamente dai cittadini sia nelle strutture pubbliche che nelle cliniche private convenzionate, liberalizzando l'offerta.",
                        impatto: "Abbattimento immediato delle liste d'attesa, potenziale svuotamento di risorse finanziarie e professionali dagli ospedali pubblici a favore dei colossi privati.",
                        orientamento: "Sussidiario / Mercato Aperto"
                    }
                ]
            }
        ],
        nazionali: [
            {
                id: "naz_1",
                titolo: "Pianificazione Energetica Nazionale e Autonomia Strategica",
                problema: "L'Italia deve rispettare i vincoli internazionali di decarbonizzazione garantendo al contempo prezzi competitivi alle industrie manifatturiere per scongiurare la delocalizzazione.",
                opzioni: [
                    {
                        testo: "Semplificare radicalmente le procedure autorizzative eliminando il veto delle soprintendenze paesaggistiche per i grandi impianti eolici off-shore e fotovoltaici a terra, finanziando comunità energetiche diffuse.",
                        impatto: "Rapida transizione verde, tensioni politiche con gli enti locali per l'impatto visivo e l'uso del suolo agricolo.",
                        orientamento: "Transizione Verde Radicale"
                    },
                    {
                        testo: "Promuovere un quadro normativo stabile per il reinserimento del nucleare pulito di ultima generazione (Small Modular Reactors) nel mix energetico nazionale tramite partenariati pubblico-privati.",
                        impatto: "Stabilità della produzione elettrica di base (baseload), tempi di realizzazione di lungo periodo (oltre i 10 anni), elevati costi strutturali e dibattito sul deposito delle scorie.",
                        orientamento: "Sviluppista / Tecnologico"
                    }
                ]
            }
        ]
    };
    return scenari[livello] || scenari.nazionali;
}
