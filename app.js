// =========================
// DATA (SCALABILE)
// =========================

const DB = {
  nazionale: [
    {
      q:"Riduzione accise carburanti: effetto principale?",
      cat:"economia",
      a:[
        {t:"Riduce entrate fiscali",v:1},
        {t:"Aumenta salari automaticamente",v:0},
        {t:"Elimina inflazione",v:0},
        {t:"Nessun effetto",v:0}
      ]
    },
    {
      q:"Debito pubblico in crescita indica:",
      cat:"economia",
      a:[
        {t:"Spesa superiore alle entrate",v:1},
        {t:"Zero conseguenze",v:0},
        {t:"Crescita gratuita",v:0},
        {t:"Nessun impatto",v:0}
      ]
    },
    {
      q:"Criminalità urbana:",
      cat:"societa",
      a:[
        {t:"Fenomeno reale e sociale",v:1},
        {t:"Solo percezione",v:0},
        {t:"Non esiste problema",v:0},
        {t:"Solo media",v:0}
      ]
    }
  ]
};

// =========================
// STATE ENGINE
// =========================

const state = {
  level:null,
  name:"",
  i:0,
  score:0,
  q:[],
  stats:{economia:0,societa:0,servizi:0}
};

// =========================
// UI ROOT
// =========================

const app = document.getElementById("app");

// =========================
// HOME
// =========================

function renderHome(){
  app.innerHTML = `
    <div class="card">
      <h1>Consapevolezza Civica</h1>

      <input id="name" placeholder="Nome">

      <button onclick="start('nazionale')">Nazionale</button>
    </div>
  `;
}

renderHome();

// =========================
// START
// =========================

function start(level){

  state.level = level;
  state.name = document.getElementById("name").value || "Utente";
  state.q = shuffle([...DB[level]]);
  state.i = 0;
  state.score = 0;
  state.stats = {economia:0,societa:0,servizi:0};

  renderQuestion();
}

// =========================
// QUESTION
// =========================

function renderQuestion(){

  const q = state.q[state.i];

  if(!q){
    return finish();
  }

  app.innerHTML = `
    <div class="card">

      <div class="tag">${q.cat}</div>

      <h2>${q.q}</h2>

      ${q.a.map((x,idx)=>`
        <button class="answer" onclick="answer(${idx})">${x.t}</button>
      `).join("")}

      <p>${state.i+1} / ${state.q.length}</p>

    </div>
  `;
}

// =========================
// ANSWER
// =========================

function answer(idx){

  const q = state.q[state.i];
  const ans = q.a[idx];

  if(ans.v){
    state.score++;
    state.stats[q.cat]++;
  }

  state.i++;
  renderQuestion();
}

// =========================
// FINISH
// =========================

function finish(){

  const total = state.q.length;
  const percent = Math.round((state.score/total)*100);

  app.innerHTML = `
    <div class="card">

      <h2>Report finale</h2>
      <h1>${percent}%</h1>

      <p>Nome: ${state.name}</p>
      <p>Livello: ${state.level}</p>

      <canvas id="chart"></canvas>

      <button onclick="download()">Scarica Report</button>
      <button onclick="location.reload()">Riprova</button>

    </div>
  `;

  new Chart(document.getElementById("chart"), {
    type:"pie",
    data:{
      labels:["Economia","Società","Servizi"],
      datasets:[{
        data:[
          state.stats.economia,
          state.stats.societa,
          state.stats.servizi
        ]
      }]
    }
  });
}

// =========================
// PDF (PRINT CLEAN)
// =========================

function download(){

  const percent = Math.round((state.score/state.q.length)*100);

  const w = window.open();

  w.document.write(`
    <html>
    <head>
      <title>Report</title>
      <style>
        body{font-family:Arial;padding:40px;background:#f6f6f6}
        .box{border:3px solid #4f5f45;padding:25px;background:white}
        h1{color:#4f5f45}
      </style>
    </head>
    <body>

      <div class="box">
        <h1>Consapevolezza Civica</h1>
        <p>${state.name}</p>
        <p>${state.level}</p>
        <p>${percent}%</p>

        <canvas id="c"></canvas>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script>
        new Chart(document.getElementById("c"), {
          type:"pie",
          data:{
            labels:["Economia","Società","Servizi"],
            datasets:[{
              data:[
                ${state.stats.economia},
                ${state.stats.societa},
                ${state.stats.servizi}
              ]
            }]
          }
        });

        setTimeout(()=>window.print(),500);
      </script>

    </body>
    </html>
  `);

  w.document.close();
}

// =========================
// UTILS
// =========================

function shuffle(a){
  return a.sort(()=>Math.random()-0.5);
}
