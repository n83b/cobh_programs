import React from "react";
import ReactDOM from "react-dom";


class LocationSelect extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            locations: []
        }
    }

    componentDidMount() {
        fetch(this.props.url + '/wp-json/wp/v2/program_locations?per_page=100')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    locations: result
                })
            }
        )
    }

    render() {
        
        return (
            <div>
                <select onChange={this.props.onChange}>
                    {this.state.locations.map(location => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default LocationSelect