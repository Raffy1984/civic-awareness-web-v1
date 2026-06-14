import { caricaTuttiIComuni, ottieniQuizAbilitazione, ottieniScenariPolitici } from './comuni.js';
import { SistemaCivico } from './territori.js';

const stato = new SistemaCivico();
let databaseComuni = [];

async function main() {
    const root = document.getElementById('app');
    root.innerHTML = `
        <div class="schermata-piena-caricamento">
            <div class="spinner"></div>
            <p>Inizializzazione dei moduli civici e importazione dei territori d'Italia...</p>
        </div>
    `;
    
    databaseComuni = await caricaTuttiIComuni();
    router();
}

function router() {
    switch (stato.schermataAttuale) {
        case "registrazione":
            mostraSchermataRegistrazione();
            break;
        case "hub":
            mostraHubPrincipale();
            break;
        case "abilitazione":
            mostraSessioneAbilitazione();
            break;
        case "candidato":
            mostraSessioneCandidato();
            break;
        case "riepilogo":
            mostraRiepilogoManifesto();
            break;
        default:
            mostraSchermataRegistrazione();
    }
}

function mostraSchermataRegistrazione() {
    const root = document.getElementById('app');
    root.innerHTML = `
        <div class="contenitore-centrato animazione-ingresso">
            <div class="pannello-vetro">
                <div class="badge-istituzionale">Repubblica Italiana • Piattaforma Civica</div>
                <h1 class="titolo-principale">Sistema Integrato di Cittadinanza Attiva</h1>
                <p class="sottotitolo">Accedi al percorso istituzionale: verifica le tue competenze d'aula per l'abilitazione civica o simula la gestione di governo nel tuo territorio.</p>
                
                <div class="gruppo-form">
                    <label class="etichetta">Identificativo Cittadino (Nome / Pseudonimo)</label>
                    <input type="text" id="reg-nome" class="controllo-input" placeholder="Inserisci il tuo nome...">
                </div>

                <div class="gruppo-form" style="position: relative;">
                    <label class="etichetta">Comune di Residenza Elettorale (Ricerca in tempo reale)</label>
                    <input type="text" id="reg-comune-input" class="controllo-input" placeholder="Inizia a digitare il nome del tuo comune...">
                    <div id="dropdown-comuni-risultati" class="ricerca-dropdown-lista"></div>
                </div>

                <button id="btn-registrazione-invia" class="pulsante-primario" disabled>Accedi alle Funzioni di Sistema</button>
            </div>
        </div>
    `;

    const inputComune = document.getElementById('reg-comune-input');
    const dropdown = document.getElementById('dropdown-comuni-risultati');
    const btnInvia = document.getElementById('btn-registrazione-invia');
    let comuneSelezionato = null;

    inputComune.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {
            dropdown.innerHTML = '';
            return;
        }

        const filtrati = databaseComuni.filter(c => c.nome.toLowerCase().startsWith(query)).slice(0, 5);
        
        if (filtrati.length === 0) {
            dropdown.innerHTML = `<div class="opzione-ricerca-vuota">Nessun comune trovato</div>`;
            return;
        }

        dropdown.innerHTML = filtrati.map(c => `
            <div class="opzione-ricerca" data-nome="${c.nome}" data-regione="${c.regione}">
                <span class="comune-nome">${c.nome}</span>
                <span class="comune-dettaglio">${c.sigla} • ${c.regione}</span>
            </div>
        `).join('');
    });

    dropdown.addEventListener('click', (e) => {
        const opzione = e.target.closest('.opzione-ricerca');
        if (!opzione) return;

        comuneSelezionato = {
            nome: opzione.dataset.nome,
            regione: opzione.dataset.regione
        };

        inputComune.value = `${comuneSelezionato.nome} (${comuneSelezionato.regione})`;
        dropdown.innerHTML = '';
        btnInvia.disabled = false;
    });

    btnInvia.addEventListener('click', () => {
        const nome = document.getElementById('reg-nome').value.trim() || "Cittadino Anonimo";
        stato.configuraUtente(nome, comuneSelezionato.nome, comuneSelezionato.regione);
        router();
    });
}

