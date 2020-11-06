import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import Pokemon from "./components/Pokemon";
import Header from "./components/Header";

function App() {
	return (
		<div className="App">
			<nav>
				<Header />
			</nav>
			<Switch>
				<Route path={"/"} exact component={PokemonList} />
				<Route path={"/pokemon/:pokemon"} exact component={Pokemon} />
				<Redirect to={"/"} />
			</Switch>
		</div>
	);
}

export default App;
