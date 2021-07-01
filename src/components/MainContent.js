import React from 'react';
import {connect} from 'react-redux';
import {getWeatherTC} from '../redux/weatherReducer';
import s from './styles/MainContent.module.css';
import WeatherCard from './WeatherCard';

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
        return(<div className={s.weatherInfoWrapper}>
            <div className={s.weatherInfo}>
                {this.props.weatherInfo.map((w)=>{
                    return <WeatherCard w={w}/>
                })}
            </div>
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