function mostraHubPrincipale() {
    const root = document.getElementById('app');
    root.innerHTML = `
        <div class="schermata-hub animazione-ingresso">
            <header class="barra-navigazione">
                <div class="utente-info">
                    <span class="avatar">🏛️</span>
                    <div>
                        <h3>${stato.utente.nome}</h3>
                        <p>${stato.utente.comune} (${stato.utente.regione})</p>
                    </div>
                </div>
                <div class="badge-stato-voto">
                    ${stato.isAbilitato ? '<span class="voto-attivo">● ABILITATO AL VOTO</span>' : '<span class="voto-disattivo">● CERTIFICAZIONE MANCANTE</span>'}
                </div>
            </header>

            <main class="griglia-hub-funzioni">
                <div class="scheda-funzione">
                    <div class="scheda-icona">📝</div>
                    <h2>Sezione 1: Abilitazione Civica</h2>
                    <p>Sottoponiti all'esame di idoneità. Un percorso di verifica strutturato su quesiti normativi di livello Comunale, Regionale e Nazionale per sbloccare i tuoi diritti politici all'interno della simulazione.</p>
                    <button id="hub-avvia-abilitazione" class="pulsante-scheda">${stato.tentatoEsame ? 'Ripeti l\'Esame' : 'Avvia Sessione d\'Esame'}</button>
                </div>

                <div class="scheda-funzione candidato-speciale">
                    <div class="scheda-icona">🎯</div>
                    <h2>Sezione 2: Candidato per un Giorno</h2>
                    <p>Prendi le redini del potere esecutivo. Esamina i problemi reali, strutturali e strategici di ${stato.utente.comune}, della Regione e dello Stato. Delibera soluzioni e genera il tuo manifesto politico di governo.</p>
                    <button id="hub-avvia-candidato" class="pulsante-scheda pulsante-viola">Avvia Cabinet di Governo</button>
                </div>
            </main>
        </div>
    `;

    document.getElementById('hub-avvia-abilitazione').addEventListener('click', () => {
        stato.resetProgressoSezione();
        stato.schermataAttuale = "abilitazione";
        stato.punteggioAbilitazione = 0;
        router();
    });

    document.getElementById('hub-avvia-candidato').addEventListener('click', () => {
        stato.resetProgressoSezione();
        stato.schermataAttuale = "candidato";
        stato.delibereProgramma = [];
        router();
    });
}

