import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Pokemon = props => {
	const pokemonName = props.match.params.pokemon;
	const dispatch = useDispatch();
	const pokemonState = useSelector(state => state.pokemon);

	console.log("props", pokemonName);
	return <div>Pokemon</div>;
};

export default Pokemon;
