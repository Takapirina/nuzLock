import fetch from 'node-fetch';
import pLimit from 'p-limit';
import { promises as fs } from 'fs';
import path from 'path';


const limit = pLimit(1); // Limite a 1 richiesta contemporanea

async function fetchRegionData() {
    const tasks = [];
    // for (let i = 1; i <= 9; i++) {
    //     tasks.push(limit(() => fetchPokemonData(i)));
    // }

    tasks.push(limit(() => fetchRegion(1)));
    await Promise.all(tasks);
}
async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Errore HTTP! stato: ${response.status}`);
    }
    return await response.json();
}

async function fetchRegion(idRegione) {
    try {
        const regionUrl = `https://pokeapi.co/api/v2/region/${idRegione}`;
        const regionData = await fetchJson(regionUrl);

        // Ottieni i dettagli dei Pokedex
        const pokedexPromises = regionData.pokedexes.map(async (pokedex) => {
            const pokedexData = await fetchJson(pokedex.url);
            return {
                nome: pokedex.name,
                listaPokemon: pokedexData.pokemon_entries.map(entry => ({
                    nome: entry.pokemon_species.name,
                    id: entry.pokemon_species.url.split('/').slice(-2, -1)[0] // Estrae l'ID dall'URL
                }))
            };
        });

        const pokedexes = await Promise.all(pokedexPromises);

        // Ottieni i dettagli delle location
        const locationPromises = regionData.locations.map(async (location) => {
            const locationData = await fetchJson(location.url);
            
            // Ottieni i dettagli delle aree di ogni location
            const areaPromises = locationData.areas.map(async (area) => {
                const areaData = await fetchJson(area.url);

                // Ottieni i dettagli degli incontri per ogni area
                const encounterPromises = areaData.pokemon_encounters.map(async (encounter) => {
                    return encounter.version_details.map(detail => ({
                        id_pokemon: encounter.pokemon.url.split('/').slice(-2, -1)[0],
                        name: encounter.pokemon.name,
                        percentuale: detail.encounter_details[0]?.chance,
                        giorno_notte: detail.encounter_details[0]?.time_of_day || "sconosciuto"
                    }));
                });

                const incontri = await Promise.all(encounterPromises);

                return {
                    nome: area.name,
                    metodi: incontri.flat() // Appiattisce l'array
                };
            });

            const aree = await Promise.all(areaPromises);

            return {
                nome: location.name,
                aree: aree
            };
        });

        const percorsi = await Promise.all(locationPromises);


        const infoRegione = {
            nome: regionData.name,
            pokedexes: pokedexes,
            percorsi: percorsi,
        };

        console.log(infoRegione);

        const jsonData = JSON.stringify(infoRegione, null, 2);

        const dirPath = './regionData'; // Specifica la tua cartella qui
        const filePath = path.join(dirPath, `region${idRegione}.json`);

        await fs.mkdir(dirPath, { recursive: true });

        await fs.writeFile(filePath, jsonData, 'utf8');
        console.log(`File JSON per Regione ${idRegione} creato con successo nella cartella ${dirPath}`);
    } catch (err) {
        console.error(`Errore nel fetch della Regione con ID ${idRegione}:`, err);
    }
}

fetchRegionData();