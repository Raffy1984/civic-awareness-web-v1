let nome = "";
let livello = "";
let regione = "";
let score = 0;

function avvia(){
  nome = document.getElementById("nomeUtente").value || "Utente";

  document.getElementById("intro").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

/* LIVELLO */
function selezionaLivello(l){
  livello = l;

  if(l === "nazionale"){
    startQuiz();
  }

  if(l === "comunale"){
    startQuiz();
  }
}

/* REGIONI */
function mostraRegioni(){
  document.getElementById("selector").style.display = "block";

  const sel = document.getElementById("regioneSelect");
  sel.innerHTML = "";

  REGIONI.forEach(r=>{
    const opt = document.createElement("option");
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

  startQuiz();
}

/* QUIZ BASE */
const DOMANDE = {
  nazionale:[
    {
      q:"Inflazione in crescita: cosa è più equilibrato?",
      options:[
        {t:"Sostegni + salari",v:2},
        {t:"Controllo prezzi",v:1},
        {t:"Nessun intervento",v:0},
        {t:"Tagli spesa pubblica",v:1}
      ]
    }
  ],
  regionale:[
    {
      q:"Sanità sotto pressione nella regione: cosa fai?",
      options:[
        {t:"Assunzioni + investimenti",v:2},
        {t:"Privatizzazione",v:0},
        {t:"Riduzione servizi",v:1}
      ]
    }
  ],
  comunale:[
    {
      q:"Traffico urbano alto: soluzione?",
      options:[
        {t:"Trasporto pubblico",v:2},
        {t:"Più parcheggi",v:0},
        {t:"Riduzione controlli",v:1}
      ]
    }
  ]
};

let index = 0;
let current = [];

function startQuiz(){
  document.getElementById("dashboard").style.display = "none";

  current = DOMANDE[livello];
  index = 0;
  score = 0;

  render();
}

function render(){
  document.getElementById("quiz").style.display = "block";

  let d = current[index];

  if(!d){
    return finish();
  }

  let shuffled = d.options.sort(()=>Math.random()-0.5);

  document.getElementById("quiz").innerHTML = `
    <h2>${d.q}</h2>
    ${shuffled.map(o=>`
      <button onclick="answer(${o.v})">${o.t}</button>
    `).join("")}
    <p>${index+1}/${current.length}</p>
  `;
}

function answer(v){
  score += v;
  index++;
  render();
}

function finish(){
  document.getElementById("quiz").style.display = "none";
  document.getElementById("report").style.display = "block";

  let perc = Math.round((score/(current.length*2))*100);

  document.getElementById("report").innerHTML = `
    <h1>Report ${nome}</h1>
    <p>Livello: ${livello}</p>
    <p>Regione: ${regione}</p>
    <h2>Consapevolezza: ${perc}%</h2>

    <button onclick="location.reload()">Ricomincia</button>
  `;
}
