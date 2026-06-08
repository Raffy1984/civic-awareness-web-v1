let state = {
  level: "",
  name: "",
  index: 0,
  score: 0,
  questions: [],
  currentOptions: []
};


// =====================
// DATABASE COMPLETO
// =====================

const bank = {

  nazionale: [
    {
      q: "Riduzione delle accise sui carburanti: effetto principale?",
      options: [
        {t:"Riduzione entrate fiscali per lo Stato", c:true},
        {t:"Aumento immediato salari", c:false},
        {t:"Eliminazione inflazione", c:false},
        {t:"Nessun effetto economico", c:false}
      ]
    },
    {
      q: "Aumento del debito pubblico cosa indica?",
      options: [
        {t:"Più spesa rispetto alle entrate", c:true},
        {t:"Più tasse automatiche basse", c:false},
        {t:"Crescita senza costi", c:false},
        {t:"Riduzione dello Stato", c:false}
      ]
    }
  ],

  regionale: [
    {
      q: "Liste d’attesa sanitarie in aumento: causa più probabile?",
      options: [
        {t:"Carenza personale sanitario", c:true},
        {t:"Troppi ospedali", c:false},
        {t:"Zero pazienti", c:false},
        {t:"Sistema perfetto", c:false}
      ]
    }
  ],

  comunale: [
    {
      q: "Traffico urbano in aumento: soluzione efficace?",
      options: [
        {t:"Potenziamento trasporto pubblico", c:true},
        {t:"Chiusura totale città", c:false},
        {t:"Eliminazione auto", c:false},
        {t:"Stop mobilità", c:false}
      ]
    }
  ]

};


// =====================
// START
// =====================

function start(level){

  const input = document.getElementById("username");

  state.level = level;
  state.name = input.value.trim() || "Utente";

  state.index = 0;
  state.score = 0;

  state.questions = shuffle(bank[level]);

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  render();
}


// =====================
// RENDER
// =====================

function render(){

  const q = state.questions[state.index];

  if(!q){
    return finish();
  }

  const options = shuffle([...q.options]);
  state.currentOptions = options;

  document.getElementById("quiz").innerHTML = `
    <div class="progress">${state.index+1} / ${state.questions.length}</div>

    <div class="question">${q.q}</div>

    ${options.map((o,i)=>`
      <button class="answer" onclick="answer(${i})">${o.t}</button>
    `).join("")}
  `;
}


// =====================
// ANSWER
// =====================

function answer(i){

  if(state.currentOptions[i].c){
    state.score++;
  }

  state.index++;
  render();
}


// =====================
// FINISH + PDF
// =====================

function finish(){

  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";

  const percent = Math.round((state.score/state.questions.length)*100);

  document.getElementById("result").innerHTML = `
    <h2>Risultato finale</h2>
    <h1>${percent}% Consapevolezza</h1>

    <p>Nome: <b>${state.name}</b></p>
    <p>Livello: <b>${state.level}</b></p>

    <button onclick="downloadPDF()">Scarica Report</button>
    <button onclick="location.reload()">Riprova</button>
  `;
}


// =====================
// PDF
// =====================

function downloadPDF(){

  const text = `
PATENTE DI CONSAPEVOLEZZA CIVICA

Nome: ${state.name}
Livello: ${state.level}

Punteggio: ${state.score} / ${state.questions.length}
Percentuale: ${Math.round((state.score/state.questions.length)*100)}%
  `;

  const blob = new Blob([text], {type:"text/plain"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "report_consapevolezza.txt";
  a.click();
}


// =====================
// UTILS
// =====================

function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}
