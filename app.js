const allQuestions = [
  {cat:"Economia",q:"Cos'è il debito pubblico?",a:["Debito Stato","Risparmio","IVA","Inflazione"],c:0},
  {cat:"Economia",q:"Cos'è l'inflazione?",a:["Aumento prezzi","Calo salari","Bonus","Export"],c:0},
  {cat:"Economia",q:"Cos'è il PIL?",a:["Produzione totale","Tasse","Debito","Import"],c:0},

  {cat:"UE",q:"Chi fa le leggi UE?",a:["Parlamento UE","NATO","ONU","BCE"],c:0},
  {cat:"UE",q:"Quanti paesi UE?",a:["27","10","50","100"],c:0},
  {cat:"UE",q:"Cos'è Schengen?",a:["Libera circolazione","Moneta","Tassa","Partito"],c:0},

  {cat:"Sanità",q:"SSN è?",a:["Pubblico","Privato","Militare","Assicurazione"],c:0},
  {cat:"Sanità",q:"Ticket sanitario è?",a:["Contributo","Bonus","Stipendio","Abolizione tasse"],c:0},

  {cat:"Istruzione",q:"Università pubblica è finanziata da?",a:["Stato","Privati","UE","Banche"],c:0},
  {cat:"Istruzione",q:"Tasso laureati indica?",a:["% laureati","Scuole","Professori","Classi"],c:0},

  {cat:"Immigrazione",q:"Richiedente asilo è?",a:["Protezione","Turista","Studente","Lavoratore"],c:0},
  {cat:"Lavoro",q:"Disoccupazione giovanile?",a:["Senza lavoro","Studenti","Pensionati","Imprese"],c:0},

  {cat:"Istituzioni",q:"Presidente Repubblica?",a:["Capo Stato","Premier","Sindaco","Ministro"],c:0},
  {cat:"Istituzioni",q:"Governo è?",a:["Esecutivo","Legislativo","Giudiziario","UE"],c:0}
];

let questions = [];
let index = 0;
let score = 0;
let categoryScore = {};

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

      <p><b>Punteggio:</b> ${percent}%</p>
      <h3>${level}</h3>

      <hr>

      ${catHTML}

      <br>

      <button onclick="downloadPDF()">Scarica PDF</button>

    </div>
  `;
}

/* 🔥 PDF FIX DEFINITIVO (NO BOTTONI NEL PDF) */
function downloadPDF(){

  const report = document.getElementById("report").innerHTML;

  const win = window.open("", "", "width=900,height=1200");

  win.document.write(`
    <html>
    <head>
      <title>Report Civico</title>

      <style>
        body{
          font-family: Arial;
          padding:60px;
          background:white;
          color:#222;
        }

        h2{
          text-align:center;
          color:#2e3d2f;
        }

        h3{
          color:#4d5f4d;
        }

        p{
          font-size:14px;
          line-height:1.5;
        }

        hr{
          margin:20px 0;
        }

        /* 🔥 IMPORTANTISSIMO */
        button{
          display:none !important;
        }
      </style>

    </head>

    <body>

      <h2>Patente di Consapevolezza Civica</h2>

      ${report}

    </body>
    </html>
  `);

  win.document.close();
  win.print();
}

function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}
