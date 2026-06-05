// =========================
// 📦 DATABASE (PROFESSIONAL INDEX)
// =========================

const bank = {

Immigrazione: [
  {q:"Secondo ISTAT, la quota di residenti stranieri in Italia è circa:",a:["4–5%","8–9%","15–18%","25%+"],c:1,source:"ISTAT"},
  {q:"La percezione media degli italiani sugli immigrati tende a essere:",a:["Sottostimata","Corretta","Sovrastimata","Nulla"],c:2,source:"CENSIS"},
  {q:"La distribuzione della popolazione straniera è prevalentemente:",a:["Nord Italia","Sud Italia","Uniforme","Solo isole"],c:0,source:"ISTAT"}
],

Criminalità: [
  {q:"Negli ultimi 15 anni i reati denunciati in Italia sono:",a:["In aumento","Stabili","In diminuzione","Raddoppiati"],c:2,source:"MINISTERO INTERNO"},
  {q:"La percezione della criminalità rispetto ai dati reali è:",a:["Inferiore","Allineata","Superiore","Inesistente"],c:2,source:"CENSIS"},
  {q:"Gli omicidi in Italia nel lungo periodo sono:",a:["In aumento","In calo","Raddoppiati","Immutati"],c:1,source:"ISTAT"}
],

Economia: [
  {q:"Il debito pubblico italiano rispetto al PIL è circa:",a:["60%","90%","130%","180%"],c:2,source:"EUROSTAT"},
  {q:"L’inflazione europea recente è stata:",a:["Stabile","Deflazione","Forte variabilità","Zero"],c:2,source:"BCE"},
  {q:"Il PIL italiano negli ultimi anni è:",a:["Crescita forte","Oscillante","Crollo","Zero crescita"],c:1,source:"ISTAT"}
],

Società: [
  {q:"La percezione del rischio sociale rispetto ai dati reali è:",a:["Inferiore","Allineata","Superiore","Non misurabile"],c:2,source:"CENSIS"},
  {q:"Le paure sociali sono spesso:",a:["Allineate ai dati","Amplificate","Inesistenti","Sempre corrette"],c:1,source:"EUROBAROMETRO"},
  {q:"La fiducia nelle istituzioni è generalmente:",a:["Alta","Media-bassa","Massima UE","Perfetta"],c:1,source:"CENSIS"}
],

Lavoro: [
  {q:"Il tasso di occupazione Italia vs UE è:",a:["Più alto","Più basso","Uguale","Massimo"],c:1,source:"EUROSTAT"},
  {q:"I salari reali negli ultimi 20 anni sono:",a:["Cresciuti","Stagnanti","Raddoppiati","Inesistenti"],c:1,source:"OCSE"},
  {q:"La precarietà lavorativa è percepita come:",a:["Inferiore","Allineata","Superiore","Assente"],c:2,source:"OCSE"}
],

Istituzioni: [
  {q:"L’UE è:",a:["Stato federale","Unione di Stati","Nazione unica","Esercito unico"],c:1,source:"UE"},
  {q:"La BCE controlla:",a:["Politica monetaria","Esercito","Scuole","Giustizia"],c:0,source:"BCE"},
  {q:"Il Parlamento Europeo ha funzione:",a:["Legislativa condivisa","Militare","Assoluta","Nulla"],c:0,source:"UE"}
],

Sanità: [
  {q:"Il SSN è finanziato principalmente da:",a:["Tasse","Privati","Donazioni","UE"],c:0,source:"MINISTERO SALUTE"},
  {q:"Il sistema sanitario italiano è:",a:["Pubblico universale","Privato totale","USA insurance","Militare"],c:0,source:"MINISTERO SALUTE"},
  {q:"La percezione della sanità rispetto ai dati reali è:",a:["Inferiore","Allineata","Sovrastimata","Perfetta"],c:2,source:"CENSIS"}
],

Istruzione: [
  {q:"La scuola italiana è finanziata da:",a:["Stato","Privati","Banche","UE"],c:0,source:"MINISTERO ISTRUZIONE"},
  {q:"Il livello istruzione Italia vs UE è:",a:["Più alto","Più basso","Uguale","Massimo"],c:1,source:"OCSE"},
  {q:"Il tasso di laureati è:",a:["Basso UE","Alto UE","Massimo","Zero"],c:0,source:"EUROSTAT"}
]

};


