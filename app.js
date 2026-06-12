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
            { id: 'italia', name: 'Italia (Stato Nazionale)', icon: '🇮🇹', desc: 'Competenze: Macroeconomia, Previdenza, Difesa e Riforme' }
        ],
        regioni: [
            { id: 'lombardia', name: 'Lombardia', icon: '🏙️', desc: 'Focus: Sanità (80% del bilancio), Trenord, Infrastrutture' },
            { id: 'lazio', name: 'Lazio', icon: '🏛️', desc: 'Focus: Piano di rientro sanitario, Trasporti Cotral' },
            { id: 'campania', name: 'Campania', icon: '🌋', desc: 'Focus: Fondi europei di coesione, Ospedali regionali' },
            { id: 'veneto', name: 'Veneto', icon: '🎭', desc: 'Focus: Autonomia differenziata, Gestione bacini idrici' },
            { id: 'umbria', name: 'Umbria', icon: '⛪', desc: 'Focus: Sanità interna, Sviluppo borghi rurali. No coste marittime.' }
        ],
        comuni: [
            { id: 'roma', name: 'Roma Capitale', icon: '🏛️', desc: 'Competenze: TARI, Trasporti ATAC, Emergenza Abitativa' },
            { id: 'milano', name: 'Milano', icon: '🚇', desc: 'Competenze: Area C, Metropolitana ATM, Sicurezza urbana' },
            { id: 'napoli', name: 'Napoli', icon: '🍕', desc: 'Competenze: Risanamento debito, Raccolta ANM' },
            { id: 'bologna', name: 'Bologna', icon: '🍝', desc: 'Competenze: Città 30, Gestione Asili Nido Comunali' }
        ]
    },
    
    questions: [
        // ======================== NAZIONE ========================
        { 
            id: 1, type: 'nazione', level: 'base', categoryIcon: '👮', categoryLabel: 'Sicurezza e Immigrazione', 
            text: 'Nelle piazze si dice spesso: "Siamo invasi, spendiamo tutto il bilancio dello Stato per mantenere i migranti". Quanto costa davvero l\'accoglienza sul totale della spesa pubblica italiana?', 
            options: [
                {id:'a', text:'Oltre il 15% del bilancio totale dello Stato', hint:'Un quinto di tutte le tasse degli italiani.'}, 
                {id:'b', text:'Meno dell\'1% della spesa pubblica complessiva', hint:'Una quota minima rispetto a pensioni e sanità.'}, 
                {id:'c', text:'Circa il 5% del bilancio statale', hint:'Una via di mezzo considerevole.'}
            ], 
            correct: 'b', 
            reality: 'La spesa per l\'accoglienza incide per circa lo 0.6% sul bilancio dello Stato. Il grosso della spesa pubblica italiana è assorbito stabilmente da Pensioni, Sanità e Interessi sul Debito.', 
            proContro: "PRO della scelta populista: Forte consenso elettorale immediato basato sulla percezione della paura.\nCONTRO: Tagliare questa voce non libera risorse rilevanti per abbassare le tasse o aumentare i servizi.",
            commonPerception: 35, realData: 0.6 
        },
        { 
            id: 2, type: 'nazione', level: 'intermediate', categoryIcon: '💸', categoryLabel: 'Tasse e Lavoro', 
            text: 'L\'introduzione di un "Salario Minimo Legale a 9€ l\'ora" spacca il paese. Qual è il rischio reale paventato dagli analisti economici per le imprese a basso valore aggiunto?', 
            options: [
                {id:'a', text:'Un aumento esponenziale del ricorso al lavoro nero', hint:'Per evitare il collasso dei margini aziendali.'}, 
                {id:'b', text:'Un immediato fallimento di tutte le multinazionali estere', hint:'I colossi dell\'e-commerce scappano.'}, 
                {id:'c', text:'L\'obbligo di dimezzare gli stipendi dei manager', hint:'Un livellamento forzato verso il basso.'}
            ], 
            correct: 'a', 
            reality: 'In settori fragili come agricoltura o servizi di pulizia, un salario minimo rigido senza un taglio drastico del cuneo fiscale rischia di spingere le micro-aziende verso il sommerso.', 
            proContro: "PRO del Salario Minimo: Tutela legale ed economica per i lavoratori poveri e non contrattualizzati.\nCONTRO: Rischio di aumento dell'evasione contributiva nelle aree economicamente meno sviluppate.",
            commonPerception: 45, realData: 100 
        },
        { 
            id: 3, type: 'nazione', level: 'advanced', categoryIcon: '📊', categoryLabel: 'Macroeconomia', 
            text: 'Per finanziare un taglio strutturale delle tasse (es. riduzione IRPEF) rispettando il nuovo Patto di Stabilità europeo, quale copertura finanziaria è considerata valida?', 
            options: [
                {id:'a', text:'Tagli permanenti alla spesa corrente (Spending Review) o emersione stabile dall\'evasione', hint:'Interventi strutturali e ricorrenti.'}, 
                {id:'b', text:'Un condono fiscale straordinario una tantum', hint:'Entrate immediate ma non ripetibili negli anni.'}, 
                {id:'c', text:'L\'emissione straordinaria di nuovi Titoli di Stato (BTP)', hint:'Finanziamento interamente in deficit.'}
            ], 
            correct: 'a', 
            reality: 'I mercati e le regole europee non accettano entrate fluttuanti o una tantum (come i condoni) per finanziare cali permanenti delle tasse; servono coperture strutturali stabili.', 
            proContro: "PRO della Spending Review: Stabilità dei conti e fiducia dei mercati finanziari (Spread basso).\nCONTRO: Riduzione immediata dei budget operativi dei Ministeri o dei servizi pubblici correnti.",
            commonPerception: 30, realData: 100 
        },

        // ======================== REGIONE ========================
        { 
            id: 4, type: 'regione', level: 'base', categoryIcon: '🏥', categoryLabel: 'Sanità Pubblica', 
            text: '"Per una mammografia nel pubblico servono 8 mesi. Se vado dal privato convenzionato pago e la faccio subito". Chi decide il budget per l\'abbattimento delle liste d\'attesa?', 
            options: [
                {id:'a', text:'Il Ministero della Salute a Roma', hint:'Centralismo statale.'}, 
                {id:'b', text:'La Regione, che gestisce l\'80% del proprio bilancio interno sulla salute', hint:'L\'ente titolare della spesa sanitaria.'}, 
                {id:'c', text:'Il Sindaco tramite ordinanza urgente', hint:'Intervento sanitario locale di prossimità.'}
            ], 
            correct: 'b', 
            reality: 'La sanità è una materia a gestione quasi esclusivamente regionale. È la tua Regione che decide quante prestazioni acquistare e come programmare il personale.', 
            proContro: "PRO del sistema regionale: Autonomia decisionale vicina alle esigenze del territorio.\nCONTRO: Crea enormi disuguaglianze di trattamento tra i cittadini di regioni diverse (Turismo sanitario).",
            commonPerception: 15, realData: 80 
        },

        // ======================== COMUNE ========================
        { 
            id: 5, type: 'comune', level: 'base', categoryIcon: '🗑️', categoryLabel: 'Tasse Locali e Rifiuti', 
            text: '"La TARI è alle stelle e le strade sono piene di immondizia. Il Sindaco usa i nostri soldi dei rifiuti per fare altro!". È legalmente possibile questa operazione?', 
            options: [
                {id:'a', text:'Sì, il Sindaco sposta le risorse di bilancio dove c\'è l\'emergenza delle buche', hint:'Flessibilità contabile dei comuni.'}, 
                {id:'b', text:'No. La TARI deve finanziare per legge esclusivamente il 100% del servizio di igiene urbana', hint:'Tassa a destinazione rigidamente vincolata.'}, 
                {id:'c', text:'Sì, ma solo una quota minima non superiore al 10%', hint:'Piccoli storni autorizzati.'}
            ], 
            correct: 'b', 
            reality: 'La TARI ha un vincolo di destinazione totale. Per legge deve coprire per intero i costi del Piano Finanziario dei rifiuti. Se il servizio fa schifo, è colpa dell\'efficienza gestionale, non dello storno di denaro.', 
            proContro: "PRO del vincolo di legge: Certezza che le risorse dei rifiuti rimangano nel settore ecologico.\nCONTRO: Se i costi di smaltimento aumentano (es. chiusura discariche), il Sindaco è OBBLIGATO ad aumentare la tassa.",
            commonPerception: 10, realData: 100 
        }
    ],

    politicalPromises: {
        comune: [
            { id: 'com_1', label: "Zero TARI: Elimino la tassa sui rifiuti per tutti", cost: 'alto', law: 'illegale', aiCorrection: "La legge statale vieta l'azzeramento immotivato: la TARI deve coprire il 100% del servizio. Riformulazione AI: 'Efficientamento degli impianti di riciclo per abbattere la tariffa del 20%'." },
            { id: 'com_2', label: "Più Sicurezza: Assunzione immediata di 300 Carabinieri", cost: 'medio', law: 'incompetenza', aiCorrection: "I Carabinieri dipendono dal Ministero della Difesa (Stato centrale), non dal Comune. Riformulazione AI: 'Estensione dei turni notturni della Polizia Municipale nelle periferie'." }
        ],
        regioni: [
            { id: 'reg_1', label: "Azzeramento Liste d'Attesa negli ospedali in 30 giorni", cost: 'altissimo', law: 'legale', aiCorrection: "Legale ma sforerebbe istantaneamente i tetti di spesa nazionali per il personale. Riformulazione AI: 'Rinegoziazione dei contratti con i privati accreditati vincolandoli alle urgenze dei CUP'." }
        ],
        nazione: [
            { id: 'naz_1', label: "Innalzamento delle Pensioni minime a 1500€ per tutti da domani", cost: 'astronomico', law: 'legale', aiCorrection: "Genera una spesa strutturale immediata da 40 miliardi l'anno, portando lo Spread fuori controllo. Riformulazione AI: 'Aumento progressivo indicizzato finanziato dal recupero fiscale dell'Iva inevasa'." }
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
                    <div class="territory-description">Analisi su macroeconomia, riforme e debito pubblico.</div>
                </div>
            </div>
            <div class="card card-interactive territory-card" onclick="app.loadTerritoriesList('regioni')">
                <div class="territory-icon">🏔️</div>
                <div class="territory-info">
                    <div class="territory-name">Livello Regionale (Le Regioni)</div>
                    <div class="territory-description">Analisi su Sanità, Trasporti pendolari e fondi locali.</div>
                </div>
            </div>
            <div class="card card-interactive territory-card" onclick="app.loadTerritoriesList('comuni')">
                <div class="territory-icon">🏢</div>
                <div class="territory-info">
                    <div class="territory-name">Livello Comunale (I Comuni)</div>
                    <div class="territory-description">Analisi su TARI, asili nido, autovelox e bilanci di prossimità.</div>
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
                        <div class="territory-description">${t.desc}</div>
                    </div>
                </div>`;
        });
    },
    
    selectTerritory(type, id) {
        this.state.selectedTerritoryType = type;
        this.state.selectedTerritoryId = id;
        this.state.currentQuestion = 0;
        this.state.answers = [];
        
        // Filtro dinamico delle domande per tipo di ente
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
        let sum = 'Le tue risposte mostrano una forte vulnerabilità agli slogan di pancia e alle percezioni distorte dei media. Le scelte che approvi crollerebbero al primo controllo tecnico di bilancio.';
        
        if(finalScore >= 70) {
            lvl = '👑 CERTIFICATO DI IDONEITÀ CIVICA EMESSO';
            sum = 'Hai dimostrato di saper distinguere i proclami politici dai reali vincoli di spesa e di attribuzione costituzionale delle competenze pubbliche.';
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

    // PDF 1: RISPOSTE + ANALISI PRO & CONTRO DELLE SCELTE
    stampaPdfRisposte() {
        let pdfTesto = `==================================================\n`;
        pdfTesto += `   DECRETO DI VERIFICA DELLA CONSAPEVOLEZZA CIVICA  \n`;
        pdfTesto += `==================================================\n\n`;
        pdfTesto += `ESITO VALUTAZIONE: ${document.getElementById('reportLevel').innerText}\n`;
        pdfTesto += `Indice di idoneità: ${document.getElementById('reportScoreValue').innerText}\n\n`;
        pdfTesto += `--- DETTAGLIO EFFETTI DELLE TUE SCELTE POLITIHE ---\n\n`;

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

    // PDF 2: PROGRAMMA ELETTORALE REVISIONATO E CORRETTO
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
        pdfProg += `Le riforme inserite sono state corrette dall'Intelligenza Civica per eliminare gli slogan impossibili, i falsi bilanci e i difetti di competenza legislativa:\n\n`;

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
