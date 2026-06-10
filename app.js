console.log("APP CARICATA");

let nome = "";
let livello = "";
let index = 0;

let score = { s:0, e:0, c:0 };

let current = [];

/* =========================
   DATI MINIMI GARANTITI
========================= */

const NAZIONALE_DB = [
  {
    t: "Economia",
    s: "Test inflazione",
    o: [
      { t: "Opzione A", v: [1,0,1] },
      { t: "Opzione B", v: [0,1,0] },
      { t: "Opzione C", v: [2,1,2] },
      { t: "Opzione D", v: [-1,0,-1] }
    ]
  }
];

/* =========================
   START
========================= */

function avvia(){

  let input = document.getElementById("nomeUtente");

  if(!input){
    alert("Manca input nomeUtente in HTML");
    return;
  }

  nome = input.value || "Utente";

  let intro = document.getElementById("intro");
  let dash = document.getElementById("dashboard");

  if(!intro || !dash){
    alert("Mancano intro o dashboard in HTML");
    return;
  }

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

  let quiz = document.getElementById("quiz");
  let dash = document.getElementById("dashboard");

  if(!quiz || !dash){
    alert("Manca quiz o dashboard");
    return;
  }

  dash.style.display = "none";
  quiz.style.display = "block";

  index = 0;

  score = { s:0, e:0, c:0 };

  current = NAZIONALE_DB;

  render();
}

/* =========================
   RENDER
========================= */

function render(){

  let q = current[index];

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
      ${q.o.map(o=>`
        <button onclick="answer(${o.v[0]},${o.v[1]},${o.v[2]})">
          ${o.t}
        </button>
      `).join("")}
    </div>
  `;
}

/* =========================
   ANSWER
========================= */

function answer(a,b,c){

  score.s += a;
  score.e += b;
  score.c += c;

  index++;

  render();
}

/* =========================
   FINE
========================= */

function finish(){

  document.getElementById("quiz").style.display = "none";
  document.getElementById("report").style.display = "block";

  let tot = score.s + score.e + score.c;

  document.getElementById("report").innerHTML = `
    <div class="card">
      <h1>Risultato</h1>
      <p>${nome}</p>
      <p>Score: ${tot}</p>
    </div>

    <button onclick="location.reload()">Ricomincia</button>
  `;
}
