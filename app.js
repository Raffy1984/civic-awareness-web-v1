// =========================
// 📦 DATABASE
// =========================

const bank = {
  Economia: [
    {q:"Quale indicatore misura la produzione economica complessiva di un Paese in un anno?",a:["PIL","Inflazione","Debito estero","Tasso di cambio"],c:0},
    {q:"L’inflazione rappresenta:",a:["Aumento generale dei prezzi","Crescita popolazione","Export","Riduzione tasse"],c:0},
    {q:"Il debito pubblico è:",a:["Debito dello Stato","Risparmio nazionale","Valore moneta","Export"],c:0},
    {q:"La BCE ha il compito di:",a:["Gestire la politica monetaria","Fare leggi","Gestire comuni","Controllare tribunali"],c:0}
  ],

  UE: [
    {q:"Il Parlamento Europeo ha il compito di:",a:["Legiferare UE","Gestire banche","Comandare eserciti","Gestire scuole"],c:0},
    {q:"L’area Schengen consente:",a:["Libera circolazione","Moneta unica","Tasse comuni","Controllo frontiere totale"],c:0},
    {q:"La Commissione Europea:",a:["Propone leggi UE","Elezione cittadini","Tribunali","Militare"],c:0},
    {q:"L’UE è composta da circa:",a:["27 Stati","10 Stati","50 Stati","100 Stati"],c:0}
  ],

  Sanità: [
    {q:"Il SSN è finanziato da:",a:["Tasse","Privati","Donazioni","UE esclusiva"],c:0},
    {q:"Il ticket sanitario è:",a:["Contributo spesa","Rimborso totale","Bonus","Tassa UE"],c:0},
    {q:"Il pronto soccorso serve per:",a:["Emergenze","Visite programmate","Burocrazia","Vacanze"],c:0}
  ],

  Istruzione: [
    {q:"L’istruzione pubblica è finanziata da:",a:["Stato","Privati","Banche","UE esclusiva"],c:0},
    {q:"Obbligo scolastico fino a:",a:["16 anni","14 anni","18 anni","21 anni"],c:0},
    {q:"La scuola primaria è:",a:["Base istruzione","Università","Lavoro","Privato"],c:0}
  ],

  Lavoro: [
    {q:"Il contratto indeterminato è:",a:["Senza scadenza","3 mesi","Stage","Prova"],c:0},
    {q:"La disoccupazione è:",a:["Assenza lavoro","Aumento salari","Crescita aziende","Export"],c:0},
    {q:"I sindacati tutelano:",a:["Lavoratori","Banche","Governo","UE"],c:0}
  ],

  Immigrazione: [
    {q:"Richiedente asilo è:",a:["Protezione internazionale","Turista","Studente","Lavoratore"],c:0},
    {q:"Migrazione economica è:",a:["Per lavoro","Per turismo","Per studio","Per sport"],c:0},
    {q:"Permesso di soggiorno è:",a:["Documento legale","Tassa","Bonus","Voto"],c:0}
  ],

  Istituzioni: [
    {q:"Il Presidente della Repubblica rappresenta:",a:["Unità nazionale","Governo","Parlamento","UE"],c:0},
    {q:"Il Governo esercita potere:",a:["Esecutivo","Legislativo","Giudiziario","Consultivo"],c:0},
    {q:"Il Parlamento fa:",a:["Leggi","Banche","Scuole","Esercito"],c:0}
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
// 🔥 PDF MIGLIORATO (NUOVO)
// =========================

function downloadPDF(){

  const report = document.getElementById("report");

  const w = window.open("", "", "width=1000,height=1300");

  w.document.write(`
    <html>
    <head>
      <title>Certificato Civico</title>

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

        .cats{
          margin-top:20px;
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

        <div class="cats">
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
