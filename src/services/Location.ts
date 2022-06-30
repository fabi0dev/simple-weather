
import * as Location from "expo-location";

const getLocationUser = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return false;
  }

  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.BestForNavigation,
  });

  return location;
};

export {
  getLocationUser
};

