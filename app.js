// =====================================
// PATENTE DI CONSAPEVOLEZZA CIVICA v2
// FIX RANDOM + STRUTTURA SERIA
// =====================================


let user = {
  name: "",
  score: 0,
  index: 0,
  questions: []
};


// =====================
// DATABASE MIGLIORATO
// =====================

const bank = {

  nazionale: [
    {
      q: "Il governo riduce le accise sui carburanti in un periodo di crisi energetica. Qual è un possibile effetto?",
      options: [
        {t:"Riduzione entrate fiscali e possibile aumento deficit", correct:true},
        {t:"Eliminazione immediata dell’inflazione", correct:false},
        {t:"Aumento automatico dei salari", correct:false},
        {t:"Nessun effetto economico", correct:false}
      ],
      explanation: "Le accise sono una fonte diretta di entrate per lo Stato."
    },

    {
      q: "Un Paese aumenta la spesa pubblica senza aumentare le entrate. Cosa accade più probabilmente?",
      options: [
        {t:"Aumento del debito pubblico", correct:true},
        {t:"Riduzione immediata dei prezzi", correct:false},
        {t:"Crescita senza conseguenze", correct:false},
        {t:"Cancellazione del debito", correct:false}
      ],
      explanation: "Quando la spesa supera le entrate si genera deficit."
    },

    {
      q: "Durante una crisi energetica, quale scelta è più sostenibile nel lungo periodo?",
      options: [
        {t:"Diversificazione delle fonti energetiche", correct:true},
        {t:"Blocco totale dei consumi", correct:false},
        {t:"Eliminazione dei trasporti", correct:false},
        {t:"Sospensione economia", correct:false}
      ],
      explanation: "La diversificazione riduce la dipendenza da una sola fonte."
    }
  ]
};


// =====================
// START
// =====================

function startTest(){

  user.name = document.getElementById("username").value || "Utente";

  user.score = 0;
  user.index = 0;

  let all = bank.nazionale;

  user.questions = shuffle(all).slice(0, 4);

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  render();
}


// =====================
// RENDER
// =====================

function render(){

  let q = user.questions[user.index];

  let options = shuffle([...q.options]); // 🔥 FIX RANDOM

  user.currentOptions = options;

  let quiz = document.getElementById("quiz");

  quiz.innerHTML = `
    <div class="question-card">

      <div class="progress">
        Domanda ${user.index + 1} / ${user.questions.length}
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

  let selected = user.currentOptions[i];

  if(selected.correct){
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

      <h2>Risultato ${user.name}</h2>

      <h1>${percent}% Consapevolezza Civica</h1>

      <p>
        Il risultato non misura opinioni politiche,
        ma comprensione delle conseguenze delle decisioni pubbliche.
      </p>

      <button onclick="location.reload()">Riprova</button>

    </div>
  `;
}


// =====================
// UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
