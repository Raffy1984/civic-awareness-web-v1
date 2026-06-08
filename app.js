<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Citizen Insight V0.1</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
body{
  margin:0;
  font-family:Arial;
  background:#f3f5ef;
  color:#111;
}

.container{
  max-width:900px;
  margin:auto;
  padding:20px;
}

.card{
  background:#fff;
  border-radius:14px;
  padding:20px;
  margin-top:20px;
  box-shadow:0 8px 20px rgba(0,0,0,0.06);
}

input{
  width:100%;
  padding:12px;
  margin:10px 0;
  border-radius:10px;
  border:1px solid #ccc;
}

button{
  width:100%;
  padding:12px;
  margin:6px 0;
  border:none;
  border-radius:10px;
  background:#2f4f3f;
  color:white;
  cursor:pointer;
}

.answer{
  background:white;
  border:1px solid #ccc;
  color:#111;
}
</style>
</head>

<body>

<div class="container">
<div id="app"></div>
</div>

<script>

const DB = {
  nazionale:[
    {
      q:"Inflazione significa:",
      a:[
        {t:"Aumento prezzi",v:1},
        {t:"Diminuzione prezzi",v:0},
        {t:"Zero economia",v:0},
        {t:"Crescita automatica salari",v:0}
      ]
    },
    {
      q:"Debito pubblico è:",
      a:[
        {t:"Debiti dello Stato",v:1},
        {t:"Risparmi privati",v:0},
        {t:"Tasse eliminate",v:0},
        {t:"Export",v:0}
      ]
    }
  ],

  regionale:[
    {
      q:"Sanità regionale inefficienze causano:",
      a:[
        {t:"Liste d'attesa",v:1},
        {t:"Zero effetti",v:0},
        {t:"Miglioramento automatico",v:0},
        {t:"Riduzione domanda",v:0}
      ]
    }
  ],

  comunale:[
    {
      q:"Traffico urbano si riduce con:",
      a:[
        {t:"Trasporto pubblico",v:1},
        {t:"Più auto",v:0},
        {t:"Nessuna infrastruttura",v:0},
        {t:"Caos urbano",v:0}
      ]
    }
  ]
};

let state = {
  level:null,
  name:"",
  i:0,
  score:0,
  q:[]
};

const app = document.getElementById("app");

function home(){
  app.innerHTML = `
    <div class="card">
      <h1>Citizen Insight</h1>

      <input id="name" placeholder="Nome">

      <button onclick="start('nazionale')">Nazionale</button>
      <button onclick="start('regionale')">Regionale</button>
      <button onclick="start('comunale')">Comunale</button>
    </div>
  `;
}

home();

function start(level){
  state.level = level;
  state.name = document.getElementById("name").value || "Utente";
  state.q = DB[level];
  state.i = 0;
  state.score = 0;
  render();
}

function render(){

  const q = state.q[state.i];
  if(!q) return finish();

  const shuffled = [...q.a].sort(()=>Math.random()-0.5);

  app.innerHTML = `
    <div class="card">
      <h2>${q.q}</h2>

      ${shuffled.map((x)=>`
        <button class="answer" onclick="answer(${x.v})">${x.t}</button>
      `).join("")}

      <p>${state.i+1}/${state.q.length}</p>
    </div>
  `;
}

function answer(v){
  if(v) state.score++;
  state.i++;
  render();
}

function finish(){

  app.innerHTML = `
    <div class="card">
      <h2>Risultato</h2>
      <h1>${state.score}/${state.q.length}</h1>
      <p>${state.name} - ${state.level}</p>

      <canvas id="c"></canvas>

      <button onclick="location.reload()">Riprova</button>
    </div>
  `;

  new Chart(document
