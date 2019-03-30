import React from "react";
import ReactDOM from "react-dom";

class Program extends React.Component {
    constructor(props){
    	super(props);
	}
	  
	outputField(label, field){
		if (field){
			return <tr><td>{label}</td><td dangerouslySetInnerHTML={{ __html: field}} /></tr>	
		}
	}

	render() {

		let output;
		
		if (this.props.program){
			output = 
				<div className={this.props.program.color}>
					<h2 dangerouslySetInnerHTML={{ __html:this.props.program.title.rendered}} />
					<table>
						<tbody>
							{this.outputField('Funding', this.props.program.funding)}
							{this.outputField('Who is it for?', this.props.program.who_is_it_for)}
							{this.outputField('How to refer', this.props.program.how_to_refer)}
							{this.outputField('Therapy / service offered', this.props.program.therapy__service_offered)}
							{this.outputField('Supervisor', this.props.program.supervisor)}
							{this.outputField('Assistant manager', this.props.program.assistant_manager)}
							{this.outputField('Locations available', this.props.program.locations_available)}
						</tbody>
					</table>
				</div>
		}else{
			output = <div></div>
		}

    	return (
			<div id="cobh-program-details">
				{output}
			</div>
			
    	)
  	}
}

export default Program