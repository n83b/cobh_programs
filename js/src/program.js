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

	outputForms(label, field1, field2){
		if(field1 || field2){
			var btn1 = '';
			var btn2 = '';
			if (field1){
				btn1 = <a className="cobh_word_form_btn" href={field1}>REFERRAL FROM (Word)</a>
			}
			if (field2){
				btn2 = <a className="cobh_rtf_form_btn" href={field2}>REFERRAL FROM (RTF)</a>
			}

			return (
				<tr><td>Forms</td><td>{btn1} {btn2} </td></tr>	
			)
		}
	}

	outputPathway(label, field){
		if (field){
			return <tr><td>{label}</td><td> <a className="cobh_pathway_form_btn" href={field}>REFERRAL PATHWAY</a></td></tr>	
		}
	}

	outputBrochure(label, field){
		if (field){
			return <tr><td>{label}</td><td> <a className="cobh_brochure_form_btn" href={field}>Brochure</a></td></tr>	
		}
	}

	render() {

		let output;
		
		if (this.props.program){
			output = 
				<div className={this.props.program.color}>
					<h2 dangerouslySetInnerHTML={{ __html:this.props.program.title}} />
					<div className="program-content" dangerouslySetInnerHTML={{ __html:this.props.program.content}} />
					<table>
						<tbody>
							{this.outputField('Funding', this.props.program.funding)}
							{this.outputField('Who is it for?', this.props.program.who_is_it_for)}
							{this.outputField('How to refer', this.props.program.how_to_refer)}
							{this.outputField('Therapy / service offered', this.props.program.therapy__service_offered)}
							{this.outputField('Supervisor', this.props.program.supervisor)}
							{this.outputField('Assistant manager', this.props.program.assistant_manager)}
							{this.outputField('Locations available', this.props.program.locations_available)}
							{this.outputForms('Forms', this.props.program.doc_1, this.props.program.doc_2)}
							{this.outputPathway('Referral Pathway', this.props.program.pdf_link)}
							{this.outputBrochure('Brochure', this.props.program.cobh_brochure)}
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