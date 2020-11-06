import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/pokemonActions";
import _ from "lodash";

const Pokemon = props => {
	const pokemonName = props.match.params.pokemon;
	const dispatch = useDispatch();
	const pokemonState = useSelector(state => state.Pokemon);
	React.useEffect(() => {
		dispatch(GetPokemon(pokemonName));
	}, []);

	// console.log("props", pokemonState);

	const ShowData = () => {
		if (!_.isEmpty(pokemonState.data[pokemonName])) {
			const pokeData = pokemonState.data[pokemonName];
			//console.log("pokeData", pokeData);

			return (
				<div className="pokemon-wrapper">
					<div className="item">
						<h1>Sprites</h1>

						<img
							src={
								pokeData.sprites.other["official-artwork"].front_default
							}
							alt={pokemonName}
						/>
						<img src={pokeData.sprites.front_default} alt="" />
						<img src={pokeData.sprites.back_default} alt="" />
						<img src={pokeData.sprites.front_shiny} alt="" />
						<img src={pokeData.sprites.back_shiny} alt="" />
						<h3>{pokeData.types[0].type.name}</h3>
					</div>
					<div className="item">
						<h1>Stats</h1>
						{pokeData.stats.map(stat => {
							return (
								<p key={stat.stat.name}>
									{stat.stat.name} {stat.base_stat}
								</p>
							);
						})}
					</div>
					<div className="item">
						{pokeData.abilities.map(ability => {
							return (
								<p key={ability.ability.name}>
									{ability.ability.name} {ability.name}
								</p>
							);
						})}
					</div>
				</div>
			);
		}

		if (pokemonState.loading) {
			return <p>Loading...</p>;
		}

		if (pokemonState.errorMsg !== "") {
			return <p>{pokemonState.errorMsg}</p>;
		}

		return <p>error getting pokemon</p>;
	};
	return (
		<div className="poke">
			<h1>{pokemonName}</h1>
			{ShowData()}
		</div>
	);
};

export default Pokemon;
