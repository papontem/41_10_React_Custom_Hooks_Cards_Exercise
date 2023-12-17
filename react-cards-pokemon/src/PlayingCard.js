// PlaingCard.js

import React, { useState } from "react";
import backOfCard from "./back.png";
import "./PlayingCard.css";

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
	
	// PAM: use to tell which side card is on, should be facing up by default
	const [isFacingUp, setIsFacingUp] = useState(true);
	// PAM: toggle to flip card face
	const flipCard = () => {
		setIsFacingUp((isUp) => !isUp);
	};


	// PAM: render
	return (
		<img
			src={isFacingUp ? front : back}
			alt="playing card"
			onClick={flipCard}
			className="PlayingCard Card"
		/>
	);
}

export default PlayingCard;
