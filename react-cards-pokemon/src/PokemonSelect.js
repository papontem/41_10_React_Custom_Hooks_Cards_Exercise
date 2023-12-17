// PokemonSelect.js 

import React, { useState } from "react";
import pokemonList from "./pokemonList";
import { choice } from "./helpers";

/* Select element to choose from common pokemon. */
function PokemonSelect({ add, pokemon = pokemonList }) {
  
	// PAM: Pokemon id for the pokemon we want to add when we click add buttons
	const [pokeIdx, setPokeIdx] = useState(0);

	const handleChange = (evt) => {
		// console.log("CHANGE EVENT: ", evt);
    // PAM: change the pokemon indx state when we change what pokemon we want to catch to that index on our pokemon list array.
		setPokeIdx(evt.target.value);
	};

	return (
		<div>
			{/* selector for all the pokemon ids, when sleector changes the value of the pokemon name shown and index chosen changes aswell  */}
			<select onChange={handleChange}>
				{pokemon.map((p_name, idx) => (
					<option key={idx} value={idx}>
						{p_name}
					</option>
				))}
			</select>
			{/* add pokemon buttons, where on click it will look for the index of the pokemon on our imported pokemon array and pass its name into the add function */}
			<button onClick={() => add(pokemon[pokeIdx])}>Catch one!</button>
			<button onClick={() => add(choice(pokemon))}>I'm feeling lucky</button>
		</div>
	);
}

export default PokemonSelect;
