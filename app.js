Ilet nome = "";
let livello = "";
let index = 0;

let regione = "";
let comune = "";

let current = [];
let score = { s:0, e:0, c:0 };

/* =========================
   DB NAZIONALE
========================= */

const NAZIONALE = [
{
  t:"Economia",
  s:"Inflazione in crescita e potere d’acquisto in calo",
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
   REGIONI
========================= */

const REGIONI = [
"Lazio","Lombardia","Campania","Sicilia","Veneto",
"Emilia-Romagna","Piemonte","Toscana","Puglia",
"Calabria","Sardegna","Liguria","Marche","Abruzzo",
"Umbria","Basilicata","Molise","Valle d'Aosta",
"Trentino-Alto Adige","Friuli-Venezia Giulia"
];

/* =========================
   COMUNI (demo iniziale)
========================= */

const COMUNI = [
"Roma","Milano","Napoli","Torino","Bologna",
"Firenze","Bari","Palermo","Genova","Verona"
];

/* =========================
   START
========================= */

function avvia(){

  const input = document.getElementById("nomeUtente");

  if(!input){
    alert("Input nome mancante");
    return;
  }

  nome = input.value || "Utente";

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
   LOAD REGIONI
========================= */

function loadRegioni(){

  const sel = document.getElementById("regioneSelect");
  if(!sel) return;

  sel.innerHTML = "";

  REGIONI.forEach(r=>{
    const opt = document.createElement("option");
    opt.value = r;
    opt.textContent = r;
    sel.appendChild(opt);
  });
}

/* =========================
   LOAD COMUNI
========================= */

function loadComuni(){

  const sel = document.getElementById("regioneSelect");
  if(!sel) return;

  sel.innerHTML = "";

  COMUNI.forEach(c=>{
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
}

/* =========================
   CONFERMA TERRITORIO
========================= */

function confermaRegione(){

  const sel = document.getElementById("regioneSelect");
  if(!sel) return;

  const val = sel.value;

  if(livello === "regionale"){
    regione = val;
  }

  if(livello === "comunale"){
    comune = val;
  }

  startQuiz();
}

/* =========================
   START QUIZ
========================= */

function startQuiz(){

  document.getElementById("dashboard").style.display = "none";
  document.getElementById("selector").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  index = 0;
  score = { s:0, e:0, c:0 };

  if(livello === "nazionale"){
    current = NAZIONALE;
  }

  if(livello === "regionale"){
    current = NAZIONALE.map(q=>({
      ...q,
      s: regione + " - " + q.s
    }));
  }

  if(livello === "comunale"){
    current = NAZIONALE.map(q=>({
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

  const q = current[index];

  if(!q){
    finish();
    return;
  }

  const el = document.getElementById("quiz");

  el.innerHTML =
    "<div class='card'>" +
    "<h2>" + q.t + "</h2>" +
    "<p>" + q.s + "</p>" +
    "</div>" +

    "<div class='card'>" +
    q.o.map(o=>
      "<button class='option' onclick='answer(" + o.v[0] + "," + o.v[1] + "," + o.v[2] + ")'>" +
      o.t +
      "</button>"
    ).join("") +
    "</div>";
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

  const tot = score.s + score.e + score.c;

  let livelloFinale = "";
  let colore = "";
  let messaggio = "";

  if(tot >= 7){
    livelloFinale = "CONSAPEVOLEZZA ALTA";
    colore = "#22c55e";
    messaggio = "Probabilmente conosci davvero l’impatto delle scelte politiche.";
  }
  else if(tot >= 3){
    livelloFinale = "CONSAPEVOLEZZA MEDIA";
    colore = "#f59e0b";
    messaggio = "Hai una base, ma molte decisioni sono ancora intuitive più che consapevoli.";
  }
  else{
    livelloFinale = "CONSAPEVOLEZZA BASSA";
    colore = "#ef4444";
    messaggio = "Molte risposte sono scollegate dagli effetti reali delle politiche.";
  }

  document.getElementById("report").innerHTML =
    "<div class='card' style='border:2px solid "+colore+"'>" +
    "<h1>ESITO SIMULAZIONE</h1>" +
    "<h2 style='color:"+colore+"'>" + livelloFinale + "</h2>" +
    "<p><b>Utente:</b> " + nome + "</p>" +
    "<p>" + messaggio + "</p>" +
    "<hr>" +
    "<p>Sociale: " + score.s + "</p>" +
    "<p>Economico: " + score.e + "</p>" +
    "<p>Consenso: " + score.c + "</p>" +
    "</div>" +
    "<button onclick='location.reload()' class='primary'>Riprova</button>";
}
