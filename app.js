const DB = {
  nazionale: [
    {
      q:"Se aumenta l'inflazione, cosa succede al potere d'acquisto?",
      cat:"economia",
      a:[
        {t:"Diminuisce",v:1},
        {t:"Aumenta automaticamente",v:0},
        {t:"Non cambia mai",v:0},
        {t:"Diventa illimitato",v:0}
      ]
    },
    {
      q:"Il debito pubblico è:",
      cat:"economia",
      a:[
        {t:"Somma dei debiti dello Stato",v:1},
        {t:"Risparmio dello Stato",v:0},
        {t:"Profitto automatico",v:0},
        {t:"Tasse eliminate",v:0}
      ]
    },
    {
      q:"La sicurezza urbana dipende da:",
      cat:"societa",
      a:[
        {t:"Fattori sociali e controllo del territorio",v:1},
        {t:"Solo fortuna",v:0},
        {t:"Nessuna causa",v:0},
        {t:"Solo media",v:0}
      ]
    }
  ],

  regionale: [
    {
      q:"Le liste d'attesa sanitarie dipendono spesso da:",
      cat:"servizi",
      a:[
        {t:"Risorse e personale disponibili",v:1},
        {t:"Caso fortuito",v:0},
        {t:"Nessuna struttura",v:0},
        {t:"Solo tecnologia",v:0}
      ]
    }
  ],

  comunale: [
    {
      q:"Il traffico urbano si riduce con:",
      cat:"servizi",
      a:[
        {t:"Trasporto pubblico efficiente",v:1},
        {t:"Più auto private",v:0},
        {t:"Nessuna infrastruttura",v:0},
        {t:"Blocchi casuali",v:0}
      ]
    }
  ]
};

const app = document.getElementById("app");

let state = {
  level:null,
  name:"",
  i:0,
  score:0,
  q:[],
  stats:{economia:0,societa:0,servizi:0}
};

// HOME
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

// START
function start(level){

  state.level = level;
  state.name = document.getElementById("name").value || "Utente";
  state.q = [...DB[level]];
  state.i = 0;
  state.score = 0;
  state.stats = {economia:0,societa:0,servizi:0};

  render();
}

// RENDER
function render(){

  const q = state.q[state.i];

  if(!q){
    return finish();
  }

  app.innerHTML = `
    <div class="card">

      <div class="tag">${q.cat}</div>

      <h2>${q.q}</h2>

      ${q.a.map((x,i)=>`
        <button class="answer" onclick="answer(${i})">${x.t}</button>
      `).join("")}

      <p>${state.i+1}/${state.q.length}</p>

    </div>
  `;
}

// ANSWER
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

// FINISH
function finish(){

  const percent = Math.round((state.score/state.q.length)*100);

  app.innerHTML = `
    <div class="card">

      <h2>Risultato</h2>
      <h1>${percent}%</h1>

      <p>${state.name}</p>
      <p>${state.level}</p>

      <canvas id="c"></canvas>

      <button onclick="location.reload()">Riprova</button>

    </div>
  `;

  new Chart(document.getElementById("c"),{
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
