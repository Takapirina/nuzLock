

export interface Abilita {
    nome: string;
    rarita: string;
}

export interface Mossa {
    gioco: string[];
    nome: string;
    tipo: string;
    power: number | null;
    classe: string;
}

export interface PokemonInfo {
    nome: string;
    tipo: string[];
    abilita: Abilita[];
    mosse: Mossa[];
    immagine: string;
    miniIcon?: string;
}

export interface PokemonPokedex {
    id: number;
    name: string;
}

export interface PokemonGameJSON {
    gioco: string;
    versione: string;
    generazione: string;
    regioni: Regione[];
    pokemon_list: PokemonPokedex[];
}

export interface Regione {
 percorso: Percorso;
 incontri:Incontri;
}

export interface Percorso {
    incontro: Incontri[];
}

export interface Incontri {
    metodo: string;
    pokemons: PokemonChance[];
}

export interface PokemonChance {
    pokemon: string;
    chance: string;
}

export interface Partita {
    id: number;
    nome: string;
    categoria: number;
    opzioni: {
        nuzlock: boolean;
        soullink: boolean;
        randomizer: boolean;
    };
}

export interface Partita {
    id: number;
}

export interface FileData {
    name: string;
    sprite: number;
    squadra: PokemonEasy[];
    badges: Badge[];
}

export interface Badge {
    id: number;
    defeat:boolean;
}

export interface PokemonEasy {
    nome: string;
    specie: number;
}