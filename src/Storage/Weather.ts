import AsyncStorage from '@react-native-async-storage/async-storage';

const saveDataLocation = async (value: any) => {
  return AsyncStorage.setItem(`DataLocation`,JSON.stringify(value));
};

const getDataLocation = async () => {
  const item: any = await AsyncStorage.getItem(`DataLocation`);
  return JSON.parse(item);
};


const saveDataWeather = async (value: any) => {
  return AsyncStorage.setItem(`DataWeather`,JSON.stringify(value));
};

const getDataWeather = async () => {
  const item: any = await AsyncStorage.getItem(`DataWeather`);
  return JSON.parse(item);
};

export {
  saveDataWeather,
  getDataLocation,
  getDataWeather,
  saveDataLocation
};
