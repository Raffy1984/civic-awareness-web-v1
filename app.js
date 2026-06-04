const questions = [
  {
    category: "Istituzioni",
    q: "Chi approva le leggi in Italia?",
    a: ["Parlamento", "Sindaco", "Regioni estere", "Banche"],
    correct: 0
  },
  {
    category: "Economia",
    q: "Cos'è il debito pubblico?",
    a: ["Debito dello Stato", "Saldo bancario personale", "Stipendio", "IVA"],
    correct: 0
  },
  {
    category: "Unione Europea",
    q: "Quale tra questi è un organo dell'UE?",
    a: ["Commissione Europea", "INPS", "FCA", "ACI"],
    correct: 0
  },
  {
    category: "Società",
    q: "Cos’è l’astensione al voto?",
    a: ["Non votare", "Votare due volte", "Voto nullo automatico", "Voto obbligatorio"],
    correct: 0
  }
];

let index = 0;
let score = 0;

document.getElementById("startBtn").addEventListener("click", start);

function start() {
  index = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[index];

  document.getElementById("output").innerHTML = `
    <h2>${q.category}</h2>
    <h3>Domanda ${index + 1}</h3>
    <p>${q.q}</p>
    ${q.a.map((ans, i) => `
      <button onclick="answer(${i})">${ans}</button>
    `).join("")}
  `;
}

function answer(i) {
  if (i === questions[index].correct) {
    score++;
  }

  index++;

  if (index < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const percent = Math.round((score / questions.length) * 100);

  let livello = "";

  if (percent >= 85) {
    livello = "Eccellente consapevolezza civica";
  } else if (percent >= 70) {
    livello = "Buona consapevolezza civica";
  } else if (percent >= 50) {
    livello = "Consapevolezza sufficiente";
  } else {
    livello = "Consapevolezza insufficiente";
  }

  document.getElementById("output").innerHTML = `
    <h2>Esito Patente Civica</h2>
    <p>Punteggio: ${score} / ${questions.length}</p>
    <p>Percentuale: ${percent}%</p>
    <h3>${livello}</h3>
  `;
}
