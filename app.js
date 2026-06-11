// ==========================================================================
// PATENTE CIVICA - APPLICATION LOGIC (AUTONOMA & PROTETTA)
// ==========================================================================

// Creiamo l'oggetto app in modo sicuro, se non esiste nell'HTML lo creiamo da zero
window.app = window.app || {};

// Inizializziamo lo stato se non presente
app.state = app.state || {
    currentScreen: 'home',
    selectedLevel: 'base',
    selectedTerritory: 'italia',
    currentQuestion: 0,
    answers: [],
    completedLevels: JSON.parse(localStorage.getItem('civic_completed_levels')) || [],
    showNav: false
};

// Database di domande integrato nel JS per evitare blocchi se manca nell'HTML
app.questions = app.questions || {
    base: [
        {
            id: 'q1',
            categoryLabel: 'Economia e Bilancio',
            categoryIcon: '💶',
            text: 'Qual è la quota percentuale approssimativa del PIL italiano destinata alla spesa sanitaria pubblica?',
            options: [
                { id: 'a', text: 'Circa il 6-7%', hint: 'In linea con la media dei paesi europei ad alto reddito.' },
                { id: 'b', text: 'Oltre il 20%', hint: 'Una cifra simile assorbirebbe quasi l\'intero bilancio dello Stato.' },
                { id: 'c', text: 'Meno del 2%', hint: 'Troppo bassa per garantire i livelli essenziali di assistenza (LEA).' }
            ],
            correct: 'a',
            perception: { common: 25, reality: 6.8 },
            analysis: {
                reality: 'La spesa sanitaria pubblica in Italia si attesta storicamente intorno al 6,5% - 7% del PIL.',
                advantages: 'Garantisce un accesso universalistico alle cure per tutti i cittadini indipendentemente dal reddito.',
                disadvantages: 'Il finanziamento è sotto pressione a causa dell\'invecchiamento demografico e dei costi delle nuove tecnologie mediche.',
                source: 'Ministero dell\'Economia e delle Finanze / Ragioneria Generale dello Stato',
                year: '2025'
            }
        },
        {
            id: 'q2',
            categoryLabel: 'Istituzioni',
            categoryIcon: '🏛️',
            text: 'Chi detiene il potere legislativo in Italia a livello nazionale?',
            options: [
                { id: 'a', text: 'Il Parlamento', hint: 'Organo bicamerale eletto direttamente dai cittadini.' },
                { id: 'b', text: 'Il Governo', hint: 'Detiene principalmente il potere esecutivo, salvo decreti d\'urgenza.' },
                { id: 'c', text: 'La Corte Costituzionale', hint: 'Organo di garanzia che vigila sulla conformità delle leggi.' }
            ],
            correct: 'a',
            perception: { common: 50, reality: 100 },
            analysis: {
                reality: 'La funzione legislativa è esercitata collettivamente dalle due Camere (Art. 70 della Costituzione).',
                advantages: 'Rappresentanza democratica diretta di tutte le forze politiche elette.',
                disadvantages: 'I tempi di approvazione possono essere lunghi a causa del "navettamento" tra Camera e Senato.',
                source: 'Costituzione della Repubblica Italiana',
                year: '1948'
            }
        }
    ]
};

// Lista dei territori
app.territories = [
    { id: 'italia', name: 'Italia', icon: '🇮🇹', desc: 'Focus nazionale: economia, sanità, istruzione a livello paese' },
    { id: 'lombardia', name: 'Lombardia', icon: '🏔️', desc: 'Dati e domande specifiche per la regione' },
    { id: 'lazio', name: 'Lazio', icon: '🏛️', desc: 'Dati e domande specifiche per la regione' },
    { id: 'campania', name: 'Campania', icon: '🌋', desc: 'Dati e domande specifiche per la regione' },
    { id: 'sicilia', name: 'Sicilia', icon: '🏝️', desc: 'Dati e domande specifiche per la regione' },
    { id: 'veneto', name: 'Veneto', icon: '🦁', desc: 'Dati e domande specifiche per la regione' }
];

