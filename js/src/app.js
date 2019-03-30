import React from "react";
import ReactDOM from "react-dom";
import Types from "./types.js";
import Programs from "./programs.js";
import LocationSelect from "./locationSelect.js"
import queryString from 'query-string'

//http://103.42.110.25/~cobhcoma/dev
//http://dev.test.com
class App extends React.Component {

	constructor(props){
    	super(props);
    	this.state ={
			siteurl: 'http://103.42.110.25/~cobhcoma/dev',
			selectedType: 0,
			selectedProgram: null,
			selectedLocation: null
		}

		this.typeSelect = this.typeSelect.bind(this);
		this.selectProgram = this.selectProgram.bind(this);
		this.locationSelect = this.locationSelect.bind(this);
	}

	componentDidMount() {
		const values = queryString.parse(this.props.location.search)
		if (values.type){
			this.setState({selectedType: parseInt(values.type)})
		}
	}

	typeSelect(typeId) {
		this.setState({selectedType: typeId})
    	this.setState({selectedProgram: null})
	}

	selectProgram(program){
        this.setState({selectedProgram: program})
	}
	
	locationSelect(location){
		this.setState({selectedLocation: location })
		this.setState({selectedProgram: null})
	}

	render() {
    	return (
			<div id="program-container">
                <Types url={this.state.siteurl} onClick={(e) => this.typeSelect(e)} />

                <LocationSelect url={this.state.siteurl} selectedLocation={this.state.selectedLocation} onChange={(e) => this.locationSelect(e)} />

                <p>Programs Available</p>
                <Programs url={this.state.siteurl} 
                        type={this.state.selectedType} 
                        location={this.state.selectedLocation}
                        selectedProgram={this.state.selectedProgram}
                        onClick={(e) => this.selectProgram(e)} />
		    </div>
    	);
  	}
}


export default App