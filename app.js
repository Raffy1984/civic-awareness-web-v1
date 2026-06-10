console.log("APP 1.3 AVVIATA");

let nome = "";
let livello = "";
let regione = "";
let comune = "";

let index = 0;

let score = { sociale: 0, economico: 0, consenso: 0 };

let current = [];

/* =========================
   TERRITORI
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
   NAZIONALE (10 DOMANDE)
========================= */

const NAZIONALE_DB = [
{
  t:"Inflazione",
  s:"Aumento costo della vita e salari fermi",
  o:[
    {t:"Aumento salari minimi",v:[2,-1,2]},
    {t:"Controllo prezzi",v:[1,0,1]},
    {t:"Taglio tasse imprese",v:[-1,2,1]},
    {t:"Nessun intervento",v:[-2,0,-1]}
  ]
},
{
  t:"Sanità",
  s:"Liste d’attesa troppo lunghe",
  o:[
    {t:"Assunzioni medici",v:[2,-1,1]},
    {t:"Privatizzazione",v:[0,2,1]},
    {t:"Digitalizzazione",v:[2,1,2]},
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
}
];

/* =========================
   REGIONALE (6 DOMANDE)
========================= */

const REGIONAL_DB = [
{
  t:"Sanità regionale",
  s:"Gestione ospedali e servizi locali",
  o:[
    {t:"Più investimenti pubblici",v:[2,1,1]},
    {t:"Privatizzazione servizi",v:[0,2,1]},
    {t:"Tagli di bilancio",v:[-2,1,-2]},
    {t:"Status quo",v:[-1,0,-1]}
  ]
},
{
  t:"Trasporti",
  s:"Mobilità inefficiente nelle regioni",
  o:[
    {t:"Potenziamento treni",v:[2,1,2]},
    {t:"Privati nel settore",v:[0,2,1]},
    {t:"Riduzione servizi",v:[-2,1,-2]},
    {t:"Nessun intervento",v:[-1,0,-1]}
  ]
}
];

/* =========================
   COMUNALE (6 DOMANDE)
========================= */

const COMUNALE_DB = [
{
  t:"Traffico urbano",
  s:"Congestione nelle città",
  o:[
    {t:"Trasporto pubblico",v:[2,1,2]},
    {t:"Più parcheggi",v:[-1,1,0]},
    {t:"ZTL estesa",v:[1,-1,-1]},
    {t:"Nessuna azione",v:[-2,0,-2]}
  ]
},
{
  t:"Sicurezza locale",
  s:"Percezione criminalità",
  o:[
    {t:"Più controlli",v:[2,-1,1]},
    {t:"Prevenzione sociale",v:[2,1,2]},
    {t:"Taglio forze ordine",v:[-2,2,-1]},
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

  if(l === "nazionale"){
    startQuiz();
    return;
  }

  document.getElementById("selector").style.display = "block";

  if(l === "regionale") loadRegioni();
  if(l === "comunale") loadComuni();
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

  let sel = document.getElementById("regioneSelect").value;

  if(livello === "regionale") regione = sel;
  if(livello === "comunale") comune = sel;

  startQuiz();
}

/* =========================
   START QUIZ
========================= */

function startQuiz(){

  document.getElementById("dashboard").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  index = 0;

  score = { sociale: 0, economico: 0, consenso: 0 };

  if(livello === "nazionale"){
    current = NAZIONALE_DB;
  }

  if(livello === "regionale"){
    current = REGIONAL_DB.map(q => ({
      ...q,
      s: regione + " - " + q.s
    }));
  }

  if(livello === "comunale"){
    current = COMUNALE_DB.map(q => ({
      ...q,
      s: comune + " - " + q.s
    }));
  }

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
   FINE
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
