let nome = "";
let livello = "";
let regione = "";

let index = 0;

let score = { sociale:0, economico:0, consenso:0 };

let current = [];

/* =========================
   DATABASE DOMANDE
========================= */

const DB = {
  nazionale: [
    {
      titolo:"Crisi economica",
      scenario:"Inflazione e salari stagnanti.",
      options:[
        {t:"Aumento salari",v:[2,-1,2]},
        {t:"Taglio tasse imprese",v:[-1,2,1]},
        {t:"Nessun intervento",v:[-2,0,-1]},
        {t:"Controllo prezzi",v:[1,0,1]}
      ]
    },
    {
      titolo:"Sanità",
      scenario:"Liste d’attesa crescenti.",
      options:[
        {t:"Assunzioni medici",v:[2,-1,1]},
        {t:"Privatizzazione",v:[0,1,1]},
        {t:"Tagli servizi",v:[-2,1,-2]},
        {t:"Status quo",v:[-1,0,-1]}
      ]
    }
  ],

  regionale: {
    default:[
      {
        titolo:"Gestione regionale",
        scenario:"Pressione su sanità e trasporti.",
        options:[
          {t:"Investimenti",v:[2,1,1]},
          {t:"Tagli",v:[-1,1,-1]},
          {t:"Privato",v:[0,2,0]},
          {t:"Inazione",v:[-2,0,-2]}
        ]
      }
    ]
  },

  comunale: {
    default:[
      {
        titolo:"Problemi urbani",
        scenario:"Traffico e servizi locali.",
        options:[
          {t:"Trasporto pubblico",v:[2,1,2]},
          {t:"Più auto",v:[-2,1,0]},
          {t:"ZTL",v:[1,-1,-1]},
          {t:"Nessuna azione",v:[-2,0,-2]}
        ]
      }
    ]
  }
};

/* =========================
   START
========================= */

function avvia(){
  nome = document.getElementById("nomeUtente").value || "Utente";

  document.getElementById("intro").style.display="none";
  document.getElementById("dashboard").style.display="block";
}

function selezionaLivello(l){
  livello = l;

  if(l === "nazionale"){
    start();
  }

  if(l === "regionale" || l === "comunale"){
    document.getElementById("selector").style.display="block";
    loadRegioni();
  }
}

function loadRegioni(){
  let sel = document.getElementById("regioneSelect");
  sel.innerHTML = "";

  REGIONI.forEach(r=>{
    let o=document.createElement("option");
    o.value=r;
    o.textContent=r;
    sel.appendChild(o);
  });
}

function confermaRegione(){
  regione = document.getElementById("regioneSelect").value;
  start();
}

/* =========================
   START QUIZ
========================= */

function start(){
  document.getElementById("dashboard").style.display="none";
  document.getElementById("quiz").style.display="block";

  index=0;
  score={sociale:0,economico:0,consenso:0};

  if(livello==="nazionale"){
    current = DB.nazionale;
  }

  if(livello==="regionale"){
    current = DB.regionale.default;
  }

  if(livello==="comunale"){
    current = DB.comunale.default;
  }

  render();
}

/* =========================
   QUIZ
========================= */

function render(){

  let q=current[index];

  if(!q) return finish();

  document.getElementById("quiz").innerHTML=`
    <div class="card">
      <h2>${q.titolo}</h2>
      <p>${q.scenario}</p>
    </div>

    <div class="card">
      ${q.options.map(o=>`
        <button onclick="answer(${o.v[0]},${o.v[1]},${o.v[2]})">
          ${o.t}
        </button>
      `).join("")}
    </div>

    <p>${index+1} / ${current.length}</p>
  `;
}

function answer(s,e,c){
  score.sociale+=s;
  score.economico+=e;
  score.consenso+=c;

  index++;
  render();
}

/* =========================
   REPORT
========================= */

function finish(){

  document.getElementById("quiz").style.display="none";
  document.getElementById("report").style.display="block";

  let total = score.sociale+score.economico+score.consenso;

  let profilo =
    total>4 ? "Pragmatico" :
    total>0 ? "Equilibrato" :
    "Critico";

  document.getElementById("report").innerHTML=`
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
