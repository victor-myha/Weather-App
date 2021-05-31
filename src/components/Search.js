import React from 'react';
import * as axios from 'axios';
import {connect} from 'react-redux';
import { API } from '../api/api';
import {getCitiesTC, getWeatherTC} from '../redux/weatherReducer';
import s from './styles/App.module.css';

class Search extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {city: '',citiesArr: []};
    }
    refresh = () => {
        this.setState({citiesArr: this.props.cities});
    }
    componentDidMount(){
        this.refresh()
    }
    componentDidUpdate(prevProps,prevState){
        if (this.props.cities != prevProps.cities) {
            this.refresh();  
        }
        
    }

    onSubmit = (event) =>{
      alert(`${this.state.city}, запрос на місто`);
      event.preventDefault();
      this.props.getCities(this.state.city);
    }

    onChangeCity = (event) =>{
      this.setState({city: event.target.value});
    }
    
    getWeather = (LocationKey) => {
        this.props.getWeather(LocationKey)
    }
    render() {
      return (
        <div>
            <form onSubmit={this.onSubmit}>
                <p><label> City: <input type="text" name="login" value={this.state.city}
                                onChange={this.onChangeCity}/></label></p>
                
                <p><input type="submit" value="Submit" /></p>
            </form>
            <div className={s.Cities}>
               
                    { this.state.citiesArr.map((c)=>{
                    return <div className={s.cityItem} onClick={()=>{this.getWeather(c.Key)}}>
                        <p>{`${c.LocalizedName}, ${c.Country.LocalizedName}, ${c.AdministrativeArea.LocalizedName}`}</p>
                    </div>
                })}
            </div>
            
        </div>
      );
    }
  }

let mapStateToProps = (state) =>{
    return {
       cities: state.weatherReducer.cities,
      
    }
}
let mapDispatchToProps = (dispatch) =>{
  
    return {
        getCities: (city)=>{
            dispatch(getCitiesTC(city));
       },
       getWeather: (LocationKey)=>{
        dispatch(getWeatherTC(LocationKey));
       },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);