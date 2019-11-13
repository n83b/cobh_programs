import React from "react";
import ReactDOM from "react-dom";
import Types from "./types.js";
import Programs from "./programs.js";
import Program from "./program.js"
import LocationSelect from "./locationSelect.js"
import AgeSelect from "./ageSelect.js"
import scrollToComponent from 'react-scroll-to-component';

class App extends React.Component {

	constructor(props){
    	super(props);
    	this.state ={
			siteurl: 'https://cobh.com.au',
			selectedType: 0,
			selectedProgram: null,
			selectedLocation: null,
			selectedAge: null,
			scrollTo: ''
		}

		this.typeSelect = this.typeSelect.bind(this);
		this.selectProgram = this.selectProgram.bind(this);
		this.locationSelect = this.locationSelect.bind(this);
		this.agesSelect = this.agesSelect.bind(this);
	}

	componentDidMount() {
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let type = params.get('type');

		if (type){
			this.typeSelect(parseInt(type))
		}
	}

	

	typeSelect(typeId) {
		this.setState({selectedType: typeId})
		this.setState({selectedProgram: null})
		scrollToComponent(this.FilterSection, { offset: -100, align: 'top', duration: 850, ease:'inSine'})
	}

	selectProgram(program){
		this.setState({selectedProgram: program})
		scrollToComponent(this.ProgramSection, { offset: -100, align: 'top', duration: 850, ease:'inSine'});
	}
	
	locationSelect(location){
		this.setState({selectedLocation: location })
		this.setState({selectedProgram: null})
	}

	agesSelect(age){
		this.setState({selectedAge: age })
		this.setState({selectedProgram: null})
	}

	render() {
    	return (
			<div id="program-container">
                <Types url={this.state.siteurl} onClick={(e) => this.typeSelect(e)} />

				<section className='filter-section' ref={(section) => { this.FilterSection = section; }}>
                	<LocationSelect url={this.state.siteurl} selectedLocation={this.state.selectedLocation} onChange={(e) => this.locationSelect(e)} />
					<AgeSelect url={this.state.siteurl} selectedAge={this.state.selectedAge} onChange={(e) => this.agesSelect(e)} />
				</section>

                <p>Programs Available</p>
				<section className='programs-section' ref={(section) => { this.ProgramsSection = section; }}>
                	<Programs url={this.state.siteurl} 
                        type={this.state.selectedType} 
						location={this.state.selectedLocation}
						age={this.state.selectedAge}
                        selectedProgram={this.state.selectedProgram}
                        onClick={(e) => this.selectProgram(e)} />
				</section>

				<section className='program-section' ref={(section) => { this.ProgramSection = section; }}>
					<Program program={this.state.selectedProgram}/>
				</section>
		    </div>
    	);
  	}
}


ReactDOM.render(<App />, document.getElementById("cobh-program"));