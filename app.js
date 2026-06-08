let state = {
  level: "",
  name: "",
  index: 0,
  score: 0,
  questions: [],
  currentOptions: [],
  wrong: []
};


// =====================
// DATABASE
// =====================

const bank = {
  nazionale: [
    {
      q: "Riduzione delle accise sui carburanti: effetto principale?",
      options: [
        {t:"Riduzione entrate fiscali per lo Stato", c:true},
        {t:"Aumento salari immediato", c:false},
        {t:"Eliminazione inflazione", c:false},
        {t:"Nessun effetto economico", c:false}
      ],
      area:"economia"
    },
    {
      q: "Aumento spesa pubblica senza nuove entrate:",
      options: [
        {t:"Aumento debito pubblico", c:true},
        {t:"Riduzione prezzi automatica", c:false},
        {t:"Crescita senza costi", c:false},
        {t:"Eliminazione tasse", c:false}
      ],
      area:"economia"
    },
    {
      q: "Crisi energetica: soluzione strutturale migliore?",
      options: [
        {t:"Diversificazione fonti energetiche", c:true},
        {t:"Stop economia", c:false},
        {t:"Blocco consumi totali", c:false},
        {t:"Chiusura industrie", c:false}
      ],
      area:"energia"
    }
  ]
};


// =====================
// START FIX (QUI ERA IL BUG)
// =====================

function start(level){

  const input = document.getElementById("username");

  state.level = level;

  // 🔥 FIX DEFINITIVO NOME
  state.name = (input && input.value)
    ? input.value.trim()
    : "Utente";

  state.index = 0;
  state.score = 0;
  state.wrong = [];

  state.questions = shuffle(bank[level]);

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  render();
}


// =====================
// RENDER
// =====================

function render(){

  let q = state.questions[state.index];

  if(!q){
    finish();
    return;
  }

  let options = shuffle([...q.options]);
  state.currentOptions = options;

  document.getElementById("quiz").innerHTML = `
    <div class="progress">
      ${state.index + 1} / ${state.questions.length}
    </div>

    <div class="question">
      ${q.q}
    </div>

    ${options.map((o,i)=>`
      <button class="answer" onclick="answer(${i})">
        ${o.t}
      </button>
    `).join("")}

  `;
}


// =====================
// ANSWER
// =====================

function answer(i){

  let selected = state.currentOptions[i];

  if(selected.c){
    state.score++;
  }

  state.index++;
  render();
}


// =====================
// FINISH + PDF FIX
// =====================

function finish(){

  document.getElementById("quiz").style.display = "none";

  const name = state.name || "Utente";

  let percent = Math.round((state.score / state.questions.length) * 100);

  document.getElementById("result").innerHTML = `
    <h2>Risultato finale</h2>
    <h1>${percent}% Consapevolezza Civica</h1>

    <p>Nome: <b>${name}</b></p>
    <p>Livello: <b>${state.level}</b></p>

    <button onclick="downloadPDF()">Scarica Report</button>
    <button onclick="location.reload()">Riprova</button>
  `;

  document.getElementById("result").style.display = "block";
}


// =====================
// PDF FIX
// =====================

function downloadPDF(){

  const name = state.name || "Utente";

  let text = `
PATENTE DI CONSAPEVOLEZZA CIVICA

Nome: ${name}
Livello: ${state.level}

Punteggio: ${state.score} / ${state.questions.length}
Consapevolezza: ${Math.round((state.score/state.questions.length)*100)}%
  `;

  let blob = new Blob([text], {type:"text/plain"});
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = `report_${name}.txt`;
  a.click();
}


// =====================
// UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
