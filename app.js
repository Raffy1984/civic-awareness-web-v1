const questions = [
  {
    cat: "Economia",
    q: "Cos'è il debito pubblico?",
    a: ["Debito dello Stato", "Risparmio privato", "Tasse locali", "Stipendio medio"],
    c: 0
  },
  {
    cat: "Unione Europea",
    q: "Quale istituzione fa le leggi nell'UE?",
    a: ["Parlamento Europeo", "NATO", "ONU", "BCE"],
    c: 0
  },
  {
    cat: "Immigrazione",
    q: "Cos'è un richiedente asilo?",
    a: ["Persona che chiede protezione", "Turista", "Studente", "Lavoratore UE"],
    c: 0
  },
  {
    cat: "Istruzione",
    q: "Cosa indica il tasso di laureati?",
    a: ["% di popolazione laureata", "Numero scuole", "Costo università", "Numero professori"],
    c: 0
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
    <div class="question-card">

      <div class="question-title">
        ${q.cat} — Domanda ${index + 1}/${questions.length}
      </div>

      <h3>${q.q}</h3>

      ${q.a.map((ans, i) => `
        <button class="answer-btn" onclick="answer(${i})">
          ${ans}
        </button>
      `).join("")}

    </div>
  `;
}

function answer(i) {
  if (i === questions[index].c) score++;

  index++;

  if (index < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const percent = Math.round((score / questions.length) * 100);

  let level = "";

  if (percent >= 80) level = "Ottima consapevolezza civica";
  else if (percent >= 60) level = "Buona consapevolezza civica";
  else if (percent >= 40) level = "Consapevolezza media";
  else level = "Consapevolezza bassa";

  document.getElementById("output").innerHTML = `
    <div class="question-card">

      <h2>Esito Patente Civica</h2>

      <p>Punteggio: ${score}/${questions.length}</p>
      <p>Percentuale: ${percent}%</p>

      <h3>${level}</h3>

    </div>
  `;
}
