export class StatoCandidato {
    constructor() {
        this.nomeCandidato = "";
        this.livelloAttuale = "comunali"; // comunali -> regionali -> nazionali
        this.entitaScelta = ""; // Nome del comune o regione corrente
        this.punteggio = 0;
        this.indiceDomanda = 0;
        this.quizAttuali = [];
    }

    iniziaCampagna(nome, entita, quiz) {
        this.nomeCandidato = nome;
        this.entitaScelta = entita;
        this.quizAttuali = quiz;
        this.punteggio = 0;
        this.indiceDomanda = 0;
    }

    verificaRisposta(indiceScelto) {
        const domandaCorrente = this.quizAttuali[this.indiceDomanda];
        const corretto = indiceScelto === domandaCorrente.risposta;
        if (corretto) {
            this.punteggio += 10;
        }
        return {
            corretto,
            spiegazione: domandaCorrente.spiegazione
        };
    }

    prossimaDomanda() {
        this.indiceDomanda++;
        return this.indiceDomanda < this.quizAttuali.length;
    }
}
