// =========================
// 📦 DATABASE (REALITY INDEX 2.0)
// =========================

const bank = {

Immigrazione: [
  {q:"Secondo ISTAT, la quota di residenti stranieri in Italia è circa:",a:["3–4%","8–9%","15–18%","25%+"],c:1},
  {q:"La percezione media degli italiani sugli immigrati tende a essere:",a:["Sottostimata","Corretta","Sovrastimata","Nulla"],c:2},
  {q:"La popolazione straniera in Italia è concentrata principalmente:",a:["Nord Italia","Sud Italia","Uniformemente","Solo grandi isole"],c:0}
],

Criminalità: [
  {q:"Negli ultimi 15 anni i reati denunciati in Italia sono:",a:["In forte aumento","Stabili","In diminuzione","Raddoppiati"],c:2},
  {q:"La percezione della criminalità rispetto ai dati reali è:",a:["Inferiore","Allineata","Superiore","Inesistente"],c:2},
  {q:"Gli omicidi in Italia nel lungo periodo sono:",a:["In aumento","In calo","Raddoppiati","Immutati"],c:1}
],

Economia: [
  {q:"Il debito pubblico italiano rispetto al PIL è circa:",a:["60%","90%","130%","180%"],c:2},
  {q:"Il PIL italiano negli ultimi anni è:",a:["Crescita costante","Oscillante ma stabile","Crollo totale","Zero crescita"],c:1},
  {q:"L’inflazione europea recente è stata:",a:["Stabile","Deflazione","Forte variabilità","Nulla"],c:2}
],

Società: [
  {q:"La percezione del rischio sociale rispetto ai dati reali è:",a:["Inferiore","Allineata","Superiore","Non misurabile"],c:2},
  {q:"La fiducia nelle istituzioni in Italia è:",a:["Alta","Media-bassa","Massima UE","Perfetta"],c:1},
  {q:"Le paure sociali sono spesso:",a:["Allineate ai dati","Amplificate","Inesistenti","Sempre corrette"],c:1}
],

Lavoro: [
  {q:"Il tasso di occupazione italiano rispetto UE è:",a:["Più alto","Più basso","Uguale","Massimo"],c:1},
  {q:"I salari reali in Italia negli ultimi 20 anni sono:",a:["Cresciuti molto","Stagnanti","Raddoppiati","Inesistenti"],c:1},
  {q:"La precarietà lavorativa è percepita come:",a:["Inferiore","Allineata","Superiore","Assente"],c:2}
],

Istituzioni: [
  {q:"L’UE è:",a:["Stato federale","Unione di Stati","Nazione unica","Organizzazione militare"],c:1},
  {q:"La BCE controlla:",a:["Politica monetaria","Esercito","Scuole","Giustizia"],c:0},
  {q:"Il Parlamento Europeo ha funzione:",a:["Legislativa condivisa","Militare","Assoluta","Nulla"],c:0}
],

Sanità: [
  {q:"Il SSN è finanziato principalmente da:",a:["Tasse","Privati","Donazioni","UE esclusiva"],c:0},
  {q:"Il sistema sanitario italiano è:",a:["Pubblico universale","Privato totale","Assicurazioni USA","Militare"],c:0},
  {q:"La percezione della sanità rispetto ai dati reali è:",a:["Inferiore","Allineata","Sovrastimata","Perfetta"],c:2}
],

Istruzione: [
  {q:"La scuola italiana è finanziata da:",a:["Stato","Privati","Banche","UE"],c:0},
  {q:"Il livello istruzione Italia rispetto UE è:",a:["Più alto","Più basso","Uguale","Massimo"],c:1},
  {q:"Il tasso di laureati in Italia è:",a:["Basso UE","Alto UE","Massimo","Inesistente"],c:0}
]

};


// =========================
// VARIABILI
// =========================

const TOTAL = 20;

let questions = [];
let index = 0;
let score = 0;
let categoryScore = {};

