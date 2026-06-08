let nome = "";
let livello = "";
let regione = "";
let comune = "";

let index = 0;

let score = {
  sociale: 0,
  economico: 0,
  consenso: 0
};

let current = [];

/* =========================
   DATI COMPLETI
========================= */

const DATA = {
  nazionale: [
    {
      titolo: "Crisi economica e salari stagnanti",
      scenario:
        "L’Italia affronta crescita lenta, salari fermi e aumento del costo della vita. Imprese e cittadini hanno interessi opposti.",
      scelte: [
        { testo: "Aumentare salari minimi e sussidi", impatto: { sociale: 2, economico: -1, consenso: 2 } },
        { testo: "Ridurre tasse alle imprese", impatto: { sociale: -1, economico: 2, consenso: 1 } },
        { testo: "Riforma strutturale del lavoro", impatto: { sociale: 1, economico: 2, consenso: 0 } },
        { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -1 } }
      ]
    },
    {
      titolo: "Sanità nazionale sotto pressione",
      scenario:
        "Liste d’attesa in aumento e sistema pubblico sovraccarico.",
      scelte: [
        { testo: "Assunzioni e investimenti pubblici", impatto: { sociale: 2, economico: -1, consenso: 1 } },
        { testo: "Accordi con privati", impatto: { sociale: 0, economico: 1, consenso: 1 } },
        { testo: "Riduzione prestazioni", impatto: { sociale: -1, economico: 1, consenso: -2 } },
        { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -1 } }
      ]
    }
  ],

  regionale: {
    "Lazio": [
      {
        titolo: "Sanità regionale critica",
        scenario: "Liste d’attesa e strutture sovraccariche.",
        scelte: [
          { testo: "Investimenti + personale", impatto: { sociale: 2, economico: -1, consenso: 1 } },
          { testo: "Accordi privati", impatto: { sociale: 0, economico: 1, consenso: 1 } },
          { testo: "Tagli servizi", impatto: { sociale: -1, economico: 1, consenso: -2 } },
          { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -1 } }
        ]
      }
    ],

    "Lombardia": [
      {
        titolo: "Traffico e inquinamento",
        scenario: "Congestione urbana e pressione ambientale.",
        scelte: [
          { testo: "ZTL estese", impatto: { sociale: -1, economico: -1, consenso: -1 } },
          { testo: "Trasporto pubblico potenziato", impatto: { sociale: 2, economico: 1, consenso: 2 } },
          { testo: "Riduzione vincoli traffico", impatto: { sociale: -2, economico: 1, consenso: 1 } },
          { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -1 } }
        ]
      }
    ],

    "default": [
      {
        titolo: "Gestione regionale",
        scenario: "Problemi generali di governance territoriale.",
        scelte: [
          { testo: "Investimenti strutturali", impatto: { sociale: 2, economico: 1, consenso: 1 } },
          { testo: "Tagli spesa", impatto: { sociale: -1, economico: 1, consenso: -1 } },
          { testo: "Privatizzazione", impatto: { sociale: 0, economico: 2, consenso: 0 } },
          { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -2 } }
        ]
      }
    ]
  },

  comunale: {
    "Bologna": [
      {
        titolo: "Centro storico e ZTL",
        scenario: "Conflitto tra residenti e commercianti.",
        scelte: [
          { testo: "Ampliare ZTL", impatto: { sociale: 1, economico: -1, consenso: -1 } },
          { testo: "Bloccare restrizioni", impatto: { sociale: -1, economico: 2, consenso: 1 } },
          { testo: "Compromesso orari", impatto: { sociale: 2, economico: 1, consenso: 2 } },
          { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -1 } }
        ]
      }
    ],

    "Milano": [
      {
        titolo: "Mobilità urbana critica",
        scenario: "Traffico e inquinamento elevati.",
        scelte: [
          { testo: "ZTL estese", impatto: { sociale: -1, economico: -1, consenso: -1 } },
          { testo: "Trasporto pubblico", impatto: { sociale: 2, economico: 1, consenso: 2 } },
          { testo: "Riduzione vincoli", impatto: { sociale: -2, economico: 1, consenso: 1 } },
          { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -1 } }
        ]
      }
    ],

    "Roma": [
      {
        titolo: "Trasporti pubblici inefficienti",
        scenario: "Sistema trasporti sotto pressione costante.",
        scelte: [
          { testo: "Investimenti ATAC", impatto: { sociale: 2, economico: -1, consenso: 1 } },
          { testo: "Privatizzazione parziale", impatto: { sociale: 0, economico: 1, consenso: 1 } },
          { testo: "Riduzione linee", impatto: { sociale: -2, economico: 1, consenso: -1 } },
          { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -1 } }
        ]
      }
    ],

    "default": [
      {
        titolo: "Gestione comunale",
        scenario: "Problemi urbani generici e risorse limitate.",
        scelte: [
          { testo: "Investimenti pubblici", impatto: { sociale: 2, economico: 1, consenso: 1 } },
          { testo: "Tagli servizi", impatto: { sociale: -1, economico: 1, consenso: -1 } },
          { testo: "Privatizzazione", impatto: { sociale: 0, economico: 2, consenso: 0 } },
          { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -2 } }
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
  document.getElementById("intro").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

function selezionaLivello(l){
  livello = l;

  if(l === "nazionale"){
    startQuiz();
  }

  if(l === "regionale"){
    document.getElementById("selector").style.display = "block";
    mostraRegioni();
  }

  if(l === "comunale"){
    document.getElementById("selector").style.display = "block";
    mostraComuni();
  }
}

/* =========================
   REGIONI / COMUNI
========================= */

const REGIONI = ["Lazio","Lombardia","Campania"];

function mostraRegioni(){
  const sel = document.getElementById("regioneSelect");
  sel.innerHTML = "";
  REGIONI.forEach(r=>{
    let o=document.createElement("option");
    o.value=r;
    o.textContent=r;
    sel.appendChild(o);
  });
}

const COMUNI = ["Bologna","Milano","Roma"];

function mostraComuni(){
  const sel = document.getElementById("regioneSelect");
  sel.innerHTML = "";
  COMUNI.forEach(c=>{
    let o=document.createElement("option");
    o.value=c;
    o.textContent=c;
    sel.appendChild(o);
  });
}

function confermaRegione(){
  regione = document.getElementById("regioneSelect").value;

  if(livello === "regionale"){
    livello = "regionale";
  }

  if(livello === "comunale"){
    livello = "comunale";
  }

  startQuiz();
}

/* =========================
   ENGINE
========================= */

function startQuiz(){
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  index = 0;
  score = { sociale: 0, economico: 0, consenso: 0 };

  if(livello === "nazionale"){
    current = DATA.nazionale;
  }

  if(livello === "regionale"){
    current = DATA.regionale[regione] || DATA.regionale["default"];
  }

  if(livello === "comunale"){
    current = DATA.comunale[regione] || DATA.comunale["default"];
  }

  render();
}

function render(){

  let d = current[index];

  if(!d) return finish();

  let shuffled = [...d.scelte].sort(()=>Math.random()-0.5);

  document.getElementById("quiz").innerHTML = `
    <div class="card">
      <h3>${d.titolo}</h3>
      <p>${d.scenario}</p>
    </div>

    <div class="card">
      ${shuffled.map(o=>`
        <button onclick="answer(${o.impatto.sociale},${o.impatto.economico},${o.impatto.consenso})">
          ${o.testo}
        </button>
      `).join("")}
    </div>

    <p>${index+1} / ${current.length}</p>
  `;
}

function answer(s,e,c){
  score.sociale += s;
  score.economico += e;
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

  let totale = score.sociale + score.economico + score.consenso;

  let profilo =
    totale > 5 ? "🟢 Pragmatico" :
    totale > 0 ? "🟡 Equilibrato" :
    "🔴 Critico";

  document.getElementById("report").innerHTML = `
    <h1>${nome}</h1>
    <p>${livello} - ${regione}</p>

    <h2>${profilo}</h2>

    <p>Sociale: ${score.sociale}</p>
    <p>Economico: ${score.economico}</p>
    <p>Consenso: ${score.consenso}</p>

    <button onclick="location.reload()">Restart</button>
  `;
}
