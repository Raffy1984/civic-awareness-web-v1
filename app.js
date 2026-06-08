let state = {
  level:"",
  name:"",
  index:0,
  score:0,
  questions:[],
  currentOptions:[],
  categories:{economia:0,societa:0,servizi:0}
};

// =====================
// DATABASE VERO (ESTENSIBILE)
// =====================

const bank = {

  nazionale: [
    {
      q:"Riduzione accise carburanti: effetto principale?",
      cat:"economia",
      options:[
        {t:"Riduce entrate fiscali",c:true},
        {t:"Aumenta salari subito",c:false},
        {t:"Elimina inflazione",c:false},
        {t:"Nessun effetto",c:false}
      ]
    },
    {
      q:"Aumento debito pubblico indica:",
      cat:"economia",
      options:[
        {t:"Spesa > entrate",c:true},
        {t:"Crescita senza costi",c:false},
        {t:"Tasse eliminate",c:false},
        {t:"Zero conseguenze",c:false}
      ]
    },
    {
      q:"Criminalità percepita alta:",
      cat:"societa",
      options:[
        {t:"Problema multifattoriale reale e percepito",c:true},
        {t:"Solo percezione falsa",c:false},
        {t:"Non esiste problema",c:false},
        {t:"Dipende solo dai media",c:false}
      ]
    }
  ],

  regionale: [
    {
      q:"Liste d’attesa sanità regionale:",
      cat:"servizi",
      options:[
        {t:"Carenza personale e risorse",c:true},
        {t:"Sistema perfetto",c:false},
        {t:"Troppi ospedali",c:false},
        {t:"Nessun problema",c:false}
      ]
    },
    {
      q:"Trasporti regionali inefficienti:",
      cat:"servizi",
      options:[
        {t:"Investimenti infrastrutturali",c:true},
        {t:"Eliminazione trasporto pubblico",c:false},
        {t:"Stop mobilità",c:false},
        {t:"Nessuna soluzione",c:false}
      ]
    }
  ],

  comunale: [
    {
      q:"Traffico urbano:",
      cat:"servizi",
      options:[
        {t:"Trasporto pubblico potenziato",c:true},
        {t:"Chiusura città",c:false},
        {t:"Eliminare auto",c:false},
        {t:"Bloccare strade",c:false}
      ]
    },
    {
      q:"Sicurezza urbana:",
      cat:"societa",
      options:[
        {t:"Controlli + illuminazione",c:true},
        {t:"Meno forze ordine",c:false},
        {t:"Zero controlli",c:false},
        {t:"Nessuna azione",c:false}
      ]
    }
  ]

};


// =====================
// START
// =====================

function start(level){

  state.level = level;
  state.name = document.getElementById("username").value || "Utente";

  state.index = 0;
  state.score = 0;
  state.categories = {economia:0,societa:0,servizi:0};

  state.questions = shuffle(bank[level]);

  document.getElementById("home").style.display="none";
  document.getElementById("quiz").style.display="block";

  render();
}


// =====================
// RENDER
// =====================

function render(){

  let q = state.questions[state.index];
  if(!q) return finish();

  let opts = shuffle([...q.options]);
  state.currentOptions = opts;

  document.getElementById("quiz").innerHTML = `
    <div class="progress">${state.index+1}/${state.questions.length}</div>

    <div class="tag">${q.cat}</div>

    <div class="question">${q.q}</div>

    ${opts.map((o,i)=>`
      <button class="answer" onclick="answer(${i})">${o.t}</button>
    `).join("")}
  `;
}


// =====================
// ANSWER
// =====================

function answer(i){

  let q = state.questions[state.index];
  let selected = state.currentOptions[i];

  if(selected.c){
    state.score++;
    state.categories[q.cat]++;
  }

  state.index++;
  render();
}


// =====================
// FINISH + DASHBOARD
// =====================

function finish(){

  document.getElementById("quiz").style.display="none";
  document.getElementById("result").style.display="block";

  let percent = Math.round((state.score/state.questions.length)*100);

  document.getElementById("result").innerHTML = `
    <h2>Risultato finale</h2>
    <h1>${percent}% Consapevolezza</h1>

    <p><b>Nome:</b> ${state.name}</p>
    <p><b>Livello:</b> ${state.level}</p>

    <h3>Analisi</h3>
    <p>Economia: ${state.categories.economia}</p>
    <p>Società: ${state.categories.societa}</p>
    <p>Servizi: ${state.categories.servizi}</p>

    <button onclick="downloadPDF()">Scarica Report</button>
    <button onclick="location.reload()">Riprova</button>
  `;
}


// =====================
// PDF
// =====================

function downloadPDF(){

  let text = `
PATENTE CONSAPEVOLEZZA CIVICA

Nome: ${state.name}
Livello: ${state.level}

Score: ${state.score}/${state.questions.length}
Percentuale: ${Math.round((state.score/state.questions.length)*100)}%

Economia: ${state.categories.economia}
Società: ${state.categories.societa}
Servizi: ${state.categories.servizi}
  `;

  let blob = new Blob([text], {type:"text/plain"});
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "report.txt";
  a.click();
}


// =====================
// UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
