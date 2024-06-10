import { useEffect, useState } from 'react';
import { PokemonInfo } from '../../service/models';
import './pokemonCardComponent.scss'



const PokemonCard = ({ id }: { id: number }) => {
    const [pokemonData, setPokemonData] = useState<PokemonInfo | null>(null);

    useEffect(() => {
        console.log("Entro nel useEffect")
        const loadPokemonData = async () => {

            try {
                console.log("Entro nel try")
                const response = await import(`../../scripts_DataBase/pokemonData/dati${id}.json`);
                console.log("sono dopo la response")
                console.log(response.data)
                setPokemonData(response.default);
            } catch (error) {
                console.error('Errore durante il caricamento dei dati del Pokémon:', error);
            }
        };
        loadPokemonData();
    }, [id]);

    return (
        <>
            <div className='pokemon-card'>
                <h3 className='name'>{pokemonData?.nome}</h3>
                <img className='image' src={pokemonData?.immagine}></img>
                <div className='pokemon-type-container'>
                    {pokemonData?.tipo.map(type =>
                        <>
                            {type != "" ? <span className={`type ${type}`}>{type}</span> : null}
                        </>
                    )}
                </div>
                    Test

                <div className='pokemon-ability-container'>  {/* Added key prop for uniqueness */}
                    {pokemonData?.abilita.map((ability) => (
                        <>
                            {ability.nome ? (
                                <>
                                    <div className='single-ability-container'>
                                        <span className='ability'>{ability.nome}</span>
                                        <span className='rarity'>{ability.rarita}</span>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </>
                    ))}
                </div>

            </div>
        </>
    )
}

export default PokemonCard;