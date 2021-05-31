import * as axios from 'axios';

const apiKey = 'NccctTZf87uJfckbVI2iZjGFG0eKctx8';
export const API = {
    getCities(cityName) {
        return axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${cityName}`)
        .then(response =>{
             return response.data ;
        });
    },
    getWeather(LocationKey){
        return axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${LocationKey}?apikey=${apiKey}`)
        .then(response =>{
             return response.data.DailyForecasts ;
        });
    }
}