let nome = "";
let livello = "";
let regione = "";

let index = 0;
let score = { sociale: 0, economico: 0, consenso: 0 };

let current = [];

/* =========================
   SCENARI
========================= */

const SCENARI = {
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
      titolo: "Sistema sanitario nazionale",
      scenario:
        "Liste d’attesa crescenti e pressione sul sistema pubblico.",
      scelte: [
        { testo: "Assunzioni e investimenti pubblici", impatto: { sociale: 2, economico: -1, consenso: 1 } },
        { testo: "Accordi con privati", impatto: { sociale: 0, economico: 1, consenso: 1 } },
        { testo: "Riduzione prestazioni", impatto: { sociale: -1, economico: 1, consenso: -2 } },
        { testo: "Nessun cambiamento", impatto: { sociale: -2, economico: 0, consenso: -1 } }
      ]
    }
  ],

  regionale: {
    "Lazio": [
      {
        titolo: "Sanità sotto pressione",
        scenario:
          "Liste d’attesa lunghe e strutture sovraccariche.",
        scelte: [
          { testo: "Assunzioni e digitalizzazione", impatto: { sociale: 2, economico: -1, consenso: 1 } },
          { testo: "Accordi privati", impatto: { sociale: 0, economico: 1, consenso: 1 } },
          { testo: "Riduzione servizi", impatto: { sociale: -1, economico: 1, consenso: -2 } },
          { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -1 } }
        ]
      }
    ],

    "Lombardia": [
      {
        titolo: "Traffico e inquinamento",
        scenario:
          "Area metropolitana congestionata e inquinamento elevato.",
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
        titolo: "Gestione territoriale",
        scenario:
          "Problemi generali di gestione pubblica e risorse limitate.",
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
        scenario:
          "Conflitto tra residenti, commercianti e turismo.",
        scelte: [
          { testo: "Ampliare ZTL", impatto: { sociale: 1, economico: -1, consenso: -1 } },
          { testo: "Bloccare restrizioni", impatto: { sociale: -1, economico: 2, consenso: 1 } },
          { testo: "Compromesso orari", impatto: { sociale: 2, economico: 1, consenso: 2 } },
          { testo: "Nessun intervento", impatto: { sociale: -2, economico: 0, consenso: -1 } }
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

  if(l === "comunale"){
    startQuiz();
  }
}

/* =========================
   REGIONI
========================= */

function mostraRegioni(){
  document.getElementById("selector").style.display = "block";

  const sel = document.getElementById("regioneSelect");
  sel.innerHTML = "";

  REGIONI.forEach(r=>{
    let opt = document.createElement("option");
    opt.value = r;
    opt.textContent = r;
    sel.appendChild(opt);
  });
}

function confermaRegione(){
  regione = document.getElementById("regioneSelect").value;
  if(!regione) return alert("Seleziona una regione");

  livello = "regionale";
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

  if(livello === "regionale"){
    current = SCENARI.regionale[regione] || SCENARI.regionale["default"];
  } else {
    current = SCENARI[livello] || [];
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
    <p>Livello: ${livello}</p>
    <p>Regione: ${regione}</p>

    <h2>Profilo: ${profilo}</h2>

    <p>Sociale: ${score.sociale}</p>
    <p>Economico: ${score.economico}</p>
    <p>Consenso: ${score.consenso}</p>

    <button onclick="location.reload()">Restart</button>
  `;
}
