import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org',
  validateStatus: status => true,
});

const OpenWeatherAPI = async () => {
  try {
    const { data } = await api.get('/data/2.5/forecast', {
      params: {
        lat : '-9.807443660663354',
        lon : '-49.22114472031816',
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

export default OpenWeatherAPI;
