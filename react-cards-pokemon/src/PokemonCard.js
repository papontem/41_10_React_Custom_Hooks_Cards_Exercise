// PokemonCard.js

import React, { useState } from "react";
import "./PokemonCard.css";

/* Renders a single pokemon card. */
function PokemonCard({ front, back, name, stats }) {
	
	// PAM: use to tell which side card is on, should be facing up by default
	const [isFacingUp, setIsFacingUp] = useState(true);
	// PAM: toggle to flip card face
	const flipCard = () => {
		setIsFacingUp((isUp) => !isUp);
	};

	// PAM: render
	return (
		<div onClick={flipCard} className="PokemonCard Card">
			{isFacingUp ? (
				<div className="PokemonCard-front">
					<img src={front} alt={`{name} front`} />
					<div>
						<p className="PokemonCard-name">{name}</p>
						<ul className="PokemonCard-stats">
							{stats.map((stat) => (
								<li key={stat.name}>
									<em>{stat.name}</em>: {stat.value}
								</li>
							))}
						</ul>
					</div>
				</div>
			) : (
				<div className="PokemonCard-back">
					<img src={back} alt={`{name} back`} />
				</div>
			)}
		</div>
	);
}

export default PokemonCard;
