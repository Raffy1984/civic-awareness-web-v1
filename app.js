console.log("RESET APP ATTIVO");

let nome = "";
let livello = "";
let index = 0;

let score = 0;

let current = [];

/* =========================
   TEST MINIMO SICURO
========================= */

const DB_TEST = [
  {
    t: "Test Economia",
    s: "Scenario base funzionante",
    o: [
      "Opzione A",
      "Opzione B",
      "Opzione C",
      "Opzione D"
    ]
  }
];

/* =========================
   START
========================= */

function avvia(){

  const input = document.getElementById("nomeUtente");
  const intro = document.getElementById("intro");
  const dash = document.getElementById("dashboard");

  if(!input || !intro || !dash){
    alert("HTML non coerente (manca intro/dashboard/nomeUtente)");
    return;
  }

  nome = input.value || "Utente";

  intro.style.display = "none";
  dash.style.display = "block";
}

/* =========================
   LIVELLO
========================= */

function selezionaLivello(l){

  livello = l;

  startQuiz();
}

/* =========================
   QUIZ
========================= */

function startQuiz(){

  const quiz = document.getElementById("quiz");
  const dash = document.getElementById("dashboard");

  if(!quiz || !dash){
    alert("Manca quiz o dashboard in HTML");
    return;
  }

  dash.style.display = "none";
  quiz.style.display = "block";

  index = 0;
  score = 0;

  current = DB_TEST;

  render();
}

/* =========================
   RENDER
========================= */

function render(){

  const q = current[index];

  if(!q){
    finish();
    return;
  }

  document.getElementById("quiz").innerHTML = `
    <div class="card">
      <h2>${q.t}</h2>
      <p>${q.s}</p>
    </div>

    <div class="card">
      ${q.o.map((o,i)=>`
        <button onclick="answer(${i})">
          ${o}
        </button>
      `).join("")}
    </div>
  `;
}

/* =========================
   ANSWER
========================= */

function answer(v){

  score += v;

  index++;

  render();
}

/* =========================
   FINE
========================= */

function finish(){

  document.getElementById("quiz").style.display = "none";
  document.getElementById("report").style.display = "block";

  document.getElementById("report").innerHTML = `
    <div class="card">
      <h1>OK SISTEMA FUNZIONANTE</h1>
      <p>Utente: ${nome}</p>
      <p>Score: ${score}</p>
    </div>

    <button onclick="location.reload()">Ricomincia</button>
  `;
}
