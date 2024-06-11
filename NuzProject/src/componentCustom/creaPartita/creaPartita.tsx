import { useState } from 'react';
import { giochiPokemon } from '../../resources';
import './creaPartita.scss'

interface CreaPartitaProps {
    addPartita: (partitaDetails: any) => void;
}

function CreaPartita({ addPartita }: CreaPartitaProps) {
    const [showModal, setShowModal] = useState(false);
    const [partitaDetails, setPartitaDetails] = useState<any>({
        nome: '',
        categoria: 0, // Proprietà per la select
        opzioni: { // Proprietà per le checkbox
            opzione1: false,
            opzione2: false,
            opzione3: false,
        }
    });

    const handleSave = () => {
        addPartita(partitaDetails);
        setPartitaDetails({
            nome: '',
            categoria: '',
            opzioni: {
                opzione1: false,
                opzione2: false,
                opzione3: false,
            }
        });
        setShowModal(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setPartitaDetails({
                ...partitaDetails,
                opzioni: {
                    ...partitaDetails.opzioni,
                    [name]: (e.target as HTMLInputElement).checked,
                }
            });
        } else {
            setPartitaDetails({
                ...partitaDetails,
                [name]: value,
            });
        }
    }

    return (
        <>
            <div className='crea-partita' onClick={() => setShowModal(true)}>
                <h3>Crea Partita</h3>
            </div>

            {showModal && (
                <div className='crea-partita-modal'>
                    <input
                        type="text"
                        placeholder="Nome della partita"
                        name="nome"
                        value={partitaDetails.nome}
                        onChange={handleChange}
                    />
                    <select
                        name="categoria"
                        value={partitaDetails.categoria}
                        onChange={handleChange}
                    >
                        <option value="">Seleziona una categoria</option>
                        {giochiPokemon.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <label>
                        Sfide:
                        <input
                            type="checkbox"
                            name="nuzlock"
                            checked={partitaDetails.opzioni.nuzlock}
                            onChange={handleChange}
                        />
                        Nuzlock
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="soullink"
                            checked={partitaDetails.opzioni.soullink}
                            onChange={handleChange}
                        />
                        SoulLink
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="randomizer"
                            checked={partitaDetails.opzioni.randomizer}
                            onChange={handleChange}
                        />
                        Randomizer
                    </label>
                    <button onClick={handleSave}>Salva</button>
                    <button onClick={() => setShowModal(false)}>Annulla</button>
                </div>
            )}
        </>
    )
}
export default CreaPartita;