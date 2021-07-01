import { API } from "../api/api";

let initialState = {
  cities: [{
    Version: 1,
    Key: "324546",
    Type: "City",
    Rank: 65,
    LocalizedName: "Horodok",
    Country: {
    ID: "UA",
    LocalizedName: "Ukraine"
    },
    AdministrativeArea: {
    ID: "46",
    LocalizedName: "L'viv"
    }
    }],
  weatherInfo:[]
}
const weatherReducer = (state = initialState ,action) => {

    const actionType = action.type;
    switch (actionType) {
        case "SET_CITIES":{
            if (Array.isArray(action.citiesArr) && action.citiesArr.length > 0) {
                return  {
                    ...state,
                    cities: action.citiesArr, 
                  };
            }
        
        }
        case "SET_WEATHER":{
         return  {
            ...state,
            weatherInfo: action.weatherInfo, 
            };
        }
        
        default:
          return state;
     
    }

    
    
}

// САНКИ
export const getCitiesTC = (city) => {
  return async (dispatch) =>{
       let citiesArr = await API.getCities(city);
         if (citiesArr.length === 0) {
          alert("Error, the location you were looking for was not found :(") 
         }
         else{
          dispatch({type:"SET_CITIES", citiesArr}); 
         }
    }
}
export const getWeatherTC = (LocationKey) => {
  return async (dispatch) =>{
       let weatherInfo = await API.getWeather(LocationKey);
         dispatch({type:"SET_WEATHER", weatherInfo});
    }
}


export default weatherReducer;