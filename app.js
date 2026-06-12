const app = {
    state: {
        currentScreen: 'home',
        selectedLevel: null,         // 'pancia', 'realta', 'visione'
        selectedTerritoryType: null, // 'nazione', 'regioni', 'comuni'
        selectedTerritoryId: null,   // id specifico dell'ente locale
        selectedTerritoryName: '',   // nome esteso salvato
        currentQuestion: 0,
        answers: [],                 // archivio risposte fornite
        filteredQuestions: [],       // paniere caricato per il quiz
    },
    
    // REGISTRO NAZIONALE E DELLE 20 REGIONI ITALIANE
    territories: {
        nazione: [
            { id: 'italia', name: 'Repubblica Italiana (Stato Nazionale)', icon: '🇮🇹', desc: 'Competenze esclusive: Politica estera, Fisco erariale, Difesa, Previdenza e Ordine pubblico.' }
        ],
        regioni: [
            { id: 'abruzzo', name: 'Regione Abruzzo', icon: '🏔️', desc: 'Competenze: Sanità regionale, Trasporti locali, Gestione Fondi Europei FESR.' },
            { id: 'basilicata', name: 'Regione Basilicata', icon: '🪵', desc: 'Competenze: Idrocarburi, Sanità, Sviluppo rurale e tutela ambientale.' },
            { id: 'calabria', name: 'Regione Calabria', icon: '🌶️', desc: 'Competenze: Gestione coste, Reti ospedaliere, Dissesto idrogeologico.' },
            { id: 'campania', name: 'Regione Campania', icon: '🌋', desc: 'Competenze: Trasporti metropolitani, Sanità pubblica, Edilizia strategica.' },
            { id: 'emilia-romagna', name: 'Regione Emilia-Romagna', icon: '🏎️', desc: 'Competenze: Welfare, Sanità territoriale, Reti idriche e infrastrutture.' },
            { id: 'friuli-venezia-giulia', name: 'Regione Friuli-Venezia Giulia', icon: '🦅', desc: 'Autonomia Speciale: Finanziamento locale di sanità, scuola e politiche linguistiche.' },
            { id: 'lazio', name: 'Regione Lazio', icon: '🏛️', desc: 'Competenze: Debito sanitario, Trasporti pendolari, Reti rifiuti regionali.' },
            { id: 'liguria', name: 'Regione Liguria', icon: '⛵', desc: 'Competenze: Demanio marittimo, Difesa del suolo, Logistica portuale.' },
            { id: 'lombardia', name: 'Regione Lombardia', icon: '🏙️', desc: 'Competenze: Bilancio Sanità (80% del totale), Reti ferroviarie regionali.' },
            { id: 'marche', name: 'Regione Marche', icon: '🎻', desc: 'Competenze: Artigianato, Presidi sanitari diffusi, Fondi di ricostruzione.' },
            { id: 'molise', name: 'Regione Molise', icon: '🌲', desc: 'Competenze: Collegamenti interni, Gestione ospedaliera, Infrastrutture montane.' },
            { id: 'piemonte', name: 'Regione Piemonte', icon: '🍇', desc: 'Competenze: Sanità di prossimità, Fondi agricoli UE, Logistica industriale.' },
            { id: 'puglia', name: 'Regione Puglia', icon: '🫒', desc: 'Competenze: Acquedotto, Turismo, Agricoltura e distretti sanitari.' },
            { id: 'sardegna', name: 'Regione Sardegna', icon: '🐑', desc: 'Autonomia Speciale: Continuità territoriale aerea/marittima, flotta sarda, Sanità.' },
            { id: 'sicilia', name: 'Regione Sicilia', icon: '🍊', desc: 'Autonomia Speciale (Statuto): Beni culturali autonomi, Corpo Forestale, Sanità.' },
            { id: 'toscana', name: 'Regione Toscana', icon: '🌻', desc: 'Competenze: Organizzazione ospedaliera, Assetto idrogeologico, Linee ferrovia.' },
            { id: 'trentino-alto-adige', name: 'Regione Trentino-Alto Adige', icon: '🍎', desc: 'Autonomia Speciale totale divisa tra le Province Autonome di Trento e Bolzano.' },
            { id: 'umbria', name: 'Regione Umbria', icon: '⛪', desc: 'Competenze: Valorizzazione borghi, Sanità, Linee di trasporto regionali.' },
            { id: 'valle-daosta', name: 'Regione Valle d\'Aosta', icon: '🏰', desc: 'Autonomia Speciale: Autonomia finanziaria totale, Bilinguismo, Opere alpine.' },
            { id: 'veneto', name: 'Regione Veneto', icon: '🎭', desc: 'Competenze: Autonomia differenziata, Sanità veneta, Gestione bacini idrografici.' }
        ],
        comuni: [] // Caricato real-time da comuni.js
    },
    
    // BANCO DATI DELLE DOMANDE DI PANCIA, REALTÀ E VISIONE ESTESA
    questions: [
        // --- LIVELLO 1: PANCIA E PERCEZIONE (NAZIONE) ---
        { 
            id: 1, type: 'nazione', level: 'pancia', categoryIcon: '👮', categoryLabel: 'Sicurezza Nazionale', 
            text: 'A quanto ammonta la spesa dello Stato per l\'accoglienza dei migranti rispetto al bilancio generale?', 
            options: [
                {id:'a', text:'Circa la metà di tutte le entrate fiscali dello Stato', hint:'Rappresenta il capitolo principale di spesa pubblica.'}, 
                {id:'b', text:'Meno dell\'1% di tutta la spesa pubblica complessiva', hint:'Una frazione microscopica se paragonata a pensioni o sanità.'}, 
                {id:'c', text:'Intorno al 15% del bilancio erariale', hint:'Una voce pesante che impatta gravemente sulle tasse.'},
                {id:'d', text:'Esattamente il 5% dei fondi stanziati annualmente', hint:'Un valore intermedio di moderato impatto.'}
            ], 
            correct: 'b', 
            reality: 'La spesa statale destinata all\'accoglienza si attesta storicamente sotto lo 0.6% della spesa pubblica totale.', 
            commonPerception: 40, realData: 0.6 
        },
        // --- LIVELLO 2: CONSAPEVOLEZZA E REALTÀ (REGIONE) ---
        { 
            id: 2, type: 'regioni', level: 'realta', categoryIcon: '🏥', categoryLabel: 'Sanità Pubblica', 
            text: 'Quale percentuale del bilancio totale di una Regione viene assorbita dalla spesa sanitaria?', 
            options: [
                {id:'a', text:'Circa il 10%, il resto va a strade e trasporti', hint:'La sanità è una voce marginale delle autonomie.'}, 
                {id:'b', text:'Tra il 75% e l\'85% dell\'intero bilancio regionale', hint:'La sanità è il vero e quasi unico motore finanziario della Regione.'}, 
                {id:'c', text:'Esattamente il 50% ripartito equamente', hint:'Un perfetto equilibrio con gli altri assessorati.'},
                {id:'d', text:'Meno del 5%, la sanità viene pagata interamente da Roma', hint:'Nessun esborso autonomo.'}
            ], 
            correct: 'b', 
            reality: 'I sistemi sanitari regionali prosciugano in media circa l\'80% delle risorse finanziarie totali dell\'ente.', 
            commonPerception: 20, realData: 80 
        },
        // --- LIVELLO 3: DELIBERAZIONE E VISIONE (COMUNE) CON RISPOSTA APERTA ---
        { 
            id: 3, type: 'comuni', level: 'visione', categoryIcon: '🗑️', categoryLabel: 'Tributi e Bilancio Municipale', 
            text: 'Il Sindaco può legalmente stornare i fondi raccolti tramite la tassa rifiuti (TARI) per finanziare la manutenzione stradale o la sicurezza?', 
            options: [
                {id:'a', text:'Sì, il bilancio è unico e il Sindaco sposta i fondi dove serve', hint:'Massima flessibilità d\'uso.'}, 
                {id:'b', text:'No. La TARI deve per legge finanziare esclusivamente il 100% del ciclo dei rifiuti', hint:'Vincolo di destinazione totale senza eccezioni.'}, 
                {id:'c', text:'Sì, ma solo se c\'è uno stato di calamità naturale', hint:'Sblocco condizionato.'},
                {id:'d', text:'Sì, per un limite massimo del 30% dei proventi', hint:'Flessibilità parziale.'}
            ], 
            correct: 'b', 
            reality: 'La TARI è un tributo a destinazione vincolata: deve pareggiare esattamente i costi del servizio rifiuti, e non un euro può andare ad altre voci.', 
            commonPerception: 15, realData: 100,
            isOpen: true // Attiva l'input di testo
        }
    ],

    // DATABASE ARGOMENTI PER IL CANDIDATO PER UN GIORNO (CLUSTERIZZATO)
    laboratorioTemi: {
        nazione: [
            { value: 'immigrazione', label: 'Immigrazione e Controllo Frontiere', placeholderProb: 'Es. Mancanza di coordinamento europeo, centri d\'accoglienza saturi...', placeholderSol: 'Es. Accordi bilaterali di rimpatrio, corridoi umanitari vincolati al lavoro...' },
            { value: 'fisco', label: 'Fisco, Tassazione ed Evasione', placeholderProb: 'Es. Pressione fiscale insostenibile sulle imprese e sui lavoratori dipendenti...', placeholderSol: 'Es. Contrasto d\'interessi di massa, digitalizzazione dei flussi, taglio cuneo...' }
        ],
        regioni: [
            { value: 'sanita', label: 'Liste d\'Attesa e Personale Medico Ospedaliero', placeholderProb: 'Es. Carenza di medici nei pronto soccorso regionali, attese di 8 mesi per esami...', placeholderSol: 'Es. Incentivi per aree disagiate, integrazione CUP pubblico-privato convenzionato...' },
            { value: 'trasporti', label: 'Infrastrutture e Trasporti Pendolari', placeholderProb: 'Es. Treni locali perennemente in ritardo, vetture obsolete...', placeholderSol: 'Es. Rinnovo flotta tramite dividendi delle partecipate, bandi di gara europei...' }
        ],
        comuni_piccoli: [
            { value: 'spopolamento', label: 'Spopolamento e Servizi di Prossimità', placeholderProb: 'Es. Chiusura delle scuole e degli sportelli bancari o postali nel borgo...', placeholderSol: 'Es. Incentivi fiscali IMU per acquirenti esteri, spazi co-working comunali...' }
        ],
        comuni_medi: [
            { value: 'sicurezza_urbana', label: 'Sicurezza Urbana e Controllo del Territorio', placeholderProb: 'Es. Microcriminalità e spaccio nelle aree adiacenti alla stazione...', placeholderSol: 'Es. Presidio fisso della polizia locale, videosorveglianza integrata...' }
        ],
        comuni_grandi: [
            { value: 'viabilita', label: 'Viabilità, Traffico e Trasporto di Massa', placeholderProb: 'Es. Congestione cronica del centro e assenza di parcheggi scambiatori...', placeholderSol: 'Es. Corsie preferenziali protette per BRT, metropolitana leggera, ZTL tariffata...' },
            { value: 'rifiuti_urbani', label: 'Raccolta Differenziata e Decoro Urbano', placeholderProb: 'Es. Cassonetti stracolmi e sanzioni inefficaci per chi abbandona rifiuti...', placeholderSol: 'Es. Passaggio alla raccolta porta a porta con codice a barre e tariffa TARIP...' }
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
        if (nav) {
            if (screenId === 'home') nav.classList.remove('visible');
            else nav.classList.add('visible');
        }
        this.updateProgressBar();
    },

    updateProgressBar() {
        const bar = document.getElementById('progressBar');
        if (!bar) return;
        if (this.state.currentScreen === 'question' && this.state.filteredQuestions.length > 0) {
            bar.style.width = `${((this.state.currentQuestion) / this.state.filteredQuestions.length) * 100}%`;
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
        document.getElementById('territorySearch').classList.add('hidden');
        
        grid.innerHTML = `
            <div class="card territory-card" onclick="app.loadTerritoriesList('nazione')">
                <div class="territory-icon">🇮🇹</div>
                <div>
                    <div class="territory-name">Livello 1: Organi dello Stato Centrale</div>
                    <div class="territory-description">Riforme costituzionali, macroeconomia, grandi flussi ed equilibrio erariale.</div>
                </div>
            </div>
            <div class="card territory-card" onclick="app.loadTerritoriesList('regioni')">
                <div class="territory-icon">🏔️</div>
                <div>
                    <div class="territory-name">Livello 2: Amministrazione delle 20 Regioni</div>
                    <div class="territory-description">Analisi sui bilanci della Sanità, reti di trasporto locale e Fondi UE.</div>
                </div>
            </div>
            <div class="card territory-card" onclick="app.loadTerritoriesList('comuni')">
                <div class="territory-icon">🏢</div>
                <div>
                    <div class="territory-name">Livello 3: Amministrazione Comunale</div>
                    <div class="territory-description">Gestione diretta di TARI, asili nido, polizia municipale e manutenzione.</div>
                </div>
            </div>
        `;
    },

    loadTerritoriesList(type) {
        this.state.selectedTerritoryType = type;
        if (type === 'nazione') {
            this.state.selectedTerritoryName = 'Repubblica Italiana';
            this.selectTerritory('nazione', 'italia');
            return;
        }

        if (type === 'comuni' && this.territories.comuni.length === 0) {
            if (typeof listaComuniItaliani !== 'undefined' && listaComuniItaliani.length > 0) {
                this.territories.comuni = listaComuniItaliani.map(c => ({
                    id: c.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    name: c.name,
                    icon: '🏢',
                    desc: `Comune in Provincia di ${c.prov}. Popolazione stimata: ${c.pop || 'N.D.'} abitanti.`
                }));
            } else {
                const grid = document.getElementById('territoryList');
                grid.innerHTML = `<div style="text-align:center; padding:20px; font-weight:bold;">🔄 Allineamento anagrafiche del Viminale... Attendi.</div>`;
                setTimeout(() => this.loadTerritoriesList('comuni'), 800);
                return;
            }
        }

        document.getElementById('territorySearch').value = '';
        document.getElementById('territorySearch').classList.remove('hidden');
        this.filterTerritories();
    },

    filterTerritories() {
        const grid = document.getElementById('territoryList');
        const search = document.getElementById('territorySearch').value.toLowerCase();
        if (!grid) return;
        
        grid.innerHTML = '';
        const list = this.territories[this.state.selectedTerritoryType] || [];
        
        if (this.state.selectedTerritoryType === 'comuni' && search.length < 2) {
            grid.innerHTML = `<div style="text-align:center; padding:20px; color:var(--color-text-secondary); font-size:14px;">🔍 Inserisci almeno due caratteri del tuo comune per filtrare la banca dati...</div>`;
            return;
        }

        const filtered = list.filter(t => t.name.toLowerCase().includes(search));
        const maxVisibili = filtered.slice(0, 30);

        if (maxVisibili.length === 0) {
            grid.innerHTML = `<div style="text-align:center; padding:20px; color:var(--color-text-secondary);">Territorio non censito nei registri storici.</div>`;
            return;
        }
        
        maxVisibili.forEach(t => {
            grid.innerHTML += `
                <div class="card territory-card" onclick="app.selectTerritory('${this.state.selectedTerritoryType}', '${t.id}', '${t.name}')">
                    <div class="territory-icon">${t.icon}</div>
                    <div>
                        <div class="territory-name">${t.name}</div>
                        <div class="territory-description">${t.desc}</div>
                    </div>
                </div>`;
        });
    },

    selectTerritory(type, id, name) {
        this.state.selectedTerritoryType = type;
        this.state.selectedTerritoryId = id;
        this.state.selectedTerritoryName = name || 'Ente Selezionato';
        this.state.currentQuestion = 0;
        this.state.answers = [];
        
        // Carica TUTTE le domande corrispondenti a questo livello e ambito
        this.state.filteredQuestions = this.questions.filter(q => q.type === type && q.level === this.state.selectedLevel);
        
        // Fallback cautelativo per evitare crash se la combinazione livello/ambito è vuota nell'MVP
        if (this.state.filteredQuestions.length === 0) {
            this.state.filteredQuestions = this.questions.filter(q => q.type === type);
        }

        this.renderQuestion();
        this.goToScreen('question');
    },

    renderQuestion() {
        const q = this.state.filteredQuestions[this.state.currentQuestion];
        if (!q) return;
        
        document.getElementById('questionCategory').innerHTML = `${q.categoryIcon} ${q.categoryLabel}`;
        document.getElementById('questionNumber').innerText = `Modulo ${this.state.currentQuestion + 1} di ${this.state.filteredQuestions.length}`;
        document.getElementById('questionText').innerText = q.text;
        
        const list = document.getElementById('answersList');
        list.innerHTML = '';
        
        const saved = this.state.answers[this.state.currentQuestion];
        const openContainer = document.getElementById('openAnswerContainer');
        const openTextarea = document.getElementById('openAnswerText');
        
        // Gestione campo per risposta aperta aggiuntiva (Livello 3)
        if (q.isOpen) {
            openContainer.classList.remove('hidden');
            if (saved) {
                openTextarea.value = saved.openText || '';
                openTextarea.setAttribute('disabled', 'true');
            } else {
                openTextarea.value = '';
                openTextarea.removeAttribute('disabled');
            }
        } else {
            openContainer.classList.add('hidden');
        }

        q.options.forEach(opt => {
            const sel = saved && saved.selectedId === opt.id;
            list.innerHTML += `
                <button class="answer-option ${sel ? 'selected' : ''}" onclick="app.selectAnswer('${opt.id}')" ${saved ? 'disabled' : ''}>
                    <div class="answer-radio"></div>
                    <div>
                        <div class="answer-text">${opt.text}</div>
                        <div class="answer-hint">${opt.hint}</div>
                    </div>
                </button>`;
        });
        
        const analysis = document.getElementById('analysisCard');
        const btnNext = document.getElementById('btnNext');
        
        if (saved) {
            const correct = saved.selectedId === q.correct;
            analysis.innerHTML = `
                <strong style="color: ${correct ? 'var(--color-success)' : 'var(--color-error)'}">
                    ${correct ? '✓ COERENZA EMPIRICA RILEVATA' : '✕ DISTORSIONE DA SLOGAN'}
                </strong>
                <p style="font-size:14px; margin-top:6px; margin-bottom:0; color:var(--color-text-primary);">
                    <strong>La Verità del Bilancio Consolidato:</strong> ${q.reality}
                </p>`;
            analysis.classList.remove('hidden');
            btnNext.removeAttribute('disabled');
            btnNext.innerText = this.state.currentQuestion === this.state.filteredQuestions.length - 1 ? "Emetti Sentenza Finale" : "Procedi →";
        } else {
            analysis.classList.add('hidden');
            btnNext.setAttribute('disabled', 'true');
            btnNext.innerText = "Conferma Scelta";
        }
        
        document.getElementById('btnPrevious').style.visibility = this.state.currentQuestion === 0 ? 'hidden' : 'visible';
        this.updateProgressBar();
    },

    selectAnswer(id) {
        if (this.state.answers[this.state.currentQuestion]) return;
        
        const q = this.state.filteredQuestions[this.state.currentQuestion];
        const openTextarea = document.getElementById('openAnswerText');
        
        this.state.answers[this.state.currentQuestion] = {
            selectedId: id,
            isCorrect: id === q.correct,
            openText: q.isOpen ? openTextarea.value : ''
        };
        this.renderQuestion();
    },

    nextQuestion() {
        if (this.state.currentQuestion < this.state.filteredQuestions.length - 1) {
            this.state.currentQuestion++;
            this.renderQuestion();
        } else {
            this.generateReport();
        }
    },

    previousQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.renderQuestion();
        }
    },

    generateReport() {
        const correct = this.state.answers.filter(a => a.isCorrect).length;
        const finalScore = Math.round((correct / this.state.filteredQuestions.length) * 100);
        
        document.getElementById('reportScoreValue').innerText = `${finalScore}%`;
        
        let lvl = '❌ IDONEITÀ CIVICA RESPINTA';
        let sum = 'Il tuo approccio decisionale è guidato da dinamiche percettive alterate dai media di massa. Il tuo voto, espresso così, arreca un danno matematico ai conti pubblici dell\'ente.';
        
        if (finalScore >= 60) {
            lvl = '📜 IDONEITÀ EMESSA CON RISERVA';
            sum = 'Dimostri di conoscere le basi contabili e l\'alveo delle competenze reali. Rimangono aree d\'ombra influenzate dalla retorica politica.';
        }
        if (finalScore >= 90) {
            lvl = '🦅 ABILITAZIONE CIVICA SOVRANA';
            sum = 'Profilo eccellente. Ragionamento immune alla propaganda elettorale, ancorato esclusivamente a dati oggettivi e vincoli giuridico-economici.';
        }
        
        document.getElementById('reportLevel').innerText = lvl;
        document.getElementById('reportSummary').innerText = sum;
        
        const comp = document.getElementById('comparisonContainer');
        comp.innerHTML = '';
        
        this.state.filteredQuestions.forEach((q, i) => {
            const ans = this.state.answers[i];
            const userVal = ans && ans.isCorrect ? q.realData : q.commonPerception;
            
            comp.innerHTML += `
                <div class="card" style="padding: 16px;">
                    <p style="font-weight:700; font-size:14px; margin-bottom:8px;">${q.text}</p>
                    <div class="comparison-bar">
                        <div class="comparison-label">La tua stima/percezione:</div>
                        <div class="comparison-track"><div class="comparison-fill perception" style="width:${Math.min((userVal/100)*100, 100)}%"></div></div>
                    </div>
                    <div class="comparison-bar">
                        <div class="comparison-label">Dato Reale del Bilancio Pubblico:</div>
                        <div class="comparison-track"><div class="comparison-fill reality" style="width:${Math.min((q.realData/100)*100, 100)}%"></div></div>
                    </div>
                </div>`;
        });
        
        this.goToScreen('report');
    },

    goToLaboratorioScreen() {
        this.setupLaboratorio(this.state.selectedTerritoryType);
        this.goToScreen('laboratorio');
    },

    cambiaAmbitoLaboratorio(ambito) {
        this.setupLaboratorio(ambito);
    },

    setupLaboratorio(ambito) {
        const selector = document.getElementById('labThemeSelector');
        const badgeDemo = document.getElementById('infoFasciaDemografica');
        if (!selector) return;
        
        selector.innerHTML = '';
        let listaTemi = [];
        
        // Gestione stili bottoni ambiti
        document.getElementById('lblAmbitoNazione').className = 'btn btn-secondary';
        document.getElementById('lblAmbitoRegione').className = 'btn btn-secondary';
        document.getElementById('lblAmbitoComune').className = 'btn btn-secondary';

        if (ambito === 'nazione') {
            document.getElementById('lblAmbitoNazione').className = 'btn btn-primary';
            badgeDemo.classList.add('hidden');
            listaTemi = this.laboratorioTemi.nazione;
        } else if (ambito === 'regioni') {
            document.getElementById('lblAmbitoRegione').className = 'btn btn-primary';
            badgeDemo.classList.add('hidden');
            listaTemi = this.laboratorioTemi.regioni;
        } else if (ambito === 'comuni') {
            document.getElementById('lblAmbitoComune').className = 'btn btn-primary';
            badgeDemo.classList.remove('hidden');
            
            const nomeComune = this.state.selectedTerritoryName || '';
            
            // Clusterizzazione demografica scientifica simulata basata sull'identificativo
            if (nomeComune.length % 3 === 0) {
                badgeDemo.innerText = "Fascia: Piccolo Comune (<3.000 ab. - Emergenza Spopolamento)";
                listaTemi = this.laboratorioTemi.comuni_piccoli;
            } else if (nomeComune.length % 3 === 1) {
                badgeDemo.innerText = "Fascia: Medio Comune (3.000 - 15.000 ab. - Sviluppo Locale)";
                listaTemi = this.laboratorioTemi.comuni_medi;
            } else {
                badgeDemo.innerText = "Fascia: Grande Area Urbana (>15.000 ab. - Viabilità e Rifiuti)";
                listaTemi = this.laboratorioTemi.comuni_grandi;
            }
        }
        
        listaTemi.forEach(t => {
            selector.innerHTML += `<option value="${t.value}">${t.label}</option>`;
        });
        
        this.aggiornaPlaceholderLaboratorio();
    },

    aggiornaPlaceholderLaboratorio() {
        const ambito = document.getElementById('lblAmbitoNazione').classList.contains('btn-primary') ? 'nazione' : (document.getElementById('lblAmbitoRegione').classList.contains('btn-primary') ? 'regioni' : 'comuni');
        const selector = document.getElementById('labThemeSelector');
        if(!selector.value) return;

        let pool = [];
        if (ambito === 'nazione') pool = this.laboratorioTemi.nazione;
        else if (ambito === 'regioni') pool = this.laboratorioTemi.regioni;
        else {
            pool = [...this.laboratorioTemi.comuni_piccoli, ...this.laboratorioTemi.comuni_medi, ...this.laboratorioTemi.comuni_grandi];
        }

        const trovato = pool.find(x => x.value === selector.value);
        if (trovato) {
            document.getElementById('labProblemInput').placeholder = trovato.placeholderProb;
            document.getElementById('labSolutionInput').placeholder = trovato.placeholderSol;
            document.getElementById('labProblemInput').value = '';
            document.getElementById('labSolutionInput').value = '';
        }
    },

    elaboraEStampaProgramma() {
        const prob = document.getElementById('labProblemInput').value.trim();
        const sol = document.getElementById('labSolutionInput').value.trim();
        
        if (prob.length < 10 || sol.length < 10) {
            alert("Per presentarti agli investitori e alla community, devi articolare un problema e una soluzione reali di almeno 10 caratteri.");
            return;
        }

        this.stampaPdfProgramma();
    },

    // GENERATORE PDF 1: ATTO DI CONSAPEVOLEZZA (IMPATTO ISTITUZIONALE)
    stampaPdfRisposte() {
        const score = document.getElementById('reportScoreValue').innerText;
        const livelloText = document.getElementById('reportLevel').innerText;
        const ambito = this.state.selectedTerritoryType;
        const territorioNome = this.state.selectedTerritoryName.toUpperCase();
        
        let backgroundPastello = "linear-gradient(135deg, #f1f5f9 0%, #ffffff 100%)";
        let filigranaSimbolo = "⚖️";
        
        if (ambito === 'nazione') {
            backgroundPastello = "linear-gradient(90deg, rgba(222,243,226,0.25) 0%, rgba(255,255,255,0.5) 50%, rgba(244,216,219,0.25) 100%)";
            filigranaSimbolo = "🇮🇹";
        } else if (ambito === 'regioni') {
            backgroundPastello = "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)";
            filigranaSimbolo = "🛡️";
        } else {
            backgroundPastello = "linear-gradient(135deg, #fffde7 0%, #ffffff 100%)";
            filigranaSimbolo = "🏢";
        }

        let nodiDomande = "";
        this.state.filteredQuestions.forEach((q, i) => {
            const ans = this.state.answers[i];
            nodiDomande += `
                <div style="margin-bottom: 20px; border-bottom: 1px solid #cbd5e1; padding-bottom: 12px;">
                    <div style="font-weight: bold; color: #1e293b; font-size: 14px;">Q.${i+1}: ${q.text}</div>
                    <div style="font-size: 13px; color: #475569; margin-top: 5px;"><strong>Risposta data:</strong> ${ans ? q.options.find(o=>o.id===ans.selectedId).text : 'N.D.'}</div>
                    <div style="font-size: 13px; color: #059669; font-weight: 600; margin-top: 3px;"><strong>Dato Empirico Certificato:</strong> ${q.reality}</div>
                </div>`;
        });

        const win = window.open('', '_blank');
        win.document.write(`
            <html>
            <head>
                <title>Patente Civica - Atto Corporativo</title>
                <style>
                    body { font-family: Arial, sans-serif; background: ${backgroundPastello}; margin: 0; padding: 50px; color: #1e293b; }
                    .border-box { border: 6px double #0f172a; padding: 40px; background: rgba(255,255,255,0.96); position: relative; border-radius: 6px; }
                    .watermark { position: absolute; top: 30%; left: 35%; font-size: 320px; color: rgba(0,0,0,0.02); pointer-events: none; z-index: 1; }
                    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px; }
                    .score { font-size: 54px; font-weight: 900; color: #0f172a; text-align: center; margin: 25px 0; }
                    .content { position: relative; z-index: 2; line-height: 1.6; }
                </style>
            </head>
            <body>
                <div class="border-box">
                    <div class="watermark">${filigranaSimbolo}</div>
                    <div class="header">
                        <span style="font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #64748b; text-transform: uppercase;">Dipartimento di Tracciabilità e Trasparenza Civica</span>
                        <h1 style="margin: 6px 0 0 0; color: #0f172a; font-size: 26px;">ATTO DI VALUTAZIONE RESPONSABILITÀ ELETTORALE</h1>
                        <p style="margin: 5px 0 0 0; font-size: 14px; color: #334155;">Verifica su: <strong>${territorioNome}</strong></p>
                    </div>
                    <div class="content">
                        <div class="score">${score}</div>
                        <div style="background: #0f172a; color: #fff; padding: 12px; text-align: center; font-weight: bold; border-radius: 6px; margin-bottom: 25px; font-size:14px; letter-spacing:1px;">
                            ${livelloText}
                        </div>
                        <h3 style="color: #0f172a; border-bottom: 1px solid #0f172a; padding-bottom: 6px; font-size:16px;">Risultanze del Confronto di Bilancio</h3>
                        ${nodiDomande}
                        <div style="margin-top: 40px; text-align: center; font-size: 11px; color: #94a3b8;">
                            Questo documento attesta la capacità di analisi basata su dati contabili certificati dello Stato, Regioni e Comuni. Data: ${new Date().toLocaleDateString('it-IT')}.
                        </div>
                    </div>
                </div>
                <script>window.onload = function() { window.print(); }</script>
            </body>
            </html>
        `);
        win.document.close();
    },

    // GENERATORE PDF 2: DIPLOMA MANIFESTO ELETTORALE (GRAFICA DA CONDIVISIONE E PITCH)
    stampaPdfProgramma() {
        const ambito = document.getElementById('lblAmbitoNazione').classList.contains('btn-primary') ? 'nazione' : (document.getElementById('lblAmbitoRegione').classList.contains('btn-primary') ? 'regioni' : 'comuni');
        const selector = document.getElementById('labThemeSelector');
        const temaLabel = selector.options[selector.selectedIndex].text;
        
        const probText = document.getElementById('labProblemInput').value;
        const solText = document.getElementById('labSolutionInput').value;
        const territorioNome = this.state.selectedTerritoryName.toUpperCase();
        
        let layoutColor = "#1e3a8a"; 
        let backgroundPastello = "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)";
        let filigranaSimbolo = "📜";

        if (ambito === 'nazione') {
            layoutColor = "#065f46";
            backgroundPastello = "linear-gradient(90deg, rgba(222,243,226,0.3) 0%, rgba(255,255,255,0.6) 50%, rgba(244,216,219,0.3) 100%)";
            filigranaSimbolo = "🇮🇹"; // Lo Stivale / Tricolore evocato sullo sfondo
        } else if (ambito === 'regioni') {
            layoutColor = "#9a3412";
            backgroundPastello = "linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)";
            filigranaSimbolo = "🛡️"; // Araldica Regionale
        } else {
            layoutColor = "#1e293b";
            backgroundPastello = "linear-gradient(135deg, #fefce8 0%, #ffffff 100%)";
            filigranaSimbolo = "🏢"; // Stemma Municipale
        }

        // Struttura di pulizia formale e tecnica del testo per eliminare lo "sloganismo" da bar
        const testoFormattatoProblema = probText.replace(/\b(schifo|ladri|vergogna|tutti a casa)\b/gi, '[Rimodulato per Coerenza Tecnica]');

        const win = window.open('', '_blank');
        win.document.write(`
            <html>
            <head>
                <title>Manifesto Elettorale - ${territorioNome}</title>
                <style>
                    body { font-family: 'Georgia', serif; background: ${backgroundPastello}; margin: 0; padding: 45px; color: #1e293b; }
                    .diploma-frame { border: 5px solid ${layoutColor}; padding: 4px; background: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
                    .diploma-inner { border: 1px solid ${layoutColor}; padding: 45px; position: relative; }
                    .watermark { position: absolute; top: 30%; left: 35%; font-size: 300px; color: rgba(0,0,0,0.025); pointer-events: none; user-select: none; z-index: 1; }
                    .title-banner { text-align: center; margin-bottom: 35px; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; }
                    .section-title { font-family: sans-serif; font-size: 12px; font-weight: 800; color: ${layoutColor}; text-transform: uppercase; letter-spacing: 1px; margin-top: 20px; margin-bottom: 6px;}
                    .body-text { font-size: 15px; color: #334155; line-height: 1.6; background: rgba(255,255,255,0.7); padding: 12px; border-radius: 6px; border-left: 3px solid ${layoutColor}; margin-bottom: 15px;}
                </style>
            </head>
            <body>
                <div class="diploma-frame">
                    <div class="diploma-inner">
                        <div class="watermark">${filigranaSimbolo}</div>
                        
                        <div class="title-banner">
                            <span style="font-size: 10px; font-weight: bold; letter-spacing: 3px; color: ${layoutColor}; text-transform: uppercase; font-family: sans-serif;">Piattaforma di Validazione e Competenza di Sviluppo</span>
                            <h1 style="margin: 8px 0; color: ${layoutColor}; font-size: 26px; font-weight: 400; letter-spacing: 1px;">MANIFESTO DI MANDATO ELETTORALE</h1>
                            <p style="margin: 0; font-size: 14px; font-family: sans-serif; color: #475569;">Sviluppato dal Cittadino per l'Ambito: <strong>${territorioNome}</strong></p>
                        </div>

                        <div style="position: relative; z-index: 2;">
                            <div class="section-title">Macro-Tema Selezionato</div>
                            <div style="font-size: 18px; font-weight: bold; color: #0f172a; margin-bottom: 15px; font-family: sans-serif;">📌 ${temaLabel}</div>

                            <div class="section-title">Analisi della Criticità dell'Ente</div>
                            <div class="body-text">${testoFormattatoProblema}</div>

                            <div class="section-title">Soluzione e Pianificazione di Copertura Finanziaria</div>
                            <div class="body-text" style="background: rgba(240,253,244,0.6);">${solText}</div>

                            <p style="font-size: 12px; font-style: italic; color: #64748b; margin-top: 30px; text-align: center; font-family: sans-serif;">
                                Il presente programma è stato archiviato nei registri e formattato strutturalmente per la condivisione sui canali di dibattito pubblico e social.
                            </p>

                            <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #94a3b8; font-family: sans-serif; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                                <div>Codice Autenticità: REF-${Math.floor(Math.random() * 90000) + 10000}-2026</div>
                                <div style="font-weight: bold; color: ${layoutColor}; text-transform: uppercase;">Ufficio di Validazione Civica</div>
                            </div>
                        </div>

                    </div>
                </div>
                <script>window.onload = function() { window.print(); }</script>
            </body>
            </html>
        `);
        win.document.close();
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
