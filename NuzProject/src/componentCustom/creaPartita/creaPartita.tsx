import { useState } from 'react';
import './creaPartita.scss'


interface CreaPartitaProps {
    addPartita: (partitaDetails: any) => void;
}

function CreaPartita({ addPartita }: CreaPartitaProps) {
    const [showModal, setShowModal] = useState(false);
    const [partitaDetails, setPartitaDetails] = useState<any>({
        nome: '',
        categoria: '', // Proprietà per la select
        opzioni: { // Proprietà per le checkbox
            opzione1: false,
            opzione2: false,
            opzione3: false,
        }
    });
    const categorieOptions = [
        { value: 'A', label: 'Categoria A' },
        { value: 'B', label: 'Categoria B' },
        { value: 'C', label: 'Categoria C' },
    ];
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
                Crea Partita
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
                        {categorieOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <label>
                        Opzioni:
                        <input
                            type="checkbox"
                            name="opzione1"
                            checked={partitaDetails.opzioni.opzione1}
                            onChange={handleChange}
                        />
                        Opzione 1
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="opzione2"
                            checked={partitaDetails.opzioni.opzione2}
                            onChange={handleChange}
                        />
                        Opzione 2
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="opzione3"
                            checked={partitaDetails.opzioni.opzione3}
                            onChange={handleChange}
                        />
                        Opzione 3
                    </label>
                    <button onClick={handleSave}>Salva</button>
                    <button onClick={() => setShowModal(false)}>Annulla</button>
                </div>
            )}
        </>
    )
}
export default CreaPartita;