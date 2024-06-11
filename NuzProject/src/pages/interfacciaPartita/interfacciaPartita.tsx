import './interfacciaPartita.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { giochiPokemon } from '../../resources';
import ComponentGame from '../../component/componentGame';
import ComponentMenu from '../../component/componentMenu';
import ComponentRecap from '../../component/componentRecap';
import WidgetMenu from '../../componentCustom/widgetMenu/widgetMenu';
import WidgetPokedex from '../../componentCustom/widgetPokedex/widgetPokedex';

function InterfacciaPartita () {
    const location = useLocation();
    const navigate = useNavigate();
    const partita = location.state?.partita;

    return (
        <>
            <div className='interfaccia-partita'>
                <div className='widget-utility'>
                    <WidgetMenu className='menu'/>
                    <ComponentMenu className='add-widget'/>
                    <WidgetPokedex className='pokedex'/>
                </div>
                <div className='widget-game'>
                    <ComponentGame className='objective'/>
                    <ComponentGame className='team-layout'/>
                </div>
                <div className='widget-recap'>
                    <ComponentRecap/>
                </div>
            </div>
        </>
    );
}

export default InterfacciaPartita;
