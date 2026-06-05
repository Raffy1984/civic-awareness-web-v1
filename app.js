const allQuestions = [
  {cat:"Economia",q:"Cos'è il debito pubblico?",a:["Debito dello Stato","Risparmio","IVA","Inflazione"],c:0},
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
  {cat:"Immigrazione",q:"Migrazione economica è?",a:["Lavoro","Guerra","Studio","Vacanza"],c:0},

  {cat:"Lavoro",q:"Disoccupazione giovanile?",a:["Senza lavoro","Studenti","Pensionati","Imprese"],c:0},
  {cat:"Lavoro",q:"Contratto a tempo indeterminato?",a:["Senza scadenza","3 mesi","Stage","Autonomo"],c:0},

  {cat:"Istituzioni",q:"Presidente della Repubblica?",a:["Capo Stato","Premier","Sindaco","Ministro"],c:0},
  {cat:"Istituzioni",q:"Governo è?",a:["Esecutivo","Legislativo","Giudiziario","UE"],c:0},

  // ripetute MA VARIATE per MVP fino a 25
  {cat:"Economia",q:"Cos'è la spesa pubblica?",a:["Spesa Stato","Guadagno","IVA","Export"],c:0},
  {cat:"UE",q:"Euro è gestito da?",a:["BCE","ONU","NATO","IMF"],c:0},
  {cat:"Sanità",q:"Medico di base è?",a:["Servizio pubblico","Privato","Assicurazione","UE"],c:0},
  {cat:"Istruzione",q:"Obbligo scolastico è?",a:["Fino a 16 anni","10 anni","Università","Libero"],c:0},
  {cat:"Lavoro",q:"Stage è?",a:["Formazione","Lavoro fisso","Pensione","Tassa"],c:0},
  {cat:"Immigrazione",q:"Cittadinanza si ottiene?",a:["Requisiti legali","Automatico","Scuola","Voto"],c:0}
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

  questions = shuffle(allQuestions).slice(0,25);

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

      <h2>Patente Civica</h2>
      <p>Punteggio: ${percent}%</p>
      <h3>${level}</h3>

      <hr>

      ${catHTML}

      <button onclick="downloadPDF()">Scarica PDF</button>

    </div>
  `;
}

function downloadPDF(){
  const content = document.getElementById("report").innerHTML;

  const win = window.open("", "", "width=900,height=1200");

  win.document.write(`
    <html>
    <head>
      <title>Report Civico</title>
      <style>
        body{
          font-family:Arial;
          padding:60px;
          background:white;
        }
        h2{
          text-align:center;
          color:#2e3d2f;
          margin-bottom:30px;
        }
        p{
          font-size:14px;
          line-height:1.5;
        }
        .box{
          border:1px solid #999;
          padding:20px;
        }
      </style>
    </head>
    <body>
      <h2>Patente di Consapevolezza Civica</h2>
      <div class="box">
        ${content}
      </div>
    </body>
    </html>
  `);

  win.document.close();
  win.print();
}

function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}
