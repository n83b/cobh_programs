import React from "react";
import ReactDOM from "react-dom";

class Programs extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            programs: cobh_programs
        }
    }

    componentDidMount() {
   
    }

    outputImage(img){
        var output = '';
        if (img){
            output = <img src={img} />
        }
        return output;
    }

    render() {
        let output;
        let programDetail;

        if (this.props.type == 0){
            output = <div></div>   
        }else{
            
            //filter by resource type
            var programsFiltered = this.state.programs.filter(prog => {
                return prog.resource_types.includes(cobh_resource_type);
            })

            //filter by service type
            var programsFiltered = programsFiltered.filter(prog => {
                return prog.program_types.includes(this.props.type);
            })

            //filter by location
            if (this.props.location != null && "value" in this.props.location && this.props.location.value != null){
                programsFiltered = programsFiltered.filter(prog => {
                    return prog.program_locations.includes(this.props.location.value);
                });
            }
            
            if (this.props.age != null && "value" in this.props.age && this.props.age.value != null ){
                programsFiltered = programsFiltered.filter(prog => {
                    return prog.program_age.includes(this.props.age.value);
                });
            }

            output =
            <div>
                <ul>
                    {programsFiltered.map(program => (
                        <li key={program.id} onClick={this.props.onClick.bind(this, program)} className={program.color}>
                            {this.outputImage(program.thumbnail)}
                            {program.title}
                        </li>
                    ))}
                </ul>
                
            </div>
        }
            
        return (
            <div id="cobh-all-programs">
                {output}
            </div>
        );

    }
}

export default Programs