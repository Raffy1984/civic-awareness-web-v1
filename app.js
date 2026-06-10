// --- STATO DELL'APPLICAZIONE ---
let nome = "";
let livello = "";
let territorio = "";
let index = 0;
let score = { sociale: 0, economico: 0, consenso: 0 };

// --- DATABASE DOMANDE ---
// Puoi espandere questo array aggiungendo quanti scenari vuoi
const DB = [
  {
    t: "Economia",
    q: "L'inflazione galoppa e i cittadini perdono potere d'acquisto. Come intervieni?",
    o: [
      { t: "Aumento dei salari per legge (Impatto immediato, rischio spirale prezzi)", v: [2, -1, 1] },
      { t: "Taglio drastico delle tasse su imprese e consumi (Stimolo economico, meno entrate pubbliche)", v: [0, 2, 1] },
      { t: "Calmiere dei prezzi sui beni di prima necessità (Consenso alto, rischio carenza merci)", v: [1, -2, 2] },
      { t: "Nessun intervento, il mercato si autoregolerà (Rischio recessione, stabilità di bilancio)", v: [-2, 1, -2] }
    ]
  },
  {
    t: "Sanità Pubblica",
    q: "Le liste d'attesa negli ospedali superano i 12 mesi per esami critici. Strategia?",
    o: [
      { t: "Assunzione massiccia di medici e turni extra pagati dallo Stato", v: [2, -2, 2] },
      { t: "Convenzionare i privati per smaltire le liste velocemente", v: [1, 1, 0] },
      { t: "Digitalizzazione dei processi e sanzioni a chi salta gli appuntamenti", v: [1, 2, -1] },
      { t: "Tagliare i servizi meno richiesti per accentrare le risorse", v: [-2, 1, -2] }
    ]
  }
];

const REGIONI = ["Lazio", "Lombardia", "Campania"];
const COMUNI = ["Roma", "Milano", "Napoli"];

// --- FUNZIONI DI NAVIGAZIONE E LOGICA ---

function start() {
  const inputNome = document.getElementById("nome").value.trim();
  nome = inputNome || "Cittadino Anonimo";
  switchSection("intro", "menu");
}

function setLevel(l) {
  livello = l;
  if (l === "nazionale") {
    startQuiz();
  } else {
    const sel = document.getElementById("selectTerritorio");
    sel.innerHTML = "";
    const list = l === "regionale" ? REGIONI : COMUNI;
    
    list.forEach(x => {
      let o = document.createElement("option");
      o.value = x;
      o.textContent = x;
      sel.appendChild(o);
    });
    switchSection("menu", "territorio");
  }
}

function confirmTerritory() {
  territorio = document.getElementById("selectTerritorio").value;
  switchSection("territorio", "quiz");
  startQuiz();
}

function startQuiz() {
  index = 0;
  score = { sociale: 0, economico: 0, consenso: 0 };
  document.getElementById("quiz").classList.add("active");
  renderQuestion();
}

function renderQuestion() {
  let q = DB[index];
  if (!q) { finish(); return; }

  let locInfo = territorio ? ` <span>(${territorio})</span>` : "";

  let html = `
    <div class="tag">${q.t.toUpperCase()}</div>
    <h3>Scenario ${index + 1} di ${DB.length} ${locInfo}</h3>
    <p style="color: var(--text-muted); margin-bottom: 20px;">${q.q}</p>
  `;

  q.o.forEach((opt, idx) => {
    html += `
      <button class="option-btn" onclick="answer(${opt.v[0]}, ${opt.v[1]}, ${opt.v[2]})">
        ${opt.t}
      </button>
    `;
  });

  document.getElementById("quiz").innerHTML = html;
}

function answer(s, e, c) {
  score.sociale += s;
  score.economico += e;
  score.consenso += c;
  index++;
  renderQuestion();
}

function finish() {
  document.getElementById("quiz").classList.remove("active");
  document.getElementById("result").classList.add("active");

  let tot = score.sociale + score.economico + score.consenso;
  
  let classeValutazione = "medium";
  let txt = "MEDIA CONSAPEVOLEZZA";
  let spiegazione = "Riesci a vedere le conseguenze di alcune scelte, ma rischi di cedere a soluzioni troppo populiste o a rigorismi eccessivi. Bilancia meglio economia e bisogni sociali.";

  if (tot >= 4 && score.economico >= 0 && score.sociale >= 0) {
    classeValutazione = "high";
    txt = "ALTA CONSAPEVOLEZZA (PROMOSSO)";
    spiegazione = "Ottimo. Dimostri di comprendere che ogni diritto ha un costo e ogni taglio ha un impatto sociale. Non ti lasci incantare da risposte facili a problemi complessi.";
  } else if (tot <= 0 || score.economico < -2 || score.sociale < -2) {
    classeValutazione = "low";
    txt = "BASSA CONSAPEVOLEZZA (BOCCIATO)";
    spiegazione = "Le tue decisioni tendono a massimizzare il consenso immediato distruggendo i bilanci, oppure a tagliare lo stato sociale senza valutarne i danni collaterali.";
  }

  document.getElementById("result").innerHTML = `
    <h2>Risultato per ${nome}</h2>
    <div class="subtitle">Livello testato: ${livello.toUpperCase()} ${territorio ? `(${territorio})` : ''}</div>
    
    <div class="result-badge ${classeValutazione}">${txt}</div>
    
    <p style="color: var(--text-muted); line-height: 1.5; margin-bottom: 25px;">${spiegazione}</p>
    
    <div style="font-size: 0.9rem; background: #0f172a; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <strong>I tuoi macro-indicatori finali:</strong><br>
      • Impatto Sociale: ${score.sociale}<br>
      • Sostenibilità Economica: ${score.economico}<br>
      • Consenso Politico: ${score.consenso}
    </div>

    <button class="btn-primary" onclick="location.reload()">Riprova il Test</button>
  `;
}

function switchSection(from, to) {
  document.getElementById(from).classList.remove("active");
  document.getElementById(to).classList.add("active");
}
