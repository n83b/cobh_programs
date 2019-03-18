import React from "react";
import ReactDOM from "react-dom";

class Program extends React.Component {
    constructor(props){
    	super(props);
  	}

	render() {

		let output;
		
		if (this.props.program){
			output = 
				<div className={this.props.program.color}>
					<h2 dangerouslySetInnerHTML={{ __html:this.props.program.title.rendered}} />
					<ul>
						<li dangerouslySetInnerHTML={{ __html: this.props.program.funding}} />
						<li dangerouslySetInnerHTML={{ __html: this.props.program.who_is_it_for}} />
						<li dangerouslySetInnerHTML={{ __html: this.props.program.how_to_refer}} />
						<li dangerouslySetInnerHTML={{ __html: this.props.program.therapy__service_offered}} />
						<li dangerouslySetInnerHTML={{ __html: this.props.program.supervisor}} />
						<li dangerouslySetInnerHTML={{ __html: this.props.program.assistant_manager}} />
						<li dangerouslySetInnerHTML={{ __html: this.props.program.locations_available}} />
					</ul>
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