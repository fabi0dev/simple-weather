import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Button } from "@components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";

export const Welcome = (): JSX.Element => {
  const navigation = useNavigation();

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
              width: 200,
              height: 200,
            }}
            source={require("@assets/animations/clouds.json")}
            autoPlay
          />
        </Box>

        <Box>
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
        </Box>

        <Box mt={"xl"}>
          <Button
            onPress={() => navigation.navigate("GetLocation")}
            variant="primary"
          >
            Começar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
