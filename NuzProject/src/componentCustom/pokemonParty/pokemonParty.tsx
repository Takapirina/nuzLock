import React from "react";
import './pokemonParty.scss'
import svg from '../../assets/sprite/other/Icons/ball-game-poke-sport-sports-svgrepo-com.svg';


interface pokemonMini {
    nome: string;
    specie: number;
}

const PokemonParty : React.FC<pokemonMini> = ({nome, specie}) => {
    return (
        <div className="cardPokemonParty">
            <div className="image-container">
                <img src={`/src/assets/sprite/pokemon/${specie}.png`} alt="clown" />
                <img src={svg} alt="poke" className="pokeball" />
            </div>
            <p>{nome}</p>
        </div>
    );
}

export default PokemonParty;