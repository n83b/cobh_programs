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

    setColor(color){
        const listyle = {
            background: color
        }
        return listyle;
    }

    outputName(name){
        return {__html: name};
    }

    render() {
        self = this;
        return (
            <div id="cobh-types">
                <p>Type of Health Service:</p>
                <ul>
                    {this.state.types.map(type => (
                        <li key={type.id} onClick={this.props.onClick.bind(this, type.id)} style={self.setColor(type.color)}>
                            <img className="serviceImage" src={type.image} />
                            <div className="serviceName" dangerouslySetInnerHTML={self.outputName(type.name)} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Types