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
        <button type="submit">Search</button>
      </form>

      {/* If error occur, display error */}
      {error && <p style={{color: 'red'}}>{error}</p>}

      {/* Display the default pokemon sprite if no error occurred */}
      {pokemonData && (
        <div>
            <img src={pokemonData.sprites.front_default} alt="front default"/>
            <img src={pokemonData.sprites.back_default} alt="back default"/>
            <img src={pokemonData.sprites.front_shiny} alt="front shiny"/>
            <img src={pokemonData.sprites.back_shiny} alt="back shiny"/>
        </div>
      )}

      {/* Display the female variant if it exists */}
      {pokemonData.sprites.front_female && (
        <div>
          <img src={pokemonData.sprites.front_female} alt="front female"/>
          <img src={pokemonData.sprites.back_female} alt="back female"/>  
          <img src={pokemonData.sprites.front_shiny_female} alt="front shiny female"/>
          <img src={pokemonData.sprites.back_shiny_female} alt="back shiny female"/>
        </div>
      )}
    </>
  );
}

export default App;
