import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { giochiPokemon } from '../../resources';
import './schedaPartita.scss';
import { Partita } from '../../service/models';


interface SchedaPartitaProps {
    partita: Partita;
    onEdit: (partitaId: number, updatedPartita: Partita) => void;
}


function SchedaPartita({ partita, onEdit }: SchedaPartitaProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPartita, setEditedPartita] = useState(partita);
    const navigate = useNavigate();

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        onEdit(partita.id, editedPartita);
        setIsEditing(false);
    }

    const handleCancel = () => {
        setEditedPartita(partita);
        setIsEditing(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            setEditedPartita({
                ...editedPartita,
                opzioni: {
                    ...editedPartita.opzioni,
                    [name]: checked,
                }
            });
        } else {
            setEditedPartita({
                ...editedPartita,
                [name]: value,
            });
        }
    }

    return (
        <div className='scheda-partita'>
            {isEditing ? (
                <div className='scheda-partita-modifica'>
                    <input
                        type="text"
                        placeholder="Nome della partita"
                        name="nome"
                        value={editedPartita.nome}
                        onChange={handleChange}
                    />
                    <select
                        name="categoria"
                        value={editedPartita.categoria}
                        onChange={handleChange}
                    >
                        <option value="">Seleziona una categoria</option>
                        {giochiPokemon.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <label>
                        Opzioni:
                        <input
                            type="checkbox"
                            name="nuzlock"
                            checked={editedPartita.opzioni.nuzlock}
                            onChange={handleChange}
                        />
                        Nuzlock
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="soullink"
                            checked={editedPartita.opzioni.soullink}
                            onChange={handleChange}
                        />
                        SoulLink
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="randomizer"
                            checked={editedPartita.opzioni.randomizer}
                            onChange={handleChange}
                        />
                        Randomizer
                    </label>
                    <button onClick={handleSave}>Salva</button>
                    <button onClick={handleCancel}>Annulla</button>
                </div>
            ) : (
                <div>
                    <h3>{partita.nome}</h3>
                    <p>Pokemon: {giochiPokemon.find(pokemon => pokemon.value == partita.categoria)?.label}</p>
                    <p>Opzioni:</p>
                    <ul>
                        <li>Nuzlock: {partita.opzioni.nuzlock ? 'Selezionato' : 'Non selezionato'}</li>
                        <li>SoulLink: {partita.opzioni.soullink ? 'Selezionato' : 'Non selezionato'}</li>
                        <li>Randomizer: {partita.opzioni.randomizer ? 'Selezionato' : 'Non selezionato'}</li>
                    </ul>
                    <button onClick={() => navigate('/partita', { state: { partita } })}>Apri Partita</button>
                    <button onClick={handleEdit}>Modifica</button>
                </div>
            )}
        </div>
    );
}

export default SchedaPartita;
