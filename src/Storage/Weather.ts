import AsyncStorage from '@react-native-async-storage/async-storage';

const saveDataLocation = async (value) => {
  return AsyncStorage.setItem(`DataLocation`,JSON.stringify(value));
};

const getDataLocation = async ():Promise<{
  latitude: number | string;
  longitude: number | string;
  name: string;
  state: string;
  country: string;
  lat: string;
  lon: string;
} | null> => {
  const item = await AsyncStorage.getItem(`DataLocation`);
  return JSON.parse(item as string);
};


const saveDataWeather = async (value) => {
  return AsyncStorage.setItem(`DataWeather`,JSON.stringify(value));
};

const getDataWeather = async () => {
  const item: any = await AsyncStorage.getItem(`DataWeather`);
  return JSON.parse(item);
};

const delDataWeather = async () => {
  return await AsyncStorage.removeItem(`DataWeather`);
};

export {
  saveDataWeather,
  getDataLocation,
  getDataWeather,
  saveDataLocation,
  delDataWeather
};
