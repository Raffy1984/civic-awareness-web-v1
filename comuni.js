/**
 * PATENTE CIVICA - DATASTORE STRUTTURATO COMUNI (PROD-SPEC 2026)
 * Contiene i metadati istituzionali di livello Comunale (Enti Locali), i vettori micro-tematici,
 * i vincoli di bilancio municipale e i riferimenti statistici di prossimità.
 */

const DATA_COMUNI = {
    livello: "comunale_locale",
    versione: "2.1.0_2026",
    
    comuni: [
        {
            id: "com-rm",
            regioneId: "reg-laz",
            nome: "Roma Capitale",
            livello: "comunale",
            temiPolitici: ["Decoro Urbano e Raccolta Differenziata", "Trasporto Pubblico ATAC e Linee Metro", "Sicurezza Periferie e Illuminazione Led", "Grandi Eventi e Flussi Turistici"],
            indicatoriSocioEconomici: {
                produzioneRifiutiProCapite: "560 kg/anno (Dato ISPRA)",
                estensioneReteTPL: "La più vasta d'Italia con criticità di superficie",
                bilancioPrevisionale: "Esecutivo approvato nel rispetto del Patto di Stabilità Interno"
            },
            riferimentoIstituzionale: "Dipartimento Risorse Economiche Roma Capitale",
            dataAggiornamento: "18 Febbraio 2026"
        },
        {
            id: "com-mi",
            regioneId: "reg-lom",
            nome: "Milano",
            livello: "comunale",
            temiPolitici: ["Pianificazione Urbanistica e Area B/C", "Edilizia Residenziale Pubblica (ERP)", "Welfare di Prossimità e Integrazione", "Sicurezza Urbana e Videosorveglianza Smart"],
            indicatoriSocioEconomici: {
                raccoltaDifferenziata: "62.4% (AMSA 2025)",
                costoMedioLocazione: "24.5 €/mq (Osservatorio Immobiliare 2026)",
                telecamereAttive: "Oltre 3.200 collegate alla centrale operativa"
            },
            riferimentoIstituzionale: "Assessorato al Bilancio e Patrimonio Comune di Milano",
            dataAggiornamento: "02 Gennaio 2026"
        },
        {
            id: "com-na",
            regioneId: "reg-cam",
            nome: "Napoli",
            livello: "comunale",
            temiPolitici: ["Riscossione Tributi Locali", "Riqualificazione Centro Storico UNESCO", "Politiche Giovanili e Centri di Aggregazione", "Piano d'Azione Mobilità Sostenibile (PUMS)"],
            indicatoriSocioEconomici: {
                indiceRiscossioneCoattiva: "34.2% (Relazione Corte dei Conti)",
                disoccupazioneUrbana: "18.9% (Dati Censimento ISTAT)",
                kmPisteCiclabili: "Sviluppo lineare in crescita morfologica complessa"
            },
            riferimentoIstituzionale: "Ragioneria Generale del Comune di Napoli",
            dataAggiornamento: "12 Marzo 2026"
        },
        {
            id: "com-to",
            regioneId: "reg-pie",
            nome: "Torino",
            livello: "comunale",
            temiPolitici: ["Riconversione Spazi Industriali dismessi", "Teleriscaldamento ed Efficientamento Aria", "Servizi Sociali e Sostegno Terza Età", "Infrastrutture Digitali Smart City"],
            indicatoriSocioEconomici: {
                indiceInquinamentoPM10: "Giorni di superamento monitorati (ARPA)",
                indebitamentoComunale: "In traiettoria di rientro assistito",
                iscrittiAtenei: "Polo universitario ad alta attrazione internazionale"
            },
            riferimentoIstituzionale: "Direzione Finanziaria Comune di Torino",
            dataAggiornamento: "20 Gennaio 2026"
        },
        {
            id: "com-bo",
            regioneId: "reg-emr",
            nome: "Bologna",
            livello: "comunale",
            temiPolitici: ["Città 30 e Moderazione del Traffico", "Politiche Abitative Universitarie", "Integrazione Tecnologica Sotto i Portici", "Servizi Educativi e Asili Nido"],
            indicatoriSocioEconomici: {
                coperturaAsiliNido: "44.5% dei richiedenti (Target UE superato)",
                incidentiStradaliUrbani: "-12% dall'introduzione della Città 30",
                indiceQualitaVita: "Stabilmente nei primi tre posti nazionali (Sole 24 Ore)"
            },
            riferimentoIstituzionale: "Area Risorse Finanziarie Comune di Bologna",
            dataAggiornamento: "05 Febbraio 2026"
        }
    ]
};
