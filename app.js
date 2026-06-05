// =====================================
// 🏛️ CIVIC DASHBOARD - STABLE CORE v1
// =====================================


// =====================
// 🎨 PALETTE ISTITUZIONALE
// =====================

const COLORS = {
  Immigrazione: "#1f3a5f",
  Criminalità: "#b23a48",
  Economia: "#2f6f4e",
  Società: "#6a4c93",
  Lavoro: "#e09f3e",
  Istituzioni: "#3a86ff",
  Sanità: "#2a9d8f",
  Istruzione: "#8ac926"
};


// =====================
// 📦 DATABASE
// =====================

const bank = {
  Immigrazione: [
    {q:"Quota stranieri in Italia (ISTAT):",a:["4–5%","8–9%","15–18%","25%+"],c:1},
    {q:"Percezione immigrazione:",a:["Inferiore","Corretta","Sovrastimata","Nulla"],c:2},
    {q:"Distribuzione immigrati:",a:["Nord","Sud","Uniforme","Solo città"],c:0}
  ],

  Criminalità: [
    {q:"Reati ultimi 15 anni:",a:["Aumento","Stabili","Diminuzione","Raddoppio"],c:2},
    {q:"Percezione criminalità:",a:["Inferiore","Allineata","Superiore","Nulla"],c:2},
    {q:"Omicidi:",a:["Crescono","Calano","Raddoppiano","Stabili"],c:1}
  ],

  Economia: [
    {q:"Debito/PIL:",a:["90%","110%","130%","180%"],c:2},
    {q:"PIL:",a:["Crescita","Oscillante","Crollo","Zero"],c:1},
    {q:"Inflazione:",a:["Stabile","Deflazione","Variabile","Nulla"],c:2}
  ],

  Società: [
    {q:"Rischio sociale:",a:["Inferiore","Allineato","Superiore","Nulla"],c:2},
    {q:"Paure sociali:",a:["Allineate","Amplificate","Inesistenti","Perfette"],c:1},
    {q:"Fiducia istituzioni:",a:["Alta","Media-bassa","Alta UE","Perfetta"],c:1}
  ],

  Lavoro: [
    {q:"Occupazione UE vs Italia:",a:["Più alta","Più bassa","Uguale","Massima"],c:1},
    {q:"Salari:",a:["Crescita","Stagnanti","Raddoppio","Nulla"],c:1},
    {q:"Precarietà:",a:["Inferiore","Allineata","Superiore","Assente"],c:2}
  ],

  Istituzioni: [
    {q:"UE è:",a:["Stato","Unione Stati","Nazione","Esercito"],c:1},
    {q:"BCE:",a:["Monetaria","Militare","Scuola","Giustizia"],c:0},
    {q:"Parlamento UE:",a:["Legislativo","Militare","Assoluto","Nullo"],c:0}
  ],

  Sanità: [
    {q:"SSN:",a:["Tasse","Privato","Donazioni","UE"],c:0},
    {q:"Sistema sanitario:",a:["Pubblico","Privato","USA","Militare"],c:0},
    {q:"Percezione sanità:",a:["Inferiore","Allineata","Sovrastimata","Perfetta"],c:2}
  ],

  Istruzione: [
    {q:"Scuola:",a:["Stato","Privati","Banche","UE"],c:0},
    {q:"Livello istruzione:",a:["Più alto","Più basso","Uguale","Massimo"],c:1},
    {q:"Laureati:",a:["Bassi","Alti","Massimi","Zero"],c:0}
  ]
};


// =====================
// STATE
// =====================

let questions = [];
let index = 0;
let score = 0;
let categoryScore = {};

const TOTAL = 20;


// =====================
// 🚀 START
// =====================

function start(){

  index = 0;
  score = 0;
  categoryScore = {};

  let all = [];

  Object.keys(bank).forEach(cat=>{
    bank[cat].forEach(q=>{
      all.push({...q, cat});
    });
  });

  questions = shuffle(all).slice(0, TOTAL);

  questions.forEach(q=>{
    if(!categoryScore[q.cat]){
      categoryScore[q.cat] = {right:0,total:0};
    }
  });

  showQuestion();
}


// =====================
// ❓ QUESTION
// =====================

function showQuestion(){

  const q = questions[index];
  const out = document.getElementById("output");

  if(!out || !q) return;

  out.innerHTML = `
    <div class="card">
      <div>${index+1} / ${questions.length}</div>
      <h3>${q.cat}</h3>
      <p>${q.q}</p>

      ${q.a.map((x,i)=>`
        <button class="btn" onclick="answer(${i})">${x}</button>
      `).join("")}
    </div>
  `;
}


// =====================
// ✅ ANSWER
// =====================

function answer(i){

  const q = questions[index];
  if(!q) return;

  categoryScore[q.cat].total++;

  if(i === q.c){
    score++;
    categoryScore[q.cat].right++;
  }

  index++;

  if(index >= questions.length){
    showReport();
  } else {
    showQuestion();
  }
}


// =====================
// 📊 REPORT
// =====================

function showReport(){

  const out = document.getElementById("output");
  if(!out) return;

  let activeCats = Object.keys(categoryScore)
    .filter(c => categoryScore[c].total > 0);

  let percent = Math.round(score / questions.length * 100);

  out.innerHTML = `
    <div class="card" id="report">

      <h2>🏛️ REPORT ISTITUZIONALE</h2>

      <h1>${percent}%</h1>

      <p>Consapevolezza civica</p>

      ${activeCats.map(c=>{
        let p = Math.round(categoryScore[c].right / categoryScore[c].total * 100);
        return `
          <div class="box" style="border-left:6px solid ${COLORS[c]}">
            <b>${c}</b> — ${p}%
          </div>
        `;
      }).join("")}

      <canvas id="chart" width="320" height="320"></canvas>

      <button onclick="downloadPDF()">Scarica PDF</button>

    </div>
  `;

  drawChart(activeCats);
}


// =====================
// 📊 PIE CHART
// =====================

function drawChart(activeCats){

  const ctx = document.getElementById("chart").getContext("2d");

  let values = activeCats.map(c =>
    Math.round(categoryScore[c].right / categoryScore[c].total * 100)
  );

  let total = values.reduce((a,b)=>a+b,0);
  let start = 0;

  values.forEach((v,i)=>{

    let cat = activeCats[i];
    let slice = (v/total)*Math.PI*2;

    ctx.beginPath();
    ctx.moveTo(160,160);
    ctx.fillStyle = COLORS[cat];
    ctx.arc(160,160,130,start,start+slice);
    ctx.fill();

    start += slice;
  });
}


// =====================
// 📄 PDF CLEAN
// =====================

function downloadPDF(){

  const win = window.open("", "", "width=900,height=1200");

  const report = document.getElementById("report").cloneNode(true);

  report.querySelectorAll("button").forEach(b=>b.remove());
  report.querySelectorAll("canvas").forEach(c=>c.remove());

  win.document.write(`
    <html>
    <head>
      <style>
        body{font-family:Arial;background:#eee}
        .page{width:900px;margin:40px auto;background:white;padding:60px}
        h1{text-align:center}
      </style>
    </head>
    <body>
      <div class="page">
        <h1>OFFICIAL REPORT</h1>
        ${report.innerHTML}
      </div>
    </body>
    </html>
  `);

  win.document.close();
  win.print();
}


// =====================
// 🔧 UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
