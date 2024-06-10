import React, { useState, useEffect } from 'react';
import CreaPartita from '../../componentCustom/creaPartita/creaPartita';
import SchedaPartita from '../../componentCustom/schedaPartita/schedaPartita';
import { Partita } from '../../service/models';
import './homepage.scss';



function Homepage() {
    const [partite, setPartite] = useState<Partita[]>([]);

    useEffect(() => {
        const savedPartite = JSON.parse(localStorage.getItem('partite') || '[]');
        setPartite(savedPartite);
    }, []);

    const addPartita = (partitaDetails: any) => {
        if (partite.length < 5) {
            const newPartita: Partita = {
                id: partite.length + 1,
                nome: partitaDetails.nome,
                categoria: partitaDetails.categoria,
                opzioni: partitaDetails.opzioni,
            };
            const updatedPartite = [...partite, newPartita];
            setPartite(updatedPartite);
            localStorage.setItem('partite', JSON.stringify(updatedPartite));
        }
    }

    const handleEditPartita = (partitaId: number, updatedPartita: Partita) => {
        const updatedPartite = partite.map(partita =>
            partita.id === partitaId ? updatedPartita : partita
        );
        setPartite(updatedPartite);
        localStorage.setItem('partite', JSON.stringify(updatedPartite));
    }

    return (
        <div className='homepage'>
            <CreaPartita addPartita={addPartita} />
            <div>
                {partite.map((partita) => (
                    <SchedaPartita
                        key={partita.id}
                        partita={partita}
                        onEdit={handleEditPartita} />
                ))}
            </div>
        </div>
    );
}

export default Homepage;
