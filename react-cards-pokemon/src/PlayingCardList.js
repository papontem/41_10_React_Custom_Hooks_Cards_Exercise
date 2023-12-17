import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
	// PAM: useState used for when we add a card to the card array.
	//   const [cards, setCards] = useState([]);
	// PAM: addCard async function we call on click event for the add card button and keeping track of the uuid for each card.
	//   const addCard = async () => {
	//     const response = await axios.get(
	//       "https://deckofcardsapi.com/api/deck/new/draw/"
	//     );
	//     setCards(cards => [...cards, { ...response.data, id: uuid() }]);
	//   };
	/*
		part3
		- In the PlayingCardList component, we initialize an empty array in state, and add to it via an AJAX request we make with axios.
		- Since we use axios in a few components, let’s move this logic into a function called useAxios.
		- useAxios should take in a URL, and similar to useState, it should return an array with two elements.
		- The first element is an array of data obtained from previous AJAX requests (since we will add to this array, it’s a piece of state). 
		- The second element is a function that will add a new object of data to our array.
		- Once you’ve written this hook, refactor PlayingCardList to use this custom hook. 
		- (Don’t worry about PokeDex for now - that’s coming in the next part!)
	*/
	// part3: useAxios hook for fetching data
	function useAxios(url, options = {}) {
		// state that keeps track of our requests response log
		const [axiosRequestResponses, setAxiosRequestResponses] = useState([]);

		// function to add new request response data to our state
		const addData = async () => {
			try {
				// make the request & save response
				const response = await axios.get(url, options);
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
	const data = useAxios("https://deckofcardsapi.com/api/deck/new/draw/");

	// PAM: render
	return (
		<div className="PlayingCardList">
			<h3>Pick a card, any card!</h3>
			<div>
				{/* Call the addData function on button click */}
				<button onClick={data.addData}>Add a playing card!</button>
			</div>
			<div className="PlayingCardList-card-area">
				{/* render each plaing card using the data from all previous requests */}
				{data.axiosRequestResponses.map((cardData) => (
					<PlayingCard key={cardData.id} front={cardData.cards[0].image} />
				))}
			</div>
		</div>
	);
}

CardTable.defaultProps = {};

export default CardTable;
