document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("startBtn");
  const output = document.getElementById("output");

  btn.addEventListener("click", () => {
    output.innerHTML = "<h2>FUNZIONA ✔</h2>";
  });
});
