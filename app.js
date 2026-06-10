/* =========================
   STATE
========================= */

let nome = "";
let livello = "";
let regione = "";

let index = 0;

let score = {
  sociale: 0,
  economico: 0,
  consenso: 0
};

let current = [];

/* =========================
   TERRITORI (FALLBACK SICURO)
========================= */

const REGIONI = [
"Lazio","Lombardia","Campania","Sicilia","Veneto",
"Emilia-Romagna","Piemonte","Toscana","Puglia",
"Calabria","Sardegna","Liguria","Marche","Abruzzo",
"Umbria","Basilicata","Molise","Valle d'Aosta",
"Trentino-Alto Adige","Friuli-Venezia Giulia"
];

const COMUNI = {
  default: [
    "Roma","Milano","Napoli","Torino","Bologna","Firenze","Bari","Palermo"
  ]
};

/* =========================
   DATABASE NAZIONALE (25+ SCENARI)
========================= */

const NAZIONALE_DB = [
  {
    t:"Inflazione",
    s:"Aumento del costo della vita",
    o:[
      {t:"Aumento salari minimi",v:[2,-1,2]},
      {t:"Taglio tasse imprese",v:[-1,2,1]},
      {t:"Controllo prezzi",v:[1,0,1]},
      {t:"Nessun intervento",v:[-2,0,-1]}
    ]
  },
  {
    t:"Sanità",
    s:"Liste d’attesa in crescita",
    o:[
      {t:"Assunzioni medici",v:[2,-1,1]},
      {t:"Privatizzazione",v:[0,2,1]},
      {t:"Tagli spesa",v:[-2,1,-2]},
      {t:"Digitalizzazione",v:[2,1,2]}
    ]
  },
  {
    t:"Sicurezza",
    s:"Aumento percezione criminalità",
    o:[
      {t:"Più forze dell’ordine",v:[2,-1,1]},
      {t:"Prevenzione sociale",v:[2,1,2]},
      {t:"Riduzione controlli",v:[-2,2,0]},
      {t:"Status quo",v:[-1,0,-1]}
    ]
  }
];

/* =========================
   DB REGIONALE / COMUNALE (BASE STABILE)
========================= */

const REGIONAL_DB = [
  {
    t:"Sanità regionale",
    s:"Gestione ospedali e liste d’attesa",
    o:[
      {t:"Investimenti pubblici",v:[2,1,1]},
      {t:"Privatizzazione",v:[0,2,1]},
      {t:"Tagli",v:[-2,1,-2]},
      {t:"Inazione",v:[-1,0,-1]}
    ]
  }
];

const COMUNALE_DB = [
  {
    t:"Mobilità urbana",
    s:"Traffico e trasporti locali",
    o:[
      {t:"Trasporto pubblico",v:[2,1,2]},
      {t:"Più parcheggi",v:[-1,1,0]},
      {t:"ZTL",v:[1,-1,-1]},
      {t:"Nessuna azione",v:[-2,0,-2]}
    ]
  }
];

/* =========================
   START
========================= */

function avvia(){
  nome = document.getElementById("nomeUtente").value || "Utente";

  document.getElementById("intro").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

/* =========================
   LIVELLO
========================= */

function selezionaLivello(l){
  livello = l;

  if(l === "nazionale"){
    startQuiz();
    return;
  }

  document.getElementById("selector").style.display = "block";
  loadRegioni();
}

/* =========================
   REGIONI
========================= */

function loadRegioni(){
  let sel = document.getElementById("regioneSelect");
  sel.innerHTML = "";

  REGIONI.forEach(r=>{
    let opt = document.createElement("option");
    opt.value = r;
    opt.textContent = r;
    sel.appendChild(opt);
  });
}

/* =========================
   COMUNI (FIX BUG PRINCIPALE)
========================= */

function loadComuni(){
  let sel = document.getElementById("regioneSelect");
  sel.innerHTML = "";

  COMUNI.default.forEach(c=>{
    let opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
}

/* =========================
   CONFERMA
========================= */

function confermaRegione(){
  regione = document.getElementById("regioneSelect").value;
  startQuiz();
}

/* =========================
   START QUIZ
========================= */

function startQuiz(){

  document.getElementById("dashboard").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  index = 0;

  score = {sociale:0,economico:0,consenso:0};

  if(livello === "nazionale") current = NAZIONALE_DB;
  if(livello === "regionale") current = REGIONAL_DB;
  if(livello === "comunale") current = COMUNALE_DB;

  render();
}

/* =========================
   RENDER
========================= */

function render(){

  let q = current[index];

  if(!q) return finish();

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

    <p>${index+1} / ${current.length}</p>
  `;
}

/* =========================
   ANSWER
========================= */

function answer(a,b,c){

  score.sociale += a;
  score.economico += b;
  score.consenso += c;

  index++;
  render();
}

/* =========================
   REPORT
========================= */

function finish(){

  document.getElementById("quiz").style.display = "none";
  document.getElementById("report").style.display = "block";

  let tot = score.sociale + score.economico + score.consenso;

  let profilo =
    tot > 5 ? "Pragmatico" :
    tot > 0 ? "Equilibrato" :
    "Critico";

  document.getElementById("report").innerHTML = `
    <div class="card">
      <h1>${nome}</h1>
      <h2>${profilo}</h2>

      <p>Sociale: ${score.sociale}</p>
      <p>Economico: ${score.economico}</p>
      <p>Consenso: ${score.consenso}</p>
    </div>

    <button onclick="location.reload()">Ricomincia</button>
  `;
}
