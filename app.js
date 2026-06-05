// =========================
// 🏛️ CIVIC PERCEPTION SYSTEM - ISTITUZIONALE
// =========================

const COLORS = {
  Immigrazione: "#2f3b2f",
  Criminalità: "#3e5c3e",
  Economia: "#4f6b4f",
  Società: "#5c7a5c",
  Lavoro: "#6b8a6b",
  Istituzioni: "#7a9a7a",
  Sanità: "#8aa68a",
  Istruzione: "#9ab79a"
};


// =========================
// 📦 DATABASE ISTITUZIONALE
// =========================

const bank = {

Immigrazione: [
  {q:"Secondo ISTAT la quota di residenti stranieri è circa:",a:["4–5%","8–9%","15–18%","25%+"],c:1,source:"ISTAT"},
  {q:"La percezione media del fenomeno immigrazione è:",a:["Inferiore alla realtà","Corretta","Sovrastimata","Non misurabile"],c:2,source:"CENSIS"},
  {q:"La distribuzione degli stranieri è principalmente:",a:["Nord Italia","Sud Italia","Uniforme","Solo grandi città"],c:0,source:"ISTAT"}
],

Criminalità: [
  {q:"Negli ultimi 15 anni i reati denunciati sono:",a:["In aumento","Stabili","In diminuzione","Raddoppiati"],c:2,source:"MINISTERO INTERNO"},
  {q:"La percezione della criminalità è:",a:["Inferiore","Allineata","Superiore","Non rilevabile"],c:2,source:"CENSIS"},
  {q:"Gli omicidi in Italia sono:",a:["In crescita","In calo","Raddoppiati","Stabili"],c:1,source:"ISTAT"}
],

Economia: [
  {q:"Il debito pubblico italiano è circa:",a:["90%","110%","130%","180%"],c:2,source:"EUROSTAT"},
  {q:"Il PIL italiano negli ultimi anni è:",a:["Forte crescita","Oscillante","Crollo","Zero"],c:1,source:"ISTAT"},
  {q:"L’inflazione recente è stata:",a:["Stabile","Deflazione","Variabile con picchi","Nulla"],c:2,source:"BCE"}
],

Società: [
  {q:"La percezione del rischio sociale è:",a:["Inferiore","Allineata","Superiore","Non misurabile"],c:2,source:"CENSIS"},
  {q:"Le paure sociali sono:",a:["Allineate","Amplificate","Inesistenti","Perfette"],c:1,source:"EUROBAROMETRO"},
  {q:"La fiducia istituzionale è:",a:["Alta","Media-bassa","Massima UE","Perfetta"],c:1,source:"CENSIS"}
],

Lavoro: [
  {q:"Il tasso occupazionale Italia vs UE è:",a:["Più alto","Più basso","Uguale","Massimo"],c:1,source:"EUROSTAT"},
  {q:"I salari reali sono:",a:["Cresciuti","Stagnanti","Raddoppiati","Inesistenti"],c:1,source:"OCSE"},
  {q:"La precarietà è:",a:["Inferiore","Allineata","Superiore","Assente"],c:2,source:"OCSE"}
],

Istituzioni: [
  {q:"L’UE è:",a:["Stato federale","Unione di Stati","Nazione unica","Esercito unico"],c:1,source:"UE"},
  {q:"La BCE controlla:",a:["Politica monetaria","Esercito","Scuole","Giustizia"],c:0,source:"BCE"},
  {q:"Il Parlamento Europeo è:",a:["Legislativo condiviso","Militare","Assoluto","Inutile"],c:0,source:"UE"}
],

Sanità: [
  {q:"Il SSN è finanziato da:",a:["Tasse","Privati","Donazioni","UE"],c:0,source:"MINISTERO SALUTE"},
  {q:"Il sistema sanitario è:",a:["Pubblico universale","Privato totale","USA style","Militare"],c:0,source:"MINISTERO SALUTE"},
  {q:"La percezione della sanità è:",a:["Inferiore","Allineata","Sovrastimata","Perfetta"],c:2,source:"CENSIS"}
],

Istruzione: [
  {q:"La scuola è finanziata da:",a:["Stato","Privati","Banche","UE"],c:0,source:"MINISTERO ISTRUZIONE"},
  {q:"Il livello istruzione Italia vs UE è:",a:["Più alto","Più basso","Uguale","Massimo"],c:1,source:"OCSE"},
  {q:"Il tasso laureati è:",a:["Basso UE","Alto UE","Massimo","Zero"],c:0,source:"EUROSTAT"}
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
// START
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
// QUESTION UI (ISTITUZIONALE CLEAN)
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
        <button class="btn">${x}</button>
      `).join("")}

    </div>
  `;

  document.querySelectorAll(".btn").forEach((b,i)=>{
    b.onclick = ()=>answer(i);
  });
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
// 🏛️ REPORT ISTITUZIONALE
// =========================

function showReport(){

  let percent = Math.round(score/questions.length*100);

  let level =
    percent>=80?"Ottima consapevolezza civica":
    percent>=60?"Buona consapevolezza civica":
    percent>=40?"Media consapevolezza civica":
    "Bassa consapevolezza civica";

  activeCats = Object.keys(categoryScore).filter(c => categoryScore[c].total > 0);

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

      <h2>RELAZIONE ISTITUZIONALE</h2>

      <div class="big">${percent}%</div>

      <div class="level">${level}</div>

      <div class="grid">${grid}</div>

      <canvas id="chart" width="320" height="320"></canvas>

      <button onclick="downloadPDF()">Esporta Documento Ufficiale</button>

    </div>
  `;

  drawChart();
}


// =========================
// 📊 GRAFICO ISTITUZIONALE
// =========================

function drawChart(){

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


// =========================
// 📄 PDF ISTITUZIONALE CLEAN
// =========================

function downloadPDF(){

  const w = window.open("", "", "width=1200,height=1400");

  w.document.write(`
    <html>
    <head>
      <style>

        body{font-family:Arial;background:#f4f4f4;margin:0}

        .page{
          width:900px;
          margin:40px auto;
          background:white;
          padding:70px;
        }

        h1{text-align:center}

        .big{
          font-size:60px;
          text-align:center;
          color:#4f6b4f;
        }

        .level{text-align:center}

      </style>
    </head>

    <body>

      <div class="page">

        <h1>RELAZIONE ISTITUZIONALE UFFICIALE</h1>

        <div class="big">${Math.round(score/questions.length*100)}%</div>

        <div class="level">
          ${document.querySelector("#report .level").innerText}
        </div>

        <hr>

        ${document.getElementById("report").innerHTML.replace(/Esporta Documento Ufficiale/g,"")}

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
