let user = {
  level: "",
  score: 0,
  index: 0,
  questions: [],
  currentOptions: []
};


// =====================
// DATABASE (MINIMO MA SICURO)
// =====================

const bank = {
  nazionale: [
    {
      q: "Il governo riduce le accise sui carburanti. Cosa succede?",
      options: [
        {t:"Diminuzione entrate fiscali", correct:true},
        {t:"Eliminazione inflazione", correct:false},
        {t:"Aumento salari automatico", correct:false},
        {t:"Nessun effetto", correct:false}
      ]
    },
    {
      q: "Aumenta la spesa pubblica senza nuove entrate. Effetto?",
      options: [
        {t:"Aumento debito pubblico", correct:true},
        {t:"Riduzione prezzi immediata", correct:false},
        {t:"Crescita senza limiti", correct:false},
        {t:"Eliminazione tasse", correct:false}
      ]
    },
    {
      q: "Crisi energetica: soluzione strutturale migliore?",
      options: [
        {t:"Diversificazione fonti energetiche", correct:true},
        {t:"Blocco economia", correct:false},
        {t:"Stop consumi", correct:false},
        {t:"Azzeramento industria", correct:false}
      ]
    }
  ]
};


// =====================
// START (SAFE MODE)
// =====================

function setLevel(level){

  try {

    user.level = level;
    user.score = 0;
    user.index = 0;

    if(!bank[level] || bank[level].length === 0){
      alert("Errore: database vuoto");
      return;
    }

    user.questions = shuffle(bank[level]);

    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";

    render();

  } catch(e){
    console.error(e);
    alert("Errore avvio quiz");
  }
}


// =====================
// RENDER (SAFE)
// =====================

function render(){

  let q = user.questions[user.index];

  // 🔥 BLOCCO ANTI-CRASH
  if(!q){
    finish();
    return;
  }

  if(!q.options || q.options.length === 0){
    console.error("Domanda senza opzioni:", q);
    user.index++;
    render();
    return;
  }

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

  if(!user.currentOptions[i]) return;

  if(user.currentOptions[i].correct){
    user.score++;
  }

  user.index++;

  render();
}


// =====================
// FINISH (SAFE)
// =====================

function finish(){

  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";

  let total = user.questions.length || 1;
  let percent = Math.round((user.score / total) * 100);

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