// Funzione di inizializzazione sicura
app.init = function() {
    this.updateLevelLocks();
    
    // Assegna gli eventi ai bottoni principali in modo dinamico se esistono
    const startBtn = document.getElementById('btnStart');
    if (startBtn) {
        startBtn.onclick = () => this.goToScreen('level');
    }
    
    const nextBtn = document.getElementById('btnNext');
    if (nextBtn) {
        nextBtn.onclick = () => this.nextQuestion();
    }

    const prevBtn = document.getElementById('btnPrevious');
    if (prevBtn) {
        prevBtn.onclick = () => this.previousQuestion();
    }

    // Mostra la schermata iniziale
    this.goToScreen('home');
};

// Funzioni di navigazione e logica
app.goToScreen = function(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.style.display = 'none';
    });

    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.style.display = 'flex';
        targetScreen.offsetHeight; 
        targetScreen.classList.add('active');
        this.state.currentScreen = screenId;
    }

    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        if (screenId === 'home') {
            mainNav.classList.remove('visible');
        } else {
            mainNav.classList.add('visible');
        }
    }

    this.updateProgressBar();
    window.scrollTo(0, 0);
};

app.updateProgressBar = function() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;

    if (this.state.currentScreen === 'question' && this.questions[this.state.selectedLevel]) {
        const totalQuestions = this.questions[this.state.selectedLevel].length;
        const percentage = ((this.state.currentQuestion) / totalQuestions) * 100;
        bar.style.width = `${percentage}%`;
    } else if (this.state.currentScreen === 'report') {
        bar.style.width = '100%';
    } else {
        bar.style.width = '0%';
    }
};

app.updateLevelLocks = function() {
    const intermediateCard = document.getElementById('levelIntermediate');
    const advancedCard = document.getElementById('levelAdvanced');

    if (intermediateCard && advancedCard) {
        if (this.state.completedLevels.includes('base')) {
            intermediateCard.classList.remove('level-locked');
        } else {
            intermediateCard.classList.add('level-locked');
        }
        if (this.state.completedLevels.includes('intermediate')) {
            advancedCard.classList.remove('level-locked');
        } else {
            advancedCard.classList.add('level-locked');
        }
    }
};

app.selectLevel = function(levelId) {
    if (levelId === 'intermediate' && !this.state.completedLevels.includes('base')) return;
    if (levelId === 'advanced' && !this.state.completedLevels.includes('intermediate')) return;

    this.state.selectedLevel = levelId;
    this.goToScreen('territory');
};

app.filterTerritories = function() {
    const query = document.getElementById('territorySearch').value.toLowerCase();
    const grid = document.getElementById('territoryList');
    if (!grid) return;
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
};

app.selectTerritory = function(territoryId) {
    this.state.selectedTerritory = territoryId;
    this.state.currentQuestion = 0;
    this.state.answers = [];
    
    if (!this.questions[this.state.selectedLevel]) {
        this.questions[this.state.selectedLevel] = JSON.parse(JSON.stringify(this.questions.base));
    }

    this.renderQuestion();
    this.goToScreen('question');
};

