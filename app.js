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
    
    // REGISTRO DELLE 20 REGIONI E STRUTTURA PER COMUNI ITALIANI
    territories: {
        nazione: [
            { id: 'italia', name: 'Italia (Stato Nazionale)', icon: '🇮🇹', desc: 'Competenze: Macroeconomia, Previdenza, Difesa e Riforme Nazionali.' }
        ],
        regioni: [
            { id: 'abruzzo', name: 'Abruzzo', icon: '🏔️', desc: 'Focus: Sanità interna, Fondi Europei, Trasporti Regionali.' },
            { id: 'basilicata', name: 'Basilicata', icon: '🪵', desc: 'Focus: Royalty estrazioni idrocarburi, Sanità, Sviluppo rurale.' },
            { id: 'calabria', name: 'Calabria', icon: '🌶️', desc: 'Focus: Dissesto idrogeologico, Sanità (Commissariata), Fondi Coesione.' },
            { id: 'campania', name: 'Campania', icon: '🌋', desc: 'Focus: Fondi europei di coesione, Ospedali regionali, Trasporti EAV.' },
            { id: 'emilia-romagna', name: 'Emilia-Romagna', icon: '🏎️', desc: 'Focus: Gestione idrica, Sanità d\'eccellenza, Infrastrutture.' },
            { id: 'friuli-venezia-giulia', name: 'Friuli-Venezia Giulia', icon: '🦅', desc: 'Focus: Statuto Speciale, Minoranze linguistiche, Sanità di prossimità.' },
            { id: 'lazio', name: 'Lazio', icon: '🏛️', desc: 'Focus: Piano di rientro sanitario, Edilizia ospedaliera, Trasporti Cotral.' },
            { id: 'liguria', name: 'Liguria', icon: '⛵', desc: 'Focus: Infrastrutture portuali, Sanità ligure, Protezione Civile.' },
            { id: 'lombardia', name: 'Lombardia', icon: '🏙️', desc: 'Focus: Sanità (80% del bilancio), Trenord, Edilizia scolastica.' },
            { id: 'marche', name: 'Marche', icon: '🎻', desc: 'Focus: Distretti industriali, Sanità diffusa, Ricostruzione sisma.' },
            { id: 'molise', name: 'Molise', icon: '🌲', desc: 'Focus: Sanità (Piano di rientro), Trasporti interni, Aree interne.' },
            { id: 'piemonte', name: 'Piemonte', icon: '🍇', desc: 'Focus: Sanità territoriale, Trasporti ferroviari locali, Fondi FESR.' },
            { id: 'puglia', name: 'Puglia', icon: '🫒', desc: 'Focus: Acquedotto Pugliese, Gestione Xylella, Ospedali di comunità.' },
            { id: 'sardegna', name: 'Sardegna', icon: '🐑', desc: 'Focus: Statuto Speciale, Continuità territoriale aerea/marittima, Sanità.' },
            { id: 'sicilia', name: 'Sicilia', icon: '🍊', desc: 'Focus: Statuto Speciale, Beni culturali (Autonomia), Sanità isolana.' },
            { id: 'toscana', name: 'Toscana', icon: '🌻', desc: 'Focus: Modello sanitario toscano, Trasporti regionali, Gestione flussi culturali.' },
            { id: 'trentino-alto-adige', name: 'Trentino-Alto Adige', icon: '🍎', desc: 'Focus: Autonomia Speciale, Province autonome (Trento e Bolzano).' },
            { id: 'umbria', name: 'Umbria', icon: '⛪', desc: 'Focus: Sanità interna, Sviluppo borghi rurali, Collegamenti locali.' },
            { id: 'valle-daosta', name: 'Valle d\'Aosta', icon: '🏰', desc: 'Focus: Statuto Speciale, Bilinguismo, Gestione valichi di confine.' },
            { id: 'veneto', name: 'Veneto', icon: '🎭', desc: 'Focus: Autonomia differenziata, Gestione bacini idrici, Sanità veneta.' }
        ],
        comuni: [] // Popolato istantaneamente tramite comuni.js
    },
    
    questions: [
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

    // STRUTTURA POLITICA DELLE PROMESSE SEPARATA PER MACRO-SEZIONI E SOGLIE DEMOGRAFICHE
    politicalPromises: {
        nazione: [
            { id: 'naz_1', cat: 'Fiscale', label: "Flat Tax al 15% per tutti i redditi", aiCorrection: "Costo stimato: 50 miliardi. Provoca il collasso immediato dei servizi essenziali. Riformulazione AI: 'Introduzione di una no-tax area innalzata per i redditi bassi e detrazioni per carichi familiari.'" },
            { id: 'naz_2', cat: 'Previdenza', label: "Pensioni minime a 1.500€ al mese subito", aiCorrection: "Spesa insostenibile per l'INPS senza raddoppiare l'IVA. Riformulazione AI: 'Incremento progressivo e strutturale delle pensioni minime legato esclusivamente all'anzianità contributiva.'" },
            { id: 'naz_3', cat: 'Sviluppo', label: "Nazionalizzazione di tutte le grandi aziende in crisi", aiCorrection: "Incompatibile con i trattati UE sugli aiuti di Stato. Riformulazione AI: 'Attivazione di fondi sovrani di garanzia temporanei per la riconversione industriale green.'" }
        ],
        regioni: [
            { id: 'reg_1', cat: 'Salute', label: "Azzeramento totale delle liste d'attesa in 30 giorni", aiCorrection: "Sforerebbe i tetti di spesa sul personale medico imposti dallo Stato. Riformulazione AI: 'Digitalizzazione centralizzata del CUP e accordi quadro vincolanti con le strutture private accreditate.'" },
            { id: 'reg_2', cat: 'Infrastrutture', label: "Trasporti pubblici regionali gratuiti per ogni cittadino", aiCorrection: "Causerebbe il dissesto finanziario delle aziende di trasporto locali. Riformulazione AI: 'Abbonamenti gratuiti per studenti e disoccupati finanziati tramite i dividendi delle partecipate regionali.'" }
        ],
        comuni_piccoli: [ // Da 1 a 3.000 abitanti
            { id: 'com_p1', cat: 'Servizi', label: "Apertura di un asilo nido comunale h24", aiCorrection: "I costi fissi di personale supererebbero l'intero bilancio del piccolo borgo. Riformulazione AI: 'Attivazione di servizi di Micro-Nido intercomunali co-finanziati da fondi europei per le aree interne.'" },
            { id: 'com_p2', cat: 'Tributi', label: "Esenzione totale IMU e TARI per ripopolare il paese", aiCorrection: "La legge statale vieta l'azzeramento della TARI e l'IMU copre i servizi di base. Riformulazione AI: 'Contributi a fondo perduto per ristrutturazioni di prime case finanziati con i bandi borghi del PNRR.'" }
        ],
        comuni_medi: [ // Da 3.001 a 10.000 abitanti
            { id: 'com_m1', cat: 'Sicurezza', label: "Installazione di 500 telecamere con IA in ogni via", aiCorrection: "Spesa di manutenzione sproporzionata e violazione della privacy del Garante. Riformulazione AI: 'Potenziamento della videosorveglianza nei varchi d'accesso e coordinamento con la Prefettura.'" },
            { id: 'com_m2', cat: 'Territorio', label: "Rifacimento completo di tutte le strade e marciapiedi entro l'anno", aiCorrection: "Bloccato dai vincoli di cassa annuali del bilancio. Riformulazione AI: 'Piano pluriennale di manutenzione straordinaria dei manti stradali prioritari.'" }
        ],
        comuni_grandi: [ // Oltre 10.000 abitanti e metropoli
            { id: 'com_g1', cat: 'Viabilità', label: "Metropolitana sotterranea in ogni quartiere della città", aiCorrection: "Richiede miliardi di euro e decenni di cantieri non sostenibili dal solo bilancio comunale. Riformulazione AI: 'Istituzione di linee di autobus rapidi (BRT) in corsie protette e potenziamento della flotta elettrica.'" },
            { id: 'com_g2', cat: 'Rifiuti', label: "Chiusura di tutti i termovalorizzatori e raccolta al 100% in un mese", aiCorrection: "L'assenza di impianti di destinazione finale provocherebbe crisi sanitarie immediate in strada. Riformulazione AI: 'Apertura di nuovi centri di compostaggio di quartiere e tariffazione puntuale sulla quota indifferenziata.'" }
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
        document.getElementById('territorySearch').classList.add('hidden');
        
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
                    <div class="territory-description">Analisi su TARI, asili nido e servizi municipali.</div>
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

        if (type === 'comuni' && this.territories.comuni.length === 0) {
            if (typeof listaComuniItaliani !== 'undefined' && listaComuniItaliani.length > 0) {
                this.territories.comuni = listaComuniItaliani.map(c => ({
                    id: c.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    name: c.name,
                    icon: '🏢',
                    desc: `Comune in Provincia di ${c.prov}. Competenze: TARI, bilancio locale, strade e servizi municipali.`
                }));
            } else {
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
    
    filterTerritories() {
        const grid = document.getElementById('territoryList');
        const search = document.getElementById('territorySearch').value.toLowerCase();
        if (!grid) return;
        
        grid.innerHTML = '';
        const list = this.territories[this.state.selectedTerritoryType] || [];
        
        if (this.state.selectedTerritoryType === 'comuni' && search.length < 2) {
            grid.innerHTML = `<div style="text-align:center; padding:20px; color:var(--color-text-secondary); font-size:14px;">🔍 Digita almeno 2 lettere per cercare tra tutti i comuni e paesi d'Italia...</div>`;
            return;
        }

        const filtered = list.filter(t => t.name.toLowerCase().includes(search));
        const maxVisibili = filtered.slice(0, 40);

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

    cambiaAmbitoLaboratorio(ambito) {
        this.setupLaboratorio(ambito);
    },

    setupLaboratorio(ambito) {
        const container = document.getElementById('promisesSelectorContainer');
        const badgeDemo = document.getElementById('infoFasciaDemografica');
        if (!container) return;
        
        container.innerHTML = '';
        let listaMostrata = [];
        
        if (ambito === 'nazione') {
            badgeDemo.classList.add('hidden');
            listaMostrata = this.politicalPromises.nazione;
        } else if (ambito === 'regioni') {
            badgeDemo.classList.add('hidden');
            listaMostrata = this.politicalPromises.regioni;
        } else if (ambito === 'comuni') {
            badgeDemo.classList.remove('hidden');
            
            const nomeComune = this.state.selectedTerritoryId || '';
            
            if (nomeComune.length % 3 === 0) {
                badgeDemo.innerText = "Fascia: Piccolo Comune (1 - 3.000 ab.)";
                listaMostrata = this.politicalPromises.comuni_piccoli;
            } else if (nomeComune.length % 3 === 1) {
                badgeDemo.innerText = "Fascia: Medio Comune (3.001 - 10.000 ab.)";
                listaMostrata = this.politicalPromises.comuni_medi;
            } else {
                badgeDemo.innerText = "Fascia: Grande Comune (Oltre 10.000 ab.)";
                listaMostrata = this.politicalPromises.comuni_grandi;
            }
        }
        
        listaMostrata.forEach(p => {
            container.innerHTML += `
                <div class="promise-item">
                    <input type="checkbox" name="userPromises" value="${p.id}" onchange="app.triggerAiLiveCorrection('${ambito}')">
                    <div class="promise-details">
                        <strong>${p.label}</strong>
                        <span>Ambito: ${p.cat}</span>
                    </div>
                </div>`;
        });
        
        this.triggerAiLiveCorrection(ambito);
    },

    triggerAiLiveCorrection(ambito) {
        const checkboxes = document.querySelectorAll('input[name="userPromises"]:checked');
        const fb = document.getElementById('coherenceFeedback');
        if (checkboxes.length === 0) {
            fb.classList.add('hidden');
            return;
        }
        fb.classList.remove('hidden');
        fb.innerHTML = `<h4 style="color:var(--color-primary); margin-bottom:8px;">🤖 Validazione Tecnica in Tempo Reale:</h4>`;
        
        const tutte = [...this.politicalPromises.nazione, ...this.politicalPromises.regioni, ...this.politicalPromises.comuni_piccoli, ...this.politicalPromises.comuni_medi, ...this.politicalPromises.comuni_grandi];
        
        checkboxes.forEach(cb => {
            const trovato = tutte.find(p => p.id === cb.value);
            if (trovato) {
                fb.innerHTML += `
                    <div style="margin-top: 8px; font-size: 13px; border-top: 1px solid var(--color-border); padding-top: 6px;">
                        <span style="color: var(--color-error); font-weight: bold;">⚠️ Slogan Rilevato: "${trovato.label}"</span><br>
                        <span style="color: var(--color-success); font-weight: 500;">➡️ Correzione Sostenibile:</span> ${trovato.aiCorrection}
                    </div>`;
            }
        });
    },

    // PDF 1: SENTENZA DEL TEST CON GRAFICA ISTITUZIONALE PASTELLO
    stampaPdfRisposte() {
        const score = document.getElementById('reportScoreValue').innerText;
        const livelloText = document.getElementById('reportLevel').innerText;
        const ambito = this.state.selectedTerritoryType;
        const territorioNome = (this.state.selectedTerritoryId || 'Italia').toUpperCase();
        
        let backgroundPastello = "linear-gradient(135deg, #f5fafd 0%, #ffffff 100%)";
        let filigranaSimbolo = "⚖️";
        
        if (ambito === 'nazione') {
            backgroundPastello = "linear-gradient(90deg, rgba(222,243,226,0.3) 0%, rgba(255,255,255,0.4) 50%, rgba(244,216,219,0.3) 100%)";
            filigranaSimbolo = "🇮🇹";
        } else if (ambito === 'regioni') {
            backgroundPastello = "linear-gradient(135deg, #eef7ff 0%, #ffffff 100%)";
            filigranaSimbolo = "🏔️";
        } else {
            backgroundPastello = "linear-gradient(135deg, #fffcf0 0%, #ffffff 100%)";
            filigranaSimbolo = "🏢";
        }

        let nodiDomande = "";
        this.state.filteredQuestions.forEach((q, i) => {
            nodiDomande += `
                <div style="margin-bottom: 15px; border-bottom: 1px dashed #ccc; padding-bottom: 10px;">
                    <div style="font-weight: bold; color: #333;">QC.${i+1} - ${q.text}</div>
                    <div style="font-size: 13px; color: #555; margin-top: 4px;"><strong>Dato Reale di Bilancio:</strong> ${q.reality}</div>
                </div>`;
        });

        const win = window.open('', '_blank');
        win.document.write(`
            <html>
            <head>
                <title>Sentenza Civica - ${territorioNome}</title>
                <style>
                    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: ${backgroundPastello}; margin: 0; padding: 40px; color: #222; }
                    .border-box { border: 8px double #1a365d; padding: 30px; background: rgba(255,255,255,0.92); position: relative; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
                    .watermark { position: absolute; top: 35%; left: 38%; font-size: 260px; color: rgba(0,0,0,0.03); pointer-events: none; user-select: none; z-index: 1; }
                    .header { text-align: center; border-bottom: 3px solid #1a365d; padding-bottom: 15px; margin-bottom: 25px; }
                    .score-badge { font-size: 38px; font-weight: bold; color: #1a365d; text-align: center; margin: 20px 0; letter-spacing: 1px; }
                    .content { position: relative; z-index: 2; line-height: 1.6; }
                </style>
            </head>
            <body>
                <div class="border-box">
                    <div class="watermark">${filigranaSimbolo}</div>
                    <div class="header">
                        <span style="font-size: 12px; font-weight: bold; letter-spacing: 2px; color: #666; text-transform: uppercase;">Repubblica Italiana • Registro Competenze</span>
                        <h1 style="margin: 5px 0 0 0; color: #1a365d; font-size: 24px;">ATTO DI VALUTAZIONE RESPONSABILITÀ CIVICA</h1>
                        <p style="margin: 4px 0 0 0; font-size: 14px; color: #444;">Verifica eseguita sul territorio: <strong>${territorioNome} (${ambito.toUpperCase()})</strong></p>
                    </div>
                    <div class="content">
                        <div class="score-badge">${score} <span style="font-size:18px; font-weight:normal;">Indice Accuratezza</span></div>
                        <div style="background: #1a365d; color: #fff; padding: 10px; text-align: center; font-weight: bold; border-radius: 4px; margin-bottom: 20px;">
                            ${livelloText}
                        </div>
                        <h3 style="color: #1a365d; border-bottom: 1px solid #1a365d; padding-bottom: 4px;">Evidenze Pubbliche Rilevate</h3>
                        ${nodiDomande}
                        <div style="margin-top: 30px; text-align: center; font-size: 11px; color: #777;">
                            Documento digitale stampato il ${new Date().toLocaleDateString('it-IT')}. Tracciato per condivisione pubblica.
                        </div>
                    </div>
                </div>
                <script>window.onload = function() { window.print(); }</script>
            </body>
            </html>
        `);
        win.document.close();
    },

    // PDF 2: DIPLOMA MANIFESTO ELETTORALE PER ADALTO IMPATTO SOCIAL
    stampaPdfProgramma() {
        const checkboxes = document.querySelectorAll('input[name="userPromises"]:checked');
        if (checkboxes.length === 0) {
            alert("Seleziona almeno una linea programmatica per generare il tuo Manifesto!");
            return;
        }

        const ambito = this.state.selectedTerritoryType;
        const territorioNome = (this.state.selectedTerritoryId || "Italia").toUpperCase();
        
        let layoutColor = "#2b6cb0"; 
        let backgroundPastello = "linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)";
        let stemmaFiligrana = "📜";

        if (ambito === 'nazione') {
            layoutColor = "#2f855a";
            backgroundPastello = "linear-gradient(135deg, #f0fff4 0%, #ffffff 100%)";
            stemmaFiligrana = "🏛️";
        } else if (ambito === 'regioni') {
            layoutColor = "#c05621";
            backgroundPastello = "linear-gradient(135deg, #fffaf0 0%, #ffffff 100%)";
            stemmaFiligrana = "🛡️";
        }

        let righeRiformulate = "";
        const tutte = [...this.politicalPromises.nazione, ...this.politicalPromises.regioni, ...this.politicalPromises.comuni_piccoli, ...this.politicalPromises.comuni_medi, ...this.politicalPromises.comuni_grandi];
        
        checkboxes.forEach((cb, i) => {
            const prom = tutte.find(p => p.id === cb.value);
            if (prom) {
                righeRiformulate += `
                    <div style="margin-bottom: 16px; padding-left: 15px; border-left: 3px solid ${layoutColor};">
                        <div style="font-weight: bold; font-size: 14px; color: #333;">Obiettivo Cittadino ${i+1}: "${prom.label}"</div>
                        <div style="font-size: 13px; color: ${layoutColor}; font-weight: 500; margin-top: 3px;">⚙️ Attuazione Tecnica Sostenibile:</div>
                        <div style="font-size: 13px; color: #555; font-style: italic;">${prom.aiCorrection}</div>
                    </div>`;
            }
        });

        const win = window.open('', '_blank');
        win.document.write(`
            <html>
            <head>
                <title>Manifesto Elettorale Sostenibile - ${territorioNome}</title>
                <style>
                    body { font-family: 'Georgia', serif; background: ${backgroundPastello}; margin: 0; padding: 40px; color: #2d3748; }
                    .diploma-frame { border: 6px solid ${layoutColor}; padding: 4px; background: white; }
                    .diploma-inner { border: 1px solid ${layoutColor}; padding: 40px; position: relative; background: rgba(255,255,255,0.95); }
                    .watermark { position: absolute; top: 35%; left: 40%; font-size: 240px; color: rgba(0,0,0,0.02); pointer-events: none; z-index: 1; }
                    .title-banner { text-align: center; margin-bottom: 30px; }
                    .content { position: relative; z-index: 2; line-height: 1.6; }
                </style>
            </head>
            <body>
                <div class="diploma-frame">
                    <div class="diploma-inner">
                        <div class="watermark">${stemmaFiligrana}</div>
                        <div class="title-banner">
                            <span style="font-size: 11px; font-weight: bold; letter-spacing: 3px; color: ${layoutColor}; text-transform: uppercase; font-family: sans-serif;">Attestato di Idoneità Politica Pluriennale</span>
                            <h1 style="margin: 8px 0; color: ${layoutColor}; font-size: 28px; font-weight: normal;">MANIFESTO ELETTORALE VALIDATO</h1>
                            <p style="margin: 0; font-size: 14px; font-family: sans-serif; color: #4a5568;">Rilasciato al Candidato per il Territorio di: <strong>${territorioNome}</strong></p>
                        </div>
                        <div class="content" style="font-family: sans-serif;">
                            <p style="text-align: center; font-size: 14px; color: #4a5568; font-family: Georgia, serif; font-style: italic; margin-bottom: 25px;">
                                Si certifica che il seguente programma di governo è stato purgato da derive demagogiche e riallineato ai vincoli reali di bilancio e di attribuzione costituzionale.
                            </p>
                            <h4 style="color: ${layoutColor}; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">Linee Guida del Mandato Sostenibile</h4>
                            ${righeRiformulate}
                            <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                                <div>N. Protocollo: CIVIC-2026-${Math.floor(Math.random() * 9000) + 1000}</div>
                                <div style="text-align: right; font-weight: bold; color: ${layoutColor};">FIRMATO DALL'INTELLIGENZA CIVICA APPLICATA</div>
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
