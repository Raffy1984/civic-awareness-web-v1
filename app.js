import { caricaTuttiIComuni, ottieniQuizAbilitazione, ottieniScenariPolitici } from './comuni.js';
import { SistemaCivico } from './territori.js';

const core = new SistemaCivico();
let elencoComuni = [];

async function avviaApplicazione() {
    const app = document.getElementById('app');
    app.innerHTML = `<div class="schermata-centrata"><h2>Caricamento in corso del Sistema Civico Nazionale...</h2></div>`;
    
    elencoComuni = await caricaTuttiIComuni();
    renderRegistrazioneUtente();
}

function renderRegistrazioneUtente() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="box-centrato card">
            <h1>Benvenuto nella Piattaforma Civica Italiana 🇮🇹</h1>
            <p>Un sistema integrato per l'abilitazione elettorale e la simulazione di governo locale e nazionale.</p>
            
            <div class="campo">
                <label>Il tuo Nome:</label>
                <input type="text" id="input-nome" placeholder="Es. Alessandro">
            </div>
            <div class="campo" style="position:relative;">
                <label>Il tuo Comune (Cerca tra tutti i 7.900+):</label>
                <input type="text" id="input-comune" placeholder="Scrivi il comune per caricare i dati...">
                <div id="tendina-comuni" class="tendina"></div>
            </div>
            <button id="btn-registrati" disabled>Accedi al Sistema</button>
        </div>
    `;

    const inputComune = document.getElementById('input-comune');
    const tendina = document.getElementById('tendina-comuni');
    const btnReg = document.getElementById('btn-registrati');
    let comuneSelezionato = null;

    inputComune.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        if(val.length < 2) { tendina.innerHTML = ''; return; }
        
        const res = elencoComuni.filter(c => c.nome.toLowerCase().startsWith(val)).slice(0, 5);
        tendina.innerHTML = res.map(c => `
            <div class="voce-comune" data-nome="${c.nome}" data-regione="${c.regione}">
                <strong>${c.nome}</strong> (${c.sigla}) - <span>${c.regione}</span>
            </div>
        `).join('');
    });

    tendina.addEventListener('click', (e) => {
        const target = e.target.closest('.voce-comune');
        if(!target) return;
        comuneSelezionato = { nome: target.dataset.nome, regione: target.dataset.regione };
        inputComune.value = `${comuneSelezionato.nome} (${comuneSelezionato.regione})`;
        tendina.innerHTML = '';
        btnReg.disabled = false;
    });

    btnReg.addEventListener('click', () => {
        const nome = document.getElementById('input-nome').value || "Cittadino";
        core.resetCampagna(nome, comuneSelezionato.nome, comuneSelezionato.regione);
        renderHubPrincipale();
    });
}

function renderHubPrincipale() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="hub-container">
            <header class="hub-header">
                <h2>Profilo: ${core.utente.nome} | Territorio: ${core.utente.comune} (${core.utente.regione})</h2>
                <div>Stato Elettorale: ${core.abilitatoAlVoto ? '<span class="voto-ok">Abilitato al Voto ✅</span>' : '<span class="voto-no">Non Abilitato ❌</span>'}</div>
            </header>

            <div class="griglia-sezioni">
                <div class="card sezione-card">
                    <h3>Sezione 1: Ottieni Abilitazione al Voto</h3>
                    <p>Rispondi alle domande di educazione civica e diritto pubblico sul tuo Comune, Regione e Nazione per sbloccare i tuoi diritti democratici.</p>
                    <button id="vai-quiz" class="btn-azione">Inizia Esame Civico</button>
                </div>

                <div class="card sezione-card">
                    <h3>Sezione 2: Candidato per un Giorno</h3>
                    <p>Prendi in mano le redini del governo. Affronta i problemi del territorio di ${core.utente.comune} e crea il tuo programma politico.</p>
                    <button id="vai-candidato" class="btn-azione" style="background:#8b5cf6;">Inizia Simulazione Politica</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('vai-quiz').addEventListener('click', avviaSezioneQuiz);
    document.getElementById('vai-candidato').addEventListener('click', avviaSezioneCandidato);
}

// --- LOGICA SEZIONE 1: ABILITAZIONE AL VOTO ---
function avviaSezioneQuiz() {
    core.sezioneAttuale = "quiz_abilitazione";
    core.indiceQuiz = 0;
    core.punteggioQuiz = 0;
    renderQuizDomanda();
}

function renderQuizDomanda() {
    const app = document.getElementById('app');
    const entita = core.livelloAttuale === "comunali" ? core.utente.comune : (core.livelloAttuale === "regionali" ? core.utente.regione : "Italia");
    const domande = ottieniQuizAbilitazione(core.livelloAttuale, entita);
    const d = domande[core.indiceQuiz];

    app.innerHTML = `
        <div class="box-centrato card">
            <span class="livello-badge">${core.livelloAttuale.toUpperCase()} - Esame Civico</span>
            <h2 class="spazio-v">${d.domanda}</h2>
            <div>
                ${d.opzioni.map((opc, i) => `<button class="btn-scelta" data-idx="${i}">${opc}</button>`).join('')}
            </div>
            <div id="risposta-feedback" class="feedback nascosto"></div>
        </div>
    `;

    document.querySelectorAll('.btn-scelta').forEach(b => {
        b.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-scelta').forEach(btn => btn.disabled = true);
            const scelto = parseInt(e.target.dataset.idx);
            const feedback = document.getElementById('risposta-feedback');
            
            feedback.classList.remove('nascosto');
            if(scelto === d.risposta) {
                core.punteggioQuiz += 10;
                feedback.innerHTML = `<p class="testo-ok"><b>Esatto!</b> ${d.spiegazione}</p>`;
            } else {
                feedback.innerHTML = `<p class="testo-no"><b>Sbagliato.</b> ${d.spiegazione}</p>`;
            }
            
            feedback.innerHTML += `<button id="prossimo-step" class="btn-avanti">Continua</button>`;
            document.getElementById('prossimo-step').addEventListener('click', () => {
                core.indiceQuiz++;
                if(core.indiceQuiz < domande.length) {
                    renderQuizDomanda();
                } else {
                    avanzaLivelloQuiz();
                }
            });
        });
    });
}

function avanzaLivelloQuiz() {
    if(core.livelloAttuale === "comunali") {
        core.livelloAttuale = "regionali";
        core.indiceQuiz = 0;
        renderQuizDomanda();
    } else if(core.livelloAttuale === "regionali") {
        core.livelloAttuale = "nazionali";
        core.indiceQuiz = 0;
        renderQuizDomanda();
    } else {
        core.abilitatoAlVoto = core.punteggioQuiz >= 30;
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="box-centrato card text-center">
                <h2>Risultato Esame di Abilitazione</h2>
                <p class="spazio-v" style="font-size:1.5rem">Punteggio ottenuto: <b>${core.punteggioQuiz} Punti</b></p>
                <p>${core.abilitatoAlVoto ? "Complimenti! Hai dimostrato ottime competenze civiche. Sei ufficialmente abilitato al voto!" : "Punteggio insufficiente. Dovrai studiare ancora la struttura dello Stato."}</p>
                <button id="torna-hub" class="btn-avanti">Torna all'Hub</button>
            </div>
        `;
        document.getElementById('torna-hub').addEventListener('click', () => {
            core.livelloAttuale = "comunali";
            renderHubPrincipale();
        });
    }
}

