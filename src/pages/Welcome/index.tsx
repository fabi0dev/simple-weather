import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import * as Location from "expo-location";
import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Button } from "@components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { theme } from "@themes/default";

export const Welcome = (): JSX.Element => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingGetLocation, setLoadingGetLocation] = useState(false);
  const navigation = useNavigation();

  return (
    <Box
      p={"xxxs"}
      alignItems="center"
      justifyContent={"center"}
      pt={"sm"}
      flex={1}
      bg={"lilacLight"}
    >
      <Box alignItems={"center"}>
        <Box mb={"nano"}>
          <Image
            style={{ maxWidth: 200, maxHeight: 200 }}
            source={require("@assets/images/map_loc.png")}
          />
        </Box>

        <Typography
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={30}
          color={"base3"}
          variant={"medium"}
        >
          Olá, que bom te ver!
        </Typography>

        <Typography
          textAlign={"center"}
          mt={"cake"}
          fontSize={16}
          color={"grey02"}
        >
          Agora você tem a previsão do tempo facilmente
        </Typography>

        <Box mt={"xl"}>
          {loadingGetLocation && (
            <Box>
              <ActivityIndicator color={theme.colors.primary} size={17} />
            </Box>
          )}

          <Button
            onPress={() => navigation.navigate("GetLocation")}
            variant="primary"
          >
            Começar
          </Button>

          <Typography mt={"xx"} color={"base"}>
            {errorMsg}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
