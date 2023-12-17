/* 
   Part2
    - Both the PokemonCard and the PlayingCard components can be flipped over when clicked on. 
    - You may have noticed that there is some duplicate code in these components.
    - Create a hooks.js file in src/, and in that file write a custom hook called useFlip which will hold the business logic for flipping any type of card.
    - useFlip doesn’t need to take an argument, and similar to useState, it should return an array with two elements.
    - The first element is the current flip state of the card, and the second element is a function that will toggle the flip state.
    - Once you’ve written this hook, refactor PokemonCard and PlayingCard to use this custom hook.
*/

function useFlip() {
    // call useState, "reserve piece of state"
	const [isFacingUp, setIsFacingUp] = useState(true);
    // function for fliping/toggle card side up
	const flipCard = () => {
        setIsFacingUp((isUp) => !isUp);
	};
    
    // return piece of state AND a function to toggle it
	return [isFacingUp, flipCard];
}

export default useFlip;

// ---------
// PAM: Code thats in both components:

// const [isFacingUp, setIsFacingUp] = useState(true);
// const flipCard = () => {
//     setIsFacingUp((isUp) => !isUp);
// };

// ---------
// PAM: DEMO CODE

// import { useEffect, useState } from "react";

// function useToggle(initialVal = true) {
// 	// call useState, "reserve piece of state"
// 	const [value, setValue] = useState(initialVal);
// 	const toggle = () => {
// 		setValue((oldValue) => !oldValue);
// 	};

// 	// return piece of state AND a function to toggle it
// 	return [value, toggle];
// }

// const useFetch = (url, options = {}) => {
// 	const [response, setResponse] = useState(null);
// 	const [error, setError] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);

// 	// after the first render, fetch our data
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const res = await fetch(url, options);
// 				const json = await res.json();
// 				setResponse(json);
// 			} catch (error) {
// 				setError(error);
// 			}
// 			setIsLoading(false);
// 		};
// 		fetchData();
// 	}, []);

// 	return { response, error, isLoading };
// };

// export default useToggle;
