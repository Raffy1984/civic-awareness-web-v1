// --- STATO DELL'APPLICAZIONE ---
let nome = "";
let livello = "";
let territorio = "";
let index = 0;
let score = { sociale: 0, economico: 0, consenso: 0 };
let quesitiSelezionati = []; // Conterrà solo le domande della sessione corrente

// --- DATABASE DELLE DOMANDE NAZIONALI ("I Temi del Bar e della TV") ---
const DB_NAZIONALE = [
  {
    t: "Lavoro e Salari",
    q: "Il salario minimo legale a 9 euro l'ora: l'opposizione spinge, la maggioranza frena. Tu che fai?",
    o: [
      { t: "Lo approvo subito. Sotto i 9 euro è sfruttamento. (Impatto Sociale +2, Rischio inflazione/lavoro nero per micro-imprese)", v: [2, -1, 2] },
      { t: "Taglio il cuneo fiscale. Più soldi in busta paga senza gravare sulle aziende. (Meno tasse in entrata per lo Stato)", v: [1, 1, 1] },
      { t: "Contrariazione collettiva. Lasciamo che decidano i sindacati settore per settore.", v: [0, 0, -1] },
      { t: "Nessun salario minimo, serve totale flessibilità per essere competitivi.", v: [-2, 2, -2] }
    ]
  },
  {
    t: "Sicurezza e Immigrazione",
    q: "Sbarchi continui e percezione di insicurezza nelle periferie delle grandi città. Qual è la tua mossa?",
    o: [
      { t: "Blocco navale e rimpatri forzati immediati. (Consenso immediato altissimo, criticità legali internazionali)", v: [-1, -1, 3] },
      { t: "Accoglienza diffusa, corsi di lingua e inserimento lavorativo obbligatorio. (Spesa pubblica alta, integrazione a lungo termine)", v: [2, -1, -1] },
      { t: "Presidio militare (Strade Sicure) in tutte le stazioni e quartieri a rischio.", v: [1, -1, 2] },
      { t: "Sanatoria per i lavoratori irregolari già attivi (colf, badanti, agricoltura) per farli tassare.", v: [1, 2, -1] }
    ]
  },
  {
    t: "Fisco e Tasse",
    q: "Flat Tax (tassa piatta) estesa a tutti i lavoratori dipendenti. Che ne pensi?",
    o: [
      { t: "Favorevole. Meno tasse per tutti stimolano i consumi e l'economia.", v: [0, 2, 2] },
      { t: "Contrario. Viola il principio costituzionale della progressività e favorisce i ricchi.", v: [2, -1, -1] },
      { t: "Sì, ma solo per le partite IVA e i giovani imprenditori sotto i 35 anni.", v: [1, 1, 1] }
    ]
  }
  // Qui dentro potrai incollare centinaia di altre domande nazionali...
];

// --- DATABASE REGIONALE (Strutturato per ID Regione) ---
const DB_REGIONALE = {
  "Lazio": [
    { t: "Rifiuti", q: "Termovalorizzatore a Roma: i comitati dicono no per l'ambiente, la Regione spinge per l'autonomia energetica. Da che parte stai?", v: [...] }
  ],
  "Lombardia": [
    { t: "Sanità", q: "Crescita dei centri privati convenzionati a discapito dei pronto soccorso pubblici. Come intervieni?", v: [...] }
  ],
  "Campania": [
    { t: "Ambiente", q: "Bonifica della Terra dei Fuochi e fondi europei bloccati dalla burocrazia. Come sblocchi la situazione?", v: [...] }
  ]
  // Basterà aggiungere le altre 17 regioni come chiavi qui dentro
};

// --- DATABASE COMUNALE (Esempio di automazione per macro-temi) ---
// Nota: Per non scrivere 7900 comuni a mano, usiamo domande "tipo" che si adattano al sindaco locale
const DB_COMUNALE_GENERICO = [
  {
    t: "Viabilità urbana",
    q: "Il Comune vuole estendere le zone 30 km/h e le piste ciclabili in centro. I commercianti protestano, i ciclisti esultano.",
    o: [
      { t: "Avanti tutta. Meno auto, meno inquinamento, città a misura d'uomo.", v: [2, -1, 0] },
      { t: "Blocco il piano. Le auto devono circolare, i negozianti stanno fallendo.", v: [-1, 2, 2] },
      { t: "Compromesso: ZTL solo nei weekend e parcheggi sotterranei gratuiti per i clienti dei negozi.", v: [1, 1, 1] }
    ]
  },
  {
    t: "Tendenze Locali",
    q: "Mancanza di fondi nel bilancio comunale: il Sindaco propone di aumentare la tassa di soggiorno e installare più Autovelox.",
    o: [
      { t: "Approvo. Pagano i turisti e chi corre in auto, salviamo i servizi sociali.", v: [1, 2, -1] },
      { t: "Contrario. Gli autovelox sono solo un modo per fare cassa sulle spalle dei pendolari.", v: [-1, -2, 2] }
    ]
  }
];

