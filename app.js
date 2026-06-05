// ===============================
// 📦 DATABASE GRANDE STRUTTURATO
// ===============================

const bank = {
  Economia: [
    {q:"Cos'è il PIL?",a:["Produzione totale","Tasse","Debito","Import"],c:0},
    {q:"Cos'è inflazione?",a:["Aumento prezzi","Calo salari","Bonus","Export"],c:0},
    {q:"Cos'è debito pubblico?",a:["Debito Stato","Risparmio","IVA","Export"],c:0},
    {q:"Chi stampa euro?",a:["BCE","ONU","NATO","IMF"],c:0}
  ],

  UE: [
    {q:"Chi fa leggi UE?",a:["Parlamento UE","NATO","ONU","BCE"],c:0},
    {q:"Quanti paesi UE?",a:["27","10","50","100"],c:0},
    {q:"Cos'è Schengen?",a:["Libera circolazione","Tassa","Moneta","Partito"],c:0},
    {q:"Euro è gestito da?",a:["BCE","ONU","Stati","IMF"],c:0}
  ],

  Sanità: [
    {q:"SSN è?",a:["Pubblico","Privato","Militare","Assicurazione"],c:0},
    {q:"Ticket sanitario è?",a:["Contributo","Bonus","Stipendio","UE"],c:0},
    {q:"Medico base è?",a:["Servizio pubblico","Privato","Militare","Banca"],c:0}
  ],

  Istruzione: [
    {q:"Università pubblica è finanziata da?",a:["Stato","Privati","UE","Banche"],c:0},
    {q:"Obbligo scolastico fino a?",a:["16 anni","10 anni","18 anni","Università"],c:0},
    {q:"Tasso laureati indica?",a:["% laureati","Scuole","Professori","Classi"],c:0}
  ],

  Lavoro: [
    {q:"Disoccupazione giovanile?",a:["Senza lavoro","Studenti","Pensionati","Imprese"],c:0},
    {q:"Contratto indeterminato?",a:["Senza scadenza","Stage","3 mesi","Autonomo"],c:0},
    {q:"Stage è?",a:["Formazione","Lavoro fisso","Pensione","Tassa"],c:0}
  ],

  Immigrazione: [
    {q:"Richiedente asilo è?",a:["Protezione","Turista","Studente","Lavoro"],c:0},
    {q:"Migrazione economica?",a:["Lavoro","Guerra","Vacanza","Studio"],c:0}
  ],

  Istituzioni: [
    {q:"Presidente Repubblica?",a:["Capo Stato","Premier","Sindaco","Ministro"],c:0},
    {q:"Governo è?",a:["Esecutivo","Legislativo","Giudiziario","UE"],c:0}
  ]
};


// ===============================
// 🎯 CONFIG TEST
// ===============================

const TOTAL_QUESTIONS = 20;
const MIN_CAT = 4;
const MAX_CAT = 7;


// ===============================
// VARIABILI
// ===============================

let questions = [];
let index = 0;
let score = 0;
let categoryScore = {};


// ===============================
// START
// ===============================

document.getElementById("startBtn").addEventListener("click", start);

function start(){

  index = 0;
  score = 0;
  categoryScore = {};
  questions = [];

  // 1️⃣ prendi categorie random
  let categories = Object.keys(bank);
  categories = shuffle(categories);

  // numero categorie random (4–7)
  const selectedCats = categories.slice(0, rand(MIN_CAT, MAX_CAT));

  // 2️⃣ distribuzione 20 domande
  let remaining = TOTAL_QUESTIONS;

  selectedCats.forEach((cat, i)=>{

    let count;

    if(i === selectedCats.length - 1){
      count = remaining;
    } else {
      count = Math.max(2, Math.floor(Math.random() * 5));
      if(count > remaining - (selectedCats.length - i - 1)*2){
        count = 2;
      }
    }

    remaining -= count;

    let pool = shuffle(bank[cat]).slice(0, count);

    pool.forEach(q=>{
      questions.push({...q, cat});
    });
  });

  // init score
  selectedCats.forEach(c=>{
    categoryScore[c] = {right:0,total:0};
  });

  showQuestion();
}


// ===============================
// SHOW QUESTION
// ===============================

function showQuestion(){

  const q = questions[index];

  document.getElementById("output").innerHTML = `
    <div class="question-card">

      <div class="progress">
        ${index+1} / ${questions.length}
      </div>

      <h3>${q.cat}</h3>
      <p>${q.q}</p>

      ${q.a.map((x,i)=>`
        <button class="answer-btn" onclick="answer(${i})">${x}</button>
      `).join("")}

    </div>
  `;
}


// ===============================
// ANSWER
// ===============================

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


// ===============================
// REPORT
// ===============================

function showReport(){

  const percent = Math.round(score/questions.length*100);

  let level =
    percent>=80?"Ottima consapevolezza civica":
    percent>=60?"Buona consapevolezza civica":
    percent>=40?"Media consapevolezza civica":
    "Bassa consapevolezza civica";

  let catHTML = "";

  Object.keys(categoryScore).forEach(cat=>{
    const c = categoryScore[cat];
    const p = Math.round((c.right/c.total)*100);
    catHTML += `<p><b>${cat}</b>: ${p}%</p>`;
  });

  document.getElementById("output").innerHTML = `
    <div class="question-card" id="report">

      <h2>Patente di Consapevolezza Civica</h2>

      <p><b>Punteggio:</b> ${percent}%</p>
      <h3>${level}</h3>

      <hr>

      ${catHTML}

      <button onclick="downloadPDF()">Scarica PDF</button>

    </div>
  `;
}


// ===============================
// PDF
// ===============================

function downloadPDF(){

  const report = document.getElementById("report").innerHTML;

  const win = window.open("", "", "width=900,height=1200");

  win.document.write(`
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

  win.document.close();
  win.print();
}


// ===============================
// UTILS
// ===============================

function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}

function rand(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}
