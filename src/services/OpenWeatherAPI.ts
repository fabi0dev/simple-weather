import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org',
  validateStatus: status => true,
});

const getWeather = async (lat, lon) => {
  try {
    const { data } = await api.get('/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid : '93c14486890b0ebb887e0add8cf0b9e2',
        lang : 'pt_br',
        units : 'metric',
      }
    });

    return data;
  } catch (error: any) {
    //error
  }
}

const getForecast = async (lat, lon) => {
  try {
    const { data } = await api.get('/data/2.5/forecast', {
      params: {
        lat,
        lon,
        appid : '93c14486890b0ebb887e0add8cf0b9e2',
        lang : 'pt_br',
        units : 'metric',
        mode: "json"
      }
    });

    return data;
  } catch (error: any) {
    //error
  }
}

export {
  getWeather,
  getForecast
};
