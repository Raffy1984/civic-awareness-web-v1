(function(){

let nome = "";
let livello = "";
let index = 0;
let current = [];
let score = { s:0, e:0, c:0 };

function showError(msg){
  const el = document.getElementById("report");
  if(el){
    el.style.display = "block";
    el.innerHTML = "<div class='card'><h2>ERRORE</h2><p>" + msg + "</p></div>";
  } else {
    alert(msg);
  }
}

/* =========================
   START
========================= */

window.avvia = function(){

  const input = document.getElementById("nomeUtente");
  const intro = document.getElementById("intro");
  const dash = document.getElementById("dashboard");

  if(!input || !intro || !dash){
    return showError("HTML mancante (intro/dashboard/nomeUtente)");
  }

  nome = input.value || "Utente";

  intro.style.display = "none";
  dash.style.display = "block";
};

/* =========================
   LIVELLO
========================= */

window.selezionaLivello = function(l){

  livello = l;

  startQuiz();
};

/* =========================
   DB MINIMO STABILE
========================= */

const DB = [
{
  t:"Economia",
  s:"Inflazione in crescita",
  o:[
    {t:"A",v:[1,0,1]},
    {t:"B",v:[0,1,0]},
    {t:"C",v:[2,1,2]},
    {t:"D",v:[-1,0,-1]}
  ]
}
];

/* =========================
   QUIZ
========================= */

function startQuiz(){

  const quiz = document.getElementById("quiz");
  const dash = document.getElementById("dashboard");

  if(!quiz || !dash){
    return showError("Manca quiz/dashboard HTML");
  }

  dash.style.display = "none";
  quiz.style.display = "block";

  index = 0;
  score = { s:0, e:0, c:0 };
  current = DB;

  render();
}

/* =========================
   RENDER
========================= */

function render(){

  const q = current[index];

  if(!q){
    return finish();
  }

  const el = document.getElementById("quiz");

  if(!el){
    return showError("Elemento quiz mancante");
  }

  el.innerHTML =
    "<div class='card'>" +
    "<h2>" + q.t + "</h2>" +
    "<p>" + q.s + "</p>" +
    "</div>" +

    "<div class='card'>" +
    q.o.map(function(o,i){
      return "<button onclick='answer(" + o.v[0] + "," + o.v[1] + "," + o.v[2] + ")'>" + o.t + "</button>";
    }).join("") +
    "</div>";
}

/* =========================
   ANSWER
========================= */

window.answer = function(a,b,c){

  score.s += a;
  score.e += b;
  score.c += c;

  index++;

  render();
};

/* =========================
   FINE
========================= */

function finish(){

  const el = document.getElementById("report");

  if(!el){
    return alert("Report mancante");
  }

  el.style.display = "block";

  const tot = score.s + score.e + score.c;

  el.innerHTML =
    "<div class='card'>" +
    "<h1>RISULTATO</h1>" +
    "<p>Utente: " + nome + "</p>" +
    "<p>Score: " + tot + "</p>" +
    "</div>";
}

})();
