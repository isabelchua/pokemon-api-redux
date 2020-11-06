import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../logo.png";

const Header = () => {
	//console.log(logo);
	return (
		<div>
			<NavLink to={"/"}>
				<img src={logo} alt="logo" width="200" />
			</NavLink>
		</div>
	);
};

export default Header;
