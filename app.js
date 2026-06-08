let nome = "";
let livello = "";
let regione = "";
let score = 0;

let index = 0;
let current = [];

/* =========================
   DOMANDE
========================= */

const DOMANDE = {
  nazionale:[
    {
      q:"L'Italia ha debito pubblico elevato. Qual è una strategia sostenibile?",
      options:[
        {t:"Investimenti produttivi e riforme",v:2},
        {t:"Tagli drastici immediati",v:0},
        {t:"Aumento tasse generalizzato",v:0},
        {t:"Nessuna azione",v:1}
      ]
    },
    {
      q:"Giovani e lavoro instabile. Qual è la soluzione più efficace?",
      options:[
        {t:"Formazione e contratti stabili",v:2},
        {t:"Più contratti precari",v:0},
        {t:"Riduzione salari",v:0},
        {t:"Mercato totalmente libero",v:1}
      ]
    }
  ],

  regionale:{
    "Lazio":[
      {
        q:"Sanità con lunghe liste d’attesa nel Lazio. Cosa è prioritario?",
        options:[
          {t:"Assunzioni e digitalizzazione",v:2},
          {t:"Riduzione servizi",v:0},
          {t:"Privatizzazione totale",v:1}
        ]
      }
    ],
    "Lombardia":[
      {
        q:"Pressione su sanità e mobilità in Lombardia. Cosa è più efficace?",
        options:[
          {t:"Trasporto pubblico e sanità territoriale",v:2},
          {t:"Tagli alla spesa",v:0},
          {t:"Aumento costi servizi",v:1}
        ]
      }
    ],
    "Campania":[
      {
        q:"Problemi infrastrutturali in Campania. Qual è la scelta migliore?",
        options:[
          {t:"Investimenti mirati e controllo spesa",v:2},
          {t:"Riduzione investimenti",v:0},
          {t:"Privatizzazione immediata",v:1}
        ]
      }
    ]
  },

  comunale:[
    {
      q:"Traffico urbano elevato. Cosa funziona meglio?",
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

  if(!regione){
    alert("Seleziona una regione");
    return;
  }

  livello = "regionale";
  startQuiz();
}

/* =========================
   QUIZ ENGINE
========================= */

function startQuiz(){
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  score = 0;
  index = 0;

  if(livello === "regionale"){
    current = DOMANDE.regionale[regione] || [];
  } else {
    current = DOMANDE[livello] || [];
  }

  render();
}

function render(){

  let d = current[index];

  if(!d){
    return finish();
  }

  let shuffled = [...d.options].sort(()=>Math.random()-0.5);

  document.getElementById("quiz").innerHTML = `
    <h2>${d.q}</h2>

    ${shuffled.map(o=>`
      <button onclick="answer(${o.v})">${o.t}</button>
    `).join("")}

    <p>${index+1} / ${current.length}</p>
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

  document.getElementById("report").innerHTML = `
    <h1>Report ${nome}</h1>
    <p>Livello: ${livello}</p>
    <p>Regione: ${regione}</p>
    <h2>Indice Consapevolezza: ${perc}%</h2>

    <button onclick="location.reload()">Ricomincia</button>
  `;
}
