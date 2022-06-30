import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
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
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export const Home = (): JSX.Element => {
  const [wheatherCurrent, setWheatherCurrent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getWheather = async (reload = false, viewLoading = true) => {
    const data = await getDataWeather();
    if (viewLoading) {
      setLoading(true);
    }

    if (data == null || reload === true) {
      const responseWheather = await getForecast("-11.732670", "-49.074699");

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

  const getColorBg = (wheatherCurrent) => {
    if (wheatherCurrent != null) {
      //const main = wheatherCurrent.list[0].weather[0].main;
      const main = "Clear";
      const d = new Date();
      /* const d = new Date();

      if (d.getHours() > 18 || d.getHours() < 6) {
        return "blueDark";
      } else {
        return "blue";
      } */
      switch (main) {
        case "Clear":
          if (d.getHours() >= 18 || d.getHours() < 6) {
            return ["#007bc5", "#004066"];
          } else {
            return ["#1baaff", "#0089d9"];
          }
        case "Thunderstorm" || "Rain":
          return ["#395aa7", "#2a3b64"];
        case "Drizzle":
          return ["#39728d", "#1f4a5e"];
        case "Clouds":
          return ["#6198fd", "#1a3870"];
        default:
          return ["#26a5d3", "#0f3c78"];
      }

      return ["#26d3ba", "#0f5c78"];
      //return ["#4c669f", "#3b5998", "#192f6a"];
    } else {
      return ["#26d3ba", "#0f5c78"];
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
    <LinearGradient colors={getColorBg(wheatherCurrent)} style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box mt={"sm"} p={"xxxs"}>
          <Box alignItems="center">
            <Box>
              <Typography
                textAlign={"center"}
                mb={"cake"}
                color={"rgba(255,255,255,.8)"}
                variant={"medium"}
                fontSize={14}
              >
                BL Weather
              </Typography>
            </Box>

            {!loading && (
              <Box>
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
        </Box>
      </ScrollView>

      <Box
        p={"xxxs"}
        pb={"md"}
        bg={"rgba(0,0,0, .1)"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Touchable onPress={goLocation}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("@assets/images/maps.png")}
          />
        </Touchable>

        <Box flexDirection={"row"}>
          <Touchable mr={"sm"} onPress={goLocation}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("@assets/images/scope.png")}
            />
          </Touchable>

          <Touchable onPress={() => navigation.navigate("NewLocation")}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("@assets/images/gps.png")}
            />
          </Touchable>
        </Box>
      </Box>
    </LinearGradient>
  );
};