app.renderQuestion = function() {
    const levelQuestions = this.questions[this.state.selectedLevel];
    if (!levelQuestions || !levelQuestions[this.state.currentQuestion]) return;
    
    const currentQ = levelQuestions[this.state.currentQuestion];

    const catEl = document.getElementById('questionCategory');
    const numEl = document.getElementById('questionNumber');
    const textEl = document.getElementById('questionText');
    
    if (catEl) catEl.innerHTML = `${currentQ.categoryIcon} ${currentQ.categoryLabel}`;
    if (numEl) numEl.innerText = `Domanda ${this.state.currentQuestion + 1} di ${levelQuestions.length}`;
    if (textEl) textEl.innerText = currentQ.text;

    const answersList = document.getElementById('answersList');
    if (!answersList) return;
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

    const btnNext = document.getElementById('btnNext');
    const analysisCard = document.getElementById('analysisCard');

    if (btnNext) {
        if (existingAnswer) {
            btnNext.removeAttribute('disabled');
            btnNext.innerText = (this.state.currentQuestion === levelQuestions.length - 1) ? 'Vedi Risultati →' : 'Successiva →';
            this.renderAnalysis(currentQ, existingAnswer.selectedId);
            if (analysisCard) analysisCard.classList.remove('hidden');
        } else {
            btnNext.setAttribute('disabled', 'true');
            btnNext.innerText = 'Conferma →';
            if (analysisCard) {
                analysisCard.classList.add('hidden');
                analysisCard.innerHTML = '';
            }
        }
    }

    const btnPrev = document.getElementById('btnPrevious');
    if (btnPrev) {
        btnPrev.style.visibility = (this.state.currentQuestion === 0) ? 'hidden' : 'visible';
    }
    this.updateProgressBar();
};

app.selectAnswer = function(optionId) {
    if (this.state.answers[this.state.currentQuestion]) return;

    const levelQuestions = this.questions[this.state.selectedLevel];
    const currentQ = levelQuestions[this.state.currentQuestion];
    
    this.state.answers[this.state.currentQuestion] = {
        questionId: currentQ.id,
        selectedId: optionId,
        isCorrect: optionId === currentQ.correct
    };

    this.renderQuestion();
};

app.renderAnalysis = function(question, selectedId) {
    const card = document.getElementById('analysisCard');
    if (!card) return;
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
};

app.nextQuestion = function() {
    const levelQuestions = this.questions[this.state.selectedLevel];
    if (this.state.currentQuestion < levelQuestions.length - 1) {
        this.state.currentQuestion++;
        this.renderQuestion();
    } else {
        this.generateReport();
    }
};

app.previousQuestion = function() {
    if (this.state.currentQuestion > 0) {
        this.state.currentQuestion--;
        this.renderQuestion();
    }
};

app.generateReport = function() {
    const total = this.state.answers.length;
    const correct = this.state.answers.filter(a => a.isCorrect).length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;

    if (score >= 60 && !this.state.completedLevels.includes(this.state.selectedLevel)) {
        this.state.completedLevels.push(this.state.selectedLevel);
        localStorage.setItem('civic_completed_levels', JSON.stringify(this.state.completedLevels));
        this.updateLevelLocks();
    }

    const scoreWrapper = document.querySelector('.report-score');
    if (scoreWrapper) scoreWrapper.style.setProperty('--score', score);
    
    const scoreValEl = document.getElementById('reportScoreValue');
    if (scoreValEl) scoreValEl.innerText = score;

    let badge = '🌱 Elettore Disattento';
    let summary = 'Il tuo profilo evidenzia una discrepanza marcata tra la percezione dei fenomeni pubblici e i dati reali. Approfondisci le fonti ufficiali.';
    
    if (score >= 60 && score < 85) {
        badge = '🎓 Cittadino Consapevole';
        summary = 'Hai dimostrato una buona comprensione dei meccanismi della cosa pubblica. Conosci i dati reali anche se permangono incertezze su aree di bilancio complesse.';
    } else if (score >= 85) {
        badge = '🏛️ Esperto di Istituzioni';
        summary = 'Eccellente! Padronanza solida dei dati macroeconomici, strutturali e amministrativi dello Stato. Visione lucida e priva di bias cognitivi.';
    }

    const lvlEl = document.getElementById('reportLevel');
    const sumEl = document.getElementById('reportSummary');
    if (lvlEl) lvlEl.innerText = badge;
    if (sumEl) sumEl.innerText = summary;

    this.renderReportCategories();
    this.renderRealityComparison();
    this.goToScreen('report');
};

