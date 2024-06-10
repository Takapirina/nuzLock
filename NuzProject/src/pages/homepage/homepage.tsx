import CreaPartita from '../../componentCustom/creaPartita/creaPartita';
import SchedaPartita from '../../componentCustom/schedaPartita/schedaPartita';
import { useState } from 'react';
import './homepage.scss'

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

function Homepage() {
    const [partite, setPartite] = useState<Partita[]>([]);

    const addPartita = (partitaDetails: any) => {
        if(partite.length<5){
        const newPartita: Partita = {
            id: partite.length + 1,
            nome: partitaDetails.nome,
            categoria: partitaDetails.categoria,
            opzioni: partitaDetails.opzioni,
        };
        setPartite([...partite, newPartita]);
    }
}

    const handleEditPartita = (partitaId: number, updatedPartita: Partita) => {
        const updatedPartite = partite.map(partita =>
            partita.id === partitaId ? updatedPartita : partita
        );
        setPartite(updatedPartite);
    }
    return (
        <>
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
        </>
    )
}
export default Homepage;