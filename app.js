// =======================
// 📦 DATABASE GRANDE
// =======================

const bank = {
  Economia: [
    {q:"Cos'è il PIL?",a:["Produzione totale","Tasse","Debito","Import"],c:0},
    {q:"Cos'è inflazione?",a:["Aumento prezzi","Calo salari","Export","Bonus"],c:0},
    {q:"Cos'è debito pubblico?",a:["Debito Stato","Risparmio","IVA","Borsa"],c:0},
    {q:"Chi emette euro?",a:["BCE","ONU","Stati","IMF"],c:0},
    {q:"Cos'è spesa pubblica?",a:["Spesa Stato","Profitto","Export","Privati"],c:0}
  ],

  UE: [
    {q:"Quanti paesi UE?",a:["27","10","50","100"],c:0},
    {q:"Chi fa leggi UE?",a:["Parlamento UE","NATO","ONU","BCE"],c:0},
    {q:"Cos'è Schengen?",a:["Libera circolazione","Moneta","Tassa","Confine"],c:0},
    {q:"Cos'è euro?",a:["Moneta UE","Banca","Partito","Tassa"],c:0},
    {q:"Dove sede UE?",a:["Bruxelles","Roma","Parigi","Madrid"],c:0}
  ],

  Sanità: [
    {q:"SSN è?",a:["Servizio pubblico","Privato","Militare","Banca"],c:0},
    {q:"Ticket sanitario è?",a:["Contributo","Bonus","Stipendio","UE"],c:0},
    {q:"Pronto soccorso è?",a:["Emergenze","Privato","Borsa","Scuola"],c:0},
    {q:"Vaccini sono?",a:["Prevenzione","Tassa","Debito","Lavoro"],c:0}
  ],

  Istruzione: [
    {q:"Università pubblica è finanziata da?",a:["Stato","Privati","UE","Banche"],c:0},
    {q:"Obbligo scolastico?",a:["16 anni","10 anni","20 anni","Libero"],c:0},
    {q:"Tasso laureati è?",a:["% laureati","Scuole","Banche","Lavoro"],c:0},
    {q:"Scuola primaria è?",a:["Base","Università","Privato","Lavoro"],c:0}
  ],

  Lavoro: [
    {q:"Disoccupazione è?",a:["Senza lavoro","Studenti","Imprese","Stato"],c:0},
    {q:"Contratto indeterminato?",a:["Senza scadenza","3 mesi","Stage","Tassa"],c:0},
    {q:"Stage è?",a:["Formazione","Lavoro fisso","Pensione","Debito"],c:0},
    {q:"Sindacato è?",a:["Tutela lavoratori","Banca","Stato","UE"],c:0}
  ],

  Immigrazione: [
    {q:"Richiedente asilo è?",a:["Protezione","Turista","Studente","Lavoro"],c:0},
    {q:"Migrazione economica?",a:["Lavoro","Guerra","Vacanza","Studio"],c:0},
    {q:"Permesso soggiorno è?",a:["Documento legale","Tassa","Borsa","Voto"],c:0}
  ],

  Istituzioni: [
    {q:"Presidente Repubblica?",a:["Capo Stato","Premier","Sindaco","Ministro"],c:0},
    {q:"Governo è?",a:["Esecutivo","Legislativo","Banca","UE"],c:0},
    {q:"Parlamento fa?",a:["Leggi","Banca","Scuola","Militare"],c:0}
  ]
};


// =======================
// VARIABILI
// =======================

const TOTAL = 20;

let questions = [];
let index = 0;
let score = 0;
let categoryScore = {};


// =======================
// START
// =======================

document.getElementById("startBtn").addEventListener("click", start);

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


// =======================
// DOMANDA
// =======================

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


// =======================
// RISPOSTA
// =======================

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


// =======================
// REPORT
// =======================

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

      <h2>Patente di Consapevolezza Civica</h2>

      <p>Punteggio: ${percent}%</p>
      <h3>${level}</h3>

      <hr>

      ${html}

      <button onclick="downloadPDF()">Scarica PDF</button>

    </div>
  `;
}


// =======================
// PDF
// =======================

function downloadPDF(){

  const report = document.getElementById("report").innerHTML;

  const w = window.open("", "", "width=900,height=1200");

  w.document.write(`
    <html>
    <head>
      <title>Report Civico</title>
      <style>
        body{font-family:Arial;padding:60px;}
        h2{text-align:center;}
        button{display:none !important;}
      </style>
    </head>
    <body>${report}</body>
    </html>
  `);

  w.document.close();
  w.print();
}


// =======================
// UTILS
// =======================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
