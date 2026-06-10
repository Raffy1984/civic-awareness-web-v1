console.log("APP 2.0 AVVIATA");

let nome = "";
let livello = "";
let regione = "";
let comune = "";

let index = 0;

let score = { sociale: 0, economico: 0, consenso: 0 };

let current = [];

/* =========================
   TERRITORI REALI (STRUTTURA BASE SCALABILE)
========================= */

const REGIONI = [
"Lazio","Lombardia","Campania","Sicilia","Veneto",
"Emilia-Romagna","Piemonte","Toscana","Puglia",
"Calabria","Sardegna","Liguria","Marche","Abruzzo",
"Umbria","Basilicata","Molise","Valle d'Aosta",
"Trentino-Alto Adige","Friuli-Venezia Giulia"
];

const COMUNI = [
"Roma","Milano","Napoli","Torino","Bologna",
"Firenze","Bari","Palermo","Genova","Verona"
];

/* =========================
   DATABASE NAZIONALE (ESTESO)
========================= */

const NAZIONALE_DB = [
{
  t:"Economia",
  s:"Inflazione e potere d'acquisto in calo",
  o:[
    {t:"Aumento salari minimi",v:[2,-1,2]},
    {t:"Taglio tasse imprese",v:[-1,2,1]},
    {t:"Controllo prezzi",v:[1,0,1]},
    {t:"Nessun intervento",v:[-2,0,-1]}
  ]
},
{
  t:"Sanità",
  s:"Liste d’attesa e carenza personale",
  o:[
    {t:"Assunzioni massicce",v:[2,-1,1]},
    {t:"Privatizzazione",v:[0,2,1]},
    {t:"Tagli di spesa",v:[-2,1,-2]},
    {t:"Digitalizzazione sistema",v:[2,1,2]}
  ]
},
{
  t:"Energia",
  s:"Dipendenza energetica estera",
  o:[
    {t:"Rinnovabili",v:[2,1,2]},
    {t:"Nucleare",v:[1,2,0]},
    {t:"Fossili",v:[-2,2,-2]},
    {t:"Nessuna strategia",v:[-3,0,-3]}
  ]
}
];

/* =========================
   REGIONALE
========================= */

const REGIONAL_DB = [
{
  t:"Sanità regionale",
  s:"Gestione ospedali e risorse locali",
  o:[
    {t:"Più fondi pubblici",v:[2,1,1]},
    {t:"Privatizzazione",v:[0,2,1]},
    {t:"Tagli spesa",v:[-2,1,-2]},
    {t:"Inazione",v:[-1,0,-1]}
  ]
},
{
  t:"Trasporti",
  s:"Mobilità regionale inefficiente",
  o:[
    {t:"Investimenti ferrovie",v:[2,1,2]},
    {t:"Privati trasporto",v:[0,2,1]},
    {t:"Tagli servizi",v:[-2,1,-2]},
    {t:"Status quo",v:[-1,0,-1]}
  ]
}
];

/* =========================
   COMUNALE
========================= */

const COMUNALE_DB = [
{
  t:"Mobilità urbana",
  s:"Traffico e trasporto locale",
  o:[
    {t:"Trasporto pubblico",v:[2,1,2]},
    {t:"Più parcheggi",v:[-1,1,0]},
    {t:"ZTL estesa",v:[1,-1,-1]},
    {t:"Nessuna misura",v:[-2,0,-2]}
  ]
},
{
  t:"Sicurezza urbana",
  s:"Percezione criminalità locale",
  o:[
    {t:"Più controlli",v:[2,-1,1]},
    {t:"Prevenzione sociale",v:[2,1,2]},
    {t:"Riduzione forze ordine",v:[-2,2,-1]},
    {t:"Inazione",v:[-2,0,-2]}
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

  if(livello === "nazionale"){
    startQuiz();
    return;
  }

  document.getElementById("selector").style.display = "block";

  if(livello === "regionale") loadRegioni();
  if(livello === "comunale") loadComuni();
}

/* =========================
   REGIONI
========================= */

function loadRegioni(){

  let sel = document.getElementById("regioneSelect");
  sel.innerHTML = "";

  REGIONI.forEach(r=>{
    let o = document.createElement("option");
    o.value = r;
    o.textContent = r;
    sel.appendChild(o);
  });
}

/* =========================
   COMUNI
========================= */

function loadComuni(){

  let sel = document.getElementById("regioneSelect");
  sel.innerHTML = "";

  COMUNI.forEach(c=>{
    let o = document.createElement("option");
    o.value = c;
    o.textContent = c;
    sel.appendChild(o);
  });
}

/* =========================
   CONFERMA
========================= */

function confermaRegione(){

  let sel = document.getElementById("regioneSelect");

  if(livello === "regionale") regione = sel.value;
  if(livello === "comunale") comune = sel.value;

  startQuiz();
}

/* =========================
   START QUIZ
========================= */

function startQuiz(){

  document.getElementById("dashboard").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  index = 0;
  score = { sociale:0, economico:0, consenso:0 };

  if(livello === "nazionale") current = NAZIONALE_DB;

  if(livello === "regionale")
    current = REGIONAL_DB.map(q => ({
      ...q,
      s: regione + " - " + q.s
    }));

  if(livello === "comunale")
    current = COMUNALE_DB.map(q => ({
      ...q,
      s: comune + " - " + q.s
    }));

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
    tot > 6 ? "Pragmatico" :
    tot > 2 ? "Equilibrato" :
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
