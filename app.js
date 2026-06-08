let state = {
  level: "",
  name: "",
  index: 0,
  score: 0,
  questions: [],
  currentOptions: []
};


// =====================
// DATABASE SICURO
// =====================

const bank = {
  nazionale: [
    {
      q: "Riduzione accise carburanti: effetto principale?",
      options: [
        {t:"Riduce entrate fiscali dello Stato", c:true},
        {t:"Aumenta salari automaticamente", c:false},
        {t:"Elimina inflazione", c:false},
        {t:"Nessun effetto", c:false}
      ]
    },
    {
      q: "Aumento debito pubblico significa?",
      options: [
        {t:"Più spesa che entrate", c:true},
        {t:"Meno tasse automatiche", c:false},
        {t:"Crescita senza costi", c:false},
        {t:"Nessun impatto", c:false}
      ]
    },
    {
      q: "Crisi energetica: soluzione strutturale?",
      options: [
        {t:"Diversificazione fonti energia", c:true},
        {t:"Stop economia", c:false},
        {t:"Bloccare consumi", c:false},
        {t:"Chiusura industria", c:false}
      ]
    }
  ],

  regionale: [
    {
      q: "Liste d’attesa sanitarie alte: causa probabile?",
      options: [
        {t:"Carenza personale medico", c:true},
        {t:"Troppi ospedali", c:false},
        {t:"Zero pazienti", c:false},
        {t:"Sistema perfetto", c:false}
      ]
    },
    {
      q: "Trasporti regionali inefficienti:",
      options: [
        {t:"Investire nel trasporto pubblico", c:true},
        {t:"Eliminare treni", c:false},
        {t:"Bloccare mobilità", c:false},
        {t:"Chiusura sistema", c:false}
      ]
    }
  ],

  comunale: [
    {
      q: "Traffico urbano elevato:",
      options: [
        {t:"Potenziare trasporto pubblico", c:true},
        {t:"Chiudere città", c:false},
        {t:"Eliminare auto", c:false},
        {t:"Bloccare strade", c:false}
      ]
    },
    {
      q: "Sicurezza urbana percepita bassa:",
      options: [
        {t:"Più controlli e illuminazione", c:true},
        {t:"Meno forze ordine", c:false},
        {t:"Zero controlli", c:false},
        {t:"Nessuna azione", c:false}
      ]
    }
  ]
};


// =====================
// START (ANTI-BLOCCO)
// =====================

function start(level){

  const input = document.getElementById("username");

  state.level = level;
  state.name = (input && input.value) ? input.value.trim() : "Utente";

  state.index = 0;
  state.score = 0;

  // 🔥 GUARD CLAUSE (QUESTA È LA FIX VERA)
  if(!bank[level]){
    alert("Errore: livello non trovato -> " + level);
    return;
  }

  state.questions = shuffle(bank[level]);

  if(state.questions.length === 0){
    alert("Errore: nessuna domanda nel livello");
    return;
  }

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";

  render();
}


// =====================
// RENDER
// =====================

function render(){

  const q = state.questions[state.index];

  if(!q){
    return finish();
  }

  const options = shuffle([...q.options]);
  state.currentOptions = options;

  document.getElementById("quiz").innerHTML = `
    <div class="progress">${state.index+1} / ${state.questions.length}</div>

    <div class="question">${q.q}</div>

    ${options.map((o,i)=>`
      <button class="answer" onclick="answer(${i})">${o.t}</button>
    `).join("")}
  `;
}


// =====================
// ANSWER
// =====================

function answer(i){

  if(state.currentOptions[i].c){
    state.score++;
  }

  state.index++;
  render();
}


// =====================
// FINISH
// =====================

function finish(){

  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";

  const percent = Math.round((state.score/state.questions.length)*100);

  document.getElementById("result").innerHTML = `
    <h2>Risultato</h2>
    <h1>${percent}% Consapevolezza</h1>

    <p>Nome: <b>${state.name}</b></p>
    <p>Livello: <b>${state.level}</b></p>

    <button onclick="downloadPDF()">Scarica Report</button>
    <button onclick="location.reload()">Riprova</button>
  `;
}


// =====================
// PDF
// =====================

function downloadPDF(){

  const text = `
PATENTE DI CONSAPEVOLEZZA CIVICA

Nome: ${state.name}
Livello: ${state.level}

Punteggio: ${state.score}/${state.questions.length}
Percentuale: ${Math.round((state.score/state.questions.length)*100)}%
  `;

  const blob = new Blob([text], {type:"text/plain"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `report_${state.name}.txt`;
  a.click();
}


// =====================
// UTILS
// =====================

function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}
