import React from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';


class LocationSelect extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            locations: [],
        }

    }

    componentDidMount() {
        fetch(this.props.url + '/wp-json/wp/v2/program_locations?per_page=100')
        .then(res => res.json())
        .then(
            (result) => {
                let locations = []

                result.map(location => (
                    locations.push({value: location.id, label: location.name})
                ))

                this.setState({
                    locations: locations
                })
            }
        )
    }

    render() {
        
        return (
            <div>
                <div className="locationlabel">Location:</div>
                <Select 
                    value={this.props.selectedLocation}
                    onChange={this.props.onChange}
                    options={this.state.locations}
                />
            </div>
        );
    }
}

export default LocationSelect


/*
 {this.state.locations.map(location => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
*/