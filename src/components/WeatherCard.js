import React from 'react';
import {connect} from 'react-redux';
import {getWeatherTC} from '../redux/weatherReducer';
import s from './styles/WeatherCard.module.css';
import sun from '../img/sun.png';
import Rain from '../img/Rain.png';
import Storm from '../img/Storm.png';
import CloudlyRain from '../img/CloudlyRain.png';
import Clouds from '../img/Clouds.png';
import PartlySunny from '../img/PartlySunny.png';

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {WeatherImg: <div><img src={Clouds}/></div>};
    }
   FormateDate = (incomingDate) => {
    const date = new Date(incomingDate);
    return(
        <h3>{date.getDate()} <br/> {`0${date.getMonth()+1}`} <br/> {date.getFullYear()} </h3>
    )
   }
   ChooseImg = (dayWeatherInfo) => {
    let OutputImg = (source) =>{
        this.setState({WeatherImg: <div><img src={source}/></div>});  
    }
    const regex1 = RegExp('showers*', 'g');
       switch (dayWeatherInfo.HasPrecipitation) {
        case true:
            switch (dayWeatherInfo.PrecipitationType) {
                case `${dayWeatherInfo.PrecipitationType}`.match(/[Rain]/g).join(''):
                    OutputImg(Rain)
                    break;
                case `${dayWeatherInfo.PrecipitationType}`.match(/[Showers]/g).join(''):
                    OutputImg(Rain)
                    break;
                case `${dayWeatherInfo.PrecipitationType}`.match(/[Thunderstorms]/g).join(''):
                    OutputImg(Storm)
                    break;
                case `${dayWeatherInfo.PrecipitationType}`.match(/[CloudlyRain]/g).join(''):
                    OutputImg(CloudlyRain)
                    break;
                
                default:
                    break;
            }
       
    break;

        case false:
            switch (dayWeatherInfo.PrecipitationType) {
                case `${dayWeatherInfo.PrecipitationType}`.match(/[Sunny Sun]/g).join(''):
                    OutputImg(sun)
                    break;
                case `${dayWeatherInfo.PrecipitationType}`.match(/[Intermitten Clouds]/g).join(''):
                    OutputImg(Rain)
                    break;
                case `${dayWeatherInfo.PrecipitationType}`.match(/[Thunderstorms]/g).join(''):
                    OutputImg(Clouds)
                    break;
                case `${dayWeatherInfo.PrecipitationType}`.match(/[Partly Sunny]/g).join(''):
                    OutputImg(PartlySunny)
                    break;
                
                default:
                    break;
            }
        break;

        default:
            <img src={sun}/>
        
        break;
       }
    
   }
   componentDidMount(){
    this.ChooseImg(this.props.w.Day)
   }
    render(){
        return(
            <div className={s.weatherCard}> 
                <div className={s.dateWrap}>{this.FormateDate(this.props.w.Date)}</div>
                <div className={s.WeatherImgWrap}>{this.state.WeatherImg}</div>
                <div className={s.DegreeWrap}>{`${Math.round((this.props.w.Temperature.Minimum.Value -32)*(5/9))}℃ - ${Math.round((this.props.w.Temperature.Maximum.Value -32)*(5/9))}℃`}</div>
                <div className={s.shortForecastWrap}>{`Day: ${this.props.w.Day.IconPhrase}`} <br></br> {`Night: ${this.props.w.Night.IconPhrase}`}</div>
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) =>{
  return {
       getWeather: (LocationKey)=>{
        dispatch(getWeatherTC(LocationKey));
       },
    }
}
export default connect(null,mapDispatchToProps)(WeatherCard);