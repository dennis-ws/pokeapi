import React, {useState} from 'react';
import './App.css';

// return the json of the pokemon that was searched
async function fetchPokemon(pokemon) {
  console.log(pokemon.get("query"))
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.get("query")}/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }

}

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const formData = new FormData(event.target)
    const data = await fetchPokemon(formData)

    if (data) {
      setPokemonData(data);
      setError(null);
    } else {
      setError("Pokemon not found!");
      setPokemonData(null);
    }
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="query"/>
      </form>

      {/* If error occur, display error */}
      {error && <p style={{color: 'red'}}>{error}</p>}

      {/* Display pokemon if no error occurred */}
      {pokemonData && (
        <div>
          <img src={pokemonData.sprites.front_default}/>
        </div>
      )}
    </>
  );
}

export default App;
