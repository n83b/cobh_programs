import React from "react";
import ReactDOM from "react-dom";

class Types extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            types: cobh_service_types
        }
    }

    componentDidMount() {
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