const questions = [
  // ECONOMIA
  { cat: "Economia", q: "Cos’è il debito pubblico?", a: ["Debito dello Stato", "Risparmio privato", "Tasse comunali", "Salario medio"], c: 0 },
  { cat: "Economia", q: "Cos’è l’inflazione?", a: ["Aumento prezzi", "Diminuzione popolazione", "Aumento salari obbligatorio", "Tassa europea"], c: 0 },

  // UE
  { cat: "Unione Europea", q: "Qual è l’organo legislativo UE?", a: ["Parlamento Europeo", "NATO", "ONU", "BCE privata"], c: 0 },
  { cat: "Unione Europea", q: "Quanti paesi circa fanno parte dell’UE?", a: ["27", "10", "50", "100"], c: 0 },

  // IMMIGRAZIONE
  { cat: "Immigrazione", q: "Cos’è un richiedente asilo?", a: ["Persona che chiede protezione", "Turista", "Studente Erasmus", "Lavoratore UE"], c: 0 },

  // ISTRUZIONE
  { cat: "Istruzione", q: "Cosa indica il tasso di laureati?", a: ["% popolazione laureata", "Numero scuole", "Costo università", "Età media studenti"], c: 0 },

  // SANITÀ
  { cat: "Sanità", q: "Il SSN in Italia è…", a: ["Pubblico", "Privato totale", "Militare", "Assicurazione privata USA style"], c: 0 },

  // LAVORO
  { cat: "Lavoro", q: "Cosa significa disoccupazione giovanile?", a: ["Giovani senza lavoro", "Pensionati", "Studenti", "Partite IVA"], c: 0 }
];

let index = 0;
let score = 0;

let categoryScore = {};

document.getElementById("startBtn").addEventListener("click", start);

function start() {
  index = 0;
  score = 0;
  categoryScore = {};
  showQuestion();
}

function showQuestion() {
  const q = questions[index];

  document.getElementById("output").innerHTML = `
    <h2>${q.cat}</h2>
    <p><b>Domanda ${index + 1}</b></p>
    <p>${q.q}</p>
    ${q.a.map((ans, i) => `
      <button onclick="answer(${i})">${ans}</button>
    `).join("")}
  `;
}

function answer(i) {
  const q = questions[index];

  if (!categoryScore[q.cat]) {
    categoryScore[q.cat] = { ok: 0, total: 0 };
  }

  categoryScore[q.cat].total++;

  if (i === q.c) {
    score++;
    categoryScore[q.cat].ok++;
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

  if (percent >= 85) livello = "Eccellente consapevolezza civica";
  else if (percent >= 70) livello = "Buona consapevolezza civica";
  else if (percent >= 50) livello = "Consapevolezza sufficiente";
  else livello = "Consapevolezza insufficiente";

  let dettagli = "";

  for (let c in categoryScore) {
    const r = categoryScore[c];
    const p = Math.round((r.ok / r.total) * 100);
    dettagli += `<p>${c}: ${p}%</p>`;
  }

  document.getElementById("output").innerHTML = `
    <h2>ESITO PATENTE CIVICA</h2>
    <p>Punteggio: ${score} / ${questions.length}</p>
    <p>Percentuale totale: ${percent}%</p>
    <h3>${livello}</h3>
    <hr>
    <h4>Dettaglio per categorie</h4>
    ${dettagli}
    <br>
    <button onclick="downloadReport()">Scarica report</button>
  `;
}

function downloadReport() {
  const text = "Patente Civica - Report\n\nPunteggio: " + score + "/" + questions.length;

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "patente_civica_report.txt";
  link.click();
}
