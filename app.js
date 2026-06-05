// =========================
// 📦 DATABASE PRO (REALITY INDEX FINAL)
// =========================

const bank = {

Immigrazione: [
  {q:"Secondo ISTAT, la quota di residenti stranieri in Italia è circa:",a:["3–4%","8–9%","15–18%","25%+"],c:1},
  {q:"La percezione media degli italiani sugli immigrati tende a essere:",a:["Inferiore alla realtà","Corretta","Sovrastimata","Nulla"],c:2},
  {q:"La popolazione straniera è concentrata soprattutto:",a:["Nord Italia","Sud Italia","Uniforme","Solo grandi città estere"],c:0}
],

Criminalità: [
  {q:"Negli ultimi 15 anni i reati denunciati in Italia sono:",a:["In aumento","Stabili","In diminuzione","Raddoppiati"],c:2},
  {q:"La percezione della criminalità rispetto ai dati reali è:",a:["Inferiore","Allineata","Superiore","Inesistente"],c:2},
  {q:"Gli omicidi in Italia nel lungo periodo sono:",a:["In aumento","In calo","Raddoppiati","Immutati"],c:1}
],

Economia: [
  {q:"Il debito pubblico italiano rispetto al PIL è circa:",a:["60%","90%","130%","180%"],c:2},
  {q:"L’inflazione europea recente è stata:",a:["Stabile","Deflazione","Forte variabilità","Zero"],c:2},
  {q:"Il PIL italiano negli ultimi anni è:",a:["Crescita forte","Oscillante","Crollo","Zero crescita"],c:1}
],

Società: [
  {q:"La percezione del rischio sociale è generalmente:",a:["Inferiore","Allineata","Superiore","Non misurabile"],c:2},
  {q:"Le paure sociali sono spesso:",a:["Allineate ai dati","Amplificate","Inesistenti","Sempre corrette"],c:1},
  {q:"La fiducia nelle istituzioni è:",a:["Alta","Media-bassa","Massima UE","Perfetta"],c:1}
],

Lavoro: [
  {q:"Il tasso di occupazione Italia vs UE è:",a:["Più alto","Più basso","Uguale","Massimo"],c:1},
  {q:"I salari reali in Italia negli ultimi 20 anni sono:",a:["Cresciuti molto","Stagnanti","Raddoppiati","Inesistenti"],c:1},
  {q:"La precarietà lavorativa è percepita come:",a:["Inferiore","Allineata","Superiore","Assente"],c:2}
],

Istituzioni: [
  {q:"L’UE è:",a:["Stato federale","Unione di Stati","Nazione unica","Esercito unico"],c:1},
  {q:"La BCE controlla:",a:["Politica monetaria","Esercito","Scuole","Giustizia"],c:0},
  {q:"Il Parlamento Europeo ha funzione:",a:["Legislativa condivisa","Militare","Assoluta","Nulla"],c:0}
],

Sanità: [
  {q:"Il SSN è finanziato principalmente da:",a:["Tasse","Privati","Donazioni","UE"],c:0},
  {q:"Il sistema sanitario italiano è:",a:["Pubblico universale","Privato totale","USA insurance","Militare"],c:0},
  {q:"La percezione della sanità è:",a:["Inferiore","Allineata","Sovrastimata","Perfetta"],c:2}
],

Istruzione: [
  {q:"La scuola italiana è finanziata da:",a:["Stato","Privati","Banche","UE"],c:0},
  {q:"Il livello istruzione Italia vs UE è:",a:["Più alto","Più basso","Uguale","Massimo"],c:1},
  {q:"Il tasso di laureati è:",a:["Basso UE","Alto UE","Massimo","Zero"],c:0}
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
// 📊 REPORT PRO (FIX CATEGORIE VUOTE)
// =========================

function showReport(){

  let percent = Math.round(score/questions.length*100);

  let level =
    percent>=80?"Ottima consapevolezza civica":
    percent>=60?"Buona consapevolezza civica":
    percent>=40?"Media consapevolezza civica":
    "Bassa consapevolezza civica";

  // 🔥 SOLO CATEGORIE PRESENTI
  let activeCats = Object.keys(categoryScore).filter(c => categoryScore[c].total > 0);

  let grid = activeCats.map(cat=>{
    let c = categoryScore[cat];
    let p = Math.round((c.right/c.total)*100);
    return `<div class="catbox"><b>${cat}</b><br>${p}%</div>`;
  }).join("");

  document.getElementById("output").innerHTML = `
    <div class="card" id="report">

      <h2>Certificato di Consapevolezza Civica</h2>

      <div class="bigscore">${percent}%</div>
      <div class="level">${level}</div>

      <hr>

      <div class="grid">
        ${grid}
      </div>

      <canvas id="chart" width="300" height="300"></canvas>

      <button onclick="downloadPDF()">Scarica PDF</button>

    </div>
  `;

  drawChart(activeCats);
}


// =========================
// 📊 GRAFICO PRO (SOLO CATEGORIE ATTIVE)
// =========================

function drawChart(activeCats){

  const ctx = document.getElementById("chart").getContext("2d");

  let values = activeCats.map(c =>
    Math.round((categoryScore[c].right/categoryScore[c].total)*100)
  );

  let total = values.reduce((a,b)=>a+b,0);

  let start = 0;

  values.forEach((v,i)=>{

    let slice = (v/total)*Math.PI*2;

    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.fillStyle = `hsl(${i*50},45%,60%)`;
    ctx.arc(150,150,120,start,start+slice);
    ctx.fill();

    start += slice;
  });

}


// =========================
// PDF PRO
// =========================

function downloadPDF(){

  const report = document.getElementById("report");

  const w = window.open("", "", "width=1100,height=1300");

  w.document.write(`
    <html>
    <head>
      <style>

        body{font-family:Arial;background:#f3f3f3;margin:0}

        .page{
          width:850px;
          margin:40px auto;
          background:white;
          padding:60px;
          border-radius:12px;
        }

        h1{text-align:center}

        .score{
          font-size:50px;
          text-align:center;
          color:#758966;
        }

        .level{text-align:center;margin-bottom:20px}

      </style>
    </head>

    <body>

      <div class="page">

        <h1>Report Civico Ufficiale</h1>

        <div class="score">
          ${Math.round(score/questions.length*100)}%
        </div>

        <div class="level">
          ${document.querySelector("#report .level").innerText}
        </div>

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
