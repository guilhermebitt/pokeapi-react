import { useState } from 'react';
import './Home.css';
import api from '../../services/api.ts';

function Home() {

  let pokemon = [{}];

  const [showingPoke, setShowingPoke] = useState<any>(false);

  const handleClick = () => {getPokemon()};

  async function getPokemon() {
    let pokeName = (document.getElementById('pokeInput') as HTMLInputElement)?.value;
    setShowingPoke(false);
    if (pokeName !== ''){
    pokemon = await api.get(`/${pokeName.toLowerCase()}`);
    setShowingPoke(pokemon);
  }
  };

  return (
    <main>
      <h1>PokéApi - Request</h1>
      <h2>To start, write a Pokémon name:</h2>
      <form onKeyDown={(event) => event.keyCode === 13 && event.preventDefault()}>
        <label>Pokemon Name:</label><br />
        <input id='pokeInput' type="text" placeholder='ditto'/><br />
        <button type='button' onClick={handleClick}>Submit</button>
      </form>
      <div>
        {showingPoke ? <><p>Pokemon Name: {showingPoke.data.forms[0].name}</p>
                       <img src={showingPoke.data.sprites.front_default} alt="pokemon form 0 image" /></>
                     : <p>Type an existing pokemon name to get informations</p>}
      </div>
    </main>
  )
};

export default Home;
