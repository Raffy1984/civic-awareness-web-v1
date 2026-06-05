// =========================
// 📦 DATABASE PROFESSIONALE (REALITY CHECK)
// =========================

const bank = {

Immigrazione: [
  {q:"Secondo ISTAT, la percentuale di residenti stranieri in Italia è più vicina a:",a:["4–5%","8–9%","12–13%","20–25%"],c:1},
  {q:"La percezione media del numero di immigrati in Italia tende a essere:",a:["Inferiore alla realtà","Corretta","Fortemente sovrastimata","Nulla"],c:2},
  {q:"La maggior parte della popolazione straniera in Italia è concentrata:",a:["Nord Italia","Sud Italia","Distribuzione uniforme","Solo isole"],c:0}
],

Criminalità: [
  {q:"Negli ultimi 10–15 anni i reati denunciati in Italia sono:",a:["In forte aumento","Stabili","In diminuzione nel lungo periodo","Raddoppiati"],c:2},
  {q:"La percezione della criminalità rispetto ai dati reali è:",a:["Inferiore","Allineata","Superiore","Inesistente"],c:2},
  {q:"Gli omicidi in Italia negli ultimi decenni sono:",a:["In aumento","In calo","Raddoppiati","Immutati"],c:1}
],

Economia: [
  {q:"Il debito pubblico italiano rispetto al PIL è circa:",a:["60–70%","90–100%","130–140%","180–200%"],c:2},
  {q:"L’inflazione europea post-pandemia è stata:",a:["Stabile","Deflazione costante","Forte variabilità e picchi","Zero"],c:2},
  {q:"Il PIL italiano negli ultimi anni è:",a:["Crescita forte","Stabile con oscillazioni","Crollo costante","Inesistente"],c:1}
],

Società: [
  {q:"La percezione del rischio sociale in Europa rispetto ai dati reali è:",a:["Inferiore","Allineata","Superiore","Assente"],c:2},
  {q:"Secondo studi europei, la percezione della criminalità è:",a:["Sottostimata","Allineata","Sovrastimata","Corretta sempre"],c:2},
  {q:"La fiducia nelle istituzioni in Italia è generalmente:",a:["Alta","Media-bassa","Massima UE","Perfetta"],c:1}
],

Lavoro: [
  {q:"Il tasso di occupazione in Italia rispetto UE è:",a:["Più alto","Più basso","Uguale","Massimo UE"],c:1},
  {q:"I salari reali negli ultimi 20 anni in Italia sono:",a:["In forte crescita","Stagnanti o debolmente cresciuti","Raddoppiati","Inesistenti"],c:1},
  {q:"La precarietà lavorativa è percepita come:",a:["Inferiore","Allineata","Superiore alla realtà","Assente"],c:2}
],

Istituzioni: [
  {q:"Il Parlamento Europeo ha funzione:",a:["Legislativa condivisa","Militare","Assoluta","Nulla"],c:0},
  {q:"L’UE è:",a:["Stato federale completo","Unione di Stati sovrani","Una nazione unica","Un esercito unico"],c:1},
  {q:"La BCE controlla:",a:["Politica monetaria euro","Governi locali","Esercito UE","Scuole"],c:0}
],

Sanità: [
  {q:"Il SSN è finanziato principalmente da:",a:["Tasse","Privati esclusivi","Donazioni","UE totale"],c:0},
  {q:"Il sistema sanitario italiano è:",a:["Pubblico universale","Privato totale","Solo assicurazioni","Militare"],c:0},
  {q:"La percezione della qualità sanitaria rispetto ai dati reali è:",a:["Inferiore","Allineata","Sovrastimata o distorta","Perfetta"],c:2}
],

Istruzione: [
  {q:"La scuola pubblica italiana è finanziata da:",a:["Stato","Privati","Banche","UE esclusiva"],c:0},
  {q:"Il livello istruzione Italia rispetto UE è:",a:["Più alto","Più basso","Uguale","Massimo"],c:1},
  {q:"Il tasso di laureati in Italia è:",a:["Tra i più bassi UE","Tra i più alti","Massimo mondiale","Inesistente"],c:0}
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

  all = shuffle(all);
  questions = all.slice(0, TOTAL);

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
    <div class="question-card">

      <div class="progress">
        Domanda ${index+1} / ${questions.length}
      </div>

      <h3>${q.cat}</h3>
      <p>${q.q}</p>

      ${q.a.map((x,i)=>`
        <button class="answer-btn" onclick="answer(${i})">${x}</button>
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
// REPORT
// =========================

function showReport(){

  let percent = Math.round(score/questions.length*100);

  let level =
    percent>=80?"Ottima consapevolezza civica":
    percent>=60?"Buona consapevolezza civica":
    percent>=40?"Media consapevolezza civica":
    "Bassa consapevolezza civica";

  let html = "";

  Object.keys(categoryScore).forEach(cat=>{
    let c = categoryScore[cat];
    let p = Math.round((c.right/c.total)*100);
    html += `<p><b>${cat}</b>: ${p}%</p>`;
  });

  document.getElementById("output").innerHTML = `
    <div class="question-card" id="report">

      <h2>Certificato di Consapevolezza Civica</h2>

      <p>Punteggio: ${percent}%</p>
      <h3>${level}</h3>

      <hr>

      ${html}

      <button onclick="downloadPDF()">Scarica PDF</button>

    </div>
  `;
}


// =========================
// PDF MIGLIORATO
// =========================

function downloadPDF(){

  const report = document.getElementById("report");

  const w = window.open("", "", "width=1000,height=1300");

  w.document.write(`
    <html>
    <head>
      <title>Report Civico</title>

      <style>

        body{
          font-family: Arial;
          background:#f4f4f4;
          margin:0;
          padding:0;
        }

        .page{
          width:800px;
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

        .box{
          text-align:center;
          border:2px solid #9eb888;
          padding:25px;
          margin:25px 0;
          border-radius:12px;
        }

        .score{
          font-size:40px;
          font-weight:bold;
          color:#758966;
        }

        .level{
          font-size:18px;
          margin-top:10px;
        }

        .footer{
          text-align:center;
          font-size:12px;
          color:#888;
          margin-top:30px;
        }

      </style>

    </head>

    <body>

      <div class="page">

        <h1>Certificato di Consapevolezza Civica</h1>

        <div class="box">
          <div class="score">${Math.round(score/questions.length*100)}%</div>
          <div class="level">${document.querySelector("#report h3").innerText}</div>
        </div>

        <div>
          ${report.innerHTML}
        </div>

        <div class="footer">
          Documento generato automaticamente dal sistema civico
        </div>

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
