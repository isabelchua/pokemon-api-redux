import "./App.css";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import PokemonList from "./containers/PokemonList";
import Pokemon from "./containers/Pokemon";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path={"/"} exact component={PokemonList} />
				<Route path={"/pokemon/:pokemon"} exact component={Pokemon} />
				<Redirect to={"/"} />
			</Switch>
			hello
		</div>
	);
}

export default App;
