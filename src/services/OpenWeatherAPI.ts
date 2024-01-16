import axios from 'axios';
import {  API_WEATHER_ID } from 'react-native-dotenv';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org',
  validateStatus: status => true,
});

const getWeather = async (lat:string, lon:string) => {
  try {
    const { data } = await api.get('/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid : API_WEATHER_ID,
        lang : 'pt_br',
        units : 'metric',
      }
    });

    return data;
  } catch (error) {
    //error
  }
}

const getForecast = async (lat:string, lon:string) => {
  try {
    const { data } = await api.get('/data/2.5/forecast', {
      params: {
        lat,
        lon,
        appid : API_WEATHER_ID,
        lang : 'pt_br',
        units : 'metric',
        mode: "json"
      }
    });

    return data;
  } catch (error) {
    //error
  }
}

const getGeo = async (q:string) => {
  try {
    const { data } = await api.get('/geo/1.0/direct', {
      params: {
        q,
        appid : API_WEATHER_ID,
        limit: 10,
      }
    });

    return data;
  } catch (error) {
    //error
  }
}

export {
  getWeather,
  getForecast,
  getGeo
};
