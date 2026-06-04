const questions = [
  {
    q: "Quale istituzione appartiene all'Unione Europea?",
    a: ["Parlamento Europeo", "INPS", "Ferrari", "Protezione Civile"],
    correct: 0
  },
  {
    q: "Qual è la moneta dell'Italia?",
    a: ["Euro", "Dollaro", "Lira", "Franco"],
    correct: 0
  },
  {
    q: "L'Italia è una Repubblica?",
    a: ["Sì", "No"],
    correct: 0
  },
  {
    q: "Chi fa le leggi in Italia?",
    a: ["Parlamento", "Sindaco", "Calciatori", "Banche"],
    correct: 0
  }
];

let index = 0;
let score = 0;

document.getElementById("startBtn").addEventListener("click", startQuiz);

function startQuiz() {
  index = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[index];

  document.getElementById("output").innerHTML = `
    <h2>Domanda ${index + 1}</h2>
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

  let giudizio = "";

  if (percent >= 80) giudizio = "Ottima consapevolezza civica";
  else if (percent >= 60) giudizio = "Buona consapevolezza civica";
  else if (percent >= 40) giudizio = "Consapevolezza media";
  else giudizio = "Bassa consapevolezza civica";

  document.getElementById("output").innerHTML = `
    <h2>Risultato finale</h2>
    <p>Punteggio: ${score} / ${questions.length}</p>
    <p>Percentuale: ${percent}%</p>
    <h3>${giudizio}</h3>
  `;
}
