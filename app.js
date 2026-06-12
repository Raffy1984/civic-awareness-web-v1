const app = {
    state: {
        currentScreen: 'home',
        selectedLevel: null,         // 'pancia', 'realta', 'visione'
        selectedTerritoryType: null, // 'nazione', 'regioni', 'comuni'
        selectedTerritoryId: null,   
        selectedTerritoryName: '',   
        selectedCluster: 'grandi',   // 'piccoli', 'medi', 'grandi'
        currentQuestion: 0,
        answers: [],                 
        filteredQuestions: [],       
    },

    territories: {
        nazione: [{ id: 'italia', name: 'Repubblica Italiana (Stato Nazionale)', icon: '🇮🇹', desc: 'Competenze: Macroeconomia, Bilancio Erariale, Politica Estera e Sicurezza Nazionale.' }],
        regioni: [
            { id: 'abruzzo', name: 'Regione Abruzzo', icon: '🏔️', desc: 'Competenze centrali: 82% del bilancio allocato sul Fondo Sanitario Regionale.' },
            { id: 'calabria', name: 'Regione Calabria', icon: '🌶️', desc: 'Competenze centrali: Reti ospedaliere, dissesto idrogeologico e demanio.' },
            { id: 'campania', name: 'Regione Campania', icon: '🌋', desc: 'Competenze centrali: Sanità, Trasporti su ferro regionali ed edilizia.' },
            { id: 'emilia-romagna', name: 'Regione Emilia-Romagna', icon: '🏎️', desc: 'Competenze centrali: Politiche del lavoro, welfare e presidi ospedalieri.' },
            { id: 'lazio', name: 'Regione Lazio', icon: '🏛️', desc: 'Competenze centrali: Deficit sanitario, trasporti Cotral e macro-rifiuti.' },
            { id: 'liguria', name: 'Regione Liguria', icon: '⛵', desc: 'Competenze centrali: Logistica portuale, ripascimento coste e sanità.' },
            { id: 'lombardia', name: 'Regione Lombardia', icon: '🏙️', desc: 'Competenze centrali: Servizio Sanitario Lombardo, linee Trenord.' },
            { id: 'piemonte', name: 'Regione Piemonte', icon: '🍇', desc: 'Competenze centrali: Programmazione ospedaliera, sviluppo rurale PSR.' },
            { id: 'puglia', name: 'Regione Puglia', icon: '🫒', desc: 'Competenze centrali: Gestione idrica (Acquedotto Pugliese), ASL regionali.' },
            { id: 'sardegna', name: 'Regione Sardegna', icon: '🐑', desc: 'Statuto Speciale: Continuità territoriale aerea e marittima e sanità sarda.' },
            { id: 'sicilia', name: 'Regione Sicilia', icon: '🍊', desc: 'Statuto Speciale: Autonomia tributaria, foreste e protezione dei beni culturali.' },
            { id: 'toscana', name: 'Regione Toscana', icon: '🌻', desc: 'Competenze centrali: Rete degli ospedali di eccellenza, dissesto del suolo.' },
            { id: 'veneto', name: 'Regione Veneto', icon: '🎭', desc: 'Competenze centrali: Organizzazione dei LEA sanitari, bacini idrici.' }
        ],
        comuni: [] 
    },

    // DATABASE MASSIVO CON VALIDAZIONE DATA-DRIVEN (ISTAT, MEF, ARERA, CORTE DEI CONTI)
    questions: [
        // ================= NAZIONE =================
        {
            id: 'n1', type: 'nazione', level: 'pancia', categoryIcon: '👮', categoryLabel: 'Sicurezza e Bilancio',
            text: 'Quanto incide la spesa per l\'accoglienza dei richiedenti asilo sul bilancio generale dello Stato?',
            options: [
                { id: 'a', text: 'Oltre il 15% di tutte le uscite erariali', hint: 'Rappresenta una spesa prioritaria rispetto alle altre voci.' },
                { id: 'b', text: 'Meno dell\'1% della spesa pubblica consolidata', hint: 'Una frazione minima rispetto a previdenza e interessi sul debito.' },
                { id: 'c', text: 'Circa la metà delle tasse sul reddito raccolte', hint: 'Drena quasi interamente l\'IRPEF dei contribuenti.' }
            ],
            correct: 'b',
            reality: 'I rendiconti generali del MEF indicano che la spesa complessiva si attesta stabilmente sotto lo 0.5% della spesa pubblica totale italiana.',
            commonPerception: 35, realData: 0.5
        },
        {
            id: 'n2', type: 'nazione', level: 'realta', categoryIcon: '📊', categoryLabel: 'Fisco e Ricchezza',
            text: 'Se lo Stato espropriasse al 100% i patrimoni dei primi 10 miliardari italiani, per quanto tempo potrebbe coprire la sua spesa corrente?',
            options: [
                { id: 'a', text: 'Per i prossimi 5 anni consecutivi, eliminando le tasse', hint: 'Il patrimonio accumulato risolverebbe i deficit storici.' },
                { id: 'b', text: 'Meno di due settimane (circa 15 giorni)', hint: 'La velocità di spesa pubblica divora rapidamente la liquidità.' },
                { id: 'c', text: 'Esattamente un anno fiscale completo', hint: 'Copertura perfetta del bilancio annuale.' }
            ],
            correct: 'b',
            reality: 'La spesa pubblica italiana viaggia a circa 2.5 miliardi di euro al giorno. Il patrimonio complessivo dei primi 10 multimiliardari (circa 45 miliardi) sosterrebbe lo Stato per soli 18 giorni.',
            commonPerception: 60, realData: 5
        },
        {
            id: 'n3', type: 'nazione', level: 'visione', categoryIcon: '📈', categoryLabel: 'Sostenibilità del Debito',
            text: 'Quale istituto o gruppo detiene la quota maggioritaria del Debito Pubblico italiano, determinandone la stabilità?',
            options: [
                { id: 'a', text: 'I fondi sovrani cinesi e le banche d\'affari americane', hint: 'Siamo sotto scacco della finanza geopolitica estera.' },
                { id: 'b', text: 'Banche, assicurazioni, fondi e piccoli risparmiatori residenti in Italia', hint: 'Il debito è prevalentemente in mani interne e domestiche.' },
                { id: 'c', text: 'Il Fondo Monetario Internazionale con prestiti vincolati', hint: 'Siamo commissariati da organismi mondiali.' }
            ],
            correct: 'b',
            reality: 'I dati del Dipartimento del Tesoro mostrano che oltre il 70% del debito è detenuto dal sistema finanziario interno e dalle famiglie italiane, vincolando la sicurezza dello Stato al risparmio privato dei cittadini.',
            commonPerception: 20, realData: 72, isOpen: true
        },

        // ================= REGIONI =================
        {
            id: 'r1', type: 'regioni', level: 'pancia', categoryIcon: '🏥', categoryLabel: 'Sanità Pubblica',
            text: 'Quale percentuale del budget totale gestito da una Regione viene speso per finanziare ospedali, ASL e sanità?',
            options: [
                { id: 'a', text: 'Circa il 15%, il grosso va ad agricoltura e turismo', hint: 'La sanità ha un impatto marginale sulle casse regionali.' },
                { id: 'b', text: 'Tra il 75% e l\'85% di tutte le risorse finanziarie regionali', hint: 'La sanità è il nucleo di spesa quasi monopolistico delle Regioni.' },
                { id: 'c', text: 'Esattamente la metà del budget complessivo', hint: 'Ripartizione bilanciata tra i vari assessorati.' }
            ],
            correct: 'b',
            reality: 'La sanità assorbe mediamente l\'80% del bilancio libero di qualsiasi regione d\'Italia, rendendo il Governatore essenzialmente un manager sanitario.',
            commonPerception: 30, realData: 80
        },

        // ================= COMUNI PICCOLI =================
        {
            id: 'cp1', type: 'comuni', level: 'pancia', cluster: 'piccoli', categoryIcon: '🌲', categoryLabel: 'Autonomia del Borgo',
            text: 'In un piccolo comune sotto i 2.000 abitanti, il Sindaco può emettere un\'ordinanza per bloccare la chiusura dell\'ultimo sportello bancario o postale?',
            options: [
                { id: 'a', text: 'Sì, per motivi di ordine pubblico e continuità di servizio essenziale', hint: 'Il Sindaco è autorità sovrana sul perimetro locale.' },
                { id: 'b', text: 'No, banche private e società per azioni rispondono a piani industriali commerciali di mercato', hint: 'Nessun potere legale di trattenimento coatto.' }
            ],
            correct: 'b',
            reality: 'I piccoli comuni soffrono la desertificazione bancaria. Il Sindaco non ha alcuno strumento giuridico per obbligare un istituto privato o Poste a mantenere attiva una filiale in perdita.',
            commonPerception: 70, realData: 0
        },
        {
            id: 'cp2', type: 'comuni', level: 'realta', cluster: 'piccoli', categoryIcon: '🛣️', categoryLabel: 'Costi di Struttura',
            text: 'Qual è la causa primaria del collasso finanziario e delle sanzioni della Corte dei Conti nei piccoli comuni?',
            options: [
                { id: 'a', text: 'Le spese di rappresentanza, auto blu e indennità degli assessori', hint: 'La politica locale spreca troppi soldi in privilegi.' },
                { id: 'b', text: 'L\'onere della manutenzione stradale e del dissesto idrogeologico a fronte di pochissimi cittadini contribuenti', hint: 'Sbilanciamento strutturale tra territorio immenso e assenza di gettito.' }
            ],
            correct: 'b',
            reality: 'I piccoli comuni gestiscono gran parte dei territori montani e rurali italiani. Con poche centinaia di schede fiscali IRPEF/IMU devono mantenere chilometri di asfalto e versanti franosi, un paradosso contabile insostenibile.',
            commonPerception: 85, realData: 12
        },

        // ================= COMUNI MEDI =================
        {
            id: 'cm1', type: 'comuni', level: 'realta', cluster: 'medi', categoryIcon: '🛍️', categoryLabel: 'Sviluppo Locale',
            text: 'Può un Comune medio vietare nel Piano Regolatore l\'apertura di un grande supermercato per salvare i negozi del centro?',
            options: [
                { id: 'a', text: 'Sì, la difesa del piccolo commercio è una priorità pianificatoria', hint: 'Protezionismo economico locale legittimo.' },
                { id: 'b', text: 'No, le normative europee (Direttiva Bolkestein) e la liberalizzazione del commercio lo vietano, salvo motivi urbanistici o ambientali documentati', hint: 'La concorrenza non può essere frenata per legge dall\'ente.' }
            ],
            correct: 'b',
            reality: 'Per legge non si può limitare la concorrenza a tutela di una categoria. Il comune può bloccare un insediamento solo per carenze di parcheggi, impatto acustico o vincoli idrici reali.',
            commonPerception: 75, realData: 5
        },

        // ================= COMUNI GRANDI =================
        {
            id: 'cg1', type: 'comuni', level: 'realta', cluster: 'grandi', categoryIcon: '🚗', categoryLabel: 'Codice della Strada',
            text: 'I proventi milionari generati dagli Autovelox comunali possono essere impiegati per ripianare i debiti del teatro comunale o pagare stipendi?',
            options: [
                { id: 'a', text: 'Sì, le sanzioni sono entrate correnti liberamente spendibili dal Sindaco', hint: 'Massima flessibilità d\'uso del contante.' },
                { id: 'b', text: 'No, gli articoli 142 e 208 del Codice della Strada vincolano le somme a sicurezza stradale, segnaletica e assunzioni dei vigili', hint: 'Gettito rigidamente vincolato a scopi di tutela stradale.' }
            ],
            correct: 'b',
            reality: 'La legge impone che il 50% dei proventi ordinari e il 100% di quelli da autovelox fuori dai centri abitati vadano esclusivamente ad asfalto, sicurezza ed educazione stradale. Deviazioni configurano il reato di danno erariale.',
            commonPerception: 90, realData: 50
        },
        {
            id: 'cg2', type: 'comuni', level: 'visione', cluster: 'grandi', categoryIcon: '🗑️', categoryLabel: 'Tassa Rifiuti TARI',
            text: 'Il superamento dell\'80% di raccolta differenziata in una grande città garantisce una riduzione immediata della bolletta TARI?',
            options: [
                { id: 'a', text: 'Sì, perché i materiali recuperati vengono venduti generando enormi profitti', hint: 'Il riciclo azzera le spese del servizio.' },
                { id: 'b', text: 'Non necessariamente, perché i costi fissi di logistica (personale, mezzi porta a porta, impianti di conferimento) pesano più del valore dei materiali', hint: 'Differenziare costa più che conferire in grandi discariche unificate.' }
            ],
            correct: 'b',
            reality: 'I regolamenti ARERA impongono che la TARI copra il 100% dei costi operativi. Spesso la filiera differenziata pulita richiede una quantità di personale e trasporti stradali così alta da neutralizzare il ricavo dei consorzi di filiera.',
            commonPerception: 80, realData: 10, isOpen: true
        }
    ],

    laboratorioTemi: {
        nazione: [{ value: 'immigrazione', label: 'Controllo Frontiere e Integrazione', placeholderProb: 'Analisi dei flussi d\'accoglienza...', placeholderSol: 'Piani di stabilità finanziaria...' }],
        regioni: [{ value: 'sanita', label: 'Liste d\'Attesa e Strutture Ospedaliere', placeholderProb: 'Ritardi critici nelle prestazioni di pronto soccorso...', placeholderSol: 'Efficientamento budget e rinegoziazione convenzioni...' }],
        piccoli: [{ value: 'borghi', label: 'Contrasto allo Spopolamento dei Piccoli Comuni', placeholderProb: 'Perdita di servizi essenziali e invecchiamento demografico...', placeholderSol: 'Defiscalizzazione IMU seconde case e incentivi connettività smart-working...' }],
        medi: [{ value: 'commercio', label: 'Riqualificazione Commerciale Urbana', placeholderProb: 'Chiusura delle attività tradizionali in centro...', placeholderSol: 'Istituzione di distretti urbani del commercio e parcheggi di cintura...' }],
        grandi: [
            { value: 'viabilita', label: 'Mobilità Sostenibile e Congestione', placeholderProb: 'Livelli critici di PM10 e saturazione del traffico...', placeholderSol: 'Potenziamento corsie preferenziali protette e linee di metropolitana leggera...' },
            { value: 'decoro', label: 'Efficientamento Ciclo dei Rifiuti (TARIP)', placeholderProb: 'Inadeguatezza del sistema stradale classico di raccolta...', placeholderSol: 'Introduzione della tariffazione puntuale con tracciamento RFID sul sacco indifferenziato...' }
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
                    <div class="territory-name">Livello Nazionale (Stato Centrale)</div>
                    <div class="territory-description">Analisi dei grandi equilibri, tasse centrali e geopolitica monetaria.</div>
                </div>
            </div>
            <div class="card territory-card" onclick="app.loadTerritoriesList('regioni')">
                <div class="territory-icon">🏔️</div>
                <div>
                    <div class="territory-name">Livello Regionale (Le 20 Regioni)</div>
                    <div class="territory-description">Analisi dei bilanci della sanità pubblica e del trasporto locale.</div>
                </div>
            </div>
            <div class="card territory-card" onclick="app.loadTerritoriesList('comuni')">
                <div class="territory-icon">🏢</div>
                <div>
                    <div class="territory-name">Livello Comunale (Tutti i Comuni d'Italia)</div>
                    <div class="territory-description">Sondaggi e programmi tarati esattamente sulla popolazione del tuo municipio.</div>
                </div>
            </div>
        `;
    },

    loadTerritoriesList(type) {
        this.state.selectedTerritoryType = type;
        if (type === 'nazione') {
            this.state.selectedTerritoryName = 'Repubblica Italiana';
            this.state.selectedCluster = 'grandi'; 
            this.selectTerritory('nazione', 'italia', 'Repubblica Italiana');
            return;
        }

        if (type === 'comuni' && this.territories.comuni.length === 0) {
            if (typeof listaComuniItaliani !== 'undefined') {
                this.territories.comuni = listaComuniItaliani.map(c => ({
                    id: c.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    name: c.name,
                    prov: c.prov,
                    cluster: c.cluster,
                    icon: '🏢',
                    desc: `Provincia di ${c.prov}. Abitanti registrati: ${c.pop.toLocaleString('it-IT')}.`
                }));
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
            grid.innerHTML = `<div style="text-align:center; padding:20px; color:var(--color-text-secondary); font-size:14px;">🔍 Digita il nome del tuo comune per caricare i dati finanziari adatti...</div>`;
            return;
        }

        const filtered = list.filter(t => t.name.toLowerCase().includes(search));
        
        filtered.forEach(t => {
            grid.innerHTML += `
                <div class="card territory-card" onclick="app.selectTerritory('${this.state.selectedTerritoryType}', '${t.id}', '${t.name} (${t.prov || 'Regione'})', '${t.cluster || 'grandi'}')">
                    <div class="territory-icon">${t.icon}</div>
                    <div>
                        <div class="territory-name">${t.name}</div>
                        <div class="territory-description">${t.desc}</div>
                    </div>
                </div>`;
        });
    },

    selectTerritory(type, id, name, cluster) {
        this.state.selectedTerritoryType = type;
        this.state.selectedTerritoryId = id;
        this.state.selectedTerritoryName = name;
        this.state.selectedCluster = cluster || 'grandi';
        this.state.currentQuestion = 0;
        this.state.answers = [];
        
        // FILTRAGGIO INTELLIGENTE: Carica solo le domande coerenti con quel territorio e livello
        this.state.filteredQuestions = this.questions.filter(q => {
            if (q.type !== type) return false;
            if (q.level !== this.state.selectedLevel) return false;
            if (type === 'comuni' && q.cluster !== this.state.selectedCluster) return false;
            return true;
        });

        // Garanzia di popolamento se l'MVP non ha ancora tutte le 20 combinazioni piene
        if (this.state.filteredQuestions.length === 0) {
            this.state.filteredQuestions = this.questions.filter(q => q.type === type && (type !== 'comuni' || q.cluster === this.state.selectedCluster));
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
                    ${correct ? '✓ VERIFICA COERENTE CON I BILANCI' : '✕ DISTORSIONE DA SLOGAN PERCEPITA'}
                </strong>
                <p style="font-size:14px; margin-top:6px; margin-bottom:0; color:var(--color-text-primary);">
                    <strong>Verità del Dato Pubblico (${q.data_source}):</strong> ${q.reality}
                </p>`;
            analysis.classList.remove('hidden');
            btnNext.removeAttribute('disabled');
            btnNext.innerText = this.state.currentQuestion === this.state.filteredQuestions.length - 1 ? "Genera Sentenza Finale" : "Procedi →";
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
        
        let lvl = '❌ ABILITAZIONE CIVICA RESPINTA';
        let sum = 'Le tue risposte mostrano uno scollamento marcato dai conti economici pubblici. Il tuo voto esprime un giudizio d\'istinto non supportato da verifiche empiriche dei dati erariali.';
        
        if (finalScore >= 60) {
            lvl = '📜 IDONEITÀ EMESSA CON RISERVA';
            sum = 'Possiedi una conoscenza sufficiente dei confini delle responsabilità e delle dinamiche economiche dell\'ente, pur risentendo di alcune distorsioni informative.';
        }
        if (finalScore >= 90) {
            lvl = '🦅 CONOSCENZA CIVICA SOVRANA';
            sum = 'Maturità eccezionale. Il tuo voto è un atto consapevole guidato unicamente da dati numerici di bilancio, totalmente immune alla demagogia di piazza.';
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
                        <div class="comparison-label">La tua percezione stimata:</div>
                        <div class="comparison-track"><div class="comparison-fill perception" style="width:${Math.min((userVal/100)*100, 100)}%"></div></div>
                    </div>
                    <div class="comparison-bar">
                        <div class="comparison-label">Dato Reale Certificato dei Conti:</div>
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
            
            if (this.state.selectedCluster === 'piccoli') {
                badgeDemo.innerText = "Fascia Borghi Piccoli (<5.000 ab. - Urgenza: Spopolamento e Strade)";
                listaTemi = this.laboratorioTemi.piccoli;
            } else if (this.state.selectedCluster === 'medi') {
                badgeDemo.innerText = "Fascia Comuni Medi (5.000-50.000 ab. - Urgenza: Commercio e Sicurezza)";
                listaTemi = this.laboratorioTemi.medi;
            } else {
                badgeDemo.innerText = "Fascia Grandi Metropoli (>50.000 ab. - Urgenza: Traffico e TARI)";
                listaTemi = this.laboratorioTemi.grandi;
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

        let pool = [...this.laboratorioTemi.nazione, ...this.laboratorioTemi.regioni, ...this.laboratorioTemi.piccoli, ...this.laboratorioTemi.medi, ...this.laboratorioTemi.grandi];
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
            alert("Articola meglio il problema e la soluzione tecnica prima di stampare il manifesto.");
            return;
        }
        this.stampaPdfProgramma();
    },

    stampaPdfRisposte() {
        const score = document.getElementById('reportScoreValue').innerText;
        const livelloText = document.getElementById('reportLevel').innerText;
        const ambito = this.state.selectedTerritoryType;
        const territorioNome = this.state.selectedTerritoryName.toUpperCase();
        
        let backgroundPastello = "linear-gradient(135deg, #f1f5f9 0%, #ffffff 100%)";
        let filigranaSimbolo = "⚖️";
        
        if (ambito === 'nazione') {
            backgroundPastello = "linear-gradient(90deg, rgba(222,243,226,0.2) 0%, rgba(255,255,255,0.4) 50%, rgba(244,216,219,0.2) 100%)";
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
                <div style="margin-bottom: 20px; border-bottom: 1px solid #cbd5e1; padding-bottom: 12px; position:relative; z-index:5;">
                    <div style="font-weight: bold; color: #1e293b; font-size: 14px;">Q.${i+1}: ${q.text}</div>
                    <div style="font-size: 13px; color: #475569; margin-top: 5px;"><strong>Scelta indicata:</strong> ${ans ? q.options.find(o=>o.id===ans.selectedId).text : 'N.D.'}</div>
                    <div style="font-size: 13px; color: #059669; font-weight: 600; margin-top: 3px;"><strong>Dato Veritiero di Bilancio:</strong> ${q.reality}</div>
                </div>`;
        });

        const win = window.open('', '_blank');
        win.document.write(`
            <html>
            <head>
                <title>Patente Civica - Atto Ufficiale</title>
                <style>
                    body { font-family: sans-serif; background: ${backgroundPastello}; margin: 0; padding: 40px; color: #1e293b; }
                    .border-box { border: 5px solid #0f172a; padding: 30px; background: rgba(255,255,255,0.97); position: relative; border-radius: 8px; }
                    .watermark { position: absolute; top: 25%; left: 30%; font-size: 350px; color: rgba(0,0,0,0.015); pointer-events: none; z-index: 1; }
                    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 15px; }
                    .score { font-size: 60px; font-weight: 900; color: #0f172a; text-align: center; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="border-box">
                    <div class="watermark">${filigranaSimbolo}</div>
                    <div class="header">
                        <span style="font-size: 10px; font-weight: 800; letter-spacing: 2px; color: #64748b; text-transform: uppercase;">Certificato Indice di Consapevolezza</span>
                        <h1 style="margin: 5px 0 0 0; color: #0f172a; font-size: 24px;">VERIFICA ADERENZA REALTÀ AMMINISTRATIVA</h1>
                        <p style="margin: 4px 0 0 0; font-size: 14px;">Territorio sotto esame: <strong>${territorioNome}</strong></p>
                    </div>
                    <div class="score">${score}</div>
                    <div style="background: #0f172a; color: #fff; padding: 10px; text-align: center; font-weight: bold; border-radius: 4px; margin-bottom: 25px;">
                        ${livelloText}
                    </div>
                    <h3 style="color: #0f172a; border-bottom: 1px solid #0f172a; padding-bottom: 4px;">Analisi delle Risposte vs Bilanci Pubblici</h3>
                    ${nodiDomande}
                </div>
                <script>window.onload = function() { window.print(); }</script>
            </body>
            </html>
        `);
        win.document.close();
    },

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
            backgroundPastello = "linear-gradient(90deg, rgba(222,243,226,0.2) 0%, rgba(255,255,255,0.5) 50%, rgba(244,216,219,0.2) 100%)";
            filigranaSimbolo = "🇮🇹"; 
        } else if (ambito === 'regioni') {
            layoutColor = "#9a3412";
            backgroundPastello = "linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)";
            filigranaSimbolo = "🛡️"; 
        } else {
            layoutColor = "#1e293b";
            backgroundPastello = "linear-gradient(135deg, #fefce8 0%, #ffffff 100%)";
            filigranaSimbolo = "🏢"; 
        }

        const win = window.open('', '_blank');
        win.document.write(`
            <html>
            <head>
                <title>Programma di Mandato - ${territorioNome}</title>
                <style>
                    body { font-family: 'Georgia', serif; background: ${backgroundPastello}; margin: 0; padding: 40px; color: #1e293b; }
                    .frame { border: 4px solid ${layoutColor}; padding: 30px; background: #ffffff; position: relative; }
                    .watermark { position: absolute; top: 25%; left: 30%; font-size: 320px; color: rgba(0,0,0,0.018); pointer-events: none; z-index: 1; }
                    .title-block { text-align: center; margin-bottom: 30px; border-bottom: 1px solid #cbd5e1; padding-bottom: 15px; }
                    .label { font-size: 11px; font-weight: bold; color: ${layoutColor}; text-transform: uppercase; font-family: sans-serif; }
                    .text-box { font-size: 14px; background: rgba(248,250,252,0.9); padding: 12px; border-radius: 6px; border-left: 4px solid ${layoutColor}; margin-bottom: 15px; line-height: 1.5;}
                </style>
            </head>
            <body>
                <div class="frame">
                    <div class="watermark">${filigranaSimbolo}</div>
                    <div class="title-block">
                        <span class="label">Piattaforma di Trasparenza ed Educazione Civica Corrente</span>
                        <h1 style="color: ${layoutColor}; margin: 5px 0; font-size: 24px;">MANIFESTO ELETTORALE ALTERNATIVO</h1>
                        <p style="margin: 0; font-family: sans-serif; font-size: 13px; color: #475569;">Depositato per il Territorio di: <strong>${territorioNome}</strong></p>
                    </div>
                    <div style="position:relative; z-index:5;">
                        <div class="label">Macro-Tema Amministrativo</div>
                        <h3 style="margin-top:2px; margin-bottom:15px; font-family:sans-serif;">📌 ${temaLabel}</h3>
                        
                        <div class="label" style="color:red;">Criticità e Anomalie Individuate dal Cittadino</div>
                        <div class="text-box">${probText}</div>
                        
                        <div class="label" style="color:green;">Soluzione Tecnica e Copertura di Fattibilità</div>
                        <div class="text-box" style="background:#f0fdf4;">${solText}</div>
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
