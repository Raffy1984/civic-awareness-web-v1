/**
 * PATENTE CIVICA - DATASTORE STRUTTURATO TERRITORI (PROD-SPEC 2026)
 * Contiene i metadati istituzionali di livello Nazionale e Regionale, i vettori macro-tematici,
 * le metriche finanziarie consolidate e le fonti ufficiali di riferimento.
 */

const DATA_TERRITORI = {
    livello: "nazionale_regionale",
    versione: "2.5.0_2026",
    
    nazione: {
        id: "ita-naz",
        nome: "Repubblica Italiana",
        livello: "nazionale",
        temiPolitici: ["Stabilità Macroeconomica", "Previdenza Coesiva", "Politiche di Internazionalizzazione", "Transizione Energetica Sistemica", "Politiche Giovanili", "Sicurezza Nazionale"],
        indicatoriSocioEconomici: {
            debitoPIL: "134.8% (Dato MEF - Q1 2026)",
            tassoOccupazione: "62.1% (Dato ISTAT - 2026)",
            spesaSanitaPubblica: "6.7% del PIL (Nota Aggiornamento DEF)"
        },
        problemiTipici: [
            "Elevato debito pubblico strutturale che limita gli spazi di manovra fiscale.",
            "Invecchiamento demografico con conseguente pressione sul sistema previdenziale.",
            "Divario di produttività e mismatch di competenze nel mercato del lavoro."
        ],
        riferimentoIstituzionale: "Ministero dell'Economia e delle Finanze / ISTAT",
        dataAggiornamento: "2026"
    },
    
    regioni: [
        {
            id: "reg-lom",
            nome: "Lombardia",
            livello: "regionale",
            temiPolitici: ["Sanità", "Trasporti", "Ambiente", "Economia"],
            indicatoriSocioEconomici: { quotaSpesaSanitaria: "82.5% del bilancio regionale", tassoDisoccupazione: "4.8% (Eurostat)" },
            problemiTipici: ["Decongestionamento delle liste d'attesa sanitarie.", "Inquinamento atmosferico nel bacino padano.", "Saturazione delle linee ferroviarie pendolari."],
            riferimentoIstituzionale: "Regione Lombardia / ARPA"
        },
        {
            id: "reg-laz",
            nome: "Lazio",
            livello: "regionale",
            temiPolitici: ["Sanità", "Trasporti", "Politiche Giovanili", "Ambiente"],
            indicatoriSocioEconomici: { quotaSpesaSanitaria: "79.2% del bilancio", PILProCapite: "31.200 €" },
            problemiTipici: ["Deficit storico delle aziende sanitarie locali.", "Efficientamento dei trasporti extraurbani.", "Pianificazione regionale del ciclo integrato dei rifiuti."],
            riferimentoIstituzionale: "Regione Lazio / ISTAT"
        },
        {
            id: "reg-cam",
            nome: "Campania",
            livello: "regionale",
            temiPolitici: ["Sanità", "Economia", "Politiche Giovanili", "Sicurezza"],
            indicatoriSocioEconomici: { quotaSpesaSanitaria: "84.1% del bilancio", tassoDisoccupazioneGiovanile: "38.5%" },
            problemiTipici: ["Rilancio dei Livelli Essenziali di Assistenza (LEA).", "Ottimizzazione dell'impiego dei Fondi di Sviluppo e Coesione (FSC).", "Contrasto alla dispersione scolastica."],
            riferimentoIstituzionale: "Regione Campania"
        },
        {
            id: "reg-pie",
            nome: "Piemonte",
            livello: "regionale",
            temiPolitici: ["Sanità", "Trasporti", "Ambiente", "Economia"],
            indicatoriSocioEconomici: { quotaSpesaSanitaria: "81.0% del bilancio", indiceInquinamento: "Elevato (Area Padana)" },
            problemiTipici: ["Invecchiamento della popolazione ed estensione delle cure domiciliari.", "Riconversione dei distretti industriali tradizionali.", "Dissesto idrogeologico nelle valli alpine."],
            riferimentoIstituzionale: "Regione Piemonte / ISPRA"
        },
        {
            id: "reg-ven",
            nome: "Veneto",
            livello: "regionale",
            temiPolitici: ["Sanità", "Economia", "Ambiente", "Trasporti"],
            indicatoriSocioEconomici: { quotaSpesaSanitaria: "80.3% del bilancio", pmiAttive: "Elevata densità" },
            problemiTipici: ["Carenza di medici di medicina generale sul territorio.", "Gestione del rischio idraulico e tutela delle coste.", "Digitalizzazione del tessuto di micro-PMI."],
            riferimentoIstituzionale: "Regione Veneto"
        },
        {
            id: "reg-emr",
            nome: "Emilia-Romagna",
            livello: "regionale",
            temiPolitici: ["Sanità", "Ambiente", "Trasporti", "Politiche Giovanili"],
            indicatoriSocioEconomici: { quotaSpesaSanitaria: "82.1% del bilancio", asiliNido: "Copertura sopra media UE" },
            problemiTipici: ["Frequenza di eventi meteo estremi e gestione dei bacini idrografici.", "Mantenimento degli alti standard di prossimità sociosanitaria.", "Potenziamento della rete ferroviaria merci."],
            riferimentoIstituzionale: "Regione Emilia-Romagna"
        },
        {
            id: "reg-tos",
            nome: "Toscana",
            livello: "regionale",
            temiPolitici: ["Sanità", "Ambiente", "Trasporti", "Economia"],
            indicatoriSocioEconomici: { quotaSpesaSanitaria: "78.9% del bilancio", flussoTuristico: "Alta intensità" },
            problemiTipici: ["Centralizzazione tecnologica delle aziende sanitarie.", "Preservazione del suolo agricolo e aree protette.", "Collegamento e infrastrutturazione delle aree interne."],
            riferimentoIstituzionale: "Regione Toscana"
        },
        {
            id: "reg-pug",
            nome: "Puglia",
            livello: "regionale",
            temiPolitici: ["Sanità", "Ambiente", "Economia", "Trasporti"],
            indicatoriSocioEconomici: { quotaSpesaSanitaria: "83.4% del bilancio", capacitaRinnovabili: "Prima nazione per eolico/solare" },
            problemiTipici: ["Riorganizzazione della rete ospedaliera periferica.", "Crisi idrica strutturale e approvvigionamento agricolo.", "Infrastrutturazione ferroviaria della dorsale adriatica."],
            riferimentoIstituzionale: "Regione Puglia / Acquedotto Pugliese"
        },
        {
            id: "reg-sic",
            nome: "Sicilia",
            livello: "regionale",
            temiPolitici: ["Sanità", "Trasporti", "Economia", "Ambiente"],
            indicatoriSocioEconomici: { spesaSanitaria: "Regione a statuto speciale", disoccupazione: "20.1%" },
            problemiTipici: ["Dispersione idrica nelle reti di distribuzione urbane.", "Carenze strutturali nei collegamenti ferroviari interni.", "Risanamento finanziario degli enti locali dell'isola."],
            riferimentoIstituzionale: "Regione Siciliana / ISTAT"
        },
        {
            id: "reg-sard",
            nome: "Sardegna",
            livello: "regionale",
            temiPolitici: ["Trasporti", "Sanità", "Ambiente", "Economia"],
            indicatoriSocioEconomici: { densitaPopolazione: "Bassa", continuitaTerritoriale: "Critica" },
            problemiTipici: ["Garantire la continuità territoriale aerea e marittima.", "Isolamento infrastrutturale dei presidi sanitari dell'interno.", "Transizione energetica e dismissione delle centrali a carbone."],
            riferimentoIstituzionale: "Regione Autonoma della Sardegna"
        }
    ]
};
