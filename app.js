const allQuestions = [
  {cat:"Economia",q:"Cos'è il debito pubblico?",a:["Debito Stato","Risparmio privato","Tasse locali","IVA"],c:0},
  {cat:"Economia",q:"Cos'è l'inflazione?",a:["Aumento prezzi","Diminuzione popolazione","Bonus","Export"],c:0},
  {cat:"UE",q:"Chi fa le leggi UE?",a:["Parlamento Europeo","NATO","ONU","BCE"],c:0},
  {cat:"UE",q:"Quanti paesi UE?",a:["27","10","50","100"],c:0},
  {cat:"Immigrazione",q:"Cos'è richiedente asilo?",a:["Protezione","Turista","Studente","Lavoratore"],c:0},
  {cat:"Istruzione",q:"Tasso laureati indica?",a:["% laureati","Scuole","Professori","Classi"],c:0},
  {cat:"Sanità",q:"SSN è?",a:["Pubblico","Privato","Militare","Assicurazione"],c:0},
  {cat:"Lavoro",q:"Disoccupazione giovanile?",a:["Senza lavoro","Studenti","Pensionati","Autonomi"],c:0}
];

// FUTURO: qui arriveranno 100 domande

let questions = [];
let index = 0;
let score = 0;

document.getElementById("startBtn").addEventListener("click",start);

function start(){
  index=0;
  score=0;

  questions = shuffle(allQuestions).slice(0, allQuestions.length);

  show();
}

function show(){
  const q = questions[index];

  document.getElementById("output").innerHTML=`
    <div class="question-card">

      <div class="progress">
        Domanda ${index+1} / ${questions.length}
      </div>

      <h3>${q.cat}</h3>
      <p>${q.q}</p>

      ${q.a.map((x,i)=>`
        <button class="answer-btn" onclick="ans(${i})">${x}</button>
      `).join("")}

    </div>
  `;
}

function ans(i){
  if(i===questions[index].c) score++;

  index++;

  if(index<questions.length){
    show();
  }else{
    result();
  }
}

function result(){
  const percent = Math.round(score/questions.length*100);

  let level =
    percent>=80?"Ottima consapevolezza civica":
    percent>=60?"Buona consapevolezza civica":
    percent>=40?"Media consapevolezza civica":
    "Bassa consapevolezza civica";

  document.getElementById("output").innerHTML=`
    <div class="question-card">
      <h2>Esito Patente Civica</h2>
      <p>Punteggio: ${score}/${questions.length}</p>
      <p>Percentuale: ${percent}%</p>
      <h3>${level}</h3>
    </div>
  `;
}

function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}
