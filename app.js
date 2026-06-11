// ==========================================================================
// PATENTE CIVICA - APPLICATION LOGIC
// ==========================================================================

// Estensione dell'oggetto app precedentemente definito nel markup core
Object.assign(app, {
    
    // Lista di tutti i territori supportati
    territories: [
        { id: 'italia', name: 'Italia', icon: '🇮🇹', desc: 'Focus nazionale: economia, sanità, istruzione a livello paese' },
        { id: 'lombardia', name: 'Lombardia', icon: '🏔️', desc: 'Dati e domande specifiche per la regione' },
        { id: 'lazio', name: 'Lazio', icon: '🏛️', desc: 'Dati e domande specifiche per la regione' },
        { id: 'campania', name: 'Campania', icon: '🌋', desc: 'Dati e domande specifiche per la regione' },
        { id: 'sicilia', name: 'Sicilia', icon: '🏝️', desc: 'Dati e domande specifiche per la regione' },
        { id: 'veneto', name: 'Veneto', icon: '🦁', desc: 'Dati e domande specifiche per la regione' }
    ],

    // Cambio di schermata (Screen Management)
    goToScreen(screenId) {
        // Disattiva e nascondi tutte le schermate
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            setTimeout(() => { screen.style.display = 'none'; }, 150);
        });

        // Mostra e attiva lo schermo target
        const targetScreen = document.getElementById(`screen-${screenId}`);
        if (targetScreen) {
            setTimeout(() => {
                targetScreen.style.display = 'flex';
                // Trigger per il reflow CSS necessario all'animazione
                targetScreen.offsetHeight; 
                targetScreen.classList.add('active');
            }, 150);
            this.state.currentScreen = screenId;
        }

        // Gestione della barra di navigazione fissa superiore
        const mainNav = document.getElementById('mainNav');
        if (screenId === 'home') {
            mainNav.classList.remove('visible');
            this.state.showNav = false;
        } else {
            mainNav.classList.add('visible');
            this.state.showNav = true;
        }

        // Aggiorna la barra di progressione generale
        this.updateProgressBar();
        window.scrollTo(0, 0);
    },

    // Aggiornamento della barra di progresso in base allo stato del quiz
    updateProgressBar() {
        const bar = document.getElementById('progressBar');
        if (!bar) return;

        if (this.state.currentScreen === 'question') {
            const totalQuestions = this.questions[this.state.selectedLevel].length;
            const percentage = ((this.state.currentQuestion) / totalQuestions) * 100;
            bar.style.width = `${percentage}%`;
        } else if (this.state.currentScreen === 'report') {
            bar.style.width = '100%';
        } else {
            bar.style.width = '0%';
        }
    },

    // Gestione sblocchi dei livelli in base al LocalStorage
    updateLevelLocks() {
        const intermediateCard = document.getElementById('levelIntermediate');
        const advancedCard = document.getElementById('levelAdvanced');

        if (intermediateCard && advancedCard) {
            // Sblocca Intermedio se Base è completato
            if (this.state.completedLevels.includes('base')) {
                intermediateCard.classList.remove('level-locked');
            } else {
                intermediateCard.classList.add('level-locked');
            }

            // Sblocca Avanzato se Intermedio è completato
            if (this.state.completedLevels.includes('intermediate')) {
                advancedCard.classList.remove('level-locked');
            } else {
                advancedCard.classList.add('level-locked');
            }
        }
    },

    // Selezione del livello iniziale
    selectLevel(levelId) {
        // Fallback se l'utente tenta di forzare via JS livelli bloccati
        if (levelId === 'intermediate' && !this.state.completedLevels.includes('base')) return;
        if (levelId === 'advanced' && !this.state.completedLevels.includes('intermediate')) return;

        this.state.selectedLevel = levelId;
        this.goToScreen('territory');
    },

    // Filtro per la ricerca testuale dei comuni/regioni
    filterTerritories() {
        const query = document.getElementById('territorySearch').value.toLowerCase();
        const grid = document.getElementById('territoryList');
        grid.innerHTML = '';

        const filtered = this.territories.filter(t => t.name.toLowerCase().includes(query));

        if (filtered.length === 0) {
            grid.innerHTML = `<p class="text-center mt-lg" style="grid-column: 1/-1;">Nessun territorio trovato.</p>`;
            return;
        }

        filtered.forEach(t => {
            grid.innerHTML += `
                <div class="card card-interactive territory-card" onclick="app.selectTerritory('${t.id}')">
                    <div class="territory-icon">${t.icon}</div>
                    <div class="territory-info">
                        <div class="territory-name">${t.name}</div>
                        <div class="territory-description">${t.desc}</div>
                    </div>
                </div>
            `;
        });
    },

    // Selezione del territorio e inizializzazione del quiz
    selectTerritory(territoryId) {
        this.state.selectedTerritory = territoryId;
        this.state.currentQuestion = 0;
        this.state.answers = [];
        
        // Se non esistono domande per i livelli avanzati (mock database), clona il base
        if (!this.questions[this.state.selectedLevel]) {
            this.questions[this.state.selectedLevel] = JSON.parse(JSON.stringify(this.questions.base));
        }

        this.renderQuestion();
        this.goToScreen('question');
    },

    // Rendering dinamico della domanda e delle opzioni
    renderQuestion() {
        const levelQuestions = this.questions[this.state.selectedLevel];
        const currentQ = levelQuestions[this.state.currentQuestion];

        // Meta dati header
        document.getElementById('questionCategory').innerHTML = `${currentQ.categoryIcon} ${currentQ.categoryLabel}`;
        document.getElementById('questionNumber').innerText = `Domanda ${this.state.currentQuestion + 1} di ${levelQuestions.length}`;
        document.getElementById('questionText').innerText = currentQ.text;

        // Lista risposte
        const answersList = document.getElementById('answersList');
        answersList.innerHTML = '';

        const existingAnswer = this.state.answers[this.state.currentQuestion];

        currentQ.options.forEach(opt => {
            const isSelected = existingAnswer && existingAnswer.selectedId === opt.id;
            answersList.innerHTML += `
                <button class="answer-option ${isSelected ? 'selected' : ''}" onclick="app.selectAnswer('${opt.id}')" ${existingAnswer ? 'disabled' : ''}>
                    <div class="answer-radio"></div>
                    <div class="answer-content">
                        <div class="answer-text">${opt.text}</div>
                        <div class="answer-hint">${opt.hint}</div>
                    </div>
                </button>
            `;
        });

        // Reset pulsanti footer e pannello analisi
        const btnNext = document.getElementById('btnNext');
        const analysisCard = document.getElementById('analysisCard');

        if (existingAnswer) {
            btnNext.removeAttribute('disabled');
            btnNext.innerText = (this.state.currentQuestion === levelQuestions.length - 1) ? 'Vedi Risultati →' : 'Successiva →';
            this.renderAnalysis(currentQ, existingAnswer.selectedId);
            analysisCard.classList.remove('hidden');
        } else {
            btnNext.setAttribute('disabled', 'true');
            btnNext.innerText = 'Conferma →';
            analysisCard.classList.add('hidden');
            analysisCard.innerHTML = '';
        }

        document.getElementById('btnPrevious').style.visibility = (this.state.currentQuestion === 0) ? 'hidden' : 'visible';
        this.updateProgressBar();
    },

    // Selezione della risposta ed evidenziazione immediata
    selectAnswer(optionId) {
        // Se la domanda ha già ricevuto risposta, ignora ulteriori click
        if (this.state.answers[this.state.currentQuestion]) return;

        const levelQuestions = this.questions[this.state.selectedLevel];
        const currentQ = levelQuestions[this.state.currentQuestion];
        
        // Salvataggio risposta dello stato
        this.state.answers[this.state.currentQuestion] = {
            questionId: currentQ.id,
            selectedId: optionId,
            isCorrect: optionId === currentQ.correct
        };

        // Aggiorna la UI per mostrare la selezione e l'analisi di dettaglio
        this.renderQuestion();
    },

    // Generazione della scheda di dettaglio e dati ufficiali post-risposta
    renderAnalysis(question, selectedId) {
        const card = document.getElementById('analysisCard');
        const isCorrect = selectedId === question.correct;

        card.innerHTML = `
            <div class="analysis-header">
                <div class="analysis-icon" style="background: ${isCorrect ? 'var(--color-success)' : 'var(--color-error)'}">
                    ${isCorrect ? '✓' : '✕'}
                </div>
                <div>
                    <div class="analysis-title">${isCorrect ? 'Risposta Esatta!' : 'Risposta Errata'}</div>
                    <p style="font-size: var(--text-sm)">La risposta corretta è l'opzione contenente: <strong>${question.options.find(o => o.id === question.correct).text}</strong></p>
                </div>
            </div>
            <div class="analysis-grid">
                <div class="analysis-item">
                    <div class="analysis-item-header">
                        <span class="analysis-item-icon">📊</span>
                        <span class="analysis-item-label">La Realtà dei Fatti</span>
                    </div>
                    <div class="analysis-item-content">${question.analysis.reality}</div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-item-header">
                        <span class="analysis-item-icon">⚖️</span>
                        <span class="analysis-item-label">Impatto & Compromessi</span>
                    </div>
                    <div class="analysis-item-content">
                        <strong>Svantaggi:</strong> ${question.analysis.disadvantages}<br><br>
                        <strong>Vantaggi:</strong> ${question.analysis.advantages}
                    </div>
                </div>
            </div>
            <div class="analysis-source">
                Fonte Ufficiale: ${question.analysis.source} (${question.analysis.year})
            </div>
        `;
    },

    // Avanzamento o completamento del percorso d'esame
    nextQuestion() {
        const levelQuestions = this.questions[this.state.selectedLevel];
        
        if (this.state.currentQuestion < levelQuestions.length - 1) {
            this.state.currentQuestion++;
            this.renderQuestion();
        } else {
            this.generateReport();
        }
    },

    // Navigazione a ritroso per rivedere le analisi precedenti
    previousQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.renderQuestion();
        }
    },

    // Calcolo punteggi totali e generazione della dashboard dei risultati
    generateReport() {
        const total = this.state.answers.length;
        const correct = this.state.answers.filter(a => a.isCorrect).length;
        const score = Math.round((correct / total) * 100);

        // Salvataggio avanzamento livello
        if (score >= 60 && !this.state.completedLevels.includes(this.state.selectedLevel)) {
            this.state.completedLevels.push(this.state.selectedLevel);
            this.saveState();
            this.updateLevelLocks();
        }

        // Impostazione dell'indicatore circolare CSS
        const scoreWrapper = document.querySelector('.report-score');
        if (scoreWrapper) scoreWrapper.style.setProperty('--score', score);
        document.getElementById('reportScoreValue').innerText = score;

        // Titolo profilo civico basato sul punteggio conseguito
        let badge = '🌱 Elettore Disattento';
        let summary = 'Il tuo profilo evidenzia una discrepanza marcata tra la percezione dei fenomeni pubblici e i dati reali. Approfondisci le fonti ufficiali.';
        
        if (score >= 60 && score < 85) {
            badge = '🎓 Cittadino Consapevole';
            summary = 'Hai dimostrato una buona comprensione dei meccanismi della cosa pubblica. Conosci i dati reali anche se permangono incertezze su aree di bilancio complesse.';
        } else if (score >= 85) {
            badge = '🏛️ Esperto di Istituzioni';
            summary = 'Eccellente! Padronanza solida dei dati macroeconomici, strutturali e amministrativi dello Stato. Visione lucida e priva di bias cognitivi.';
        }

        document.getElementById('reportLevel').innerText = badge;
        document.getElementById('reportSummary').innerText = summary;

        // Generazione del tabellone di categorizzazione dei risultati
        this.renderReportCategories();
        
        // Generazione della sezione di confronto Realtà vs Percezione dei bias
        this.renderRealityComparison();

        this.goToScreen('report');
    },

    // Categorizzazione dei moduli di macro-area
    renderReportCategories() {
        const container = document.getElementById('reportCategories');
        container.innerHTML = '';

        const levelQuestions = this.questions[this.state.selectedLevel];
        const categories = {};

        // Raggruppa i dati per categoria
        levelQuestions.forEach((q, index) => {
            if (!categories[q.categoryLabel]) {
                categories[q.categoryLabel] = { total: 0, correct: 0 };
            }
            categories[q.categoryLabel].total++;
            if (this.state.answers[index] && this.state.answers[index].isCorrect) {
                categories[q.categoryLabel].correct++;
            }
        });

        // Inserisce gli elementi nel DOM
        for (const [name, data] of Object.entries(categories)) {
            const pct = Math.round((data.correct / data.total) * 100);
            container.innerHTML += `
                <div class="report-category">
                    <div class="report-category-header">
                        <span class="report-category-name">${name}</span>
                        <span class="report-category-score">${data.correct}/${data.total} (${pct}%)</span>
                    </div>
                    <div class="report-category-bar">
                        <div class="report-category-fill" style="width: ${pct}%"></div>
                    </div>
                </div>
            `;
        }
    },

    // Generazione dinamica dei grafici a barre "Realtà Vs Percezione"
    renderRealityComparison() {
        const container = document.getElementById('comparisonContainer');
        container.innerHTML = '';

        const levelQuestions = this.questions[this.state.selectedLevel];

        levelQuestions.forEach((q, index) => {
            const ans = this.state.answers[index];
            if (!ans) return;

            // Se la risposta è corretta, il bias di percezione dell'utente è nullo (allineato alla realtà)
            const userPerception = ans.isCorrect ? q.perception.reality : q.perception.common;
            
            // Normalizzazione grafica in percentuale fittizia (max valore comune o reale)
            const maxVal = Math.max(Math.abs(userPerception), Math.abs(q.perception.reality), 100);
            const userW = Math.abs((userPerception / maxVal) * 100);
            const realW = Math.abs((q.perception.reality / maxVal) * 100);

            container.innerHTML += `
                <div class="card mb-md" style="padding: var(--space-md);">
                    <p style="font-weight:600; font-size:var(--text-sm); margin-bottom:var(--space-sm); color:var(--color-text-primary); text-align: left;">
                        ${q.text}
                    </p>
                    <div class="comparison-bar">
                        <div class="comparison-label">Tua Percezione</div>
                        <div class="comparison-track">
                            <div class="comparison-fill perception" style="width: ${userW}%"></div>
                        </div>
                        <div class="comparison-value">${userPerception}%</div>
                    </div>
                    <div class="comparison-bar">
                        <div class="comparison-label">Dato Reale</div>
                        <div class="comparison-track">
                            <div class="comparison-fill reality" style="width: ${realW}%"></div>
                        </div>
                        <div class="comparison-value">${q.perception.reality}%</div>
                    </div>
                </div>
            `;
        });
    },

    // Funzione simulata per il download del Report PDF
    downloadReport() {
        alert("Generazione del certificato PDF in corso...\nIl report includerà il profilo civico di livello e il dettaglio analitico diviso per macroaree.");
    },

    // Funzione simulata di condivisione nativa o clipboard
    shareReport() {
        const text = `Ho appena completato il test di Patente Civica totalizzando un punteggio di ${document.getElementById('reportScoreValue').innerText}/100! Scoprilo anche tu.`;
        if (navigator.share) {
            navigator.share({ title: 'Patente Civica', text: text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert("Risultato copiato negli appunti! Condividilo con i tuoi amici.");
        }
    },

    // Laboratorio Civico - Analisi Algoritmica di Coerenza del Programma
    analyzeProposal() {
        const territorialLevel = document.getElementById('proposalLevel').value;
        const area = document.getElementById('proposalArea').value;
        const problem = document.getElementById('proposalProblem').value.trim();
        const solution = document.getElementById('proposalSolution').value.trim();
        const cost = document.getElementById('proposalCost').value.trim();
        const funding = document.getElementById('proposalFunding').value.trim();
        const timeline = document.getElementById('proposalTimeline').value;

        // Validazione formati
        if (!territorialLevel || !area || !problem || !solution || !cost || !funding || !timeline) {
            alert("Compila tutti i campi richiesti nel form per sbloccare l'analisi del simulatore economico.");
            return;
        }

        const feedbackItems = document.getElementById('coherenceItems');
        feedbackItems.innerHTML = '';

        const anomalies = [];

        // Regola 1: Controllo coerenza competenze istituzionali
        if (territorialLevel === 'comune' && area === 'sanita') {
            anomalies.push({
                type: 'warning',
                text: '<strong>Errore di competenza istituzionale:</strong> La sanità pubblica è gestita su base e bilancio regionale. Un Comune ha raggio d\'azione limitato ad assistenza sociale e igiene locale.'
            });
        }
        if (territorialLevel === 'regione' && area === 'sicurezza') {
            anomalies.push({
                type: 'warning',
                text: '<strong>Errore di competenza territoriale:</strong> L\'ordine pubblico e la sicurezza nazionale rientrano tra le competenze esclusive dello Stato (Ministero dell\'Interno), non delle Regioni.'
            });
        }

        // Regola 2: Controllo strutturale Copertura Finanziaria
        const cleanCost = parseInt(cost.replace(/[^0-9]/g, ''), 10);
        if (isNaN(cleanCost) || cleanCost <= 0) {
            anomalies.push({
                type: 'warning',
                text: '<strong>Costo Non Valido:</strong> Specifica un costo numerico stimato realistico.'
            });
        } else if (cleanCost > 1000000 && funding.toLowerCase().includes('taglio sprechi') && !funding.toLowerCase().includes('fondi ue') && !funding.toLowerCase().includes('assestamento')) {
            anomalies.push({
                type: 'warning',
                text: '<strong>Rischio Copertura Superficiale:</strong> Dichiarare genericamente di attingere dal "taglio degli sprechi" per coperture superiori al milione di euro espone la proposta a rilievi della Corte dei Conti per mancanza di specificità finanziaria.'
            });
        }

        // Suggerimenti automatici costruttivi
        if (funding.toLowerCase().includes('pnrr')) {
            anomalies.push({
                type: 'suggestion',
                text: '<strong>Ottima intuizione strategica:</strong> L\'uso di fondi vincolati straordinari evita l\'indebitamento strutturale di bilancio corrente.'
            });
        }
        if (timeline === '6mesi' && cleanCost > 5000000) {
            anomalies.push({
                type: 'suggestion',
                text: '<strong>Tempistica ottimistica:</strong> Per appalti e allocazioni superiori a 5M€, i tempi medi della stazione unica appaltante in Italia superano generalmente i 12 mesi.'
            });
        }

        // Se tutto è corretto dal punto di vista burocratico
        if (anomalies.length === 0 || (anomalies.length === 1 && anomalies[0].type === 'suggestion')) {
            anomalies.unshift({
                type: 'suggestion',
                text: '<strong>Proposta Strutturalmente Coerente:</strong> Livello istituzionale idoneo, allocazione sostenibile e parametri logicamente allineati. Proposta pubblicabile!'
            });
        }

        // Iniezione feedback nel template HTML
        anomalies.forEach(item => {
            feedbackItems.innerHTML += `
                <div class="coherence-item ${item.type}">
                    <span class="coherence-item-icon">${item.type === 'warning' ? '⚠️' : '💡'}</span>
                    <div class="analysis-item-content">${item.text}</div>
                </div>
            `;
        });

        const box = document.getElementById('coherenceFeedback');
        box.classList.remove('hidden');
        box.scrollIntoView({ behavior: 'smooth' });
    }
});

// Bootstrap dell'applicazione al caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
