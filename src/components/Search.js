import React from 'react';
import {connect} from 'react-redux';
import {getCitiesTC, getWeatherTC} from '../redux/weatherReducer';
import s from './styles/Search.module.css';
import Lypa from '../img/Lypa.svg';

class Search extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {city: '',citiesArr: [],cityName:'City',adminArea:'Area',country:'Country',citiesAreaOpen:false};
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
    //   alert(`${this.state.city}, запрос на місто`);
      event.preventDefault();
      this.props.getCities(this.state.city);
      this.setState({citiesAreaOpen:true})
    }

    onChangeCity = (event) =>{
      this.setState({city: event.target.value});
    }
    
    getWeather = (LocationKey,cityName,adminArea,country) => {
        this.props.getWeather(LocationKey)
        this.setState({cityName:cityName,adminArea:adminArea,country:country})
        this.setState({citiesAreaOpen:false})
    }
    render() {
      return (
        <div>
            <form onSubmit={this.onSubmit} className={s.SearchArea}>
                <div className={s.MainInput}>
                    <label> <input type="text" className={s.SearchInput} placeholder="City" name="login" value={this.state.city} onChange={this.onChangeCity}/></label>
                    
                    <label><button type="submit" className={s.SubmitSearch}> <img  src={Lypa}/> </button></label>
                </div> 
               
                <div className={this.state.citiesAreaOpen ? s.Cities :s.CitiesClose}>
               { this.state.citiesArr.map((c)=>{
                return <div className={s.cityItem} onClick={()=>{this.getWeather(c.Key,c.LocalizedName,c.Country.LocalizedName,c.AdministrativeArea.LocalizedName)}}>
                    <p>{`${c.LocalizedName}, ${c.Country.LocalizedName}, ${c.AdministrativeArea.LocalizedName}`}</p>
                </div>
            })}
                </div>
                <div className={s.MainText}>
                    <h1>{`Weather in ${this.state.cityName} (${this.state.adminArea}, ${this.state.country})`}</h1>
                </div>
            </form>
                        
                        
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