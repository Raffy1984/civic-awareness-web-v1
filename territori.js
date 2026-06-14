export class SistemaCivico {
    constructor() {
        this.utente = { nome: "", comune: "", regione: "" };
        this.schermataAttuale = "registrazione"; // registrazione | hub | abilitazione | candidato | riepilogo
        this.livelloCorrente = "comunali"; // comunali -> regionali -> nazionali
        
        // Sezione 1: Stato Abilitazione
        this.punteggioAbilitazione = 0;
        this.indiceDomandaAbilitazione = 0;
        this.isAbilitato = false;
        this.tentatoEsame = false;

        // Sezione 2: Stato Candidato per un Giorno
        this.indiceScenarioCandidato = 0;
        this.delibereProgramma = []; 
    }

    configuraUtente(nome, comune, regione) {
        this.utente = { nome, comune, regione };
        this.schermataAttuale = "hub";
    }

    registraRispostaAbilitazione(isCorretta) {
        if (isCorretta) {
            this.punteggioAbilitazione += 10;
        }
    }

    salvaDeliberaPolitica(delibera) {
        this.delibereProgramma.push(delibera);
    }

    resetProgressoSezione() {
        this.livelloCorrente = "comunali";
        this.indiceDomandaAbilitazione = 0;
        this.indiceScenarioCandidato = 0;
    }
}
