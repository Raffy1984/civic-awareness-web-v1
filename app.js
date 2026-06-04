document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("startBtn");
  const output = document.getElementById("output");

  btn.addEventListener("click", () => {

    output.innerHTML = `
      <h2>Domanda 1</h2>

      <p>Quale di queste è un'istituzione dell'Unione Europea?</p>

      <button onclick="rispostaCorretta()">Parlamento Europeo</button>

      <button onclick="rispostaErrata()">Ferrari</button>

      <button onclick="rispostaErrata()">Protezione Civile</button>

      <button onclick="rispostaErrata()">INPS</button>
    `;
  });

});

function rispostaCorretta() {
  alert("Risposta corretta!");
}

function rispostaErrata() {
  alert("Risposta errata!");
}
