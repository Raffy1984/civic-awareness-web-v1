const app = {
    state: {
        currentScreen: 'home',
        selectedLevel: null,
        selectedTerritoryType: null,
        selectedTerritoryId: null,
        currentQuestion: 0,
        answers: [],
        filteredQuestions: [],
    },
    
    territories: {
        nazione: [
            { id: 'italia', name: 'Italia (Stato Nazionale)', icon: '🇮🇹', desc: 'Competenze: Macroeconomia, Previdenza, Difesa' }
        ],
        regioni: [
            { id: 'abruzzo', name: 'Abruzzo', icon: '🏔️', desc: 'Focus: Sanità, Fondi Europei, Trasporti Regionali' },
            { id: 'lombardia', name: 'Lombardia', icon: '🏙️', desc: 'Focus: Sanità (80% del bilancio), Trenord' },
            { id: 'sicilia', name: 'Sicilia', icon: '🍊', desc: 'Focus: Statuto speciale, Beni culturali' },
            { id: 'umbria', name: 'Umbria', icon: '⛪', desc: 'Focus: Sanità interna, Borghi storici. No coste marittime.' }
            // Puoi aggiungere qui le altre regioni mantenendo la stessa struttura
        ],
        comuni: [
            { id: 'roma', name: 'Roma Capitale', icon: '🏛️', desc: 'Competenze: TARI, Trasporti ATAC, Verde Urbano' },
            { id: 'milano', name: 'Milano', icon: '🚇', desc: 'Competenze: Area C, Trasporti ATM' },
            { id: 'bologna', name: 'Bologna', icon: '🍝', desc: 'Competenze: Città 30, Asili nido' }
            // Puoi aggiungere qui gli altri comuni mantenendo la stessa struttura
        ]
    },
    
    questions: [
        { 
            id: 1, type: 'nazione', level: 'base', categoryIcon: '👮', categoryLabel: 'Sicurezza e Immigrazione', 
            text: 'Quanto costa davvero l\'accoglienza dei migranti sul totale della spesa pubblica italiana?', 
            options: [
                {id:'a', text:'Oltre il 15% di tutte le tasse degli italiani', hint:'Un quinto del budget nazionale.'}, 
                {id:'b', text:'Meno dell\'1% della spesa pubblica totale', hint:'Una quota marginale rispetto a pensioni o sanità.'}, 
                {id:'c', text:'Circa il 5% del bilancio statale', hint:'Una cifra considerevole.'}
            ], 
            correct: 'b', reality: 'La spesa per l\'accoglienza incide per circa lo 0.5%-0.8%. Il grosso delle tasse va in Pensioni e Sanità.', 
            commonPerception: 35, realData: 0.5 
        },
        { 
            id: 2, type: 'regione', level: 'base', categoryIcon: '🏥', categoryLabel: 'Sanità', 
            text: 'Chi ha la responsabilità amministrativa diretta della gestione delle liste d\'attesa ospedaliere?', 
            options: [
                {id:'a', text:'Il Sindaco della propria città', hint:'L\'autorità più vicina a te.'}, 
                {id:'b', text:'La Regione, che alloca il bilancio sanitario', hint:'Chi gestisce l\'80% del budget regionale.'}, 
                {id:'c', text:'Il Ministero della Salute da Roma', hint:'L\'organo centrale governativo.'}
            ], 
            correct: 'b', reality: 'La Sanità è regionale. Le giunte regionali decidono assunzioni e Cup.', 
            commonPerception: 20, realData: 80 
        },
        { 
            id: 3, type: 'comune', level: 'base', categoryIcon: '🗑️', categoryLabel: 'Rifiuti', 
            text: 'Per legge, un Sindaco può prendere i soldi incassati dalla TARI per tappare le buche stradali?', 
            options: [
                {id:'a', text:'Sì, il Comune sposta le risorse dove serve', hint:'Flessibilità totale.'}, 
                {id:'b', text:'No. La TARI copre SOLO il 100% dei costi della raccolta rifiuti', hint:'Destinazione vincolata per legge.'}, 
                {id:'c', text:'Sì, ma solo una quota minima', hint:'Uso parziale.'}
            ], 
            correct: 'b', reality: 'Ogni euro di TARI deve andare obbligatoriamente nel servizio rifiuti.', 
            commonPerception: 10, realData: 100 
        }
    ],

    politicalPromises: {
        comune: [
            { id: 'com_1', label: "Zero TARI: Elimino la tassa sui rifiuti per tutti", cost: 'alto', law: 'illegale', aiCorrection: "La legge obbliga a coprire i costi con la TARI. Riformulazione AI: 'Tariffazione puntuale per ridurre la tassa del 25%'." },
            { id: 'com_2', label: "Più Sicurezza: Assunzione di 300 Carabinieri", cost: 'medio', law: 'incompetenza', aiCorrection: "I Carabinieri dipendono dal Ministero della Difesa. Riformulazione AI: 'Potenziamento Polizia Municipale notturna'." }
        ],
        regioni: [
            { id: 'reg_1', label: "Azzeramento Liste d'Attesa in 30 giorni", cost: 'altissimo', law: 'legale', aiCorrection: "Sforerebbe i tetti statali sul personale. Riformulazione AI: 'Apertura serale diagnostica pubblica'." }
        ],
        nazione: [
            { id: 'naz_1', label: "Pensioni minime a 1500€ da subito", cost: 'astronomico', law: 'legale', aiCorrection: "Costa 38 miliardi. Riformulazione AI: 'Innalzamento progressivo finanziato da recupero evasione'." }
        ]
    },
    
    init() {
        this.goToScreen('home');
    },
    
    goToScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`screen-${screenId}`);
        if (target) {
            target.classList.add('active');
            this.state.currentScreen = screenId;
        }
        
        const nav = document.getElementById('mainNav');
        if(nav) {
            if (screenId === 'home') nav.classList.remove('visible');
            else nav.classList.add('visible');
        }
        this.updateProgressBar();
    },
    
    updateProgressBar() {
        const bar = document.getElementById('progressBar');
        if (!bar) return;
        if (this.state.currentScreen === 'question' && this.state.filteredQuestions.length > 0) {
            bar.style.width = `${(this.state.currentQuestion / this.state.filteredQuestions.length) * 100}%`;
        } else if (this.state.currentScreen === 'report' || this.state.currentScreen === 'laboratorio') {
            bar.style.width = '100%';
        } else {
            bar.style.width = '0%';
        }
    },
    
    selectLevel(levelId) {
        this.state.selectedLevel = levelId;
        this.renderTerritoryTypeSelection();
    },

    renderTerritoryTypeSelection() {
        const grid = document.getElementById('territoryList');
        if (!grid) return;
        this.goToScreen('territory');
        grid.innerHTML = `
            <div class="card card-interactive territory-card" onclick="app.loadTerritoriesList('nazione')">
                <div class="territory-icon">🇮🇹</div>
                <div class="territory-info">
                    <div class="territory-name">Livello Statale (Nazione)</div>
                </div>
            </div>
            <div class="card card-interactive territory-card" onclick="app.loadTerritoriesList('regioni')">
                <div class="territory-icon">🏔️</div>
                <div class="territory-info">
                    <div class="territory-name">Livello Regionale</div>
                </div>
            </div>
            <div class="card card-interactive territory-card" onclick="app.loadTerritoriesList('comuni')">
                <div class="territory-icon">🏢</div>
                <div class="territory-info">
                    <div class="territory-name">Livello Comunale</div>
                </div>
            </div>
        `;
    },

    loadTerritoriesList(type) {
        this.state.selectedTerritoryType = type;
        if (type === 'nazione') {
            this.selectTerritory('nazione', 'italia');
            return;
        }
        document.getElementById('territorySearch').classList.remove('hidden');
        this.filterTerritories();
    },
    
    filterTerritories() {
        const grid = document.getElementById('territoryList');
        const search = document.getElementById('territorySearch').value.toLowerCase();
        if (!grid) return;
        
        grid.innerHTML = '';
        const list = this.territories[this.state.selectedTerritoryType] || [];
        const filtered = list.filter(t => t.name.toLowerCase().includes(search));
        
        filtered.forEach(t => {
            grid.innerHTML += `
                <div class="card card-interactive territory-card" onclick="app.selectTerritory('${this.state.selectedTerritoryType}', '${t.id}')">
                    <div class="territory-icon">${t.icon}</div>
                    <div class="territory-info">
                        <div class="territory-name">${t.name}</div>
                    </div>
                </div>`;
        });
    },
    
    selectTerritory(type, id) {
        this.state.selectedTerritoryType = type;
        this.state.selectedTerritoryId = id;
        this.state.currentQuestion = 0;
        this.state.answers = [];
        
        this.state.filteredQuestions = this.questions.filter(q => q.type === type);
        
        this.renderQuestion();
        this.goToScreen('question');
    },
    
    renderQuestion() {
        const q = this.state.filteredQuestions[this.state.currentQuestion];
        if (!q) return;
        
        document.getElementById('questionCategory').innerHTML = `${q.categoryIcon} ${q.categoryLabel}`;
        document.getElementById('questionNumber').innerText = `Verifica ${this.state.currentQuestion + 1} di ${this.state.filteredQuestions.length}`;
        document.getElementById('questionText').innerText = q.text;
        
        const list = document.getElementById('answersList');
        list.innerHTML = '';
        
        const saved = this.state.answers[this.state.currentQuestion];
        
        q.options.forEach(opt => {
            const sel = saved && saved.selectedId === opt.id;
            list.innerHTML += `
                <button class="answer-option ${sel ? 'selected' : ''}" onclick="app.selectAnswer('${opt.id}')" ${saved ? 'disabled' : ''}>
                    <div class="answer-radio"></div>
                    <div class="answer-content">
                        <div class="answer-text">${opt.text}</div>
                        <div class="answer-hint">${opt.hint}</div>
                    </div>
                </button>`;
        });
        
        const analysis = document.getElementById('analysisCard');
        const btnNext = document.getElementById('btnNext');
        
        if (saved) {
            const correct = saved.selectedId === q.correct;
            analysis.innerHTML = `<p style="font-size:14px; margin-bottom:0;"><strong>Realtà:</strong> ${q.reality}</p>`;
            analysis.classList.remove('hidden');
            btnNext.removeAttribute('disabled');
        } else {
            analysis.classList.add('hidden');
            btnNext.setAttribute('disabled', 'true');
        }
    },
    
    app.selectAnswer = function(id) {
        if (this.state.answers[this.state.currentQuestion]) return;
        this.state.answers[this.state.currentQuestion] = {
            selectedId: id,
            isCorrect: id === this.state.filteredQuestions[this.state.currentQuestion].correct
        };
        this.renderQuestion();
    };
    
    app.nextQuestion = function() {
        if (this.state.currentQuestion < this.state.filteredQuestions.length - 1) {
            this.state.currentQuestion++;
            this.renderQuestion();
        } else {
            this.generateReport();
        }
    };
    
    app.generateReport = function() {
        const correct = this.state.answers.filter(a => a.isCorrect).length;
        const finalScore = Math.round((correct / this.state.filteredQuestions.length) * 100);
        document.getElementById('reportScoreValue').innerText = `${finalScore}%`;
        document.getElementById('reportLevel').innerText = finalScore >= 70 ? '👑 IDONEITÀ EMESSA' : '❌ VOTO CONGELATO';
        this.goToScreen('report');
    };

    app.goToLaboratorioScreen = function() {
        this.setupLaboratorio(this.state.selectedTerritoryType);
        this.goToScreen('laboratorio');
    };
    
    app.setupLaboratorio = function(livello) {
        const container = document.getElementById('promisesSelectorContainer');
        if(!container) return;
        container.innerHTML = '';
        const list = this.politicalPromises[livello] || [];
        list.forEach(p => {
            container.innerHTML += `
                <div class="card" style="display:flex; gap:12px; padding:16px;">
                    <input type="checkbox" name="userPromises" value="${p.id}" onchange="app.triggerAiLiveCorrection()">
                    <div><strong>${p.label}</strong></div>
                </div>`;
        });
    };

    app.triggerAiLiveCorrection = function() {
        const checkboxes = document.querySelectorAll('input[name="userPromises"]:checked');
        const fb = document.getElementById('coherenceFeedback');
        fb.classList.remove('hidden');
        fb.innerHTML = `<h3>Correzione AI:</h3>`;
        checkboxes.forEach(cb => {
            const allPromises = [...this.politicalPromises.comune, ...this.politicalPromises.regioni, ...this.politicalPromises.nazione];
            const promessa = allPromises.find(p => p.id === cb.value);
            if(promessa) {
                fb.innerHTML += `<p><strong>${promessa.label}</strong>: ${promessa.aiCorrection}</p>`;
            }
        });
    };

    app.stampaPdfRisposte = function() { window.print(); };
    app.stampaPdfProgramma = function() { alert("Manifesto inviato alla stampa."); window.print(); };
};

document.addEventListener('DOMContentLoaded', () => app.init());
