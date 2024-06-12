import './interfacciaPartita.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PokemonPokedex } from '../../service/models';
import ComponentGame from '../../component/componentGame';
import ComponentMenu from '../../component/componentMenu';
import ComponentRecap from '../../component/componentRecap';
import WidgetMenu from '../../componentCustom/widgetMenu/widgetMenu';
import WidgetPokedex from '../../componentCustom/widgetPokedex/widgetPokedex';
import TeamLayout from '../../componentCustom/teamLayout/teamLayout';

function InterfacciaPartita () {
    const location = useLocation();
    const navigate = useNavigate();
    const partita = location.state?.partita;

    const [selectedPokemon, setSelectedPokemon] = useState<PokemonPokedex | null>(null);

    const handlePokemonSelection = (pokemon: PokemonPokedex) => {
        setSelectedPokemon(pokemon);
    };

    return (
        <>
            <div className='interfaccia-partita'>
                <div className='widget-utility'>
                    <WidgetMenu className='menu'/>
                    <ComponentMenu className='add-widget'/>
                    <WidgetPokedex className='pokedex' onPokemonSelect={handlePokemonSelection} selectedPokemon={selectedPokemon} />
                </div>
                <div className='widget-game'>
                    <ComponentGame className='objective'/>
                    <TeamLayout className='team-layout' selectedPokemon={selectedPokemon} />
                </div>
                <div className='widget-recap'>
                    <ComponentRecap/>
                </div>
            </div>
        </>
    );
}

export default InterfacciaPartita;