function mostraSessioneAbilitazione() {
    const root = document.getElementById('app');
    const entitaCorrente = stato.livelloCorrente === "comunali" ? stato.utente.comune : (stato.livelloCorrente === "regionali" ? stato.utente.regione : "Italia");
    const domande = ottieniQuizAbilitazione(stato.livelloCorrente, entitaCorrente);
    const domanda = domande[stato.indiceDomandaAbilitazione];

    root.innerHTML = `
        <div class="contenitore-centrato animazione-ingresso">
            <div class="pannello-vetro esame-scatola">
                <div class="esame-barra-progresso">
                    <span>Livello Istituzionale: <strong>${stato.livelloCorrente.toUpperCase()}</strong></span>
                    <span>Quesito ${stato.indiceDomandaAbilitazione + 1} di ${domande.length}</span>
                </div>
                
                <h2 class="esame-domanda-testo">${domanda.domanda}</h2>
                
                <div class="lista-opzioni-risposta">
                    ${domanda.opzioni.map((opc, idx) => `
                        <button class="opzione-risposta-pulsante" data-idx="${idx}">
                            <span class="opzione-lettera">${String.fromCharCode(65 + idx)}</span>
                            <span class="opzione-testo-interno">${opc}</span>
                        </button>
                    `).join('')}
                </div>

                <div id="esame-scatola-feedback" class="esame-feedback-box nascosto"></div>
            </div>
        </div>
    `;

    document.querySelectorAll('.opzione-risposta-pulsante').forEach(p => {
        p.addEventListener('click', (e) => {
            document.querySelectorAll('.opzione-risposta-pulsante').forEach(b => b.disabled = true);
            const targetBtn = e.target.closest('.opzione-risposta-pulsante');
            const idxScelto = parseInt(targetBtn.dataset.idx);
            const isCorretta = idxScelto === d.risposta;
            
            const d = domanda; // Alias per brevità interna
            stato.registraRispostaAbilitazione(idxScelto === d.risposta);

            const feedbackEl = document.getElementById('esame-scatola-feedback');
            feedbackEl.classList.remove('nascosto');
            
            if (idxScelto === d.risposta) {
                targetBtn.classList.add('risposta-esatta');
                feedbackEl.innerHTML = `<div class="esito-positivo"><h4>✓ Risoluzione Corretta</h4><p>${d.spiegazione}</p></div>`;
            } else {
                targetBtn.classList.add('risposta-errata');
                feedbackEl.innerHTML = `<div class="esito-negativo"><h4>✕ Errore di Interpretazione Normativa</h4><p>${d.spiegazione}</p></div>`;
            }

            feedbackEl.innerHTML += `<button id="esame-avanti-btn" class="pulsante-primario spazio-superiore">Procedi al Sequenziale</button>`;
            
            document.getElementById('esame-avanti-btn').addEventListener('click', () => {
                stato.indiceDomandaAbilitazione++;
                if (stato.indiceDomandaAbilitazione < domande.length) {
                    mostraSessioneAbilitazione();
                } else {
                    avanzaLivelloIstituzionaleAbilitazione();
                }
            });
        });
    });
}

function avanzaLivelloIstituzionaleAbilitazione() {
    if (stato.livelloCorrente === "comunali") {
        stato.livelloCorrente = "regionali";
        stato.indiceDomandaAbilitazione = 0;
        mostraSessioneAbilitazione();
    } else if (stato.livelloCorrente === "regionali") {
        stato.livelloCorrente = "nazionali";
        stato.indiceDomandaAbilitazione = 0;
        mostraSessioneAbilitazione();
    } else {
        stato.tentatoEsame = true;
        stato.isAbilitato = stato.punteggioAbilitazione >= 30; // Soglia minima di risposte esatte
        
        const root = document.getElementById('app');
        root.innerHTML = `
            <div class="contenitore-centrato animazione-ingresso">
                <div class="pannello-vetro text-center">
                    <h2>Verbalizzazione Sessione d'Esame</h2>
                    <div class="punteggio-display">${stato.punteggioAbilitazione} / 40</div>
                    <p class="spazio-v">${stato.isAbilitato ? '<strong>Esito Favorevole:</strong> Competenze idonee all\'esercizio del diritto di voto politico.' : '<strong>Esito Insufficiente:</strong> Richiesto ulteriore approfondimento delle materie costituzionali.'}</p>
                    <button id="esame-ritorno-hub" class="pulsante-primario">Rientra nell'Hub Centrale</button>
                </div>
            </div>
        `;
        document.getElementById('esame-ritorno-hub').addEventListener('click', () => {
            stato.schermataAttuale = "hub";
            router();
        });
    }
}

