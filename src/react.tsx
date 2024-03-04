import React from "react";
import ReactDOM from "react-dom";

import {Figures} from "./components/figures.components";

function Index(){
	return (
		<Figures />
	)
}

ReactDOM.render(<Index />, document.querySelector("#root"))
