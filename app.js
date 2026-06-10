let nome = "";
let livello = "";
let index = 0;

let territorio = "";
let current = [];

let score = {s:0,e:0,c:0};

const DB = [
{
  t:"Economia",
  q:"Inflazione in aumento",
  o:[
    {t:"Aumentare salari",v:[1,0,2]},
    {t:"Tagliare tasse",v:[0,2,1]},
    {t:"Controllo prezzi",v:[1,1,1]},
    {t:"Nessuna azione",v:[-2,0,-1]}
  ]
},
{
  t:"Sanità",
  q:"Liste d’attesa lunghe",
  o:[
    {t:"Più medici",v:[2,-1,1]},
    {t:"Privatizzare",v:[0,2,1]},
    {t:"Digitalizzare",v:[2,1,2]},
    {t:"Tagli",v:[-2,1,-2]}
  ]
}
];

const REGIONI = ["Lazio","Lombardia","Campania"];
const COMUNI = ["Roma","Milano","Napoli"];

function start(){
  nome = document.getElementById("nome").value || "Utente";

  document.getElementById("intro").classList.remove("active");
  document.getElementById("menu").classList.add("active");
}

function setLevel(l){
  livello = l;

  document.getElementById("menu").classList.remove("active");

  if(l === "nazionale"){
    startQuiz();
    return;
  }

  document.getElementById("territorio").classList.add("active");

  let sel = document.getElementById("select");
  sel.innerHTML = "";

  let list = l === "regionale" ? REGIONI : COMUNI;

  list.forEach(x=>{
    let op = document.createElement("option");
    op.value = x;
    op.textContent = x;
    sel.appendChild(op);
  });
}

function confirmTerritory(){
  territorio = document.getElementById("select").value;
  startQuiz();
}

function startQuiz(){
  document.getElementById("territorio").classList.remove("active");
  document.getElementById("quiz").classList.add("active");

  index = 0;
  score = {s:0,e:0,c:0};

  current = DB;
  render();
}

function render(){
  let q = current[index];

  if(!q){
    finish();
    return;
  }

  document.getElementById("quiz").innerHTML =
    "<div class='card'><h3>"+q.t+"</h3><p>"+q.q+"</p></div>" +
    q.o.map(o=>
      "<button class='option' onclick='answer("+o.v[0]+","+o.v[1]+","+o.v[2]+")'>"+o.t+"</button>"
    ).join("");
}

function answer(a,b,c){
  score.s += a;
  score.e += b;
  score.c += c;
  index++;
  render();
}

function finish(){
  document.getElementById("quiz").classList.remove("active");
  document.getElementById("result").classList.add("active");

  let tot = score.s + score.e + score.c;

  let txt =
    tot > 3 ? "ALTA CONSAPEVOLEZZA" :
    tot > 0 ? "MEDIA CONSAPEVOLEZZA" :
    "BASSA CONSAPEVOLEZZA";

  document.getElementById("result").innerHTML =
    "<div class='card'><h2>"+txt+"</h2><p>"+nome+"</p></div>" +
    "<button onclick='location.reload()'>Riprova</button>";
}
