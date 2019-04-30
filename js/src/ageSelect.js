import React from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';


class AgeSelect extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            ages: [],
        }

    }

    componentDidMount() {
        fetch(this.props.url + '/wp-json/wp/v2/program_age?per_page=100')
        .then(res => res.json())
        .then(
            (result) => {
                let ages = []
                ages.push({value: null, label: 'Any'})

                result.map(location => (
                    ages.push({value: location.id, label: location.name})
                ))

                this.setState({
                    ages: ages
                })
            }
        )
    }

    render() {
        
        return (
            <div className="ageSelectbox">
                <div className="locationlabel">Age:</div>
                <Select 
                    value={this.props.selectedAge}
                    onChange={this.props.onChange}
                    options={this.state.ages}
                />
            </div>
        );
    }
}

export default AgeSelect

