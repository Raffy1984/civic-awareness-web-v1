// =====================================
// 📘 LEZIONE MODE - QUIZ STABILE BASE
// =====================================


// =====================
// DATABASE SEMPLICE
// =====================

const bank = {
  Generale: [
    {
      q: "Cos'è la democrazia?",
      a: [
        "Un sistema in cui il popolo decide",
        "Un governo militare",
        "Un sistema monarchico",
        "Un sistema religioso"
      ],
      c: 0
    },
    {
      q: "Cos'è l'Unione Europea?",
      a: [
        "Un'unione di stati europei",
        "Un singolo paese",
        "Un esercito mondiale",
        "Una banca centrale"
      ],
      c: 0
    },
    {
      q: "Cos'è l'euro?",
      a: [
        "La valuta europea",
        "Una legge",
        "Una città",
        "Un organismo politico"
      ],
      c: 0
    },
    {
      q: "Cos'è una costituzione?",
      a: [
        "L'insieme delle leggi fondamentali di uno Stato",
        "Un trattato commerciale",
        "Un partito politico",
        "Un documento privato"
      ],
      c: 0
    },
    {
      q: "Cos'è il Parlamento?",
      a: [
        "Un organo legislativo",
        "Un tribunale",
        "Un esercito",
        "Una scuola"
      ],
      c: 0
    }
  ]
};


// =====================
// STATE
// =====================

let questions = [];
let index = 0;
let score = 0;

const TOTAL = 5;


// =====================
// START (STABILE)
// =====================

function start(){

  const out = document.getElementById("output");

  if(!out){
    alert("Errore: manca <div id='output'> nel tuo HTML");
    return;
  }

  index = 0;
  score = 0;

  let all = [];

  Object.keys(bank).forEach(cat=>{
    bank[cat].forEach(q=>{
      all.push(q);
    });
  });

  questions = shuffle(all).slice(0, TOTAL);

  showQuestion();
}


// =====================
// SHOW QUESTION
// =====================

function showQuestion(){

  const out = document.getElementById("output");
  const q = questions[index];

  if(!out || !q) return;

  out.innerHTML = `
    <div style="max-width:600px;margin:auto;font-family:Arial">

      <h3>${q.q}</h3>

      ${q.a.map((x,i)=>`
        <button onclick="answer(${i})"
          style="
            display:block;
            width:100%;
            margin:8px 0;
            padding:12px;
            border:1px solid #ccc;
            background:white;
            cursor:pointer;
          ">
          ${x}
        </button>
      `).join("")}

      <p>Domanda ${index+1} / ${questions.length}</p>

    </div>
  `;
}


// =====================
// ANSWER
// =====================

function answer(i){

  const q = questions[index];

  if(i === q.c){
    score++;
  }

  index++;

  if(index >= questions.length){
    finish();
  } else {
    showQuestion();
  }
}


// =====================
// FINISH
// =====================

function finish(){

  const out = document.getElementById("output");

  out.innerHTML = `
    <div style="text-align:center;font-family:Arial">
      <h2>Risultato finale</h2>
      <h1>${score} / ${questions.length}</h1>

      <button onclick="start()"
        style="padding:12px 20px;margin-top:20px;cursor:pointer;">
        Riprova
      </button>
    </div>
  `;
}


// =====================
// UTILS
// =====================

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}
