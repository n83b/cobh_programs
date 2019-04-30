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
        // fetch(this.props.url + '/wp-json/wp/v2/cobh_program?resource_types=' + cobh_program_display_type + '&per_page=100')
        // .then(res => res.json())
        // .then(
        //     (result) => {
        //         this.setState({
        //             programs: result
        //         });
        //     }
        // )
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