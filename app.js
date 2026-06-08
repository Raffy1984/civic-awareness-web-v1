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
// DATABASE SERIO
// =====================

const bank = {
  nazionale: [
    {
      q: "Riduzione delle accise sui carburanti: effetto più probabile?",
      options: [
        {t:"Riduzione entrate fiscali per lo Stato", c:true},
        {t:"Aumento immediato salari reali", c:false},
        {t:"Eliminazione inflazione", c:false},
        {t:"Nessun effetto economico", c:false}
      ],
      area:"economia",
      explanation:"Le accise sono una tassa diretta sui carburanti, quindi ridurle riduce le entrate pubbliche."
    },
    {
      q: "Aumento spesa pubblica senza nuove entrate:",
      options: [
        {t:"Aumento del debito pubblico", c:true},
        {t:"Riduzione automatica prezzi", c:false},
        {t:"Crescita senza conseguenze", c:false},
        {t:"Eliminazione tasse", c:false}
      ],
      area:"economia",
      explanation:"Se lo Stato spende più di quanto incassa, genera deficit."
    },
    {
      q: "Crisi energetica: soluzione strutturale più efficace?",
      options: [
        {t:"Diversificazione fonti energetiche", c:true},
        {t:"Blocco totale consumi", c:false},
        {t:"Chiusura industria", c:false},
        {t:"Stop economia", c:false}
      ],
      area:"energia",
      explanation:"Diversificare riduce dipendenza da una sola fonte."
    }
  ]
};


// =====================
// START
// =====================

function start(level){

  state.level = level;
  state.name = document.getElementById("username").value || "Utente";

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

  if(!q) return finish();

  let options = shuffle([...q.options]);
  state.currentOptions = options;

  document.getElementById("quiz").innerHTML = `
    <div class="progress">${state.index+1} / ${state.questions.length}</div>

    <div class="question">${q.q}</div>

    ${options.map((o,i)=>`
      <button class="answer" onclick="answer(${i})">${o.t}</button>
    `).join("")}

    <div class="small">Livello: ${state.level}</div>
  `;
}


// =====================
// ANSWER
// =====================

function answer(i){

  let selected = state.currentOptions[i];
  let q = state.questions[state.index];

  if(selected.c){
    state.score++;
  } else {
    state.wrong.push(q);
  }

  state.index++;
  render();
}


// =====================
// FINISH
// =====================

function finish(){

  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";

  let percent = Math.round((state.score / state.questions.length) * 100);

  let analysis = `
    <h2>Risultato</h2>
    <h1>${percent}% Consapevolezza Civica</h1>

    <p><b>Nome:</b> ${state.name}</p>
    <p><b>Livello:</b> ${state.level}</p>

    <button onclick="downloadPDF()">Scarica PDF</button>
    <button onclick="location.reload()">Riprova</button>
  `;

  document.getElementById("result").innerHTML = analysis;
}


// =====================
// PDF (SIMPLE EXPORT)
// =====================

function downloadPDF(){

  let text = `
Patente di Consapevolezza Civica

Nome: ${state.name}
Livello: ${state.level}

Punteggio: ${state.score} / ${state.questions.length}
Consapevolezza: ${Math.round((state.score/state.questions.length)*100)}%
  `;

  let blob = new Blob([text], {type:"text/plain"});
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "report_consapevolezza.txt";
  a.click();
}


// =====================
// UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
