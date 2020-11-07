import axios from "axios";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList, GetAllPokemon } from "../actions/pokemonActions";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { GetPokemon } from "../actions/pokemonActions";
import Card from "./Card";

let pokeStartId = 1;

const PokemonList = props => {
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();
	const pokemonList = useSelector(state => state.PokemonList);

	// React.useEffect(() => {
	// 	FetchData(1);
	// //	dispatch(GetPokemon(pokemonName));
	// }, []);

	// const FetchData = (page = 1) => {
	// 	dispatch(GetPokemonList(page));
	// };

	// console.log("pokemon list ", pokemonList);

	const [data, setData] = useState([]);
	let poke = [];
	const [startId, setStartId] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const nextPage = () => {
		if (pokeStartId <= 751) {
			pokeStartId += 100;
			setStartId(pokeStartId);
			setIsLoading(false);
		} else {
			setStartId(1);
			setIsLoading(false);
		}
	};

	const previousPage = () => {
		if (pokeStartId >= 100) {
			pokeStartId -= 100;
			setStartId(pokeStartId);
			setIsLoading(false);
		} else {
			setStartId(751);
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		nextPage();
		previousPage();

		dispatch(GetAllPokemon(startId));

		// const getData = async () => {
		// 	for (let i = startId; i <= startId + 49; i++) {
		// 		let result = await axios(` https://pokeapi.co/api/v2/pokemon/${i}`);
		// 		poke.push(result.data);
		// 	}
		// 	setData(poke);
		// 	setIsLoading(true);
		// 	console.log(poke);
		// };
		// getData();
	}, [startId]);

	//console.log(pokemonList.loading);

	const ShowData = () => {
		if (pokemonList.loading) {
			return <p>Loading...</p>;
		}

		// if (!_.isEmpty(pokemonList.data)) {
		if (pokemonList.data) {
			console.log("pokemon list 2", pokemonList.data);
			return pokemonList.data.map(poke => {
				return (
					<div className="list-wrapper">
						<div className="pokemon-item">
							<p>a {poke.name}</p>
							{/* <img
								src={
									poke.sprites.other["official-artwork"].front_default
								}
								alt=""
							/> */}
							<Link to={`/pokemon/${poke.name}`}>View</Link>
						</div>
					</div>
				);
			});
		}

		if (pokemonList.errorMsg !== "") {
			return <p>{pokemonList.errorMsg}</p>;
		}
		return <p>unable to get data</p>;
	};

	// if (isLoading) {
	// 	return (
	// 		<div className="container">
	// 			{data.map(item => (
	// 				<Card
	// 					key={item.id}
	// 					name={item.name}
	// 					imgUrl={item.sprites.other["official-artwork"].front_default}
	// 					rank={item.id}
	// 					stats={item.stats}
	// 					pokeType={item.types[0].type.name}
	// 				/>
	// 			))}
	// 			<footer>
	// 				<button className="previous" onClick={previousPage}>
	// 					Previous
	// 				</button>
	// 				<button className="next" onClick={nextPage}>
	// 					Next
	// 				</button>
	// 			</footer>
	// 		</div>
	// 	);
	// } else {
	// 	return (
	// 		<div className="container">
	// 			<div className="loadingContainer">
	// 				<div className="loader"></div>
	// 			</div>
	// 			<footer>
	// 				<button className="previous" onClick={previousPage}>
	// 					Previous
	// 				</button>
	// 				<button className="next" onClick={nextPage}>
	// 					Next
	// 				</button>
	// 			</footer>
	// 		</div>
	// 	);
	// }

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
			{!_.isEmpty(pokemonList.data) && (
				<ReactPaginate
					pageCount={Math.ceil(pokemonList.count / 15)}
					pageRangeDisplayed={2}
					marginPagesDisplayed={1}
					// onPageChange={data => FetchData(data.selected + 1)}
					containerClassName="pagination"
				/>
			)}
		</div>
	);
};

export default PokemonList;
