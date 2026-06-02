document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("startBtn");

  if (!btn) {
    alert("Bottone non trovato");
    return;
  }

  btn.addEventListener("click", () => {
    alert("START APP FUNZIONA");
  });
});