// --- GESTIONE DEI 7900 COMUNI (Simulata via API o Array di supporto) ---
// Per i comuni usiamo una lista che l'utente può cercare. Ecco le 20 regioni per il menu a tendina:
const REGIONI_LISTA = ["Abruzzo","Basilicata","Calabria","Campania","Emilia-Romagna","Friuli-Venezia Giulia","Lazio","Liguria","Lombardia","Marche","Molise","Piemonte","Puglia","Sardegna","Sicilia","Toscana","Trentino-Alto Adige","Umbria","Valle d'Aosta","Veneto"];

function start() {
  nome = document.getElementById("nome").value.trim() || "Cittadino";
  switchSection("intro", "menu");
}

function setLevel(l) {
  livello = l;
  if (l === "nazionale") {
    quesitiSelezionati = DB_NAZIONALE; // Prende le domande nazionali
    startQuiz();
  } else {
    setupTerritorioSelect();
  }
}

function setupTerritorioSelect() {
  const sel = document.getElementById("selectTerritorio");
  sel.innerHTML = "";
  
  if (livello === "regionale") {
    // Carica le 20 regioni
    REGIONI_LISTA.forEach(r => {
      let o = document.createElement("option"); o.value = r; o.textContent = r; sel.appendChild(o);
    });
  } else if (livello === "comunale") {
    // Qui in futuro caricherai i comuni via API. Per ora mettiamo i principali delle grandi città
    const comuniEsempio = ["Roma", "Milano", "Napoli", "Torino", "Palermo", "Bologna", "Firenze", "Bari"];
    comuniEsempio.forEach(c => {
      let o = document.createElement("option"); o.value = c; o.textContent = c; sel.appendChild(o);
    });
  }
  switchSection("menu", "territorio");
}

function confirmTerritory() {
  territorio = document.getElementById("selectTerritorio").value;
  
  if (livello === "regionale") {
    // Se la regione ha domande specifiche le usa, altrimenti usa quelle di default
    quesitiSelezionati = DB_REGIONALE[territorio] || DB_NAZIONALE; 
  } else {
    // Livello Comunale
    quesitiSelezionati = DB_COMUNALE_GENERICO;
  }
  
  switchSection("territorio", "quiz");
  startQuiz();
}

function startQuiz() {
  index = 0;
  score = { sociale: 0, economico: 0, consenso: 0 };
  renderQuestion();
}

function renderQuestion() {
  let q = quesitiSelezionati[index];
  if (!q) { finish(); return; }

  let html = `
    <div class="tag">${q.t.toUpperCase()}</div>
    <h3>Scenario ${index + 1} di ${quesitiSelezionati.length} ${territorio ? `(${territorio})` : ''}</h3>
    <p style="color: var(--text-muted); margin-bottom: 20px; font-size: 1.1rem;">${q.q}</p>
  `;

  q.o.forEach((opt) => {
    html += `<button class="option-btn" onclick="answer(${opt.v[0]}, ${opt.v[1]}, ${opt.v[2]})">${opt.t}</button>`;
  });

  document.getElementById("quiz").innerHTML = html;
}

function answer(s, e, c) {
  score.sociale += s; score.economico += e; score.consenso += c;
  index++;
  renderQuestion();
}

function finish() {
  switchSection("quiz", "result");
  let tot = score.sociale + score.economico + score.consenso;
  let classe = tot >= 4 ? "high" : (tot <= 0 ? "low" : "medium");
  let txt = tot >= 4 ? "PROMOSSO" : (tot <= 0 ? "BOCCIATO" : "RIVEDIBILE");

  document.getElementById("result").innerHTML = `
    <h2>Risultato per ${nome}</h2>
    <div class="result-badge ${classe}">${txt}</div>
    <p>Bilancio Sociale: ${score.sociale} | Economia: ${score.economico} | Popolarità: ${score.consenso}</p>
    <button class="btn-primary" onclick="location.reload()">Riprova</button>
  `;
}

function switchSection(from, to) {
  document.getElementById(from).classList.remove("active");
  document.getElementById(to).classList.add("active");
}
