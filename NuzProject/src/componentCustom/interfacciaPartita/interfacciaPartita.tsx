import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { giochiPokemon } from '../../resources';

const InterfacciaPartita = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const partita = location.state?.partita;

    return (
        <div>
            {partita ? (
                <div>
                    <h3>{partita.nome}</h3>
                    <p>Categoria: {giochiPokemon.find(pokemon => pokemon.value == partita.categoria)?.label}</p>
                    <p>Opzioni:</p>
                    <ul>
                        <li>Nuzlock: {partita.opzioni.nuzlock ? 'Selezionato' : 'Non selezionato'}</li>
                        <li>SoulLink: {partita.opzioni.soullink ? 'Selezionato' : 'Non selezionato'}</li>
                        <li>Randomizer: {partita.opzioni.randomizer ? 'Selezionato' : 'Non selezionato'}</li>
                    </ul>
                    <button onClick={() => navigate('/')}>Torna alla Home</button>
                </div>
            ) : (
                <p>Nessuna partita selezionata</p>
            )}
        </div>
    );
}

export default InterfacciaPartita;
