import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Button } from "@components/Button/Button";
import { theme } from "@themes/default";
import { saveDataLocation } from "../../Storage/Weather";
import AnimatedLottieView from "lottie-react-native";

export const GetLocation = (): JSX.Element => {
  const [errorMsg, setErrorMsg] = useState("");
  const [logSearch, setLogSearch] = useState("");
  const [loadingGetLocation, setLoadingGetLocation] = useState(false);

  const getLocationUser = async () => {
    setLogSearch("Aguarde um instante...");
    setLoadingGetLocation(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLoadingGetLocation(false);
      setErrorMsg("A permissão para acessar o local foi negada!");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    await saveDataLocation(location.coords);
  };

  return (
    <Box
      p={"xxxs"}
      alignItems="center"
      justifyContent={"center"}
      pt={"sm"}
      flex={1}
      bg={"base"}
    >
      <Box alignItems={"center"}>
        <Box mb={"nano"}>
          <AnimatedLottieView
            style={{
              width: 350,
              height: 350,
            }}
            source={require("@assets/animations/location-map.json")}
            autoPlay
            loop={false}
          />
        </Box>

        {!loadingGetLocation && (
          <Typography
            textAlign={"center"}
            fontWeight={"bold"}
            fontSize={30}
            color={"base3"}
            variant={"medium"}
          >
            Encontrar região
          </Typography>
        )}

        <Typography
          textAlign={"center"}
          mt={"cake"}
          fontSize={16}
          color={"grey02"}
        >
          {logSearch || "Para começar devemos encontrar sua região."}
        </Typography>

        <Box mt={"xl"}>
          {loadingGetLocation && (
            <ActivityIndicator color={theme.colors.primary} />
          )}

          {!loadingGetLocation && (
            <Button onPress={getLocationUser} variant="primary">
              Buscar
            </Button>
          )}
        </Box>
        <Box>
          <Typography mt={"xx"} color={"red"}>
            {errorMsg}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
