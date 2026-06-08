// =====================
// SAFE MODE ENGINE
// =====================

let user = {
  score: 0,
  index: 0,
  questions: [],
  currentOptions: []
};


// =====================
// DATABASE MINIMO SICURO
// =====================

const bank = {
  nazionale: [
    {
      q: "Riduzione accise carburanti. Effetto principale?",
      options: [
        {t:"Riduzione entrate fiscali", correct:true},
        {t:"Eliminazione inflazione", correct:false},
        {t:"Aumento salari automatico", correct:false},
        {t:"Nessun effetto", correct:false}
      ]
    },
    {
      q: "Aumento spesa pubblica senza entrate?",
      options: [
        {t:"Aumento debito pubblico", correct:true},
        {t:"Riduzione prezzi", correct:false},
        {t:"Crescita senza costi", correct:false},
        {t:"Azzeramento tasse", correct:false}
      ]
    }
  ]
};


// =====================
// INIT (🔥 DEBUG SAFE)
// =====================

function initQuiz(level){

  try {

    console.log("START QUIZ:", level);

    if(!bank[level]){
      alert("Livello non trovato: " + level);
      return;
    }

    user.score = 0;
    user.index = 0;
    user.questions = bank[level];

    document.getElementById("home").style.display = "none";

    render();

  } catch (e) {
    console.error(e);
    document.body.innerHTML = "ERRORE AVVIO QUIZ";
  }
}


// =====================
// RENDER
// =====================

function render(){

  let q = user.questions[user.index];

  if(!q){
    finish();
    return;
  }

  let options = shuffle([...q.options]);
  user.currentOptions = options;

  document.getElementById("quiz").innerHTML = `
    <div class="question-card">

      <h3>${q.q}</h3>

      ${options.map((o,i)=>`
        <button onclick="answer(${i})">${o.t}</button>
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
  render();
}


// =====================
// FINISH
// =====================

function finish(){

  document.getElementById("quiz").innerHTML = "";
  document.getElementById("result").innerHTML = `
    <h2>Risultato</h2>
    <h1>${user.score} / ${user.questions.length}</h1>
    <button onclick="location.reload()">Riprova</button>
  `;
}


// =====================
// UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
