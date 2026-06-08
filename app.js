let state = {
  level:"",
  name:"",
  index:0,
  score:0,
  questions:[],
  options:[],
  categories:{economia:0,societa:0,servizi:0}
};


// =====================
// DATABASE
// =====================

const bank = {

  nazionale: [
    {
      q:"Riduzione accise carburanti: effetto principale?",
      cat:"economia",
      options:[
        {t:"Riduce entrate fiscali dello Stato",c:true},
        {t:"Aumenta salari automaticamente",c:false},
        {t:"Elimina inflazione",c:false},
        {t:"Nessun effetto",c:false}
      ]
    },
    {
      q:"Debito pubblico in crescita significa:",
      cat:"economia",
      options:[
        {t:"Spesa superiore alle entrate",c:true},
        {t:"Zero conseguenze",c:false},
        {t:"Aumento immediato salari",c:false},
        {t:"Eliminazione tasse",c:false}
      ]
    },
    {
      q:"Criminalità percepita:",
      cat:"societa",
      options:[
        {t:"Fenomeno reale + percezione sociale",c:true},
        {t:"Solo invenzione mediatica",c:false},
        {t:"Non esiste problema",c:false},
        {t:"Solo politica",c:false}
      ]
    }
  ],

  regionale: [
    {
      q:"Liste d’attesa sanità:",
      cat:"servizi",
      options:[
        {t:"Carenza risorse e personale",c:true},
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
        {t:"Potenziare trasporto pubblico",c:true},
        {t:"Chiudere città",c:false},
        {t:"Eliminare auto",c:false},
        {t:"Bloccare tutto",c:false}
      ]
    }
  ]
};


// =====================
// START (FIX BIANCO)
// =====================

function start(level){

  state.level = level;
  state.name = document.getElementById("username").value || "Utente";

  state.index = 0;
  state.score = 0;
  state.categories = {economia:0,societa:0,servizi:0};

  if(!bank[level]){
    alert("Errore livello");
    return;
  }

  state.questions = shuffle(bank[level]);

  document.getElementById("home").style.display="none";
  document.getElementById("quiz").style.display="block";
  document.getElementById("result").style.display="none";

  render();
}


// =====================
// RENDER (NO BUG BIANCO)
// =====================

function render(){

  let q = state.questions[state.index];

  if(!q){
    finish();
    return;
  }

  state.options = shuffle([...q.options]);

  let html = `
    <div class="progress">${state.index+1}/${state.questions.length}</div>

    <div class="tag">${q.cat}</div>

    <div class="question">${q.q}</div>
  `;

  state.options.forEach((o,i)=>{
    html += `<button class="answer" onclick="answer(${i})">${o.t}</button>`;
  });

  document.getElementById("quiz").innerHTML = html;
}


// =====================
// ANSWER
// =====================

function answer(i){

  let q = state.questions[state.index];
  let sel = state.options[i];

  if(sel.c){
    state.score++;
    state.categories[q.cat]++;
  }

  state.index++;
  render();
}


// =====================
// FINISH + PDF
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
// PDF CON CORNICE (FIX BELLO)
// =====================

function downloadPDF(){

  const percent = Math.round((state.score/state.questions.length)*100);

  const w = window.open("", "_blank");

  w.document.write(`
  <html>
  <head>
    <title>Report</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
      body{
        font-family:Arial;
        padding:30px;
        background:#f4f4f4;
      }

      .box{
        border:4px solid #4f5f45;
        padding:30px;
        background:white;
        border-radius:12px;
      }

      h1{
        text-align:center;
        color:#4f5f45;
      }
    </style>
  </head>

  <body>

    <div class="box">

      <h1>Patente di Consapevolezza Civica</h1>

      <p><b>Nome:</b> ${state.name}</p>
      <p><b>Livello:</b> ${state.level}</p>
      <p><b>Risultato:</b> ${percent}%</p>

      <canvas id="pdfChart" width="400" height="400"></canvas>

    </div>

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

  w.document.close();
}


// =====================
// UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
