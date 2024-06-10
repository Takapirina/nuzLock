import './schedaPartita.scss'
import { useState } from 'react';

interface Partita {
    id: number;
    nome: string;
    categoria: string;
    opzioni: {
        opzione1: boolean;
        opzione2: boolean;
        opzione3: boolean;
    };
}
interface SchedaPartitaProps {
    partita: Partita;
    onEdit: (partitaId: number, updatedPartita: Partita) => void;
}

function SchedaPartita({ partita, onEdit  }:SchedaPartitaProps) {
    const [showModal, setShowModal] = useState(false);
    const [editedPartita, setEditedPartita] = useState(partita);

    const handleEdit = () => {
        setShowModal(true);
    }

    const handleSave = () => {
        onEdit(partita.id, editedPartita);
        setShowModal(false);
    }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setEditedPartita({
                ...editedPartita,
                opzioni: {
                    ...editedPartita.opzioni,
                    [name]: (e.target as HTMLInputElement).checked,
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
        <>
             <div className='scheda-partita'>
             <h3>{partita.nome}</h3>
            <p>Categoria: {partita.categoria}</p>
            <p>Opzioni:</p>
            <ul>
                <li>Opzione 1: {partita.opzioni.opzione1 ? 'Selezionato' : 'Non selezionato'}</li>
                <li>Opzione 2: {partita.opzioni.opzione2 ? 'Selezionato' : 'Non selezionato'}</li>
                <li>Opzione 3: {partita.opzioni.opzione3 ? 'Selezionato' : 'Non selezionato'}</li>
            </ul>
            <button>Apri Partita</button>
            <button onClick={handleEdit}>Modifica</button>
            
            {showModal && (
                <div className='scheda-partita-modal'>
                    <h2>Modifica Partita</h2>
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
                        <option value="A">Categoria A</option>
                        <option value="B">Categoria B</option>
                        <option value="C">Categoria C</option>
                    </select>
                    <label>
                        Opzioni:
                        <input
                            type="checkbox"
                            name="opzione1"
                            checked={editedPartita.opzioni.opzione1}
                            onChange={handleChange}
                        />
                        Opzione 1
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="opzione2"
                            checked={editedPartita.opzioni.opzione2}
                            onChange={handleChange}
                        />
                        Opzione 2
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="opzione3"
                            checked={editedPartita.opzioni.opzione3}
                            onChange={handleChange}
                        />
                        Opzione 3
                    </label>
                    <button onClick={handleSave}>Salva</button>
                    <button onClick={() => setShowModal(false)}>Annulla</button>
                </div>
            )}
        </div>

        </>
    )
}
export default SchedaPartita;