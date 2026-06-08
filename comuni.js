const COMUNI = {
  Bologna: [
    {
      titolo: "Centro storico e ZTL",
      scenario: "Conflitto tra residenti e commercianti nel centro storico.",
      scelte: [
        { testo: "Ampliare ZTL", impatto: { sociale: 1, economico: -1, consenso: -1 } },
        { testo: "Bloccare restrizioni", impatto: { sociale: -1, economico: 2, consenso: 1 } },
        { testo: "Compromesso orari", impatto: { sociale: 2, economico: 1, consenso: 2 } }
      ]
    }
  ],

  Milano: [
    {
      titolo: "Traffico e inquinamento",
      scenario: "Congestione urbana e politiche ambientali in tensione.",
      scelte: [
        { testo: "ZTL estese", impatto: { sociale: -1, economico: -1, consenso: -1 } },
        { testo: "Trasporto pubblico", impatto: { sociale: 2, economico: 1, consenso: 2 } },
        { testo: "Nessuna restrizione", impatto: { sociale: -2, economico: 1, consenso: 1 } }
      ]
    }
  ],

  Roma: [
    {
      titolo: "Trasporti pubblici inefficienti",
      scenario: "Rete metro e autobus sotto pressione costante.",
      scelte: [
        { testo: "Investimenti massicci ATAC", impatto: { sociale: 2, economico: -1, consenso: 1 } },
        { testo: "Privatizzazione parziale", impatto: { sociale: 0, economico: 1, consenso: 1 } },
        { testo: "Riduzione linee", impatto: { sociale: -2, economico: 1, consenso: -1 } }
      ]
    }
  ]
};
