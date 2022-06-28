import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Button } from "@components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { theme } from "@themes/default";
import { getDataLocation, saveDataLocation } from "../../Storage/Weather";
import { Home } from "../Home";

export const Welcome = (): JSX.Element => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingGetLocation, setLoadingGetLocation] = useState(false);
  const [locationSetted, setLocationSetted] = useState(true);
  const navigation = useNavigation();

  const getLocationUser = async () => {
    setLoadingGetLocation(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("A permissão para acessar o local foi negada!");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    await saveDataLocation(location.coords);

    setLocation(location);
    setLoadingGetLocation(false);
    navigation.navigate("Home");
  };

  const checkLocation = async () => {
    setLoadingGetLocation(true);
    const location = await getDataLocation();

    if (location != null) {
      setLocationSetted(true);
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  if (locationSetted) {
    return <Home />;
  }

  return (
    <Box p={"xxxs"} pt={"sm"} flex={1} bg={"blueDark"}>
      <Box mt={"xs"} alignItems="center">
        <Box mt={"xs"} alignItems={"center"}>
          <Image
            style={{ width: 200, height: 200 }}
            source={require("@assets/images/cloudy.png")}
          />
        </Box>

        <Typography
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={25}
          color={"base"}
        >
          Olá, que bom te ver!
        </Typography>

        <Typography
          textAlign={"center"}
          mt={"cake"}
          fontSize={15}
          color={"base"}
        >
          Agora você tem a previsão do tempo na sua mão
        </Typography>

        <Box mt={"xl"}>
          {loadingGetLocation && (
            <Box>
              <ActivityIndicator color={theme.colors.base} size={17} />
            </Box>
          )}

          {!loadingGetLocation && (
            <Button onPress={getLocationUser} variant="primary">
              Começar
            </Button>
          )}

          <Typography mt={"xx"} color={"base"}>
            {errorMsg}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
