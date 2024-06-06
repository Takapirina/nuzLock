import { useEffect, useState } from 'react'
import './App.css'
import { PokemonInfo } from './service/models'
import PokemonCard from './componentCustom/pokemonCardComponent/pokemonCardComponent';

function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [pokemonData, setPokemonData] = useState<PokemonInfo | null>(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const generateRandomNumber = () => {
      setRandomNumber(Math.floor(Math.random() * 1025) + 1);
    };

    generateRandomNumber();
  }, []);

  useEffect(() => {
    const loadPokemonData = async () => {
      if (randomNumber > 0) {
        try {
          const response = await import(`./scripts_DataBase/pokemonData/dati${randomNumber}.json`);
          setPokemonData(response.default);
        } catch (error) {
          console.error('Errore durante il caricamento dei dati del Pokémon:', error);
        }
      }
    };

    loadPokemonData();
  }, [randomNumber]);

  const handlePlusOne = () => {
    setRandomNumber(randomNumber + 1);
  }
  const handleMinusOne = () => {
    setRandomNumber(randomNumber - 1);
  }
  const handleMouseOver = () => {
    setShowCard(true);
  };
  const handleMouseOut = () => {
    setShowCard(false);
  };

  return (
    <>
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <h3>{randomNumber}</h3>
      {pokemonData ? (
        <>
          <img src={pokemonData.immagine} alt="" />
          <p>{pokemonData.nome}</p>
        </>
      ) : (<p>Caricamento...</p>)}
      </div>
      <button onClick={handleMinusOne}>Go previous</button>
      <button onClick={handlePlusOne}>Go next</button>
      {showCard&&
        <PokemonCard id={randomNumber}/>
      }
    </>
  );
}

export default App;