import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList } from "../actions/pokemonActions";
import { Link } from "react-router-dom";

const PokemonList = props => {
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();
	const pokemonList = useSelector(state => state.PokemonList);
	React.useEffect(() => {
		FetchData(1);
	}, []);

	const FetchData = (page = 1) => {
		dispatch(GetPokemonList(page));
	};

	const ShowData = () => {
		if (!_.isEmpty(pokemonList.data)) {
			return pokemonList.data.map(poke => {
				return (
					<div className="list-wrapper">
						<div className="pokemon-item">
							<p>{poke.name}</p>
							<Link to={`/pokemon/${poke.name}`}>View</Link>
						</div>
					</div>
				);
			});
		}

		if (pokemonList.loading) {
			return <p>Loading...</p>;
		}

		if (pokemonList.errorMsg !== "") {
			return <p>{pokemonList.errorMsg}</p>;
		}
		return <p>unable to get data</p>;
	};
	return (
		<div>
			<div className="search-wrapper">
				<p>Search:</p>
				<input type="text" onChange={e => setSearch(e.target.value)} />
				<button onClick={() => props.history.push(`/pokemon/${search}`)}>
					Search
				</button>
			</div>
			{ShowData()}
		</div>
	);
};

export default PokemonList;
