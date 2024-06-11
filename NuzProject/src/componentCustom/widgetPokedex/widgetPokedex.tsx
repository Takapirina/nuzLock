import { useEffect, useState } from 'react';
import ComponentMenu from '../../component/componentMenu';
import './widgetPokedex.scss'
import { PokemonPokedex } from '../../service/models';

interface WidgetPokedexProps {
    className?: string;
}

1 - 252

function WidgetPokedex({ className }: WidgetPokedexProps) {
    // const pokedexArray = [
    //     'Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Jigglypuff',
    //     'Meowth', 'Psyduck', 'Machop', 'Geodude', 'Onix',
    //     'Cubone', 'Hitmonlee', 'Eevee', 'Vulpix', 'Snorlax',
    //     'Dragonite', 'Mewtwo'
    // ];
    const [pokedex, setPokedex] = useState<PokemonPokedex>();
    useEffect(() => {
        fetch()
    })
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = pokedex.slice(startIndex, endIndex);
    const totalPages = Math.ceil(pokedex.length / itemsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(pokedex.length / itemsPerPage)));
    };


    return (
        <>
            <div className='pokedex-component'>
                <ComponentMenu className={className}>
                    {currentItems.map((pokemon, index) => (
                        <div key={index}>
                            {pokemon}
                        </div>
                    ))}
                </ComponentMenu>
                <div className="navigation-buttons">
                    <button className='previous' onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</button>
                    <span>{currentPage + 1}</span>/
                    <span>{totalPages}</span>
                    <button className='next' onClick={handleNextPage} disabled={endIndex >= pokedex.length}>Next</button>
                </div>
            </div>
        </>
    )
}
export default WidgetPokedex;