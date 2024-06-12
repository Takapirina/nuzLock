import { useState, useEffect } from 'react';
import './orologio.scss';

const Orologio = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000); // Aggiorna ogni secondo
        
        return () => clearInterval(intervalId); // Pulizia dell'intervallo quando il componente viene smontato
    }, []);

    const formatTime = (date:any) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return { hours, minutes };
    };

    const { hours, minutes } = formatTime(time);

    return (
        <div style={{ width: '300px', height: '300px' }}>
            <div className='contenitoreWidgetOrologio'>
                <p className='ora'>
                    {hours}
                    <span className='blinking-colon'>:</span>
                    {minutes}
                </p>
            </div>
        </div>
    );
};

export default Orologio;

