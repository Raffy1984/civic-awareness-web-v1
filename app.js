let user = {
  level: "",
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
      q: "Il governo riduce le accise sui carburanti. Cosa succede più probabilmente?",
      options: [
        {t:"Diminuzione entrate fiscali", correct:true},
        {t:"Eliminazione inflazione", correct:false},
        {t:"Aumento automatico salari", correct:false},
        {t:"Nessun effetto", correct:false}
      ]
    },
    {
      q: "Aumenta la spesa pubblica senza nuove entrate. Effetto probabile?",
      options: [
        {t:"Aumento debito pubblico", correct:true},
        {t:"Riduzione prezzi", correct:false},
        {t:"Crescita senza limiti", correct:false},
        {t:"Azzeramento tasse", correct:false}
      ]
    },
    {
      q: "Crisi energetica. Qual è soluzione strutturale?",
      options: [
        {t:"Diversificazione fonti energetiche", correct:true},
        {t:"Blocco economia", correct:false},
        {t:"Stop consumi globali", correct:false},
        {t:"Eliminazione industria", correct:false}
      ]
    },
    {
      q: "Aumento sicurezza urbana. Qual è intervento efficace?",
      options: [
        {t:"Prevenzione + controllo territorio", correct:true},
        {t:"Eliminare città", correct:false},
        {t:"Nessun intervento", correct:false},
        {t:"Stop popolazione", correct:false}
      ]
    },
    {
      q: "Sanità pubblica sotto pressione. Possibile causa?",
      options: [
        {t:"Carenza personale medico", correct:true},
        {t:"Troppi ospedali inutili", correct:false},
        {t:"Zero pazienti", correct:false},
        {t:"Eccesso di fondi illimitati", correct:false}
      ]
    }
  ]
};


// =====================
// START
// =====================

function setLevel(level){

  user.level = level;
  user.score = 0;
  user.index = 0;

  let pool = bank[level];

  // 🔥 NESSUN slice basso → test reale
  user.questions = shuffle(pool);

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  render();
}


// =====================
// RENDER
// =====================

function render(){

  let q = user.questions[user.index];

  // 🔥 shuffle vero delle opzioni
  let options = shuffle([...q.options]);

  user.currentOptions = options;

  document.getElementById("quiz").innerHTML = `
    <div class="question-card">

      <div class="progress">
        ${user.index + 1} / ${user.questions.length}
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
      <h1>${percent}% Consapevolezza Civica</h1>

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