app.renderReportCategories = function() {
    const container = document.getElementById('reportCategories');
    if (!container) return;
    container.innerHTML = '';

    const levelQuestions = this.questions[this.state.selectedLevel];
    const categories = {};

    levelQuestions.forEach((q, index) => {
        if (!categories[q.categoryLabel]) {
            categories[q.categoryLabel] = { total: 0, correct: 0 };
        }
        categories[q.categoryLabel].total++;
        if (this.state.answers[index] && this.state.answers[index].isCorrect) {
            categories[q.categoryLabel].correct++;
        }
    });

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
};

app.renderRealityComparison = function() {
    const container = document.getElementById('comparisonContainer');
    if (!container) return;
    container.innerHTML = '';

    const levelQuestions = this.questions[this.state.selectedLevel];

    levelQuestions.forEach((q, index) => {
        const ans = this.state.answers[index];
        if (!ans) return;

        const userPerception = ans.isCorrect ? q.perception.reality : q.perception.common;
        const maxVal = Math.max(Math.abs(userPerception), Math.abs(q.perception.reality), 100);
        const userW = Math.abs((userPerception / maxVal) * 100);
        const realW = Math.abs((q.perception.reality / maxVal) * 100);

        container.innerHTML += `
            <div class="card mb-md" style="padding: var(--space-md);">
                <p style="font-weight:600; font-size:var(--text-sm); margin-bottom:var(--space-sm); color:var(--color-text-primary); text-align: left;">
                    ${q.text}
                </p>
                <div class="comparison-bar">
                    <div class="comparison-label">Tua</div>
                    <div class="comparison-track">
                        <div class="comparison-fill perception" style="width: ${userW}%"></div>
                    </div>
                    <div class="comparison-value">${userPerception}%</div>
                </div>
                <div class="comparison-bar">
                    <div class="comparison-label">Reale</div>
                    <div class="comparison-track">
                        <div class="comparison-fill reality" style="width: ${realW}%"></div>
                    </div>
                    <div class="comparison-value">${q.perception.reality}%</div>
                </div>
            </div>
        `;
    });
};

app.downloadReport = function() {
    alert("Generazione certificato in corso...");
};

app.shareReport = function() {
    alert("Risultato copiato negli appunti!");
};

app.analyzeProposal = function() {
    const territorialLevel = document.getElementById('proposalLevel').value;
    const area = document.getElementById('proposalArea').value;
    const problem = document.getElementById('proposalProblem').value.trim();
    const solution = document.getElementById('proposalSolution').value.trim();
    const cost = document.getElementById('proposalCost').value.trim();
    const funding = document.getElementById('proposalFunding').value.trim();
    const timeline = document.getElementById('proposalTimeline').value;

    if (!territorialLevel || !area || !problem || !solution || !cost || !funding || !timeline) {
        alert("Compila tutti i campi!");
        return;
    }

    const feedbackItems = document.getElementById('coherenceItems');
    if (!feedbackItems) return;
    feedbackItems.innerHTML = '';

    const anomalies = [];

    if (territorialLevel === 'comune' && area === 'sanita') {
        anomalies.push({ type: 'warning', text: '<strong>Errore di competenza:</strong> La sanità è gestita dalle Regioni, non dai Comuni.' });
    }
    if (territorialLevel === 'regione' && area === 'sicurezza') {
        anomalies.push({ type: 'warning', text: '<strong>Errore di competenza:</strong> La sicurezza nazionale è di competenza dello Stato.' });
    }

    if (anomalies.length === 0) {
        anomalies.push({ type: 'suggestion', text: '<strong>Proposta Coerente!</strong> Livello istituzionale e parametri validati con successo.' });
    }

    anomalies.forEach(item => {
        feedbackItems.innerHTML += `
            <div class="coherence-item ${item.type}">
                <span class="coherence-item-icon">${item.type === 'warning' ? '⚠️' : '💡'}</span>
                <div class="analysis-item-content">${item.text}</div>
            </div>
        `;
    });

    const box = document.getElementById('coherenceFeedback');
    if (box) box.classList.remove('hidden');
};

// Avvio automatico al caricamento della pagina
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}
