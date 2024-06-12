import { useEffect, useState } from "react";
import './teamLayout.scss'
import ComponentGame from "../../component/componentGame";
import { Abilita, Mossa, PokemonInfo, PokemonPokedex } from "../../service/models";
import AbilitaComponent from "../../component/abilita";
import MossaComponent from "../../component/mossa";
import TipoComponent from "../../component/tipo";

interface TeamLayoutProps {
    className: string;
    selectedPokemon: PokemonPokedex | null; // Prop per il pokemon selezionato
}

function TeamLayout({ className, selectedPokemon }: TeamLayoutProps) {

    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedPokemon && selectedPokemon.id) {
                    const response = await import(`../../scripts_DataBase/pokemonData/dati${selectedPokemon.id}.json`);
                    setPokemonInfo(response.default);
                }
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, [selectedPokemon]);

    return (
        <ComponentGame className={className}>
            {selectedPokemon && pokemonInfo ? (
                <div className="pokemon-info-container">

                    <div className="pokemon-info">
                        <h2>{pokemonInfo.nome}</h2>
                        <img src={pokemonInfo.immagine} alt={pokemonInfo.nome} style={{ width: 150, height: 150 }} />

                        <div className="info-container">
                            <h4>Tipo</h4>
                            <div className="tipo-container">
                                {pokemonInfo.tipo.map((tipo) => (
                                    <TipoComponent tipo={tipo} />
                                ))}
                            </div>
                        </div>
                        <div className="info-container">
                            <h4>Abilità</h4>
                            <div className="abilita-container">
                                {pokemonInfo.abilita.map((abilita: Abilita, index: number) => (
                                    <AbilitaComponent className="abilita" ability={abilita} />
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="mosse-container">
                        <h4>Mosse</h4>
                        <div className="mosse-list">
                            {pokemonInfo.mosse.map((mossa: Mossa, index: number) => (
                                <MossaComponent key={index} mossa={mossa} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>No Pokémon selected</div>
            )}


        </ComponentGame>
    );
}

export default TeamLayout;