document.getElementById("startBtn").addEventListener("click", start);


// =========================
// START
// =========================

function start(){

  index = 0;
  score = 0;
  categoryScore = {};
  questions = [];

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


// =========================
// DOMANDA
// =========================

function showQuestion(){

  const q = questions[index];

  document.getElementById("output").innerHTML = `
    <div class="card">

      <div class="progress">
        ${index+1} / ${questions.length}
      </div>

      <div class="category">${q.cat}</div>

      <div class="question">${q.q}</div>

      ${q.a.map((x,i)=>`
        <button class="btn" onclick="answer(${i})">${x}</button>
      `).join("")}

    </div>
  `;
}


// =========================
// RISPOSTA
// =========================

function answer(i){

  const q = questions[index];

  categoryScore[q.cat].total++;

  if(i === q.c){
    score++;
    categoryScore[q.cat].right++;
  }

  index++;

  if(index < questions.length){
    showQuestion();
  } else {
    showReport();
  }
}


// =========================
// REPORT + GRAFICO
// =========================

function showReport(){

  let percent = Math.round(score/questions.length*100);

  let level =
    percent>=80?"Ottima consapevolezza civica":
    percent>=60?"Buona consapevolezza civica":
    percent>=40?"Media consapevolezza civica":
    "Bassa consapevolezza civica";

  let labels = Object.keys(categoryScore);
  let values = labels.map(c => Math.round((categoryScore[c].right/categoryScore[c].total)*100));

  document.getElementById("output").innerHTML = `
    <div class="card" id="report">

      <h2>Certificato di Consapevolezza Civica</h2>

      <div class="bigscore">${percent}%</div>
      <div class="level">${level}</div>

      <hr>

      <div class="grid">
        ${labels.map(c=>{
          let p = Math.round((categoryScore[c].right/categoryScore[c].total)*100);
          return `<div>${c}: ${p}%</div>`;
        }).join("")}
      </div>

      <canvas id="chart" width="300" height="300"></canvas>

      <button onclick="downloadPDF()">Scarica PDF</button>

    </div>
  `;

  drawChart(labels, values);
}


// =========================
// 📊 GRAFICO A TORTA
// =========================

function drawChart(labels, values){

  const ctx = document.getElementById("chart").getContext("2d");

  const total = values.reduce((a,b)=>a+b,0);

  let start = 0;

  values.forEach((v,i)=>{

    const slice = (v/total)*Math.PI*2;

    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.fillStyle = `hsl(${i*45},40%,60%)`;
    ctx.arc(150,150,120,start,start+slice);
    ctx.fill();

    start += slice;
  });

}


// =========================
// PDF UFFICIALE
// =========================

function downloadPDF(){

  const report = document.getElementById("report");

  const w = window.open("", "", "width=1100,height=1300");

  w.document.write(`
    <html>
    <head>
      <title>Report Civico Ufficiale</title>

      <style>

        body{
          font-family: Arial;
          background:#f3f3f3;
          margin:0;
        }

        .page{
          width:850px;
          margin:40px auto;
          background:white;
          padding:60px;
          border-radius:14px;
          box-shadow:0 10px 30px rgba(0,0,0,0.2);
        }

        h1{
          text-align:center;
          color:#2f3b2f;
        }

        .big{
          font-size:48px;
          text-align:center;
          color:#758966;
        }

        .level{
          text-align:center;
          margin-bottom:20px;
        }

      </style>

    </head>

    <body>

      <div class="page">

        <h1>Certificato di Consapevolezza Civica</h1>

        <div class="big">${Math.round(score/questions.length*100)}%</div>

        <div class="level">${document.querySelector("#report .level").innerText}</div>

        <hr>

        ${report.innerHTML}

      </div>

    </body>
    </html>
  `);

  w.document.close();
  w.print();
}


// =========================
// UTILS
// =========================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
