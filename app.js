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
    
    // REGISTRO COMPLETO DELLE REGIONI (TUTTE E 20) E PREDISPOSIZIONE COMUNI
    territories: {
        nazione: [
            { id: 'italia', name: 'Italia (Stato Nazionale)', icon: '🇮🇹', desc: 'Competenze: Macroeconomia, Previdenza, Difesa e Riforme Nazionale.' }
        ],
        regioni: [
            { id: 'abruzzo', name: 'Abruzzo', icon: '🏔️', desc: 'Focus: Sanità interna, Fondi Europei, Trasporti Regionali.' },
            { id: 'basilicata', name: 'Basilicata', icon: '🪵', desc: 'Focus: Royalty estrazioni idrocarburi, Sanità, Sviluppo rurale.' },
            { id: 'calabria', name: 'Calabria', icon: '🌶️', desc: 'Focus: Dissesto idrogeologico, Sanità (Commissariata), Fondi Coesione.' },
            { id: 'campania', name: 'Campania', icon: '🌋', desc: 'Focus: Fondi europei di coesione, Ospedali regionali, Trasporti EAV.' },
            { id: 'emilia-romagna', name: 'Emilia-Romagna', icon: '🏎️', desc: 'Focus: Gestione idrica e post-alluvione, Sanità d\'eccellenza, Welfare.' },
            { id: 'friuli-venezia-giulia', name: 'Friuli-Venezia Giulia', icon: '🦅', desc: 'Focus: Statuto Speciale, Minoranze linguistiche, Sanità di prossimità.' },
            { id: 'lazio', name: 'Lazio', icon: '🏛️', desc: 'Focus: Piano di rientro sanitario, Edilizia ospedaliera, Trasporti Cotral.' },
            { id: 'liguria', name: 'Liguria', icon: '⛵', desc: 'Focus: Infrastrutture portuali, Sanità ligure, Protezione Civile.' },
            { id: 'lombardia', name: 'Lombardia', icon: '🏙️', desc: 'Focus: Sanità (80% del bilancio), Trenord, Edilizia scolastica superiore.' },
            { id: 'marche', name: 'Marche', icon: '🎻', desc: 'Focus: Distretti industriali, Sanità diffusa, Ricostruzione sisma.' },
            { id: 'molise', name: 'Molise', icon: '🌲', desc: 'Focus: Sanità (Piano di rientro), Trasporti interni, Sviluppo aree interne.' },
            { id: 'piemonte', name: 'Piemonte', icon: '🍇', desc: 'Focus: Sanità territoriale, Trasporti ferroviari locali, Fondi FESR.' },
            { id: 'puglia', name: 'Puglia', icon: '🫒', desc: 'Focus: Acquedotto Pugliese, Gestione Xylella, Ospedali di comunità.' },
            { id: 'sardegna', name: 'Sardegna', icon: '🐑', desc: 'Focus: Statuto Speciale, Continuità territoriale aerea/marittima, Sanità.' },
            { id: 'sicilia', name: 'Sicilia', icon: '🍊', desc: 'Focus: Statuto Speciale, Beni culturali (Autonomia), Sanità isolana.' },
            { id: 'toscana', name: 'Toscana', icon: '🌻', desc: 'Focus: Modello sanitario toscano, Trasporti regionali, Turismo di massa.' },
            { id: 'trentino-alto-adige', name: 'Trentino-Alto Adige', icon: '🍎', desc: 'Focus: Autonomia Speciale, Province autonome (Trento e Bolzano).' },
            { id: 'umbria', name: 'Umbria', icon: '⛪', desc: 'Focus: Sanità interna, Sviluppo borghi rurali, Trasporti regionali.' },
            { id: 'valle-daosta', name: 'Valle d\'Aosta', icon: '🏰', desc: 'Focus: Statuto Speciale, Bilinguismo, Gestione valichi di confine.' },
            { id: 'veneto', name: 'Veneto', icon: '🎭', desc: 'Focus: Autonomia differenziata, Gestione bacini idrici, Sanità veneta.' }
        ],
        comuni: [] // Questo array viene popolato all'istante da comuni.js
    },
    
    questions: [
        // Le domande rimangono inalterate qui sotto
        { 
            id: 1, type: 'nazione', level: 'base', categoryIcon: '👮', categoryLabel: 'Sicurezza e Immigrazione', 
            text: 'Quanto costa davvero l\'accoglienza sul totale della spesa pubblica italiana?', 
            options: [
                {id:'a', text:'Oltre il 15% del bilancio totale dello Stato', hint:'Un quinto di tutte le tasse.'}, 
                {id:'b', text:'Meno dell\'1% della spesa pubblica complessiva', hint:'Una quota minima rispetto a pensioni e sanità.'}, 
                {id:'c', text:'Circa il 5% del bilancio statale', hint:'Una via di mezzo.'}
            ], 
            correct: 'b', 
            reality: 'La spesa per l\'accoglienza incide per circa lo 0.6% sul bilancio dello Stato.', 
            proContro: "PRO: Forte consenso elettorale immediato.\nCONTRO: Tagliare questa voce non libera risorse rilevanti per il bilancio globale.",
            commonPerception: 35, realData: 0.6 
        },
        { 
            id: 2, type: 'nazione', level: 'intermediate', categoryIcon: '💸', categoryLabel: 'Tasse e Lavoro', 
            text: 'Qual è il rischio reale di un Salario Minimo Legale rigido a 9€ per le imprese a basso valore aggiunto?', 
            options: [
                {id:'a', text:'Un aumento del ricorso al lavoro nero', hint:'Per evitare il collasso dei margini.'}, 
                {id:'b', text:'Un immediato fallimento di tutte le multinazionali', hint:'I colossi scappano.'}, 
                {id:'c', text:'L\'obbligo di dimezzare gli stipendi dei manager', hint:'Livellamento forzato.'}
            ], 
            correct: 'a', 
            reality: 'In settori fragili rischia di spingere le micro-aziende verso il sommerso senza un taglio del cuneo fiscale.', 
            proContro: "PRO: Tutela legale per i lavoratori poveri.\nCONTRO: Rischio di aumento dell'evasione contributiva.",
            commonPerception: 45, realData: 100 
        },
        { 
            id: 3, type: 'nazione', level: 'advanced', categoryIcon: '📊', categoryLabel: 'Macroeconomia', 
            text: 'Come si finanzia un taglio strutturale delle tasse rispettando i vincoli europei?', 
            options: [
                {id:'a', text:'Tagli permanenti alla spesa corrente (Spending Review) o emersione stabile dall\'evasione', hint:'Interventi strutturali.'}, 
                {id:'b', text:'Un condono fiscale straordinario una tantum', hint:'Entrate repentine ma non ripetibili.'}, 
                {id:'c', text:'L\'emissione straordinaria di nuovi Titoli di Stato (BTP)', hint:'Finanziamento in deficit.'}
            ], 
            correct: 'a', 
            reality: 'I mercati e le regole europee richiedono coperture strutturali stabili e non entrate fluttuanti.', 
            proContro: "PRO: Stabilità dei conti e fiducia dei mercati (Spread basso).\nCONTRO: Riduzione immediata dei budget operativi pubblici.",
            commonPerception: 30, realData: 100 
        },
        { 
            id: 4, type: 'regione', level: 'base', categoryIcon: '🏥', categoryLabel: 'Sanità Pubblica', 
            text: 'Chi decide il budget e la programmazione per l\'abbattimento delle liste d\'attesa negli ospedali?', 
            options: [
                {id:'a', text:'Il Ministero della Salute a Roma', hint:'Centralismo statale.'}, 
                {id:'b', text:'La Regione, che gestisce l\'80% del proprio bilancio sulla salute', hint:'L\'ente titolare della spesa.'}, 
                {id:'c', text:'Il Sindaco tramite ordinanza urgente', hint:'Intervento locale di prossimità.'}
            ], 
            correct: 'b', 
            reality: 'La sanità è una materia a gestione quasi esclusivamente regionale.', 
            proContro: "PRO: Autonomia decisionale vicina al territorio.\nCONTRO: Crea disuguaglianze di trattamento tra regioni diverse.",
            commonPerception: 15, realData: 80 
        },
        { 
            id: 5, type: 'comune', level: 'base', categoryIcon: '🗑️', categoryLabel: 'Tasse Locali e Rifiuti', 
            text: 'Il Sindaco può usare i soldi incassati dalla TARI per finanziare altri settori (es. riparare le buche)?', 
            options: [
                {id:'a', text:'Sì, sposta le risorse dove c\'è l\'emergenza', hint:'Flessibilità contabile.'}, 
                {id:'b', text:'No. La TARI deve finanziare per legge esclusivamente il 100% del servizio rifiuti', hint:'Destinazione rigidamente vincolata.'}, 
                {id:'c', text:'Sì, ma solo una quota minima non superiore al 10%', hint:'Piccoli storni.'}
            ], 
            correct: 'b', 
            reality: 'La TARI ha un vincolo di destinazione totale. Deve coprire per intero i costi del servizio igiene.', 
            proContro: "PRO: Certezza che le risorse rimangano nel settore ecologico.\nCONTRO: Se i costi aumentano, il Sindaco è obbligato ad aumentare la tassa.",
            commonPerception: 10, realData: 100 
        }
    ],

    politicalPromises: {
        comune: [
            { id: 'com_1', label: "Zero TARI: Elimino la tassa sui rifiuti per tutti", cost: 'alto', law: 'illegale', aiCorrection: "La legge statale vieta l'azzeramento: la TARI deve coprire il 100% del servizio. Riformulazione AI: 'Efficientamento impianti per abbattere la tariffa del 20%'." },
            { id: 'com_2', label: "Più Sicurezza: Assunzione immediata di 300 Carabinieri", cost: 'medio', law: 'incompetenza', aiCorrection: "I Carabinieri dipendono dallo Stato centrale, non dal Comune. Riformulazione AI: 'Estensione turni notturni della Polizia Municipale'." }
        ],
        regioni: [
            { id: 'reg_1', label: "Azzeramento Liste d'Attesa negli ospedali in 30 giorni", cost: 'altissimo', law: 'legale', aiCorrection: "Sforerebbe istantaneamente i tetti di spesa nazionali per il personale. Riformulazione AI: 'Rinegoziazione dei contratti con i privati accreditati vincolati al CUP'." }
        ],
        nazione: [
            { id: 'naz_1', label: "Innalzamento delle Pensioni minime a 1500€ per tutti", cost: 'astronomico', law: 'legale', aiCorrection: "Genera una spesa strutturale da 40 miliardi l'anno. Riformulazione AI: 'Aumento progressivo indicizzato finanziato dal recupero IVA'." }
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
        document.getElementById('territorySearch').classList.add('hidden'); // Nasconde la barra all'inizio
        
        grid.innerHTML = `
            <div class="card card-interactive territory-card" onclick="app.loadTerritoriesList('nazione')">
                <div class="territory-icon">🇮🇹</div>
                <div class="territory-info">
                    <div class="territory-name">Livello Statale (Nazione)</div>
                    <div class="territory-description">Analisi su macroeconomia, riforme e debito pubblico.</div>
                </div>
            </div>
            <div class="card card-interactive territory-card" onclick="app.loadTerritoriesList('regioni')">
                <div class="territory-icon">🏔️</div>
                <div class="territory-info">
                    <div class="territory-name">Livello Regionale (Le 20 Regioni)</div>
                    <div class="territory-description">Analisi su Sanità, Trasporti e bilanci regionali.</div>
                </div>
            </div>
            <div class="card card-interactive territory-card" onclick="app.loadTerritoriesList('comuni')">
                <div class="territory-icon">🏢</div>
                <div class="territory-info">
                    <div class="territory-name">Livello Comunale (Tutti i Comuni d'Italia)</div>
                    <div class="territory-description">Analisi su TARI, asili nido e servizi di prossimità.</div>
                </div>
            </div>
        `;
    },

    // FUNZIONE DI COLLEGAMENTO CON IL FILE COMUNI.JS GLOBALE
    loadTerritoriesList(type) {
        this.state.selectedTerritoryType = type;
        if (type === 'nazione') {
            this.selectTerritory('nazione', 'italia');
            return;
        }

        // Se l'utente sceglie "comuni", estrae i dati dall'array globale di comuni.js
        if (type === 'comuni' && this.territories.comuni.length === 0) {
            if (typeof listaComuniItaliani !== 'undefined' && listaComuniItaliani.length > 0) {
                this.territories.comuni = listaComuniItaliani.map(c => ({
                    id: c.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    name: c.name,
                    icon: '🏢',
                    desc: `Comune in Provincia di ${c.prov}. Competenze: TARI, bilancio locale, strade e servizi municipali.`
                }));
            } else {
                // Messaggio temporaneo di attesa se l'array è ancora in fase di caricamento asincrono
                const grid = document.getElementById('territoryList');
                grid.innerHTML = `<div style="text-align:center; padding:20px; font-weight:bold;">🔄 Sincronizzazione registro nazionale comuni... Riprova tra un istante.</div>`;
                setTimeout(() => this.loadTerritoriesList('comuni'), 1000);
                return;
            }
        }

        document.getElementById('territorySearch').value = '';
        document.getElementById('territorySearch').classList.remove('hidden');
        this.filterTerritories();
    },
    
    // FILTRAGGIO AD ALTE PRESTAZIONI PER EVITARE I LAG GRAFICI
    filterTerritories() {
        const grid = document.getElementById('territoryList');
        const search = document.getElementById('territorySearch').value.toLowerCase();
        if (!grid) return;
        
        grid.innerHTML = '';
        const list = this.territories[this.state.selectedTerritoryType] || [];
        
        // Per i comuni, obbliga l'utente a inserire almeno 2 lettere per non caricare 7.800 card insieme
        if (this.state.selectedTerritoryType === 'comuni' && search.length < 2) {
            grid.innerHTML = `<div style="text-align:center; padding:20px; color:var(--color-text-secondary); font-size:14px;">🔍 Digita almeno 2 lettere per cercare tra tutti i comuni e paesi d'Italia...</div>`;
            return;
        }

        const filtered = list.filter(t => t.name.toLowerCase().includes(search));
        const maxVisibili = filtered.slice(0, 40); // Mostra solo le prime 40 corrispondenze

        if (maxVisibili.length === 0) {
            grid.innerHTML = `<div style="text-align:center; padding:20px; color:var(--color-text-secondary);">Nessun territorio trovato.</div>`;
            return;
        }
        
        maxVisibili.forEach(t => {
            grid.innerHTML += `
                <div class="card card-interactive territory-card" onclick="app.selectTerritory('${this.state.selectedTerritoryType}', '${t.id}')">
                    <div class="territory-icon">${t.icon}</div>
                    <div class="territory-info">
                        <div class="territory-name">${t.name}</div>
                        <div class="territory-description">${t.desc}</div>
                    </div>
                </div>`;
        });

        if (filtered.length > 40) {
            grid.innerHTML += `<div style="text-align:center; font-size:12px; color:var(--color-text-secondary); padding:10px;">...e altri ${filtered.length - 40} territori. Continua a digitare per stringere il campo.</div>`;
        }
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
            analysis.innerHTML = `
                <strong style="color: ${correct ? 'var(--color-success)' : 'var(--color-error)'}">
                    ${correct ? '✓ CONSAPEVOLEZZA RILEVATA' : '✕ DISTORSIONE DA PROPAGANDA'}
                </strong>
                <p style="font-size:14px; margin-top:6px; margin-bottom:0; color:var(--color-text-primary);">
                    <strong>Il dato empirico di bilancio:</strong> ${q.reality}
                </p>`;
            analysis.classList.remove('hidden');
            btnNext.removeAttribute('disabled');
            btnNext.innerText = this.state.currentQuestion === this.state.filteredQuestions.length - 1 ? "Visualizza Sentenza" : "Successiva →";
        } else {
            analysis.classList.add('hidden');
            btnNext.setAttribute('disabled', 'true');
            btnNext.innerText = "Conferma Risposta";
        }
        
        document.getElementById('btnPrevious').style.visibility = this.state.currentQuestion === 0 ? 'hidden' : 'visible';
        this.updateProgressBar();
    },
    
    selectAnswer(id) {
        if (this.state.answers[this.state.currentQuestion]) return;
        this.state.answers[this.state.currentQuestion] = {
            selectedId: id,
            isCorrect: id === this.state.filteredQuestions[this.state.currentQuestion].correct
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
        
        let lvl = '❌ DIRITTO DI VOTO CONGELATO';
        let sum = 'Le tue risposte mostrano una forte vulnerabilità agli slogan di pancia. Le scelte che approvi crollerebbero al primo controllo tecnico di bilancio.';
        
        if(finalScore >= 70) {
            lvl = '👑 CERTIFICATO DI IDONEITÀ CIVICA EMESSO';
            sum = 'Hai dimostrato di saper distinguere i proclami politici dai reali vincoli di spesa e di attribuzione delle competenze pubbliche.';
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
                        <div class="comparison-label">La tua percezione media:</div>
                        <div class="comparison-track"><div class="comparison-fill perception" style="width:${Math.min((userVal/100)*100, 100)}%"></div></div>
                    </div>
                    <div class="comparison-bar">
                        <div class="comparison-label">Il dato reale di Bilancio:</div>
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
    
    setupLaboratorio(livello) {
        const container = document.getElementById('promisesSelectorContainer');
        if(!container) return;
        container.innerHTML = '';
        const list = this.politicalPromises[livello] || [];
        
        list.forEach(p => {
            container.innerHTML += `
                <div class="card" style="display:flex; align-items:center; gap:12px; padding:16px; margin-bottom:10px;">
                    <input type="checkbox" name="userPromises" value="${p.id}" style="transform:scale(1.2);" onchange="app.triggerAiLiveCorrection()">
                    <div><strong>${p.label}</strong></div>
                </div>`;
        });
    },

    triggerAiLiveCorrection() {
        const checkboxes = document.querySelectorAll('input[name="userPromises"]:checked');
        const fb = document.getElementById('coherenceFeedback');
        if (checkboxes.length === 0) {
            fb.classList.add('hidden');
            return;
        }
        fb.classList.remove('hidden');
        fb.innerHTML = `<h3>🤖 Correzione AI Istituzionale in tempo reale:</h3>`;
        
        checkboxes.forEach(cb => {
            const allPromises = [...this.politicalPromises.comune, ...this.politicalPromises.regioni, ...this.politicalPromises.nazione];
            const promessa = allPromises.find(p => p.id === cb.value);
            if(promessa) {
                fb.innerHTML += `
                    <div style="margin-top:10px; border-top:1px solid #eee; padding-top:8px;">
                        <span style="color:var(--color-error); font-weight:bold;">⚠️ Incoerenza tecnica su: "${promessa.label}"</span><br>
                        <span style="font-size:14px;">${promessa.aiCorrection}</span>
                    </div>`;
            }
        });
    },

    stampaPdfRisposte() {
        let pdfTesto = `==================================================\n`;
        pdfTesto += `   DECRETO DI VERIFICA DELLA CONSAPEVOLEZZA CIVICA  \n`;
        pdfTesto += `==================================================\n\n`;
        pdfTesto += `ESITO VALUTAZIONE: ${document.getElementById('reportLevel').innerText}\n`;
        pdfTesto += `Indice di idoneità: ${document.getElementById('reportScoreValue').innerText}\n\n`;
        pdfTesto += `--- DETTAGLIO EFFETTI DELLE TUE SCELTE POLITICHE ---\n\n`;

        this.state.filteredQuestions.forEach((q, i) => {
            pdfTesto += `QUESITO ${i+1}: ${q.text}\n`;
            pdfTesto += `DATO EMPIRICO: ${q.reality}\n`;
            pdfTesto += `ANALISI DI IMPATTO SUL PAESE:\n${q.proContro}\n`;
            pdfTesto += `--------------------------------------------------\n\n`;
        });

        const finestraPdf = window.open('', '_blank');
        finestraPdf.document.write(`<pre style="font-family:monospace; padding:30px; font-size:13px; line-height:1.6; background:#fff; color:#000;">${pdfTesto}</pre>`);
        finestraPdf.document.close();
        finestraPdf.print();
    },

    stampaPdfProgramma() {
        const checkboxes = document.querySelectorAll('input[name="userPromises"]:checked');
        if(checkboxes.length === 0) {
            alert("Devi selezionare almeno una proposta per stampare il programma!");
            return;
        }

        let pdfProg = `==================================================\n`;
        pdfProg += `        MANIFESTO ELETTORALE FINANZIARIAMENTE SOSTENIBILE \n`;
        pdfProg += `             - CANDIDATO PER UN GIORNO -          \n`;
        pdfProg += `==================================================\n\n`;
        pdfProg += `Livello di Amministrazione: ${this.state.selectedTerritoryType.toUpperCase()}\n`;
        pdfProg += `Territorio di riferimento: ${this.state.selectedTerritoryId.toUpperCase()}\n\n`;
        pdfProg += `Le riforme inserite sono state corrette dall'Intelligenza Civica per eliminare gli slogan impossibili:\n\n`;

        checkboxes.forEach((cb, idx) => {
            const allPromises = [...this.politicalPromises.comune, ...this.politicalPromises.regioni, ...this.politicalPromises.nazione];
            const promessa = allPromises.find(p => p.id === cb.value);
            if(promessa) {
                pdfProg += `PROPOSTA ORIGINARIA POPOLARE ${idx+1}: "${promessa.label}"\n`;
                pdfProg += `🤖 CORREZIONE E DIRETTIVA DI ATTUAZIONE AI:\n${promessa.aiCorrection}\n`;
                pdfProg += `--------------------------------------------------\n\n`;
            }
        });

        pdfProg += `Questo documento dimostra che un programma elettorale può unire le richieste dei cittadini alla sostenibilità costituzionale. Condividilo con i tuoi elettori.`;

        const finestraPdf = window.open('', '_blank');
        finestraPdf.document.write(`<pre style="font-family:monospace; padding:30px; font-size:13px; line-height:1.6; background:#fff; color:#000;">${pdfProg}</pre>`);
        finestraPdf.document.close();
        finestraPdf.print();
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
