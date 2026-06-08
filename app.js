// =====================
// STATE
// =====================

let user = {
  name: "",
  level: "",
  score: 0,
  index: 0,
  questions: [],
  currentOptions: []
};


// =====================
// DATABASE GRANDE (SEMPLIFICATO MA MULTILIVELLO)
// =====================

const bank = {

  nazionale: [
    {
      q: "In una crisi energetica, lo Stato riduce le tasse sui carburanti. Cosa può accadere?",
      options: [
        {t:"Riduzione entrate fiscali e possibile aumento deficit", correct:true},
        {t:"Eliminazione inflazione", correct:false},
        {t:"Aumento salari immediato", correct:false},
        {t:"Nessun effetto", correct:false}
      ]
    },
    {
      q: "Aumenta la spesa pubblica senza nuove entrate. Cosa succede?",
      options: [
        {t:"Aumento debito pubblico", correct:true},
        {t:"Riduzione prezzi automatica", correct:false},
        {t:"Crescita senza costi", correct:false},
        {t:"Eliminazione tasse", correct:false}
      ]
    }
  ],

  regionale: [
    {
      q: "In una regione aumentano le liste d’attesa sanitarie. Possibile causa?",
      options: [
        {t:"Carenza personale sanitario", correct:true},
        {t:"Troppi medici inutilizzati", correct:false},
        {t:"Zero pazienti", correct:false},
        {t:"Sanità gratuita illimitata", correct:false}
      ]
    }
  ],

  comunale: [
    {
      q: "In una città aumenta il traffico. Soluzione strutturale?",
      options: [
        {t:"Trasporto pubblico potenziato", correct:true},
        {t:"Divieto totale auto per sempre", correct:false},
        {t:"Chiusura città", correct:false},
        {t:"Eliminazione strade", correct:false}
      ]
    }
  ]
};


// =====================
// SET LEVEL (🔥 FIX PRINCIPALE)
// =====================

function setLevel(level){

  user.name = document.getElementById("username").value || "Utente";
  user.level = level;

  user.score = 0;
  user.index = 0;

  let pool = bank[level];

  user.questions = shuffle(pool).slice(0, 10); // 🔥 ORA NON 4

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  render();
}


// =====================
// RENDER
// =====================

function render(){

  let q = user.questions[user.index];

  let options = shuffle([...q.options]);
  user.currentOptions = options;

  document.getElementById("quiz").innerHTML = `
    <div class="question-card">

      <div class="progress">
        ${user.level.toUpperCase()} - ${user.index + 1}/${user.questions.length}
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

  if(user.currentOptions[i].correct){
    user.score++;
  }

  user.index++;

  if(user.index >= user.questions.length){
    finish();
  } else {
    render();
  }
}


// =====================
// FINISH
// =====================

function finish(){

  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";

  let percent = Math.round((user.score / user.questions.length) * 100);

  document.getElementById("result").innerHTML = `
    <div class="hero-card">

      <h2>Risultato</h2>

      <h1>${percent}% Consapevolezza</h1>

      <p>Livello: ${user.level}</p>

      <button onclick="location.reload()">Ricomincia</button>

    </div>
  `;
}


// =====================
// UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
