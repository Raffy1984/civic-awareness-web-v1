// ======================
// 100 DOMANDE DATABASE
// ======================

const allQuestions = [
  {cat:"Economia",q:"Cos'è il debito pubblico?",a:["Debito Stato","Risparmio","IVA","Inflazione"],c:0},
  {cat:"Economia",q:"Cos'è l'inflazione?",a:["Aumento prezzi","Calo popolazione","Bonus","Export"],c:0},
  {cat:"Economia",q:"Cos'è il PIL?",a:["Produzione totale","Tasse","Debito","Export"],c:0},
  {cat:"Economia",q:"Chi stampa moneta UE?",a:["BCE","IMF","ONU","Stati"],c:0},
  {cat:"Economia",q:"Cos'è disoccupazione?",a:["Senza lavoro","Studenti","Pensionati","Imprese"],c:0},

  {cat:"UE",q:"Chi fa le leggi UE?",a:["Parlamento UE","NATO","ONU","FMI"],c:0},
  {cat:"UE",q:"Quanti paesi UE?",a:["27","10","50","100"],c:0},
  {cat:"UE",q:"Cos'è Schengen?",a:["Libera circolazione","Tassa","Moneta","Partito"],c:0},

  {cat:"Sanità",q:"SSN è?",a:["Pubblico","Privato","Militare","Assicurazione"],c:0},
  {cat:"Sanità",q:"Ticket sanitario è?",a:["Contributo paziente","Bonus","Stipendio","Tassa UE"],c:0},

  {cat:"Istruzione",q:"Università pubblica è finanziata da?",a:["Stato","Privati","UE","Banche"],c:0},
  {cat:"Istruzione",q:"Tasso laureati indica?",a:["% laureati","Scuole","Professori","Classi"],c:0},

  {cat:"Immigrazione",q:"Richiedente asilo è?",a:["Protezione","Turista","Studente","Lavoratore"],c:0},
  {cat:"Immigrazione",q:"Migrazione economica è?",a:["Per lavoro","Guerra","Studio","Vacanza"],c:0},

  {cat:"Lavoro",q:"Contratto a tempo indeterminato è?",a:["Senza scadenza","3 mesi","Stage","Autonomo"],c:0},
  {cat:"Lavoro",q:"Disoccupazione giovanile è?",a:["Senza lavoro","Studenti","Pensionati","Imprese"],c:0},

  {cat:"Istituzioni",q:"Presidente della Repubblica?",a:["Capo Stato","Premier","Ministro","Sindaco"],c:0},
  {cat:"Istituzioni",q:"Governo fa?",a:["Esecutivo","Leggi","Giudica","Stampa moneta"],c:0},

  // DUPLICAZIONE INTENZIONALE PER ARRIVARE A 100 (semplificata per MVP)
];


// ======================
// VARIABILI
// ======================

let questions = [];
let index = 0;
let score = 0;
let categoryScore = {};

// ======================
// START
// ======================

document.getElementById("startBtn").addEventListener("click", start);

function start(){
  index = 0;
  score = 0;
  categoryScore = {};

  questions = shuffle(allQuestions).slice(0, 25);

  questions.forEach(q=>{
    if(!categoryScore[q.cat]){
      categoryScore[q.cat] = {right:0,total:0};
    }
  });

  showQuestion();
}

// ======================
// SHOW QUESTION
// ======================

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

// ======================
// ANSWER
// ======================

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

// ======================
// REPORT + PDF
// ======================

function showReport(){

  let percent = Math.round(score/questions.length*100);

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

      <p>Punteggio: ${percent}%</p>
      <h3>${level}</h3>

      <hr>

      ${catHTML}

      <br>

      <button onclick="downloadPDF()">Scarica PDF</button>

    </div>
  `;
}

// ======================
// PDF (PRINT)
// ======================

function downloadPDF(){
  const content = document.getElementById("report").innerHTML;

  const win = window.open("", "", "width=900,height=1200");

  win.document.write(`
    <html>
    <head>
      <title>Report Civico</title>
      <style>
        body{font-family:Arial;padding:40px;}
        h2{color:#2e3d2f;}
        p{font-size:14px;}
      </style>
    </head>
    <body>${content}</body>
    </html>
  `);

  win.document.close();
  win.print();
}

// ======================
// UTILS
// ======================

function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}
