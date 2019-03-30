import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//To use query string to start wiht open type: eg  http://dev.test.com/?type=29
class Index extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
    	return (
			<Router>
				<Route component={App} />
			</Router>
    	);
  	}
}

ReactDOM.render(<Index />, document.getElementById("cobh-program"));