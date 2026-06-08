// =====================
// STATE
// =====================

let state = {
  level: "",
  name: "",
  score: 0,
  index: 0,
  questions: [],
  currentOptions: []
};


// =====================
// DATABASE
// =====================

const bank = {
  nazionale: [
    {
      q: "Lo Stato riduce le accise sui carburanti. Effetto più probabile?",
      options: [
        {t:"Riduzione entrate fiscali", correct:true},
        {t:"Aumento immediato salari", correct:false},
        {t:"Eliminazione inflazione", correct:false},
        {t:"Nessun effetto", correct:false}
      ]
    },
    {
      q: "Aumenta la spesa pubblica senza nuove entrate. Cosa accade?",
      options: [
        {t:"Aumento debito pubblico", correct:true},
        {t:"Riduzione prezzi automatica", correct:false},
        {t:"Crescita senza costi", correct:false},
        {t:"Eliminazione tasse", correct:false}
      ]
    },
    {
      q: "Crisi energetica: soluzione più strutturale?",
      options: [
        {t:"Diversificazione fonti energetiche", correct:true},
        {t:"Stop economia", correct:false},
        {t:"Blocco consumi totali", correct:false},
        {t:"Chiusura industria", correct:false}
      ]
    }
  ],

  regionale: [
    {
      q: "Aumentano liste d’attesa sanitarie. Possibile causa?",
      options: [
        {t:"Carenza personale medico", correct:true},
        {t:"Troppi ospedali inutili", correct:false},
        {t:"Zero pazienti", correct:false},
        {t:"Sanità automatica", correct:false}
      ]
    }
  ],

  comunale: [
    {
      q: "Aumenta il traffico urbano. Soluzione strutturale?",
      options: [
        {t:"Trasporto pubblico potenziato", correct:true},
        {t:"Divieto totale auto", correct:false},
        {t:"Chiusura città", correct:false},
        {t:"Eliminazione strade", correct:false}
      ]
    }
  ]
};


// =====================
// START
// =====================

function startQuiz(level){

  state.level = level;
  state.name = document.getElementById("username").value || "Utente";

  state.score = 0;
  state.index = 0;

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
    <div class="question-card">

      <div class="progress">
        ${state.index + 1} / ${state.questions.length}
      </div>

      <h3>${q.q}</h3>

      ${options.map((o,i)=>`
        <button class="answer-btn" onclick="answer(${i})">
          ${o.t}
        </button>
      `).join("")}

    </div>
  `;
}


// =====================
// ANSWER
// =====================

function answer(i){

  if(state.currentOptions[i].correct){
    state.score++;
  }

  state.index++;

  render();
}


// =====================
// FINISH
// =====================

function finish(){

  let percent = Math.round((state.score / state.questions.length) * 100);

  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").innerHTML = `
    <div class="hero-card">

      <h2>Risultato</h2>
      <h1>${percent}% Consapevolezza Civica</h1>

      <button onclick="location.reload()">Riprova</button>

    </div>
  `;
}


// =====================
// UTILS
// =====================

function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}
