import { useEffect, useState } from 'react';
import { PokemonInfo } from '../../service/models';
import './pokemonCardComponent.scss';

interface PokemonCardProps {
    id: number;
    onClose?: () => void;
}


const PokemonCard = ({ id, onClose }: PokemonCardProps) => {
    const [pokemonData, setPokemonData] = useState<PokemonInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPokemonData = async () => {
            try {
                const response = await import(`../../scripts_DataBase/pokemonData/dati${id}.json`);
                setPokemonData(response.default);
            } catch (error) {
                console.error('Errore durante il caricamento dei dati del Pokémon:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadPokemonData();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!pokemonData) {
        return <div>Errore nel caricamento dei dati del Pokémon.</div>;
    }

    return (
        <div className='pokemon-card'>
            <button className="close-button" onClick={onClose}>Close</button>
            <h3 className='name'>{pokemonData.nome}</h3>
            <img className='image' src={pokemonData.immagine} alt={pokemonData.nome} />
            <div className='pokemon-type-container'>
                {pokemonData.tipo.map((type, index) =>
                    type ? <span key={index} className={`type ${type}`}>{type}</span> : null
                )}
            </div>

            <div className='pokemon-ability-container'>
                {pokemonData.abilita.map((ability, index) => (
                    ability.nome ? (
                        <div key={index} className='single-ability-container'>
                            <span className='ability'>{ability.nome}</span>
                            <span className='rarity'>{ability.rarita}</span>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    );
}

export default PokemonCard;
