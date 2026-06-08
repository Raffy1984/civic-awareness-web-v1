// =====================================
// PATENTE DI CONSAPEVOLEZZA CIVICA v1
// =====================================


// =====================
// USER STATE
// =====================

let user = {
  name: "",
  level: "nazionale",
  score: 0,
  index: 0,
  questions: []
};


// =====================
// DATABASE GRANDE (SIMULATO STRUTTURATO)
// =====================

const bank = {

  nazionale: [
    {
      q: "Il costo dell’energia aumenta del 30%. Il governo riduce le tasse sui carburanti. Qual è un possibile effetto?",
      a: [
        "Aumento del debito pubblico o riduzione delle entrate",
        "Eliminazione automatica dell’inflazione",
        "Aumento immediato dei salari",
        "Nessun effetto sull’economia"
      ],
      c: 0
    },

    {
      q: "Aumentano i prezzi dei beni di prima necessità. Quale misura può avere effetti immediati ma temporanei?",
      a: [
        "Sussidi diretti alle famiglie",
        "Aumento produzione agricola immediata",
        "Cancellazione inflazione globale",
        "Eliminazione IVA mondiale"
      ],
      c: 0
    },

    {
      q: "Un Paese aumenta la spesa pubblica senza aumentare le entrate. Cosa accade più probabilmente?",
      a: [
        "Aumento del deficit o del debito",
        "Riduzione automatica dei prezzi",
        "Crescita immediata del PIL reale senza rischi",
        "Eliminazione del debito"
      ],
      c: 0
    },

    {
      q: "In una crisi energetica, quale strategia è più sostenibile nel lungo periodo?",
      a: [
        "Diversificazione delle fonti energetiche",
        "Sospensione totale dei consumi",
        "Riduzione immediata dei salari",
        "Blocco totale del commercio"
      ],
      c: 0
    }
  ],


  regionale: [
    {
      q: "In una regione aumentano le liste d’attesa sanitarie. Qual è una causa possibile?",
      a: [
        "Carenza di personale medico",
        "Eccesso di ospedali privati gratuiti",
        "Assenza totale di pazienti",
        "Riduzione della popolazione a zero"
      ],
      c: 0
    },

    {
      q: "Una regione investe meno nella sanità pubblica. Possibile effetto?",
      a: [
        "Aumento della pressione sul sistema privato",
        "Eliminazione delle malattie",
        "Riduzione automatica dei costi sanitari per tutti",
        "Aumento immediato della qualità senza investimenti"
      ],
      c: 0
    }
  ],


  comunale: [
    {
      q: "In una città aumenta il traffico urbano. Quale intervento è strutturalmente più efficace?",
      a: [
        "Potenziamento del trasporto pubblico",
        "Divieto totale di circolazione per sempre",
        "Eliminazione delle strade",
        "Riduzione della popolazione mondiale locale"
      ],
      c: 0
    },

    {
      q: "Aumenta la raccolta rifiuti non gestita. Cosa è una soluzione sistemica?",
      a: [
        "Miglioramento infrastruttura e raccolta differenziata",
        "Ignorare il problema",
        "Chiudere la città",
        "Eliminare i cittadini"
      ],
      c: 0
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

  // merge livello scelto (per ora nazionale default)
  let all = bank.nazionale;

  user.questions = shuffle(all).slice(0, 4);

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  renderQuestion();
}


// =====================
// RENDER QUESTION
// =====================

function renderQuestion(){

  let q = user.questions[user.index];

  let quiz = document.getElementById("quiz");

  quiz.innerHTML = `
    <div class="question-card">

      <div class="progress">
        Domanda ${user.index + 1} / ${user.questions.length}
      </div>

      <h3>${q.q}</h3>

      ${q.a.map((r,i)=>`
        <button class="answer-btn" onclick="answer(${i})">
          ${r}
        </button>
      `).join("")}

    </div>
  `;
}


// =====================
// ANSWER
// =====================

function answer(i){

  let q = user.questions[user.index];

  if(i === q.c){
    user.score++;
  }

  user.index++;

  if(user.index >= user.questions.length){
    finish();
  } else {
    renderQuestion();
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

      <h2>Risultato di ${user.name}</h2>

      <h1>${percent}% Consapevolezza Civica</h1>

      <p>
        Questo risultato non misura le tue idee politiche,
        ma la tua capacità di valutare le conseguenze delle decisioni pubbliche.
      </p>

      <button onclick="location.reload()">Rifai il test</button>

    </div>
  `;
}


// =====================
// UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
