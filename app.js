const DB = {

  nazionale: [
    {
      q:"Riduzione accise carburanti: cosa comporta?",
      cat:"economia",
      a:[
        {t:"Riduce entrate fiscali",v:1},
        {t:"Aumenta salari automaticamente",v:0},
        {t:"Elimina inflazione",v:0},
        {t:"Nessun effetto",v:0}
      ]
    },
    {
      q:"Debito pubblico in crescita significa:",
      cat:"economia",
      a:[
        {t:"Spesa superiore alle entrate",v:1},
        {t:"Zero conseguenze",v:0},
        {t:"Crescita gratuita",v:0},
        {t:"Nessun impatto",v:0}
      ]
    }
  ],

  regionale: [
    {
      q:"Liste d’attesa sanità regionale:",
      cat:"servizi",
      a:[
        {t:"Carenza risorse e personale",v:1},
        {t:"Sistema perfetto",v:0},
        {t:"Troppi ospedali",v:0},
        {t:"Nessun problema",v:0}
      ]
    }
  ],

  comunale: [
    {
      q:"Traffico urbano:",
      cat:"servizi",
      a:[
        {t:"Potenziare trasporto pubblico",v:1},
        {t:"Chiudere città",v:0},
        {t:"Eliminare auto",v:0},
        {t:"Bloccare tutto",v:0}
      ]
    }
  ]
};


// =====================
// STATE
// =====================

const state = {
  level:null,
  name:"",
  i:0,
  score:0,
  q:[],
  stats:{economia:0,societa:0,servizi:0}
};

const app = document.getElementById("app");


// =====================
// HOME
// =====================

function home(){
  app.innerHTML = `
    <div class="card">
      <h1>Consapevolezza Civica</h1>

      <input id="name" placeholder="Nome">

      <button onclick="start('nazionale')">Nazionale</button>
      <button onclick="start('regionale')">Regionale</button>
      <button onclick="start('comunale')">Comunale</button>
    </div>
  `;
}

home();


// =====================
// START
// =====================

function start(level){

  state.level = level;
  state.name = document.getElementById("name").value || "Utente";

  state.i = 0;
  state.score = 0;
  state.stats = {economia:0,societa:0,servizi:0};

  state.q = shuffle([...DB[level]]);

  render();
}


// =====================
// RENDER
// =====================

function render(){

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

      <p>${state.i+1}/${state.q.length}</p>

    </div>
  `;
}


// =====================
// ANSWER
// =====================

function answer(i){

  const q = state.q[state.i];
  const a = q.a[i];

  if(a.v){
    state.score++;
    state.stats[q.cat]++;
  }

  state.i++;
  render();
}


// =====================
// FINISH
// =====================

function finish(){

  const percent = Math.round((state.score/state.q.length)*100);

  app.innerHTML = `
    <div class="card">

      <h2>Report finale</h2>
      <h1>${percent}%</h1>

      <p>${state.name}</p>
      <p>${state.level}</p>

      <canvas id="chart"></canvas>

      <button onclick="pdf()">Scarica PDF</button>
      <button onclick="location.reload()">Riprova</button>

    </div>
  `;

  new Chart(document.getElementById("chart"),{
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


// =====================
// PDF
// =====================

function pdf(){

  const w = window.open();

  w.document.write(`
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        body{font-family:Arial;padding:30px;background:#eee}
        .box{background:white;border:3px solid #4f5f45;padding:20px}
      </style>
    </head>

    <body>

      <div class="box">
        <h1>Consapevolezza Civica</h1>
        <p>${state.name}</p>
        <p>${state.level}</p>

        <canvas id="c"></canvas>
      </div>

      <script>
        new Chart(document.getElementById("c"),{
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


// =====================
// UTILS
// =====================

function shuffle(a){
  return a.sort(()=>Math.random()-0.5);
}
