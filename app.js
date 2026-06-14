import { caricaTuttiIComuni, generaQuiz } from './comuni.js';
import { StatoCandidato } from './territori.js';

const gioco = new StatoCandidato();
let databaseComuni globali = [];

async function init() {
    const app = document.getElementById('app');
    app.innerHTML = `<div class="loader">Caricamento del database nazionale dei 7.800+ Comuni... Per favore attendi.</div>`;

    // Carichiamo tutti i comuni d'Italia dall'API
    databaseComuni = await caricaTuttiIComuni();

    // Mostriamo la schermata di creazione del Candidato
    renderSchermataIniziale();
}

function renderSchermataIniziale() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="game-container card">
            <h1>Simulatore: Candidato per un Giorno! 🎯</h1>
            <p>Riuscirai a scalare la politica italiana partendo dal tuo Comune, passando per la Regione, fino al Governo Nazionale?</p>
            
            <div class="form-group">
                <label for="nome-candidato">Inserisci il tuo nome da Candidato:</label>
                <input type="text" id="nome-candidato" placeholder="Es. Mario Rossi">
            </div>

            <div class="form-group" style="position: relative;">
                <label for="cerca-comune">Seleziona il tuo Comune di partenza (Cerca tra tutti i 7.000+ in Italia):</label>
                <input type="text" id="cerca-comune" placeholder="Inizia a digitare il nome del tuo comune...">
                <div id="suggerimenti-comuni" class="dropdown-suggerimenti"></div>
            </div>

            <button id="btn-avvia-gioco" disabled>Inizia la Campagna Elettorale</button>
        </div>
    `;

    const inputCerca = document.getElementById('cerca-comune');
    const divSuggerimenti = document.getElementById('suggerimenti-comuni');
    const btnAvvia = document.getElementById('btn-avvia-gioco');
    let comuneSelezionato = null;

    // Gestione della ricerca dinamica real-time tra i 7000+ comuni
    inputCerca.addEventListener('input', (e) => {
        const testo = e.target.value.toLowerCase();
        if (testo.length < 2) {
            divSuggerimenti.innerHTML = '';
            return;
        }

        const filtrati = databaseComuni.filter(c => c.nome.toLowerCase().startsWith(testo)).slice(0, 5);
        
        divSuggerimenti.innerHTML = filtrati.map(c => `
            <div class="suggerimento-item" data-comune="${c.nome}" data-regione="${c.regione}">
                <strong>${c.nome}</strong> (${c.sigla}) - <span>${c.regione}</span>
            </div>
        `).join('');
    });

    // Selezione del comune dal menu a tendina
    divSuggerimenti.addEventListener('click', (e) => {
        const item = e.target.closest('.suggerimento-item');
        if (!item) return;

        comuneSelezionato = {
            nome: item.dataset.comune,
            regione: item.dataset.regione
        };

        inputCerca.value = `${comuneSelezionato.nome} (${comuneSelezionato.regione})`;
        divSuggerimenti.innerHTML = '';
        btnAvvia.disabled = false;
    });

    // Avvio della partita
    btnAvvia.addEventListener('click', () => {
        const nome = document.getElementById('nome-candidato').value || "Candidato Anonimo";
        const quiz = generaQuiz("comunali", comuneSelezionato.nome);
        
        gioco.iniziaCampagna(nome, comuneSelezionato.nome, quiz);
        gioco.regioneScelta = comuneSelezionato.regione; // Salviamo la regione per il livello 2
        
        renderSchermataQuiz();
    });
}

function renderSchermataQuiz() {
    const app = document.getElementById('app');
    const domandaCorrente = gioco.quizAttuali[gioco.indiceDomanda];

    app.innerHTML = `
        <div class="game-container card">
            <div class="game-header">
                <span>Candidato: <strong>${gioco.nomeCandidato}</strong></span>
                <span>Livello: <span class="badge">${gioco.livelloAttuale.toUpperCase()} (${gioco.entitaScelta})</span></span>
                <span>Punteggio: <strong>${gioco.punteggio}</strong></span>
            </div>

            <div class="quiz-box">
                <h2>Domanda ${gioco.indiceDomanda + 1} di ${gioco.quizAttuali.length}</h2>
                <p class="testo-domanda">${domandaCorrente.domanda}</p>
                
                <div class="opzioni-container">
                    ${domandaCorrente.opzioni.map((opzione, idx) => `
                        <button class="btn-opzione" data-idx="${idx}">${opzione}</button>
                    `).join('')}
                </div>
            </div>
            <div id="feedback-box" class="feedback-box nascosto"></div>
        </div>
    `;

    document.querySelectorAll('.btn-opzione').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idxScelto = parseInt(e.target.dataset.idx);
            gestisciRisposta(idxScelto);
        });
    });
}

function gestisciRisposta(idxScelto) {
    // Disabilita tutti i bottoni per evitare doppi click
    document.querySelectorAll('.btn-opzione').forEach(b => b.disabled = true);
    
    const esito = gioco.verificaRisposta(idxScelto);
    const feedbackBox = document.getElementById('feedback-box');
    
    feedbackBox.className = `feedback-box ${esito.corretto ? 'corretto' : 'errato'}`;
    feedbackBox.innerHTML = `
        <h3>${esito.corretto ? '✅ Esatto! (+10 Punti)' : '❌ Errato!'}</h3>
        <p>${esito.spiegazione}</p>
        <button id="btn-avanti">Continua la Campagna</button>
    `;

    document.getElementById('btn-avanti').addEventListener('click', () => {
        if (gioco.prossimaDomanda()) {
            renderSchermataQuiz();
        } else {
            gestisciAvanzamentoLivello();
        }
    });
}

function gestisciAvanzamentoLivello() {
    if (gioco.livelloAttuale === "comunali") {
        gioco.livelloAttuale = "regionali";
        gioco.entitaScelta = gioco.regioneScelta;
        gioco.quizAttuali = generaQuiz("regionali", gioco.entitaScelta);
        gioco.indiceDomanda = 0;
        mostraIntermezzo(`Complimenti! Sei stato eletto nel Consiglio Comunale! Ora punti alle Elezioni Regionali della ${gioco.entitaScelta}!`);
    } else if (gioco.livelloAttuale === "regionali") {
        gioco.livelloAttuale = "nazionali";
        gioco.entitaScelta = "Italia";
        gioco.quizAttuali = generaQuiz("nazionali", "Italia");
        gioco.indiceDomanda = 0;
        mostraIntermezzo("Incredibile! Hai conquistato la Regione! La nazione intera ti guarda: iniziano le Elezioni Politiche Parlamentari!");
    } else {
        mostraFineGioco();
    }
}

function mostraIntermezzo(messaggio) {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="game-container card text-center">
            <h2>🏆 Avanzamento di Carriera!</h2>
            <p style="font-size: 1.2rem; margin: 20px 0;">${messaggio}</p>
            <button id="btn-inizia-nuovo-livello">Inizia Prossima Campagna</button>
        </div>
    `;
    document.getElementById('btn-inizia-nuovo-livello').addEventListener('click', renderSchermataQuiz);
}

function mostraFineGioco() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="game-container card text-center">
            <h1>🎉 Campagna Conclusa!</h1>
            <p>Il candidato <strong>${gioco.nomeCandidato}</strong> ha completato il percorso elettorale.</p>
            <div class="punteggio-finale">Punteggio Totale: ${gioco.punteggio} Punti</div>
            <p>${gioco.punteggio >= 40 ? "Sei diventato Presidente del Consiglio! Statista eccellente!" : "Sei un onorevole parlamentare. Puoi fare di meglio!"}</p>
            <button id="btn-Riavvia">Gioca di Nuovo</button>
        </div>
    `;
    document.getElementById('btn-Riavvia').addEventListener('click', init);
}

document.addEventListener('DOMContentLoaded', init);
