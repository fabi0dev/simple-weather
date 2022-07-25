
import * as Location from "expo-location";
import { LocationObject } from "expo-location";


const getLocationUser = async ():Promise<LocationObject | null> => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return null;
  }

  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.BestForNavigation,
  });

  return location;
};

export {
  getLocationUser
};

