import React from "react";
import ReactDOM from "react-dom";

class Types extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            types: []
        }
    }

    componentDidMount() {
        fetch(this.props.url + '/wp-json/wp/v2/program_types?per_page=100')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    types: result
                })
            }
        )
    }

    render() {
        return (
            <div id="cobh-types">
                <p>Type of Health Service:</p>
                <ul>
                    {this.state.types.map(type => (
                        <li key={type.id} onClick={this.props.onClick.bind(this, type.id)}>
                            {type.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Types