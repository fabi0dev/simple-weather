import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import React from "react";
import { Animated, Image } from "react-native";

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
      return require("@assets/images/cloudy.png");
    } else {
      switch (main) {
        case "Clear":
          if (date.getHours() >= 18 || date.getHours() <= 6) {
            return require("@assets/images/moon.png");
          } else {
            return require("@assets/images/daylight.png");
          }
        case "Thunderstorm":
          return require("@assets/images/ranny_thunderstorm.png");
        case "Drizzle":
          if (date.getHours() >= 18 || date.getHours() <= 6) {
            return require("@assets/images/couldy_rainy.png");
          } else {
            return require("@assets/images/couldy_rainy_light.png");
          }
        case "Rain":
          return require("@assets/images/cloudy_havyrain.png");
        case "Clouds":
          return require("@assets/images/cloudy.png");
      }
    }
  };

  return (
    <Box>
      <Box mb={"xs"} alignItems={"center"}>
        <Image style={{ width: 180, height: 180 }} source={getImg()} />
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
