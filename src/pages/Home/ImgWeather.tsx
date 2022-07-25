import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import React from "react";
import Lottie from "lottie-react-native";
import { getImgWeatherAnimation } from "../../services/UI";
import { capitalizeFont } from "../../services/Helps";

interface ImgWeatherProps {
  wheatherCurrent: {
    list: Array<{
      main: {
        feels_like: string;
        humidity: string;
        temp: string;
        temp_min: string;
        temp_max: string;
      };
      wind: {
        speed: string;
      };
      visibility: number;
      description: string;
    } | null>;
    city: {
      country: string;
      name: string;
    };
  } | null;
  loading: boolean;
}

export const ImgWeather = ({
  wheatherCurrent,
  loading,
}: ImgWeatherProps): JSX.Element => {
  const wheather = wheatherCurrent?.list[0];

  return (
    <Box>
      <Box mb={"xs"} alignItems={"center"}>
        <Lottie
          style={{
            width: 180,
            height: 180,
          }}
          source={getImgWeatherAnimation(wheather, wheatherCurrent)}
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
          {parseInt(wheather?.main.temp as string)}º
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
          {capitalizeFont(wheather?.description)}
        </Typography>
      )}

      {!loading && (
        <Typography
          textAlign={"center"}
          fontSize={18}
          mb={"cake"}
          color={"base"}
        >
          Min.:{parseInt(wheather?.main.temp_min as string)}º Max.:
          {parseInt(wheather?.main.temp_max as string)}º
        </Typography>
      )}
    </Box>
  );
};
