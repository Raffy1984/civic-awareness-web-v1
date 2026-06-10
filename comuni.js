/**
 * PATENTE CIVICA - DATASTORE STRUTTURATO COMUNI (PROD-SPEC 2026)
 * Contiene i metadati di almeno 30 Comuni Italiani reali estratti per l'analisi di prossimità locale.
 */

const DATA_COMUNI = {
    livello: "comunale_locale",
    versione: "2.5.0_2026",
    
    comuni: [
        // LOMBARDIA
        { id: "com-mi", regioneId: "reg-lom", nome: "Milano", livello: "comunale", temiPolitici: ["Trasporti", "Ambiente", "Sicurezza", "Economia"], problemiTipici: ["Costo elevato delle locazioni abitative.", "Inquinamento da polveri sottili (PM10).", "Gestione della sicurezza notturna nelle aree della movida."] },
        { id: "com-bg", regioneId: "reg-lom", nome: "Bergamo", livello: "comunale", temiPolitici: ["Trasporti", "Ambiente", "Politiche Giovanili"], problemiTipici: ["Infrastrutturazione della mobilità sostenibile.", "Gestione dell'impatto acustico dell'aeroporto di Orio al Serio."] },
        { id: "com-bs", regioneId: "reg-lom", nome: "Brescia", livello: "comunale", temiPolitici: ["Ambiente", "Economia", "Sanità"], problemiTipici: ["Bonifica dei siti industriali inquinati storici.", "Integrazione dei servizi di welfare locale per l'immigrazione."] },
        
        // LAZIO
        { id: "com-rm", regioneId: "reg-laz", nome: "Roma Capitale", livello: "comunale", temiPolitici: ["Ambiente", "Trasporti", "Sicurezza", "Politiche Giovanili"], problemiTipici: ["Efficienza della raccolta differenziata.", "Manutenzione stradale e frequenza del trasporto pubblico di superficie ATAC.", "Riqualificazione socio-culturale delle periferie storiche."] },
        { id: "com-lt", regioneId: "reg-laz", nome: "Latina", livello: "comunale", temiPolitici: ["Ambiente", "Economia", "Trasporti"], problemiTipici: ["Sviluppo delle infrastrutture di collegamento con la rete ferroviaria dorsale.", "Gestione ed erosione costiera del litorale."] },
        { id: "com-fr", regioneId: "reg-laz", nome: "Frosinone", livello: "comunale", temiPolitici: ["Ambiente", "Trasporti", "Sicurezza"], problemiTipici: ["Elevati livelli di inquinamento atmosferico nella valle del Sacco.", "Recupero funzionale del centro storico pedonale."] },
        
        // CAMPANIA
        { id: "com-na", regioneId: "reg-cam", nome: "Napoli", livello: "comunale", temiPolitici: ["Economia", "Trasporti", "Sicurezza", "Ambiente"], problemiTipici: ["Bassa percentuale di riscossione delle entrate tributarie locali.", "Regolarità delle linee metropolitane e bus ANM.", "Contrasto all'occupazione abusiva degli spazi pubblici."] },
        { id: "com-sa", regioneId: "reg-cam", nome: "Salerno", livello: "comunale", temiPolitici: ["Trasporti", "Ambiente", "Politiche Giovanili"], problemiTipici: ["Gestione dei flussi turistici stagionali.", "Manutenzione e ampliamento delle strutture scolastiche di competenza comunale."] },
        { id: "com-ce", regioneId: "reg-cam", nome: "Caserta", livello: "comunale", temiPolitici: ["Ambiente", "Sicurezza", "Politiche Giovanili"], problemiTipici: ["Valorizzazione delle aree adiacenti al polo monumentale.", "Contrasto alle discariche abusive nelle periferie urbane."] },
        
        // PIEMONTE
        { id: "com-to", regioneId: "reg-pie", nome: "Torino", livello: "comunale", temiPolitici: ["Economia", "Ambiente", "Trasporti", "Politiche Giovanili"], problemiTipici: ["Riconversione funzionale delle grandi aree industriali dismesse.", "Livelli strutturali di PM10 e mobilità ciclabile.", "Sostegno al commercio di vicinato."] },
        { id: "com-no", regioneId: "reg-pie", nome: "Novara", livello: "comunale", temiPolitici: ["Economia", "Trasporti", "Sicurezza"], problemiTipici: ["Gestione dell'impatto logistico dei grandi hub intermodali.", "Sicurezza nelle aree della stazione ferroviaria."] },
        { id: "com-cn", regioneId: "reg-pie", nome: "Cuneo", livello: "comunale", temiPolitici: ["Ambiente", "Trasporti", "Economia"], problemiTipici: ["Mantenimento dei collegamenti con le valli montane alpine.", "Efficientamento energetico del patrimonio edilizio comunale."] },
        
        // VENETO
        { id: "com-ve", regioneId: "reg-ven", nome: "Venezia", livello: "comunale", temiPolitici: ["Ambiente", "Economia", "Trasporti"], problemiTipici: ["Gestione dell'overtourism e spopolamento del centro storico insulare.", "Manutenzione dei canali ed equilibrio idrodinamico lagunare."] },
        { id: "com-pd", regioneId: "reg-ven", nome: "Padova", livello: "comunale", temiPolitici: ["Politiche Giovanili", "Trasporti", "Ambiente"], problemiTipici: ["Integrazione della popolazione studentesca universitaria.", "Completamento della rete delle linee tranviarie urbane."] },
        { id: "com-vr", regioneId: "reg-ven", nome: "Verona", livello: "comunale", temiPolitici: ["Trasporti", "Sicurezza", "Economia"], problemiTipici: ["Logistica dei flussi fieristici internazionali.", "Preservazione del decoro urbano nell'anfiteatro Arena."] },
        
        // EMILIA-ROMAGNA
        { id: "com-bo", regioneId: "reg-emr", nome: "Bologna", livello: "comunale", temiPolitici: ["Trasporti", "Politiche Giovanili", "Ambiente", "Economia"], problemiTipici: ["Moderazione della velocità urbana (Città 30) e sicurezza stradale.", "Tensione abitativa per studenti universitari fuori sede."] },
        { id: "com-pr", regioneId: "reg-emr", nome: "Parma", livello: "comunale", temiPolitici: ["Economia", "Ambiente", "Sanità"], problemiTipici: ["Sviluppo della filiera agroalimentare e logistica sostenibile.", "Welfare locale e assistenza alle persone anziane sole."] },
        { id: "com-ra", regioneId: "reg-emr", nome: "Ravenna", livello: "comunale", temiPolitici: ["Ambiente", "Economia", "Trasporti"], problemiTipici: ["Subsidenza e protezione idraulica del territorio costiero.", "Sviluppo infrastrutturale del porto commerciale ferro-nave."] },
        
        // TOSCANA
        { id: "com-fi", regioneId: "reg-tos", nome: "Firenze", livello: "comunale", temiPolitici: ["Economia", "Trasporti", "Sicurezza"], problemiTipici: ["Regolamentazione delle locazioni turistiche brevi nel patrimonio UNESCO.", "Ampliamento delle linee della tramvia urbana."] },
        { id: "com-pi", regioneId: "reg-tos", nome: "Pisa", livello: "comunale", temiPolitici: ["Politiche Giovanili", "Sicurezza", "Ambiente"], problemiTipici: ["Gestione della convivenza tra residenti e movida studentesca.", "Riqualificazione dei quartieri periferici della stazione."] },
        { id: "com-li", regioneId: "reg-tos", nome: "Livorno", livello: "comunale", temiPolitici: ["Economia", "Ambiente", "Trasporti"], problemiTipici: ["Riconversione delle aree industriali e portuali chimico-manifatturiere.", "Gestione del rischio idraulico dei rii cittadini."] },
        
        // PUGLIA
        { id: "com-ba", regioneId: "reg-pug", nome: "Bari", livello: "comunale", temiPolitici: ["Economia", "Trasporti", "Sicurezza", "Ambiente"], problemiTipici: ["Riqualificazione del fronte mare e dei quartieri storici.", "Potenziamento delle linee ferroviarie metropolitane suburbane."] },
        { id: "com-le", regioneId: "reg-pug", nome: "Lecce", livello: "comunale", temiPolitici: ["Ambiente", "Economia", "Politiche Giovanili"], problemiTipici: ["Pedonalizzazione ed efficientamento energetico del centro barocco.", "Carenza cronica di parcheggi di interscambio esterni."] },
        { id: "com-ta", regioneId: "reg-pug", nome: "Taranto", livello: "comunale", temiPolitici: ["Ambiente", "Economia", "Sanità", "Sicurezza"], problemiTipici: ["Riconversione economica ed ecologica legata all'impatto della grande industria.", "Riqualificazione edilizia dell'isola della Città Vecchia."] },
        
        // SICILIA
        { id: "com-pa", regioneId: "reg-sic", nome: "Palermo", livello: "comunale", temiPolitici: ["Trasporti", "Ambiente", "Economia", "Sicurezza"], problemiTipici: ["Stabilizzazione finanziaria del bilancio comunale in pre-dissesto.", "Regolarità del servizio di raccolta dei rifiuti solidi urbani."] },
        { id: "com-ct", regioneId: "reg-sic", nome: "Catania", livello: "comunale", temiPolitici: ["Economia", "Ambiente", "Sicurezza"], problemiTipici: ["Contrasto all'evasione dei tributi comunali.", "Gestione del rischio vulcanico ed efficientamento della rete idrica."] },
        { id: "com-me", regioneId: "reg-sic", nome: "Messina", livello: "comunale", temiPolitici: ["Trasporti", "Ambiente", "Economia"], problemiTipici: ["Pianificazione urbana legata alle varianti dell'attraversamento dello Stretto.", "Completamento del risanamento delle baraccopoli storiche."] },
        
        // SARDEGNA
        { id: "com-ca", regioneId: "reg-sard", nome: "Cagliari", livello: "comunale", temiPolitici: ["Trasporti", "Ambiente", "Economia", "Politiche Giovanili"], problemiTipici: ["Riorganizzazione della viabilità e cantierizzazione degli assi stradali centrali.", "Valorizzazione ambientale e turistica del compendio di Molentargius."] },
        { id: "com-ss", regioneId: "reg-sard", nome: "Sassari", livello: "comunale", temiPolitici: ["Economia", "Trasporti", "Sanità"], problemiTipici: ["Spopolamento del centro storico all'interno delle mura.", "Potenziamento dei servizi di trasporto per i poli universitari regionali."] },
        { id: "com-nu", regioneId: "reg-sard", nome: "Nuoro", livello: "comunale", temiPolitici: ["Politiche Giovanili", "Economia", "Trasporti"], problemiTipici: ["Frenare lo spopolamento giovanile tramite incubatori d'impresa locali.", "Isolamento della rete ferroviaria a scartamento ridotto."] }
    ]
};
