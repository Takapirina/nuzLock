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
    // Ottieni i dettagli dei Pokedex
    const versionGroupName = gameData.version_group.name;

    const versionGroupDetails = await fetchJson(gameData.version_group.url);

    const generation = versionGroupDetails.generation.name;

    const generationDetails = await fetchJson(
      versionGroupDetails.generation.url
    );

    const regionName = generationDetails.main_region.name;

   // const regionDetails = await fetchJson(generationDetails.main_region.url);

    const pokedexDetails = await fetchJson(versionGroupDetails.pokedexes[0].url);

    const pokemonEntries = pokedexDetails.pokemon_entries;

    const pokemonData = [];

    for (const pokemon of pokemonEntries) {
        console.log(pokemon.pokemon_species.url)
      const pokemonSpeciesUrl = pokemon.pokemon_species.url;
      
      const pokemonSpecies = await fetchJson(pokemonSpeciesUrl);

      const pokemonName = pokemon.pokemon_species.name;
      const pokemonId = pokemonSpecies.id; 

      pokemonData.push({
        name: pokemonName,
        id: pokemonId
      });
    }

    const infoVersione = {
      gioco: gameName,
      versione: versionGroupName,
      generazione: generation,
      regione: regionName,
      pokemon_list: pokemonData
      // pokedex: pokedexes
      // percorsi: percorsi,
    };

    console.log(infoVersione);

    const jsonData = JSON.stringify(infoVersione, null, 2);

    const dirPath = "./versionData";
    const filePath = path.join(dirPath, `version${idVersione}.json`);

    await fs.mkdir(dirPath, { recursive: true });

    await fs.writeFile(filePath, jsonData, "utf8");
    console.log(
      `File JSON per versione ${idVersione} creato con successo nella cartella ${dirPath}`
    );
  } catch (err) {
    console.error(`Errore nel fetch della versione con ID ${idVersione}:`, err);
  }
}

fetchRegionData();
