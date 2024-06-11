import fetch from "node-fetch";
import pLimit from "p-limit";
import { promises as fs } from "fs";
import path from "path";

const limit = pLimit(1); // Limite a 1 richiesta contemporanea

async function fetchRegionData() {
  const tasks = [];
  tasks.push(limit(() => fetchVersion(4)));
  await Promise.all(tasks);
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Errore HTTP! stato: ${response.status}`);
  }
  return await response.json();
}

async function fetchVersion(idVersione) {
  try {
    const versionUrl = `https://pokeapi.co/api/v2/version/${idVersione}`;
    const gameData = await fetchJson(versionUrl);

    const gameName = gameData.name;
    const versionGroupName = gameData.version_group.name;
    const versionGroupDetails = await fetchJson(gameData.version_group.url);
    const generation = versionGroupDetails.generation.name;

    const regionData = [];

    for (const region of versionGroupDetails.regions) {
      const regionInfo = [];
      const regionName = { "regione": region.name };
      regionInfo.push(regionName);

      const regionDetails = await fetchJson(region.url);

      for (const location of regionDetails.locations) {
        const locationInfo = [];
        const locationName = { "percorso": location.name };
        let methodEncounter = {};
        locationInfo.push(locationName);

        const locationDetails = await fetchJson(location.url);

        if (locationDetails.areas) {
          for (const area of locationDetails.areas) {
            const locationAreaDetails = await fetchJson(area.url);

            for (const pokemonEncounter of locationAreaDetails.pokemon_encounters) {

              for (const pokemonInGame of pokemonEncounter.version_details) {
                if (pokemonInGame.version.name == gameName) {
                  const pokemonName = pokemonEncounter.pokemon.name;

                  for (const encounterDetail of pokemonInGame.encounter_details) {
                    const chance = encounterDetail.chance + " %";
                    const methodName = encounterDetail.method.name;

                    if (!methodEncounter[methodName]) {
                      methodEncounter[methodName] = [];
                    }

                    methodEncounter[methodName].push({ pokemon: pokemonName, chance: chance });
                  }
                }
              }
            }
          }
        }

        const encounters = [];
        for (const [method, pokemons] of Object.entries(methodEncounter)) {
          encounters.push({ metodo: method, pokemons: pokemons });
        }

        locationInfo.push({ incontri: encounters });
        regionInfo.push(locationInfo);
      }
      regionData.push(regionInfo);
    }

    const pokedexDetails = await fetchJson(versionGroupDetails.pokedexes[0].url);
    const pokemonEntries = pokedexDetails.pokemon_entries;

    const pokemonData = [];
    for (const pokemon of pokemonEntries) {
      const pokemonSpeciesUrl = pokemon.pokemon_species.url;
      const pokemonSpecies = await fetchJson(pokemonSpeciesUrl);

      const pokemonName = pokemonSpecies.name;
      const pokemonId = pokemonSpecies.id;

      pokemonData.push({
        name: pokemonName,
        id: pokemonId,
      });
    }

    const infoVersione = {
      gioco: gameName,
      versione: versionGroupName,
      generazione: generation,
      regioni: regionData,
      pokemon_list: pokemonData,
    };

    console.log(infoVersione);

    const jsonData = JSON.stringify(infoVersione, null, 2);

    const dirPath = "./versionData";
    const filePath = path.join(dirPath, `version${idVersione}.json`);

    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(filePath, jsonData, "utf8");
    console.log(`File JSON per versione ${idVersione} creato con successo nella cartella ${dirPath}`);
  } catch (err) {
    console.error(`Errore nel fetch della versione con ID ${idVersione}:`, err);
  }
}

fetchRegionData();