// =========================
// VARIABILI GLOBALI
// =========================

const TOTAL = 20;

let questions = [];
let index = 0;
let score = 0;
let categoryScore = {};
let activeCats = [];

document.getElementById("startBtn").addEventListener("click", start);


// =========================
// START ENGINE
// =========================

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
      categoryScore[q.cat] = {right:0,total:0,source:q.source};
    }
  });

  showQuestion();
}


// =========================
// QUESTION VIEW
// =========================

function showQuestion(){

  const q = questions[index];

  document.getElementById("output").innerHTML = `
    <div class="card">

      <div class="progress">${index+1} / ${questions.length}</div>

      <div class="category">${q.cat}</div>

      <div class="question">${q.q}</div>

      ${q.a.map((x,i)=>`
        <button class="btn" onclick="answer(${i})">${x}</button>
      `).join("")}

    </div>
  `;
}


// =========================
// ANSWER ENGINE
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
// 📊 DASHBOARD PRO (FILTERED)
// =========================

function showReport(){

  let percent = Math.round(score/questions.length*100);

  let level =
    percent>=80?"Ottima consapevolezza civica":
    percent>=60?"Buona consapevolezza civica":
    percent>=40?"Media consapevolezza civica":
    "Bassa consapevolezza civica";

  // 🔥 SOLO CATEGORIE ATTIVE
  activeCats = Object.keys(categoryScore).filter(c => categoryScore[c].total > 0);

  const grid = activeCats.map(c=>{
    let p = Math.round((categoryScore[c].right/categoryScore[c].total)*100);
    return `
      <div class="card-mini">
        <div class="cat">${c}</div>
        <div class="val">${p}%</div>
        <div class="src">${categoryScore[c].source}</div>
      </div>
    `;
  }).join("");

  document.getElementById("output").innerHTML = `
    <div class="card" id="report">

      <h2>📊 Civic Perception Index</h2>

      <div class="big">${percent}%</div>

      <div class="level">${level}</div>

      <div class="grid">${grid}</div>

      <canvas id="chart" width="320" height="320"></canvas>

      <button onclick="downloadPDF()">Scarica Report Ufficiale</button>

    </div>
  `;

  drawChart();
}


// =========================
// 📊 CHART (REAL DASHBOARD STYLE)
// =========================

function drawChart(){

  const ctx = document.getElementById("chart").getContext("2d");

  let values = activeCats.map(c =>
    Math.round((categoryScore[c].right/categoryScore[c].total)*100)
  );

  let total = values.reduce((a,b)=>a+b,0);
  let start = 0;

  values.forEach((v,i)=>{

    let slice = (v/total)*Math.PI*2;

    ctx.beginPath();
    ctx.moveTo(160,160);
    ctx.fillStyle = `hsl(${i*55},50%,60%)`;
    ctx.arc(160,160,130,start,start+slice);
    ctx.fill();

    start += slice;
  });
}


// =========================
// 📄 PDF MINISTERIALE STYLE
// =========================

function downloadPDF(){

  const w = window.open("", "", "width=1200,height=1400");

  w.document.write(`
    <html>
    <head>
      <style>

        body{font-family:Arial;background:#eee;margin:0}

        .page{
          width:900px;
          margin:40px auto;
          background:white;
          padding:70px;
          border-radius:12px;
        }

        h1{text-align:center}

        .score{
          font-size:60px;
          text-align:center;
          color:#758966;
        }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
        }

        .box{
          padding:10px;
          border:1px solid #ddd;
        }

      </style>
    </head>

    <body>

      <div class="page">

        <h1>Civic Perception Index - Official Report</h1>

        <div class="score">${Math.round(score/questions.length*100)}%</div>

        <hr>

        ${document.getElementById("report").innerHTML}

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
