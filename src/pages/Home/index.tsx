import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Container } from "@components/Container";
import * as Location from "expo-location";
import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Button } from "@components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import OpenWeatherAPI from "../../services/OpenWeatherAPI";

export const Home = (): JSX.Element => {
  /* "latitude": -9.807443660663354,
    "longitude": -49.22114472031816, */

  const getDataWheather = async () => {
    const responseWheather = await OpenWeatherAPI();
    console.log(responseWheather);
  };

  useEffect(() => {
    getDataWheather();
  }, []);

  return (
    <Box p={"xxxs"} pt={"sm"} flex={1} bg={"blueLight"}>
      <Box mt={"xs"} alignItems="center">
        <Box>
          <Typography
            textAlign={"center"}
            mb={"cake"}
            color={"grey02"}
            variant={"medium"}
            fontWeight={"bold"}
          >
            BL Weather
          </Typography>
        </Box>

        <Box mb={"xxs"}>
          <Typography textAlign={"center"} mb={"cake"} color={"grey02"}>
            Brasil, Tocantins, Divinópolis
          </Typography>
        </Box>

        <Box mt={"xs"} mb={"xs"} alignItems={"center"}>
          <Image
            style={{ width: 200, height: 200 }}
            source={require("@assets/images/daylight.png")}
          />
        </Box>

        <Typography
          textAlign={"center"}
          fontSize={20}
          mb={"cake"}
          color={"grey01"}
        >
          Tempo aberto
        </Typography>

        <Typography
          textAlign={"center"}
          variant={"medium"}
          fontSize={50}
          color={"grey01"}
        >
          32º
        </Typography>
      </Box>
    </Box>
  );
};
