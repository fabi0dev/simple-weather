import axios from 'axios';
import {  API_WEATHER, API_WEATHER_URL } from 'react-native-dotenv';

const api = axios.create({
  baseURL: API_WEATHER_URL,
  validateStatus: status => true,
});

const getWeather = async (lat, lon) => {
  try {
    const { data } = await api.get('/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid : API_WEATHER,
        lang : 'pt_br',
        units : 'metric',
      }
    });

    return data;
  } catch (error) {
    //error
  }
}

const getForecast = async (lat, lon) => {
  try {
    const { data } = await api.get('/data/2.5/forecast', {
      params: {
        lat,
        lon,
        appid,
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

const getGeo = async (q) => {
  try {
    const { data } = await api.get('/geo/1.0/direct', {
      params: {
        q,
        appid,
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
