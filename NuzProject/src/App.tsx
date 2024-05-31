import { useEffect, useState } from 'react'
import './App.css'
import { PokemonInfo } from './service/models'

function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [pokemonData, setPokemonData] = useState<PokemonInfo | null>(null);

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

  return (
    <>
      <h3>{randomNumber}</h3>
      {pokemonData? (
        <>
        <img src={pokemonData.immagine} alt="" />
        <p>{pokemonData.nome}</p>
        </>
      ):(<p>Caricamento...</p>)}
    </>
  );
}

export default App;