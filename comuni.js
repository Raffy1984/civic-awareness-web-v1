// File: comuni.js
// Sincronizzazione automatica di tutti i 7.896 comuni e paesi d'Italia

let listaComuniItaliani = [];

// Questo blocco si attiva immediatamente e riempie l'array con OGNI paese d'Italia
(function() {
    const urlComuni = 'https://raw.githubusercontent.com/matteocontrini/comuni-italiani/master/comuni.json';
    
    fetch(urlComuni)
        .then(response => {
            if (!response.ok) throw new Error("Errore nel caricamento del database comuni");
            return response.json();
        })
        .then(data => {
            // Mappa e inserisce ogni singolo paese con nome e provincia
            listaComuniItaliani = data.map(c => ({
                name: c.nome,
                prov: c.provincia.sigla || c.provincia.nome
            })).sort((a, b) => a.name.localeCompare(b.name));
            
            console.log(`✅ Database Comunale pronto: caricati con successo ${listaComuniItaliani.length} comuni e paesi.`);
        })
        .catch(error => {
            console.error("⚠️ Impossibile caricare i comuni remoti. Uso backup d'emergenza.");
            // Backup minimo in caso di assenza di rete
            listaComuniItaliani = [
                { name: "Roma", prov: "RM" },
                { name: "Milano", prov: "MI" },
                { name: "Napoli", prov: "NA" }
            ];
        });
})();
