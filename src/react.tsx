import React from "react";
import ReactDOM from "react-dom";

import {Figure} from "./components/figures.components";

function Index(){
	return (
		<Figure />
	)
}

ReactDOM.render(<Index />, document.querySelector("#root"))
