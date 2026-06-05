// =====================================
// 🏛️ GOVERNMENT DASHBOARD - STABLE FULL
// =====================================


// =====================
// 🎨 PALETTE ISTITUZIONALE
// =====================

const COLORS = {
  Immigrazione: "#1f3a5f",
  Criminalità: "#b23a48",
  Economia: "#2f6f4e",
  Società: "#6a4c93",
  Lavoro: "#e09f3e",
  Istituzioni: "#3a86ff",
  Sanità: "#2a9d8f",
  Istruzione: "#8ac926"
};


// =====================
// 📦 DATABASE DOMANDE
// =====================

const bank = {
  Immigrazione: [
    {q:"Quota stranieri in Italia (ISTAT):",a:["4–5%","8–9%","15–18%","25%+"],c:1,source:"ISTAT"},
    {q:"Percezione immigrazione:",a:["Inferiore","Corretta","Sovrastimata","Nulla"],c:2,source:"CENSIS"},
    {q:"Distribuzione:",a:["Nord","Sud","Uniforme","Solo città"],c:0,source:"ISTAT"}
  ],

  Criminalità: [
    {q:"Reati ultimi 15 anni:",a:["Aumento","Stabili","Diminuzione","Raddoppio"],c:2,source:"MININTERNO"},
    {q:"Percezione criminalità:",a:["Inferiore","Allineata","Superiore","Nulla"],c:2,source:"CENSIS"},
    {q:"Omicidi:",a:["Crescono","Calano","Raddoppiano","Stabili"],c:1,source:"ISTAT"}
  ],

  Economia: [
    {q:"Debito/PIL:",a:["90%","110%","130%","180%"],c:2,source:"EUROSTAT"},
    {q:"PIL:",a:["Crescita","Oscillante","Crollo","Zero"],c:1,source:"ISTAT"},
    {q:"Inflazione:",a:["Stabile","Deflazione","Variabile","Nulla"],c:2,source:"BCE"}
  ],

  Società: [
    {q:"Rischio sociale:",a:["Inferiore","Allineato","Superiore","Nulla"],c:2,source:"CENSIS"},
    {q:"Paure:",a:["Allineate","Amplificate","Inesistenti","Perf