function mostraSessioneCandidato() {
    const root = document.getElementById('app');
    const entitaCorrente = stato.livelloCorrente === "comunali" ? stato.utente.comune : (stato.livelloCorrente === "regionali" ? stato.utente.regione : "Italia");
    const scenari = ottieniScenariPolitici(stato.livelloCorrente, entitaCorrente);
    const scenario = scenari[stato.indiceScenarioCandidato];

    root.innerHTML = `
        <div class="schermata-candidato animazione-ingresso">
            <div class="pannello-candidato-laterale">
                <div class="badge-livello-politico">${stato.livelloCorrente.toUpperCase()}</div>
                <h2>Cabinet Esecutivo di:</h2>
                <h1 class="entita-focus">${entitaCorrente}</h1>
                <p class="istruzioni-politiche">Analizza la scheda di crisi macro-territoriale inserita dall'ufficio di programmazione. Scegli la delibera strategica per definire la tua linea editoriale.</p>
            </div>
            
            <div class="area-decisionale-politica">
                <div class="scatola-problema-macro">
                    <span class="etichetta-allerta">⚠️ FOCUS CRITICITÀ STRUTTURALE</span>
                    <h2>${scenario.titolo}</h2>
                    <p>${scenario.problema}</p>
                </div>

                <h3>Seleziona la Delibera da inserire nel Programma di Governo:</h3>
                <div class="lista-opzioni-politiche">
                    ${scenario.opzioni.map((op, idx) => `
                        <div class="scheda-opzione-politica" data-idx="${idx}">
                            <div class="opzione-politica-testo">${op.testo}</div>
                            <div class="opzione-politica-impatto"><strong>Impatto Stimato:</strong> ${op.impatto}</div>
                            <div class="opzione-politica-linea">Orientamento: <span>${op.orientamento}</span></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    document.querySelectorAll('.scheda-opzione-politica').forEach(card => {
        card.addEventListener('click', (e) => {
            const targetCard = e.target.closest('.scheda-opzione-politica');
            const idx = parseInt(targetCard.dataset.idx);
            const opzioneScelta = scenario.opzioni[idx];

            stato.salvaDeliberaPolitica({
                livello: stato.livelloCorrente,
                territorio: entitaCorrente,
                problema: scenario.problema,
                titolo: scenario.titolo,
                scelta: opzioneScelta.testo,
                linea: opzioneScelta.orientamento
            });

            stato.indiceScenarioCandidato++;
            if (stato.indiceScenarioCandidato < scenari.length) {
                mostraSessioneCandidato();
            } else {
                avanzaLivelloCandidato();
            }
        });
    });
}

function avanzaLivelloCandidato() {
    if (stato.livelloCorrente === "comunali") {
        stato.livelloCorrente = "regionali";
        stato.indiceScenarioCandidato = 0;
        mostraSessioneCandidato();
    } else if (stato.livelloCorrente === "regionali") {
        stato.livelloCorrente = "nazionali";
        stato.indiceScenarioCandidato = 0;
        mostraSessioneCandidato();
    } else {
        stato.schermataAttuale = "riepilogo";
        router();
    }
}

function mostraRiepilogoManifesto() {
    const root = document.getElementById('app');
    root.innerHTML = `
        <div class="contenitore-manifesto animazione-ingresso">
            <div class="pannello-vetro">
                <div class="badge-istituzionale text-center">DOCUMENTO POLITICO STRATEGICO</div>
                <h1 class="text-center generic-h1">Manifesto Programmatico di Governo</h1>
                <p class="text-center sottotitolo">Sintesi delle linee di indirizzo e delle delibere attuate dal Candidato <strong>${stato.utente.nome}</strong></p>
                
                <div class="lista-delibere-riepilogo">
                    ${stato.delibereProgramma.map(d => `
                        <div class="scheda-riepilogo-blocco">
                            <div class="riepilogo-meta">
                                <span class="badge-tag-livello">${d.livello.toUpperCase()}</span>
                                <span class="badge-tag-territorio">${d.territorio}</span>
                            </div>
                            <h3>${d.titolo}</h3>
                            <p class="testo-p-scuro"><strong>Criticità:</strong> ${d.problema}</p>
                            <div class="soluzione-adottata-box">
                                <strong>Provvedimento Deliberato:</strong>
                                <p>${d.scelta}</p>
                            </div>
                            <div class="linea-politica-tag">Indirizzo Dottrinale: ${d.linea}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="text-center spazio-superiore">
                    <button id="manifesto-chiudi" class="pulsante-primario" style="max-width:300px;">Ritorna alla Plenaria</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('manifesto-chiudi').addEventListener('click', () => {
        stato.schermataAttuale = "hub";
        router();
    });
}

document.addEventListener('DOMContentLoaded', main);
