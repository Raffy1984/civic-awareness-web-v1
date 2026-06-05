// ===============================
// 🏛️ GOVERNMENT DASHBOARD SYSTEM v3
// ===============================


// ===============================
// 🎨 PALETTE ISTITUZIONALE
// ===============================

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


// ===============================
// 📦 DATABASE
// ===============================

const bank = {

Immigrazione: [
  {q:"Quota stranieri in Italia (ISTAT):",a:["4–5%","8–9%","15–18%","25%+"],c:1,source:"ISTAT"},
  {q:"Percezione immigrazione è:",a:["Inferiore","Corretta","Sovrastimata","Nulla"],c:2,source:"CENSIS"},
  {q:"Distribuzione immigrati:",a:["Nord","Sud","Uniforme","Solo città estere"],c:0,source:"ISTAT"}
],

Criminalità: [
  {q:"Reati ultimi 15 anni:",a:["Aumento","Stabili","Diminuzione","Raddoppio"],c:2,source:"MININTERNO"},
  {q:"Percezione criminalità:",a:["Inferiore","Allineata","Superiore","Nulla"],c:2,source:"CENSIS"},
  {q:"Omicidi:",a:["Crescono","Calano","Raddoppiano","Stabili"],c:1,source:"ISTAT"}
],

Economia: [
  {q:"Debito/PIL:",a:["90%","110%","130%","180%"],c:2,source:"EUROSTAT"},
  {q:"PIL:",a:["Crescita","Oscillante","Crollo","Zero"],c:1,source:"ISTAT"},
  {q:"Inflazione:",a:["Stabile","Deflazione","Variabile","Nulla"],c:2,source:"BCE"}
],

Società: [
  {q:"Rischio sociale percepito:",a:["Inferiore","Allineato","Superiore","Nulla"],c:2,source:"CENSIS"},
  {q:"Paure sociali:",a:["Allineate","Amplificate","Inesistenti","Perfette"],c:1,source:"EUROBAROMETRO"},
  {q:"Fiducia istituzioni:",a:["Alta","Media-bassa","Alta UE","Perfetta"],c:1,source:"CENSIS"}
],

Lavoro: [
  {q:"Occupazione UE vs Italia:",a:["Più alta","Più bassa","Uguale","Massima"],c:1,source:"EUROSTAT"},
  {q:"Salari:",a:["Crescita","Stagnanti","Raddoppio","Nulli"],c:1,source:"OCSE"},
  {q:"Precarietà:",a:["Inferiore","Allineata","Superiore","Assente"],c:2,source:"OCSE"}
],

Istituzioni: [
  {q:"UE è:",a:["Stato","Unione Stati","Nazione","Esercito"],c:1,source:"UE"},
  {q:"BCE:",a:["Monetaria","Militare","Scuola","Giustizia"],c:0,source:"BCE"},
  {q:"Parlamento UE:",a:["Legislativo","Militare","Assoluto","Nullo"],c:0,source:"UE"}
],

Sanità: [
  {q:"SSN:",a:["Tasse","Privato","Donazioni","UE"],c:0,source:"MINSALUTE"},
  {q:"Sistema sanitario:",a:["Pubblico","Privato","USA","Militare"],c:0,source:"MINSALUTE"},
  {q:"Percezione sanità:",a:["Inferiore","Allineata","Sovrastimata","Perfetta"],c:2,source:"CENSIS"}
],

Istruzione: [
  {q:"Scuola finanziata da:",a:["Stato","Privati","Banche","UE"],c:0,source:"MIUR"},
  {q:"Livello istruzione:",a:["Più alto","Più basso","Uguale","Massimo"],c:1,source:"OCSE"},
  {q:"Laureati:",a:["Bassi","Alti","Massimi","Zero"],c:0,source:"EUROSTAT"}
]

};


// ===============================
// 📊 STATE SYSTEM
// ===============================

const TOTAL = 20;

let questions = [];
let index = 0;
let score = 0;
let categoryScore = {};
let userName = "";
let archive = JSON.parse(localStorage.getItem("archive") || "[]");


// ===============================
// 🚀 START DASHBOARD
// ===============================

function start(){

  userName = document.getElementById("username")?.value || "Anonimo";

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
      categoryScore[q.cat] = {right:0,total:0,source:q.source};
    }
  });

  showQuestion();
}


