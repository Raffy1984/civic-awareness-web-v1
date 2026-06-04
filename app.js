const questions = [
  {
    q: "Quale istituzione appartiene all'Unione Europea?",
    a: ["Parlamento Europeo", "INPS", "Ferrari", "Protezione Civile"],
    correct: 0
  },
  {
    q: "L'Italia è una Repubblica?",
    a: ["Sì", "No"],
    correct: 0
  },
  {
    q: "Qual è la moneta dell'Italia?",
    a: ["Euro", "Dollaro", "Lira ancora attiva", "Franco"],
    correct: 0
  }
];

let index = 0;
let score = 0;

const btn = document.getElementById("startBtn");
const output = document.getElementById("output");

btn.addEventListener("click", start);

function start() {
  index = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[index];

  output.innerHTML = `
    <h2>Domanda ${index + 1}</h2>
    <p>${q.q}</p>
    ${q.a.map((ans, i) =>
      `<button onclick="answer(${i})">${ans}</button><br>`
    ).join("")}
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
  output.innerHTML = `
    <h2>Risultato finale</h2>
    <p>Punteggio: ${score} / ${questions.length}</p>
    <p>Percentuale: ${Math.round((score / questions.length) * 100)}%</p>
  `;
}
