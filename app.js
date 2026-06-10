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
  s:"Inflazione e costo della vita in aumento",
  o:[
    {t:"Aumento salari minimi",v:[1,0,2]},
    {t:"Controllo prezzi",v:[1,1,1]},
    {t:"Taglio tasse imprese",v:[0,2,1]},
    {t:"Nessun intervento",v:[-2,0,-1]}
  ]
},
{
  t:"Sanità",
  s:"Liste d’attesa troppo lunghe",
  o:[
    {t:"Assunzioni medici",v:[2,-1,1]},
    {t:"Privatizzazione",v:[0,2,1]},
    {t:"Digitalizzazione totale",v:[2,1,2]},
    {t:"Tagli spesa",v:[-2,1,-2]}
  ]
},
{
  t:"Lavoro",
  s:"Disoccupazione giovanile alta",
  o:[
    {t:"Incentivi assunzioni",v:[2,1,2]},
    {t:"Stage obbligatori",v:[0,0,1]},
    {t:"Taglio contributi",v:[1,2,0]},
    {t:"Nessuna misura",v:[-2,0,-2]}
  ]
},
{
  t:"Ambiente",
  s:"Inquinamento urbano crescente",
  o:[
    {t:"Zone verdi e ZTL",v:[2,1,2]},
    {t:"Più auto elettriche",v:[1,2,1]},
    {t:"Riduzione controlli",v:[-2,2,-2]},
    {t:"Nessun intervento",v:[-3,0,-3]}
  ]
},
{
  t:"Trasporti",
  s:"Trasporto pubblico inefficiente",
  o:[
    {t:"Investimenti mezzi pubblici",v:[2,1,2]},
    {t:"Privatizzazione servizi",v:[0,2,1]},
    {t:"Riduzione linee",v:[-2,1,-2]},
    {t:"Status quo",v:[-1,0,-1]}
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
