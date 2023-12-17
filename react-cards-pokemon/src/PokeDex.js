// PokeDex.js

import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
	/* 
    Part4
    - PokeDex also make AJAX requests, but this one’s a bit trickier.
    - PlayingCardList makes a request to the same endpoint every time, but the endpoint in PokeDex depends on the name of the pokemon.
    - Figure out a way to modify your useAxios hook so that when you call useAxios you can just provide a base url, and when you want to add to your array of response data in state, you can provide the rest of the url.
    - Once you’ve done this, refactor PokeDex to use useAxios.
    - Make sure PlayingCardList still works too! 
   */

	// // PAM: list of pokemon objects that have been caught
	// const [pokemonCaught, setPokemonCaught] = useState([]);
	// // PAM: function to catch a pokemon
	// const addPokemon = async (name) => {
	// 	const response = await axios.get(
	// 		`https://pokeapi.co/api/v2/pokemon/${name}/`
	// 	);
	// 	// PAM: update the state for the list of pokemon caught
	// 	setPokemonCaught((pokemonCaught) => [
	// 		...pokemonCaught,
	// 		{ ...response.data, id: uuid() },
	// 	]);
	// };

  // part3: useAxios hook for fetching data
	function useAxios(url, options = {}) {
		// state that keeps track of our requests response log
		const [axiosRequestResponses, setAxiosRequestResponses] = useState([]);

		// function to add new request response data to our state
		const addData = async (name) => {
			try {
				// make the request & save response
				const response = await axios.get(url + name + "/", options);
				// store response.data in our state log
				setAxiosRequestResponses((prevRequestResponses) => [
					...prevRequestResponses,
					{ ...response.data, id: uuid() },
				]);
			} catch (error) {
				console.error("Error fetching data:", error);
				// setError(error);
			}
			// setIsLoading(false);
		};

		console.log(axiosRequestResponses);
		return { axiosRequestResponses, addData };
	}

	// PAM: useAxios hook for fetching data
	const data = useAxios("https://pokeapi.co/api/v2/pokemon/");

	// PAM: render
	return (
		<div className="PokeDex">
			<div className="PokeDex-buttons">
				<h3>Please select your pokemon:</h3>
				{/* Pokemon select button with function to add pokemon object to our pokemon list state as prop */}
				<PokemonSelect add={data.addData} />
			</div>
			<div className="PokeDex-card-area">
				{data.axiosRequestResponses.map((cardData) => (
					<PokemonCard
						key={cardData.id}
						front={cardData.sprites.front_default}
						back={cardData.sprites.back_default}
						name={cardData.name}
						stats={cardData.stats.map((stat) => ({
							value: stat.base_stat,
							name: stat.stat.name,
						}))}
					/>
				))}
			</div>
		</div>
	);
}

export default PokeDex;
