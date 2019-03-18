import React from "react";
import ReactDOM from "react-dom";
import Types from "./types.js";
import Programs from "./programs.js";
import LocationSelect from "./locationSelect.js"

//http://103.42.110.25/~cobhcoma/dev

class App extends React.Component {

	constructor(props){
    	super(props);
    	this.state ={
			siteurl: 'http://dev.test.com',
			type: 0,
			selectedProgram: null,
			selectedLocation: 0
		}

		this.handleClick = this.handleClick.bind(this);
		this.selectProgram = this.selectProgram.bind(this);
		this.locationSelect = this.locationSelect.bind(this);
	}
	  
	handleClick(typeId) {
		this.setState({type: typeId})
        this.setState({selectedProgram: null})
	}

	selectProgram(program){
        this.setState({selectedProgram: program})
	}
	
	locationSelect(location){
		var locationId = 0;
		if (location.target.value){
			locationId = parseInt(location.target.value)
		}
		this.setState({selectedLocation: locationId })
	}

	render() {
    	return (
      		<div id="program-container">
				<Types url={this.state.siteurl} onClick={(e) => this.handleClick(e)} />

				<LocationSelect url={this.state.siteurl} onChange={(e) => this.locationSelect(e)} />

				<h2>Programs Available</h2>
				<Programs url={this.state.siteurl} 
						  type={this.state.type} 
						  location={this.state.selectedLocation}
						  selectedProgram={this.state.selectedProgram}
						  onClick={(e) => this.selectProgram(e)} />
      		</div>
    	);
  	}
}

ReactDOM.render(<App />, document.getElementById("cobh-program"));


