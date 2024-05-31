import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import path from 'path';

async function fetchMove(url) {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Errore nel fetch della mossa: ${url} ${response.status} ${response.statusText}`);
    }
    
    const moveData = await response.json();
    return moveData;
}

async function fetchPokemonData(idPokemon) {
    const data = {};
    const promise = [];

    promise.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            .then(response => response.json())
            .then(async pokemonData => {

                const movesPromises = pokemonData.moves.map(async mossa => {
                    try {
                        const moveData = await fetchMove(mossa.move.url);
                        const giochi = [...new Set(mossa.version_group_details.map(v => v.version_group.name))];
                        return { gioco: giochi, nome: mossa.move.name, tipo: moveData.type.name, power: moveData.power, classe: moveData.damage_class.name };
                    } catch (error) {
                        console.error(`Errore nel fetch della mossa per il Pokémon ${idPokemon}:`, error.message);
                        return null;
                    }
                });
                const mosse = await Promise.all(movesPromises);
                
                data[idPokemon] = {
                    nome: pokemonData.name,
                    tipo: [
                        pokemonData.types[0].type.name,
                        pokemonData.types[1] ? pokemonData.types[1].type.name : '',
                    ],
                    abilita: [
                        { nome: pokemonData.abilities[0].ability.name, rarita: 'comune' },
                        { nome: pokemonData.abilities[1] ? pokemonData.abilities[1].ability.name : '', rarita: pokemonData.abilities[1]?.is_hidden ? 'nascosta' : 'comune' },
                        { nome: pokemonData.abilities[2] ? pokemonData.abilities[2].ability.name : '', rarita: pokemonData.abilities[2]?.is_hidden ? 'nascosta' : 'comune' },
                    ],
                    mosse: mosse,
                    immagine: `/src/assets/sprite/pokemon/${idPokemon}.png`,
                    miniIcon: `/src/assets/sprite/PKMN.NET_Sprite_Resource_4/icons/${idPokemon}.png`,
                };
            })
            .catch(err => console.error(`Errore nel fetch del Pokémon con ID ${idPokemon}:`, err))
    );

    await Promise.all(promise);

    const jsonData = JSON.stringify(data, null, 2);

    const dirPath = './pokemonData'; // Specifica la tua cartella qui
    const filePath = path.join(dirPath, `dati${idPokemon}.json`);

    try {

        await fs.mkdir(dirPath, { recursive: true });

        await fs.writeFile(filePath, jsonData, 'utf8');
        console.log(`File JSON per Pokémon ${idPokemon} creato con successo nella cartella ${dirPath}`);
    } catch (err) {
        console.error('Errore durante la scrittura del file:', err);
    }
}

import pLimit from 'p-limit';

const limit = pLimit(1); // Limite a 5 richieste contemporanee

async function fetchAllPokemonData() {
    const tasks = [];
    for (let i = 1; i <= 1025; i++) {
        tasks.push(limit(() => fetchPokemonData(i)));
    }
    await Promise.all(tasks);
}

fetchAllPokemonData();



