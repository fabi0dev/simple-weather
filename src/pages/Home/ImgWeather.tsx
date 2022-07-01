import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import React from "react";
import Lottie from "lottie-react-native";

interface ImgWeatherProps {
  wheatherCurrent: any;
  loading: boolean;
}

export const ImgWeather = ({
  wheatherCurrent,
  loading,
}: ImgWeatherProps): JSX.Element => {
  const { list } = wheatherCurrent;
  const wheather = list[0];

  const capitalize = (string, separator = " ") => {
    return string
      .split(separator)
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(separator);
  };

  const getImg = () => {
    let date = new Date();
    let main = wheather.weather[0].main;

    if (wheatherCurrent == null) {
      return require("@assets/animations/weather-windy.json");
    } else {
      switch (main) {
        case "Clear":
          if (date.getHours() >= 18 || date.getHours() <= 6) {
            return require("@assets/animations/weather-night.json");
          } else {
            return require("@assets/animations/weather-sunny.json");
          }
        case "Thunderstorm":
          return require("@assets/animations/weather-storm.json");
        case "Drizzle":
          if (date.getHours() >= 18 || date.getHours() <= 6) {
            return require("@assets/animations/weather-rainynight.json");
          } else {
            return require("@assets/animations/weather-partly-shower.json");
          }
        case "Rain":
          return require("@assets/animations/weather-storm-rainy.json");
        case "Clouds":
          return require("@assets/animations/weather-windy.json");
        case "Snow":
          return require("@assets/animations/weather-snow.json");
        default:
          return require("@assets/animations/weather-windy.json");
      }
    }
  };

  return (
    <Box>
      <Box mb={"xs"} alignItems={"center"}>
        <Lottie
          style={{
            width: 180,
            height: 180,
          }}
          source={getImg()}
          autoPlay
          loop={false}
        />
      </Box>

      {!loading && (
        <Typography
          textAlign={"center"}
          variant={"medium"}
          fontSize={70}
          color={"base"}
          mb={"nano"}
        >
          {parseInt(wheather.main.temp)}º
          <Typography fontSize={50} color={"base"}>
            c
          </Typography>
        </Typography>
      )}

      {!loading && (
        <Typography
          textAlign={"center"}
          fontSize={21}
          mb={"cake"}
          color={"base"}
        >
          {capitalize(wheather.weather[0].description)}
        </Typography>
      )}

      {!loading && (
        <Typography
          textAlign={"center"}
          fontSize={18}
          mb={"cake"}
          color={"base"}
        >
          Min.:{parseInt(wheather.main.temp_min)}º Max.:
          {parseInt(wheather.main.temp_max)}º
        </Typography>
      )}
    </Box>
  );
};
