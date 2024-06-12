import React, { useEffect, useState } from "react";
import './trainerCard.scss'
import PokemonParty from "../pokemonParty/pokemonParty";
import { Partita, FileData } from "../../service/models";


const TrainerCard: React.FC<Partita> = ({ id }) => {
    const [dati, setDati] = useState<FileData | null>(null);

    useEffect(() => {
        const loadPokemonData = async () => {
            try {
                const response = await import(`../../others/fileData${id}.json`);
                setDati(response.default);
            } catch (error) {
                console.error("Error loading Pokemon data:", error);
            }
        };
        loadPokemonData();
    }, [id]);

    return (
        <div className="infografica">
            <div className="tagContenitore">
            <p>{dati?.game}</p>
            <div className="GamplaySaveData">
                <p>{dati?.start}</p>
                <p>{dati?.last}</p>
                <p> ✖ delete</p> {/* aggiungere pulsante elimina*/}
                <p> 🖉 modify</p> {/* aggiungere pulsante modifica*/}
            </div>
            <div className="tagMode">
                <p>{dati?.mode}</p>
            </div>
            </div>
            <div className="card">
            <div className="allenatore">
                <img src={`/src/assets/sprite/other/Trainer/${dati?.sprite}.png`} alt="clown" className="allenatore-clown" />
                <p>{dati?.name}</p>
            </div>
            <div className="other">
            <div className="listaSquadra">
                {dati?.squadra.map((pokemon) => (<PokemonParty nome={pokemon.nome} specie={pokemon.specie}/>))}
            </div>
            <div className="badgesContainer">
                {dati?.badges.map((badge) =>(<img src={`/src/assets/sprite/other/badge/${badge.id}.png`} alt="" className="badge" style={{filter: badge.defeat ? 'none' : 'grayscale(100%)'}}/>))}
            </div>
            </div>
            </div>
        </div>
    );
};

export default TrainerCard;
