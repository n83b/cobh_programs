import React from "react";
import ReactDOM from "react-dom";
import Program from "./program.js"

class Programs extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            programs: []
        }
    }

    componentDidMount() {
        fetch(this.props.url + '/wp-json/wp/v2/cobh_program')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    programs: result
                })
            }
        )
    }

    render() {
        let output;
        let programDetail;

        if (this.props.type == 0){

            output = <div></div>   

        }else{

            //filter by type
            var programsFiltered = this.state.programs.filter(prog => {
                return prog.program_types.includes(this.props.type);
            })

            //filter by location
            if (this.props.location != 0){
                programsFiltered = programsFiltered.filter(prog => {
                    return prog.program_locations.includes(this.props.location);
                });
            }

            output =
            <div>
                <ul>
                    {programsFiltered.map(program => (
                        <li key={program.id} onClick={this.props.onClick.bind(this, program)}>
                            {program.title.rendered}
                        </li>
                    ))}
                </ul>

                <Program program={this.props.selectedProgram}/>
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