// ===============================
// ❓ QUESTION UI CLEAN
// ===============================

function showQuestion(){

  const q = questions[index];

  document.getElementById("output").innerHTML = `
    <div class="card">

      <div class="progress">${index+1} / ${questions.length}</div>

      <div class="category">${q.cat}</div>

      <div class="question">${q.q}</div>

      ${q.a.map((x,i)=>`
        <button class="btn">${x}</button>
      `).join("")}

    </div>
  `;

  document.querySelectorAll(".btn").forEach((b,i)=>{
    b.onclick = ()=>answer(i);
  });
}


// ===============================
// ✅ ANSWER ENGINE
// ===============================

function answer(i){

  const q = questions[index];

  categoryScore[q.cat].total++;

  if(i === q.c){
    score++;
    categoryScore[q.cat].right++;
  }

  index++;

  index < questions.length ? showQuestion() : showReport();
}


// ===============================
// 📊 DASHBOARD REPORT
// ===============================

function showReport(){

  let percent = Math.round(score/questions.length*100);

  let level =
    percent>=80?"Ottima consapevolezza civica":
    percent>=60?"Buona consapevolezza civica":
    percent>=40?"Media consapevolezza civica":
    "Bassa consapevolezza civica";

  let activeCats = Object.keys(categoryScore).filter(c=>categoryScore[c].total>0);

  let grid = activeCats.map(c=>{
    let p = Math.round((categoryScore[c].right/categoryScore[c].total)*100);
    return `
      <div class="box" style="border-left:6px solid ${COLORS[c]}">
        <b>${c}</b><br>
        ${p}%<br>
        <small>${categoryScore[c].source}</small>
      </div>
    `;
  }).join("");

  document.getElementById("output").innerHTML = `
    <div class="card" id="report">

      <h2>🏛️ GOVERNMENT DASHBOARD REPORT</h2>

      <div class="big">${percent}%</div>

      <div class="level">${level}</div>

      <div class="grid">${grid}</div>

      <canvas id="chart" width="320" height="320"></canvas>

      <button onclick="downloadPDF()">Export PDF</button>

      <button onclick="saveArchive()">Salva nel registro</button>

      <button onclick="openArchive()">Archivio report</button>

    </div>
  `;

  drawChart(activeCats);
}


// ===============================
// 📊 PIE CHART (LEGEND READY)
// ===============================

function drawChart(activeCats){

  const ctx = document.getElementById("chart").getContext("2d");

  let values = activeCats.map(c =>
    Math.round((categoryScore[c].right/categoryScore[c].total)*100)
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


// ===============================
// 📄 PDF CLEAN EXPORT
// ===============================

function downloadPDF(){

  const w = window.open("", "", "width=1200,height=1400");

  let clean = document.getElementById("report").cloneNode(true);
  clean.querySelectorAll("button").forEach(b=>b.remove());

  w.document.write(`
    <html><head><style>
    body{font-family:Arial;background:#eee}
    .page{width:900px;margin:40px auto;background:white;padding:60px}
    h1{text-align:center}
    .big{font-size:55px;text-align:center}
    </style></head>
    <body>
      <div class="page">
        <h1>OFFICIAL GOVERNMENT REPORT</h1>
        ${clean.innerHTML}
      </div>
    </body></html>
  `);

  w.document.close();
  w.print();
}


// ===============================
// 🗂️ ARCHIVE SYSTEM
// ===============================

function saveArchive(){

  let entry = {
    name: userName,
    score: Math.round(score/questions.length*100),
    date: new Date().toISOString()
  };

  archive.push(entry);
  localStorage.setItem("archive", JSON.stringify(archive));

  alert("Salvato nel registro ufficiale");
}

function openArchive(){

  let html = archive.map(a=>{
    return `<div class="box">
      <b>${a.name}</b> - ${a.score}%<br>
      <small>${a.date}</small>
    </div>`;
  }).join("");

  document.getElementById("output").innerHTML = `
    <div class="card">
      <h2>📁 ARCHIVIO REPORT</h2>
      ${html}
      <button onclick="location.reload()">Torna indietro</button>
    </div>
  `;
}


// ===============================
// 🔧 UTILS
// ===============================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
