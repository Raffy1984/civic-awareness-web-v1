let nome = "";
let livello = "";
let regione = "";
let score = 0;

let index = 0;
let current = [];

/* =========================
   DATABASE STRUTTURATO
========================= */

const DOMANDE = {
  nazionale:[
    {
      cat:"Economia",
      q:"L'Italia ha crescita lenta e debito elevato. Qual è l'approccio più sostenibile?",
      options:[
        {t:"Investimenti produttivi + riforme",v:2},
        {t:"Tagli drastici immediati",v:0},
        {t:"Aumento tasse generalizzato",v:0},
        {t:"Nessuna azione",v:1}
      ]
    },
    {
      cat:"Lavoro",
      q:"Alta precarietà giovanile. Qual è la soluzione più efficace?",
      options:[
        {t:"Formazione + contratti stabili",v:2},
        {t:"Più flessibilità senza regole",v:1},
        {t:"Riduzione salari",v:0},
        {t:"Aumento contratti precari",v:0}
      ]
    },
    {
      cat:"Ambiente",
      q:"Crisi climatica e consumo energetico elevato. Cosa è più efficace?",
      options:[
        {t:"Investimenti green + incentivi",v:2},
        {t:"Nessun intervento",v:0},
        {t:"Aumento produzione fossile",v:0},
        {t:"Solo tasse ambientali",v:1}
      ]
    }
  ],

  regionale:{
    "Abruzzo":[
      {
        cat:"Sanità",
        q:"Liste d'attesa e strutture limitate. Priorità?",
        options:[
          {t:"Potenziare sanità territoriale",v:2},
          {t:"Ridurre servizi",v:0},
          {t:"Privatizzare tutto",v:1}
        ]
      }
    ],
    "Basilicata":[
      {
        cat:"Infrastrutture",
        q:"Collegamenti interni deboli. Cosa è più efficace?",
        options:[
          {t:"Investimenti infrastrutturali",v:2},
          {t:"Tagli trasporti",v:0},
          {t:"Privatizzazione immediata",v:1}
        ]
      }
    ],
    "Calabria":[
      {
        cat:"Economia",
        q:"Bassa occupazione e fuga giovani. Intervento migliore?",
        options:[
          {t:"Incentivi lavoro + investimenti",v:2},
          {t:"Nessun intervento",v:0},
          {t:"Riduzione salari",v:0}
        ]
      }
    ],
    "Campania":[
      {
        cat:"Infrastrutture",
        q:"Servizi pubblici sotto pressione. Cosa funziona meglio?",
        options:[
          {t:"Investimenti mirati",v:2},
          {t:"Tagli servizi",v:0},
          {t:"Privatizzazione totale",v:1}
        ]
      }
    ],
    "Emilia-Romagna":[
      {
        cat:"Sanità",
        q:"Sistema sanitario efficiente ma sotto pressione. Cosa migliorare?",
        options:[
          {t:"Più personale e digitalizzazione",v:2},
          {t:"Riduzione budget",v:0},
          {t:"Privatizzazione",v:1}
        ]
      }
    ],
    "Lazio":[
      {
        cat:"Sanità",
        q:"Liste d'attesa elevate. Cosa è prioritario?",
        options:[
          {t:"Digitalizzazione + assunzioni",v:2},
          {t:"Riduzione servizi",v:0},
          {t:"Privatizzazione totale",v:1}
        ]
      }
    ],
    "Lombardia":[
      {
        cat:"Mobilità",
        q:"Traffico urbano e pressione sanitaria. Cosa è efficace?",
        options:[
          {t:"Trasporto pubblico + sanità territoriale",v:2},
          {t:"Tagli investimenti",v:0},
          {t:"Aumento costi servizi",v:1}
        ]
      }
    ],
    "default":[
      {
        cat:"Politiche pubbliche",
        q:"Quale approccio è più efficace per il territorio?",
        options:[
          {t:"Investimenti strutturali",v:2},
          {t:"Nessun intervento",v:0},
          {t:"Riduzione servizi",v:0}
        ]
      }
    ]
  },

  comunale:[
    {
      cat:"Mobilità",
      q:"Traffico urbano elevato. Soluzione più efficace?",
      options:[
        {t:"Trasporto pubblico potenziato",v:2},
        {t:"Più parcheggi",v:0},
        {t:"Riduzione controlli",v:1}
      ]
    }
  ]
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

  score = 0;
  index = 0;

  if(livello === "regionale"){
    current = DOMANDE.regionale[regione] || DOMANDE.regionale["default"];
  } else {
    current = DOMANDE[livello] || [];
  }

  render();
}

function render(){

  let d = current[index];

  if(!d) return finish();

  let shuffled = [...d.options].sort(()=>Math.random()-0.5);

  document.getElementById("quiz").innerHTML = `
    <h3>${d.cat}</h3>
    <h2>${d.q}</h2>

    ${shuffled.map(o=>`
      <button onclick="answer(${o.v})">${o.t}</button>
    `).join("")}

    <p>${index+1}/${current.length}</p>
  `;
}

function answer(v){
  score += Number(v);
  index++;
  render();
}

/* =========================
   REPORT
========================= */

function finish(){

  document.getElementById("quiz").style.display = "none";
  document.getElementById("report").style.display = "block";

  let max = current.length * 2;
  let perc = Math.round((score / max) * 100);

  let livelloTesto =
    perc >= 70 ? "🟢 Alta consapevolezza" :
    perc >= 40 ? "🟡 Media consapevolezza" :
    "🔴 Consapevolezza critica";

  document.getElementById("report").innerHTML = `
    <h1>${nome}</h1>
    <p>${livello} - ${regione}</p>
    <h2>${livelloTesto}</h2>
    <h3>${perc}%</h3>

    <button onclick="location.reload()">Restart</button>
  `;
}
