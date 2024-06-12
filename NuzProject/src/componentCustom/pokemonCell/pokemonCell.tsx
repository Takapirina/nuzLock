import { PokemonPokedex } from '../../service/models';

interface PokemonCellProps {
    className?: string;
    pokemon: PokemonPokedex;
    onOpenModal: (pokemon: PokemonPokedex) => void;
    onPokemonSelect: (pokemon: PokemonPokedex) => void;
}

function PokemonCell({ className, pokemon, onOpenModal, onPokemonSelect }: PokemonCellProps) {
    
    const handlePokemonSelect = () => {
        onPokemonSelect(pokemon); // Chiamata della funzione onPokemonSelect quando il pokemon viene selezionato
    }

    return (
        <div className={className} key={pokemon.id}>
            <div className='pokemon-name'>{pokemon.name}</div>
            <img onClick={handlePokemonSelect} src={`src/assets/sprite/pokemon/versions/generation-vii/icons/${pokemon.id}.png`} alt={pokemon.name} />
        </div>
    );
}

export default PokemonCell;
