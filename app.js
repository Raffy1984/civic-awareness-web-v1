const questions = [
  { cat:"Economia", q:"Cos'è il debito pubblico?", a:["Debito dello Stato","Risparmio privato","Tasse locali","Stipendio"], c:0 },
  { cat:"Economia", q:"Cos'è l'inflazione?", a:["Aumento prezzi","Riduzione popolazione","Bonus statali","Tassa UE"], c:0 },

  { cat:"UE", q:"Chi fa le leggi nell'UE?", a:["Parlamento Europeo","NATO","ONU","FMI"], c:0 },
  { cat:"UE", q:"Quanti paesi circa nell'UE?", a:["27","10","50","100"], c:0 },

  { cat:"Immigrazione", q:"Cos'è un richiedente asilo?", a:["Persona che chiede protezione","Turista","Studente","Lavoratore"], c:0 },

  { cat:"Istruzione", q:"Cosa indica il tasso di laureati?", a:["% laureati","Numero scuole","Costo università","Età media"], c:0 },

  { cat:"Sanità", q:"Il SSN è?", a:["Pubblico","Privato USA","Militare","Assicurazione privata"], c:0 },

  { cat:"Lavoro", q:"Disoccupazione giovanile significa?", a:["Giovani senza lavoro","Pensionati","Studenti","Autonomi"], c:0 }
];

let index=0;
let score=0;

document.getElementById("startBtn").addEventListener("click",start);

function start(){
  index=0;
  score=0;
  show();
}

function show(){
  const q=questions[index];

  document.getElementById("output").innerHTML=`
    <div class="question-card">

      <div class="question-title">
        ${q.cat} — ${index+1}/${questions.length}
      </div>

      <h3>${q.q}</h3>

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
    document.getElementById("output").innerHTML=`
      <div class="question-card">
        <h2>Risultato</h2>
        <p>Punteggio: ${score}/${questions.length}</p>
        <p>Percentuale: ${Math.round(score/questions.length*100)}%</p>
      </div>
    `;
  }
}
