export class SistemaCivico {
    constructor() {
        this.utente = { nome: "", comune: "", regione: "" };
        this.sezioneAttuale = "menu"; // menu, quiz_abilitazione, candidato_politico
        this.livelloAttuale = "comunali"; // comunali -> regionali -> nazionali
        
        // Stato Sezione 1 (Abilitazione)
        this.punteggioQuiz = 0;
        this.indiceQuiz = 0;
        this.abilitatoAlVoto = false;

        // Stato Sezione 2 (Candidato)
        this.indiceScenario = 0;
        this.programmaElettorale = []; // Contiene le scelte fatte dal candidato
    }

    resetCampagna(nome, comune, regione) {
        this.utente = { nome, comune, regione };
        this.livelloAttuale = "comunali";
        this.punteggioQuiz = 0;
        this.indiceQuiz = 0;
        this.indiceScenario = 0;
        this.programmaElettorale = [];
    }
}
