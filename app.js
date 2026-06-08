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
      cat:"Economia",
      q:"L'Italia ha debito elevato e crescita lenta. Quale approccio è più equilibrato?",
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
    }
  ],

  regionale:{
    "Lazio":[
      {
        cat:"Sanità",
        q:"Liste d'attesa alte nel Lazio. Cosa è prioritario?",
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
        q:"Traffico e pressione sanitaria in Lombardia. Intervento migliore?",
        options:[
          {t:"Trasporto pubblico + sanità territoriale",v:2},
          {t:"Taglio spesa pubblica",v:0},
          {t:"Aumento costi servizi",v:1}
        ]
      }
    ],
    "Campania":[
      {
        cat:"Infrastrutture",
        q:"Criticità infrastrutturali in Campania. Cosa funziona meglio?",
        options:[
          {t:"Investimenti mirati + controllo spesa",v:2},
          {t:"Riduzione investimenti",v:0},
          {t:"Privatizzazione immediata",v:1}
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

  if(!d) return finish();

  let shuffled = [...d.options].sort(()=>Math.random()-0.5);

  document.getElementById("quiz").innerHTML = `
    <div>
      <h4>${d.cat}</h4>
      <h2>${d.q}</h2>
    </div>

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
   REPORT EVOLUTO
========================= */

function finish(){

  document.getElementById("quiz").style.display = "none";
  document.getElementById("report").style.display = "block";

  let max = current.length * 2;
  let perc = Math.round((score / max) * 100);

  let livelloTesto = "";

  if(perc >= 70) livelloTesto = "🟢 Consapevolezza alta";
  else if(perc >= 40) livelloTesto = "🟡 Consapevolezza media";
  else livelloTesto = "🔴 Consapevolezza critica";

  document.getElementById("report").innerHTML = `
    <h1>Report ${nome}</h1>
    <p>Livello: ${livello}</p>
    <p>Regione: ${regione}</p>

    <h2>${livelloTesto}</h2>
    <h3>Indice: ${perc}%</h3>

    <button onclick="location.reload()">Ricomincia</button>
  `;
}
