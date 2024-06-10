

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