import React from 'react';
import {connect} from 'react-redux';
import { API } from '../api/api';
import {getCitiesTC, getWeatherTC} from '../redux/weatherReducer';

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {weatherInfo: []};
    }
    refreshMainContent = () => {
        this.setState({weatherInfo: this.props.weatherInfo});
    }
    componentDidMount(){
        this.refreshMainContent()
    }
    componentDidUpdate(prevProps,prevState){
        if (this.props.cities != prevProps.cities) {
            this.refreshMainContent();  
        }
        
    }
    render(){
        return(
            <div>
                {this.props.weatherInfo.map((w)=>{
                    return <div>
                        <p>{w.Date}</p>
                        <p>{`${w.Temperature.Minimum.Value}F - ${w.Temperature.Maximum.Value}F`}</p>
                        <p>{`Day: ${w.Day.IconPhrase}`}</p>
                        <p>{`Night: ${w.Night.IconPhrase}`}</p>
                    </div>
                })}
            </div>
        )
    }
}

let mapStateToProps = (state) =>{
    return {
       weatherInfo: state.weatherReducer.weatherInfo,
    }
}
let mapDispatchToProps = (dispatch) =>{
  return {
       getWeather: (LocationKey)=>{
        dispatch(getWeatherTC(LocationKey));
       },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainContent);