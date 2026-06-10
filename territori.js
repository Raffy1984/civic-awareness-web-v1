/**
 * PATENTE CIVICA - DATASTORE STRUTTURATO TERRITORI (PROD-SPEC 2026)
 * Contiene i metadati istituzionali di livello Nazionale e Regionale, i vettori macro-tematici,
 * le metriche finanziarie consolidate e le fonti ufficiali di riferimento.
 */

const DATA_TERRITORI = {
    livello: "nazionale_regionale",
    versione: "2.1.0_2026",
    
    nazione: {
        id: "ita-naz",
        nome: "Repubblica Italiana",
        livello: "nazionale",
        temiPolitici: ["Stabilità Macroeconomica", "Previdenza Coesiva", "Politiche di Internazionalizzazione", "Transizione Energetica Sistemica"],
        indicatoriSocioEconomici: {
            debitoPIL: "134.8% (Dato MEF - Q1 2026)",
            tassoOccupazione: "62.1% (Dato ISTAT - Febbraio 2026)",
            spesaSanitaPubblica: "6.7% del PIL (Nota Aggiornamento DEF 2025)"
        },
        riferimentoIstituzionale: "Ministero dell'Economia e delle Finanze / ISTAT",
        dataAggiornamento: "15 Marzo 2026"
    },
    
    regioni: [
        {
            id: "reg-lom",
            nome: "Lombardia",
            livello: "regionale",
            temiPolitici: ["Governance Sanitaria d'Eccellenza", "Mobilità Intermodale Transpadana", "Fondi Europei FESR Innovazione", "Transizione Industriale Ecologica"],
            indicatoriSocioEconomici: {
                quotaSpesaSanitaria: "82.5% del bilancio regionale autonomo",
                tassoDisoccupazione: "4.8% (Eurostat 2025)",
                pmiAttive: "Oltre 800.000 unità registrate"
            },
            riferimentoIstituzionale: "Assessorato al Bilancio Regione Lombardia / ISTAT",
            dataAggiornamento: "10 Gennaio 2026"
        },
        {
            id: "reg-laz",
            nome: "Lazio",
            livello: "regionale",
            temiPolitici: ["Risanamento Deficit Sanitario", "Infrastrutture Logistiche Centrali", "Valorizzazione Beni Culturali", "Gestione Ciclo dei Rifiuti Regionale"],
            indicatoriSocioEconomici: {
                quotaSpesaSanitaria: "79.2% del bilancio regionale",
                PILProCapite: "31.200 € (Media ISTAT 2025)",
                indiceVulnerabilitaIdrogeologica: "Medio-Alto (Rapporto ISPRA)"
            },
            riferimentoIstituzionale: "Dip. Programmazione Economica e Sociale Regione Lazio",
            dataAggiornamento: "22 Febbraio 2026"
        },
        {
            id: "reg-cam",
            nome: "Campania",
            livello: "regionale",
            temiPolitici: ["Edilizia Ospedaliera e LEA", "Fondi Coesione e Sviluppo (FSC)", "Turismo Sostenibile Costiero", "Bonifica e Monitoraggio Ambientale"],
            indicatoriSocioEconomici: {
                quotaSpesaSanitaria: "84.1% del bilancio regionale",
                tassoDisoccupazioneGiovanile: "38.5% (ISTAT Q4 2025)",
                utilizzoFondiUE: "64.2% della programmazione precedente"
            },
            riferimentoIstituzionale: "Ufficio Speciale per il Federalismo Regionale - Campania",
            dataAggiornamento: "05 Marzo 2026"
        }
    ]
};
