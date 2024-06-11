import { useEffect, useState } from 'react';
import ComponentMenu from '../../component/componentMenu';
import './widgetPokedex.scss'
import { PokemonGameJSON, PokemonPokedex } from '../../service/models';
import pokemonGameData from '../../scripts_DataBase/versionData/version4.json';
interface WidgetPokedexProps {
    className?: string;
}

function WidgetPokedex({ className }: WidgetPokedexProps) {
    // Initialize state variables
    const [pokedex, setPokedex] = useState<PokemonPokedex[] | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

    useEffect(() => {
        // Fetch data and set state only once
        setPokedex(pokemonGameData.pokemon_list);
        const loadImages = () => {
            const promises = pokemonGameData.pokemon_list.map((pokemon) => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.src = `src/assets/sprite/pokemon/versions/generation-vii/icons/${pokemon.id}.png`;
                    img.onload = () => resolve();
                    img.onerror = () => reject();
                });
            });

            Promise.all(promises)
                .then(() => setImagesLoaded(true))
                .catch((err) => console.error("Failed to load images", err));
        };

        loadImages();
    }, []);
    
    if (!pokedex) {
        return <div>Loading...</div>;
    }

    // Calculate page display based on current page and items per page
    const itemsPerPage = 12;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = pokedex.slice(startIndex, endIndex);
    const totalPages = Math.ceil(pokedex.length / itemsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    
    return (
        <div className={`pokedex-component`}>
            <ComponentMenu className={className}>
                {currentItems.map((pokemon: PokemonPokedex, index: number) => (
                    <div className='pokemon-cell' key={pokemon.id}>
                        <div className='pokemon-name'>{pokemon.name}</div>
                        <img src= {`src/assets/sprite/pokemon/versions/generation-vii/icons/${pokemon.id}.png`}/>
                    </div>
                ))}
            </ComponentMenu>
            <div className="navigation-buttons">
                <button className='previous' onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</button>
                <span>{currentPage + 1}</span>
                <span>/{totalPages}</span>
                <button className='next' onClick={handleNextPage} disabled={endIndex >= pokedex.length}>Next</button>
            </div>
        </div>
    );
}

export default WidgetPokedex;