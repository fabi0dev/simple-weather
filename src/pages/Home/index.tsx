import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { getForecast } from "../../services/OpenWeatherAPI";
import {
  getDataLocation,
  getDataWeather,
  saveDataWeather,
} from "../../Storage/Weather";
import { theme } from "@themes/default";
import { ImgWeather } from "./ImgWeather";
import { Touchable } from "@components/Touchable";
import { showLocation } from "react-native-map-link";
import { Forecast } from "./Forecast";

export const Home = (): JSX.Element => {
  const [wheatherCurrent, setWheatherCurrent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getWheather = async (reload = false, viewLoading = true) => {
    const data = await getDataWeather();
    if (viewLoading) {
      setLoading(true);
    }

    if (data == null || reload === true) {
      const responseWheather = await getForecast(
        "-9.807443660663354",
        "-49.22114472031816"
      );

      saveDataWeather(responseWheather);
      setWheatherCurrent(responseWheather);
    } else {
      setWheatherCurrent(data);
    }

    if (viewLoading) {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getWheather(true, false);
    setRefreshing(false);
  }, []);

  const goLocation = async () => {
    const dataLocation = await getDataLocation();

    showLocation({
      latitude: dataLocation.latitude,
      longitude: dataLocation.longitude,
    });
  };

  const getColorBg = () => {
    const d = new Date();

    if (d.getHours() > 18 || d.getHours() < 6) {
      return "blueDark";
    } else {
      return "blue";
    }
  };

  const MiniItem = ({ title, desc, subDesc }: any) => {
    return (
      <Box
        width={"49%"}
        bg={"rgba(0,0,0, .1)"}
        p={"nano"}
        borderRadius={"nano"}
        mb={"cake"}
      >
        <Box mb={"qm"}>
          <Typography
            fontSize={13}
            fontWeight={"bold"}
            variant={"medium"}
            color={"blueLight"}
          >
            {title.toUpperCase()}
          </Typography>
        </Box>

        <Typography color={"base"} fontSize={32}>
          {desc}
          {subDesc && <Typography color={"base"}> km/h</Typography>}
        </Typography>
      </Box>
    );
  };

  useEffect(() => {
    getWheather();
  }, []);

  if (wheatherCurrent == null) {
    return null;
  }

  return (
    <Box pt={"sm"} flex={1} bg={getColorBg()}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box p={"xxxs"}>
          <Box mt={"xs"} alignItems="center">
            <Box>
              <Typography
                textAlign={"center"}
                mb={"cake"}
                color={"blueLight"}
                variant={"medium"}
              >
                BL Weather
              </Typography>
            </Box>

            {!loading && (
              <Box mb={"xxs"}>
                <Typography
                  textAlign={"center"}
                  mb={"cake"}
                  color={"base"}
                  fontSize={25}
                >
                  {wheatherCurrent.city.country}, {wheatherCurrent.city.name}
                </Typography>
              </Box>
            )}

            <ImgWeather loading={loading} wheatherCurrent={wheatherCurrent} />

            {loading && (
              <Box mt={-20}>
                <Box mb={"nano"}>
                  <ActivityIndicator color={theme.colors.grey01} size={17} />
                </Box>

                <Typography textAlign={"center"} mb={"cake"} color={"grey01"}>
                  Cuidando de algumas coisas...
                </Typography>
              </Box>
            )}

            {!loading && (
              <Box
                flexDirection={"row"}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
                mt={"xs"}
                width={"100%"}
              >
                <MiniItem
                  title={"Sensação"}
                  desc={parseInt(wheatherCurrent.list[0].main.feels_like) + "º"}
                />

                <MiniItem
                  title={"Umidade"}
                  desc={wheatherCurrent.list[0].main.humidity + "%"}
                />

                <MiniItem
                  title={"Vento"}
                  desc={(
                    parseInt(wheatherCurrent.list[0].wind.speed) * 3.6
                  ).toFixed(0)}
                  subDesc={"km/h"}
                />

                <MiniItem
                  title={"Visibilidade"}
                  desc={wheatherCurrent.list[0].visibility / 1000}
                  subDesc={"km"}
                />
              </Box>
            )}
          </Box>

          {!loading && <Forecast wheatherCurrent={wheatherCurrent} />}

          <Box
            mt={"xs"}
            flexDirection={"row"}
            justifyContent={"center"}
            width={"100%"}
          >
            <Touchable onPress={goLocation}>
              <Typography color={"base"}>Abrir com o maps</Typography>
            </Touchable>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
