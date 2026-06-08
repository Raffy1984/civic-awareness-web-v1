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
// DATABASE
// =====================

const bank = {

  nazionale: [
    {
      q:"Riduzione accise carburanti: cosa comporta?",
      cat:"economia",
      options:[
        {t:"Riduzione entrate fiscali dello Stato",c:true},
        {t:"Aumento automatico salari",c:false},
        {t:"Eliminazione inflazione",c:false},
        {t:"Nessun effetto",c:false}
      ]
    },
    {
      q:"Aumento debito pubblico significa:",
      cat:"economia",
      options:[
        {t:"Spesa superiore alle entrate",c:true},
        {t:"Crescita senza costi",c:false},
        {t:"Tasse eliminate",c:false},
        {t:"Nessun impatto",c:false}
      ]
    },
    {
      q:"Criminalità urbana:",
      cat:"societa",
      options:[
        {t:"Fenomeno reale + percezione sociale",c:true},
        {t:"Solo percezione mediatica",c:false},
        {t:"Non esiste problema",c:false},
        {t:"Dipende solo dalla politica",c:false}
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
    }
  ],

  comunale: [
    {
      q:"Traffico urbano:",
      cat:"servizi",
      options:[
        {t:"Potenziamento trasporto pubblico",c:true},
        {t:"Chiusura città",c:false},
        {t:"Eliminazione auto",c:false},
        {t:"Bloccare tutto",c:false}
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
  document.getElementById("result").style.display="none";

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
  let sel = state.currentOptions[i];

  if(sel.c){
    state.score++;
    state.categories[q.cat]++;
  }

  state.index++;
  render();
}


// =====================
// FINISH
// =====================

function finish(){

  document.getElementById("quiz").style.display="none";
  document.getElementById("result").style.display="block";

  let total = state.questions.length;
  let percent = Math.round((state.score/total)*100);

  document.getElementById("result").innerHTML = `
    <h2>Patente di Consapevolezza Civica</h2>
    <h1>${percent}%</h1>

    <p><b>Nome:</b> ${state.name}</p>
    <p><b>Livello:</b> ${state.level}</p>

    <canvas id="chart" width="300" height="300"></canvas>

    <button onclick="downloadPDF()">Scarica PDF</button>
    <button onclick="location.reload()">Riprova</button>
  `;

  drawChart();
}


// =====================
// GRAFICO
// =====================

function drawChart(){

  new Chart(document.getElementById("chart"), {
    type:"pie",
    data:{
      labels:["Economia","Società","Servizi"],
      datasets:[{
        data:[
          state.categories.economia,
          state.categories.societa,
          state.categories.servizi
        ]
      }]
    }
  });
}


// =====================
// PDF (STAMPA PROFESSIONALE)
// =====================

function downloadPDF(){

  const percent = Math.round((state.score/state.questions.length)*100);

  const win = window.open("", "_blank");

  win.document.write(`
  <html>
  <head>
    <title>Report</title>
    <style>
      body{font-family:Arial;padding:40px;}
      h1{color:#4f5f45;}
    </style>
  </head>

  <body>

    <h1>Patente di Consapevolezza Civica</h1>

    <p><b>Nome:</b> ${state.name}</p>
    <p><b>Livello:</b> ${state.level}</p>
    <p><b>Punteggio:</b> ${percent}%</p>

    <canvas id="pdfChart" width="400" height="400"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <script>
      new Chart(document.getElementById("pdfChart"), {
        type:"pie",
        data:{
          labels:["Economia","Società","Servizi"],
          datasets:[{
            data:[
              ${state.categories.economia},
              ${state.categories.societa},
              ${state.categories.servizi}
            ]
          }]
        }
      });

      setTimeout(()=>window.print(), 600);
    </script>

  </body>
  </html>
  `);

  win.document.close();
}


// =====================
// UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
