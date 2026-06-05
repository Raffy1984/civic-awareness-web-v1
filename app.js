// =========================
// 📦 DATABASE PROFESSIONALE
// =========================

const bank = {

  Economia: [
    {q:"Quale indicatore misura la produzione economica complessiva di un Paese in un anno?",a:["PIL","Inflazione","Debito estero","Tasso di cambio"],c:0},
    {q:"L’inflazione rappresenta:",a:["L’aumento generale dei prezzi","La crescita della popolazione","Il livello delle esportazioni","La riduzione del debito pubblico"],c:0},
    {q:"Il debito pubblico è:",a:["L’insieme dei debiti dello Stato","Le entrate fiscali","Il valore della moneta","Il PIL pro capite"],c:0},
    {q:"La BCE ha il compito di:",a:["Gestire la politica monetaria europea","Legiferare in Europa","Gestire i governi nazionali","Controllare i parlamenti"],c:0}
  ],

  UE: [
    {q:"Il Parlamento Europeo ha il compito di:",a:["Legiferare insieme al Consiglio UE","Gestire le banche centrali","Amministrare i comuni","Controllare la magistratura"],c:0},
    {q:"L’area Schengen consente:",a:["Libera circolazione delle persone","Uso obbligatorio dell’euro","Controllo doganale rafforzato","Restrizione dei viaggi"],c:0},
    {q:"La Commissione Europea è responsabile di:",a:["Proporre e attuare le politiche UE","Elezione dei parlamentari","Gestione dei tribunali nazionali","Controllo militare"],c:0},
    {q:"L’Unione Europea attualmente comprende circa:",a:["27 Stati membri","15 Stati","40 Stati","50 Stati"],c:0}
  ],

  Sanità: [
    {q:"Il Servizio Sanitario Nazionale è finanziato principalmente tramite:",a:["Tassazione generale","Assicurazioni private obbligatorie","Donazioni volontarie","Fondi europei esclusivi"],c:0},
    {q:"Il ticket sanitario rappresenta:",a:["Una compartecipazione alla spesa sanitaria","Un rimborso totale","Un bonus statale","Una tassa europea"],c:0},
    {q:"Il pronto soccorso è destinato a:",a:["Emergenze sanitarie","Visite programmate","Attività private","Consulenze amministrative"],c:0}
  ],

  Istruzione: [
    {q:"L’istruzione pubblica in Italia è finanziata principalmente da:",a:["Stato","Privati","Banche","UE esclusivamente"],c:0},
    {q:"L’obbligo scolastico in Italia dura generalmente fino a:",a:["16 anni","14 anni","18 anni","21 anni"],c:0},
    {q:"La scuola primaria rappresenta:",a:["Il primo ciclo di istruzione","L’università","La formazione post-lavoro","Un corso privato"],c:0}
  ],

  Lavoro: [
    {q:"Il contratto a tempo indeterminato indica:",a:["Un rapporto senza scadenza","Un lavoro stagionale","Uno stage formativo","Un contratto di 3 mesi"],c:0},
    {q:"La disoccupazione rappresenta:",a:["La condizione di chi non ha lavoro","La crescita occupazionale","Il reddito medio","La tassazione"],c:0},
    {q:"I sindacati hanno il compito di:",a:["Tutela dei lavoratori","Gestione delle imprese","Amministrazione statale","Controllo fiscale"],c:0}
  ],

  Immigrazione: [
    {q:"Un richiedente asilo è una persona che:",a:["Chiede protezione internazionale","Viaggia per turismo","Studia all’estero","Lavora temporaneamente"],c:0},
    {q:"La migrazione economica avviene principalmente per:",a:["Motivi di lavoro","Motivi turistici","Motivi sportivi","Motivi fiscali"],c:0},
    {q:"Il permesso di soggiorno è:",a:["Un documento legale di permanenza","Una tassa","Un titolo di studio","Un bonus statale"],c:0}
  ],

  Istituzioni: [
    {q:"Il Presidente della Repubblica rappresenta:",a:["L’unità nazionale","Il governo","Il parlamento","La magistratura"],c:0},
    {q:"Il Governo esercita il potere:",a:["Esecutivo","Legislativo","Giudiziario","Consultivo"],c:0},
    {q:"Il Parlamento ha il compito di:",a:["Fare le leggi","Applicare le leggi","Giudicare","Gestire le banche"],c:0}
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

      <h2>Patente di Consapevolezza Civica</h2>

      <p>Punteggio: ${percent}%</p>
      <h3>${level}</h3>

      <hr>

      ${html}

      <button onclick="downloadPDF()">Scarica PDF</button>

    </div>
  `;
}


// =========================
// PDF
// =========================

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


// =========================
// UTILS
// =========================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