// --- LOGICA SEZIONE 2: CANDIDATO PER UN GIORNO (PROBLEMI & SOLUZIONI) ---
function avviaSezioneCandidato() {
    core.sezioneAttuale = "candidato_politico";
    core.livelloAttuale = "comunali";
    core.indiceScenario = 0;
    core.programmaElettorale = [];
    renderScenarioPolitico();
}

function renderScenarioPolitico() {
    const app = document.getElementById('app');
    const entita = core.livelloAttuale === "comunali" ? core.utente.comune : (core.livelloAttuale === "regionali" ? core.utente.regione : "Italia");
    const scenari = ottieniScenariPolitici(core.livelloAttuale, entita);
    const sc = scenari[core.indiceScenario];

    app.innerHTML = `
        <div class="box-centrato card">
            <span class="livello-badge" style="background:#8b5cf6;">CAMPAGNA ELETTORALE: LICELLO ${core.livelloAttuale.toUpperCase()}</span>
            <h3 class="spazio-v"><b>CRITICITÀ DA RISOLVERE A:</b> ${entita}</h3>
            <p class="problema-testo">${sc.problema}</p>
            
            <h4>Scegli la tua linea politica e inseriscila nel tuo Programma ufficiale:</h4>
            <div class="opzioni-politiche">
                ${sc.opzioni.map((op, i) => `
                    <button class="btn-politico" data-idx="${i}">
                        <p>${op.testo}</p>
                        <small>Approccio: ${op.tipo}</small>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    document.querySelectorAll('.btn-politico').forEach(b => {
        b.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-politico');
            const idx = parseInt(btn.dataset.idx);
            const sceltaFatta = sc.opzioni[idx];
            
            core.programmaElettorale.push({
                livello: core.livelloAttuale,
                entita: entita,
                problema: sc.problema,
                soluzioneScelta: sceltaFatta.testo,
                orientamento: sceltaFatta.tipo
            });

            core.indiceScenario++;
            if(core.indiceScenario < scenari.length) {
                renderScenarioPolitico();
            } else {
                avanzaLivelloPolitico();
            }
        });
    });
}

function avanzaLivelloPolitico() {
    if(core.livelloAttuale === "comunali") {
        core.livelloAttuale = "regionali";
        core.indiceScenario = 0;
        renderScenarioPolitico();
    } else if(core.livelloAttuale === "regionali") {
        core.livelloAttuale = "nazionali";
        core.indiceScenario = 0;
        renderScenarioPolitico();
    } else {
        renderManifestoFinale();
    }
}

function renderManifestoFinale() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="hub-container">
            <div class="card">
                <h1 class="text-center">✨ Il tuo Manifesto Politico Nazionale ✨</h1>
                <p class="text-center">Candidato <b>${core.utente.nome}</b>, ecco il programma ufficiale che hai deliberato per i cittadini:</p>
                
                <div class="spazio-v">
                    ${core.programmaElettorale.map(p => `
                        <div class="manifesto-item">
                            <h4>📍 Livello ${p.livello.toUpperCase()} (${p.entita})</h4>
                            <p><b>Problema riscontrato:</b> ${p.problema}</p>
                            <p class="soluzione-presa"><b>La tua Soluzione:</b> ${p.soluzioneScelta}</p>
                            <span class="badge-tipo">Linea: ${p.orientamento}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="text-center">
                    <button id="ritorno-hub-finale" class="btn-azione">Ritorna all'Hub Centrale</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('ritorno-hub-finale').addEventListener('click', () => {
        core.livelloAttuale = "comunali";
        renderHubPrincipale();
    });
}

document.addEventListener('DOMContentLoaded', avviaApplicazione);
