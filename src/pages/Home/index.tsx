import React, { useCallback, useEffect, useState } from "react";
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
  saveDataLocation,
  saveDataWeather,
} from "../../Storage/Weather";
import { theme } from "@themes/default";
import { ImgWeather } from "./ImgWeather";
import { Touchable } from "@components/Touchable";
import { showLocation } from "react-native-map-link";
import { Forecast } from "./Forecast";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getLocationUser } from "../../services/Location";
import Lottie from "lottie-react-native";

export const Home = ({ route }): JSX.Element => {
  const [wheatherCurrent, setWheatherCurrent] = useState<{
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
  } | null>(null);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataLocation, setDataLocation] = useState<{
    latitude: string | number;
    longitude: string | number;
    name: string;
    state: string;
    country: string;
    lat: string;
    lon: string;
  } | null>(null);
  const navigation = useNavigation();
  let { params } = route;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getWheather(true, false);
    setRefreshing(false);
  }, []);

  const goLocation = async () => {
    const dataLocation = await getDataLocation();

    showLocation({
      latitude: dataLocation?.latitude,
      longitude: dataLocation?.longitude,
    } as never);
  };

  const getLocationCurrent = async () => {
    setLoading(true);
    const currentLocation = await getLocationUser();
    await saveDataLocation(currentLocation?.coords);
    await getWheather(true);
  };

  const getBg = (wheatherCurrent) => {
    if (loading || wheatherCurrent == null) {
      return require("@assets/animations/bg/bg.json");
    }

    const main = wheatherCurrent.list[0].weather[0].main;

    switch (main) {
      case "Clear":
        return require("@assets/animations/bg/bg.json");
      case "Thunderstorm":
      case "Rain":
        return require("@assets/animations/bg/rain.json");
      case "Snow":
        return require("@assets/animations/bg/snow.json");
      default:
        return require("@assets/animations/bg/bg.json");
    }
  };

  const getBgColor = (wheatherCurrent) => {
    if (loading) {
      return ["#222", "#000"];
    }

    if (wheatherCurrent != null) {
      const main = wheatherCurrent.list[0].weather[0].main;
      const d = new Date();

      switch (main) {
        case "Clear":
          if (d.getHours() >= 18 || d.getHours() < 6) {
            return ["#007bc5", "#004066"];
          } else {
            return ["#1baaff", "#0089d9"];
          }
        case "Thunderstorm":
        case "Rain":
          return ["#395aa7", "#2a3b64"];
        case "Drizzle":
          return ["#39728d", "#1f4a5e"];
        case "Clouds":
          return ["#6198fd", "#1a3870"];
        default:
          return ["#26a5d3", "#0f3c78"];
      }
    } else {
      return ["#26d3ba", "#0f5c78"];
    }
  };

  const MiniItem = ({
    title,
    desc,
    subDesc,
  }: {
    title: string;
    desc: string;
    subDesc?: string;
  }) => {
    return (
      <Box
        width={"49%"}
        bg={"base5"}
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

  const getWheather = async (reload = false, viewLoading = true) => {
    const dataLocation = await getDataLocation();

    setDataLocation(dataLocation);

    const data = await getDataWeather();

    if (viewLoading) {
      setLoading(true);
    }

    if (data == null || reload === true) {
      const responseWheather = await getForecast(
        dataLocation?.latitude,
        dataLocation?.longitude
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

  useEffect(() => {
    if (typeof params !== "undefined") {
      delete params.reload;
    }
    getWheather(true);
  }, [params]);

  return (
    <LinearGradient colors={getBgColor(wheatherCurrent)} style={{ flex: 1 }}>
      <Lottie
        style={{
          flex: 1,
          elevation: -1,
          position: "absolute",
          height: "100%",
          opacity: 0.4,
        }}
        source={getBg(wheatherCurrent)}
        autoPlay
      />

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
                color={"base6"}
                variant={"medium"}
                fontSize={14}
              >
                Simple Weather
              </Typography>
            </Box>

            <Box>
              {dataLocation && dataLocation.name && (
                <Typography
                  textAlign={"center"}
                  mb={"cake"}
                  color={"base"}
                  fontSize={25}
                >
                  {dataLocation.name} - {dataLocation.state},{" "}
                  {dataLocation.country}
                </Typography>
              )}

              {(!dataLocation || !dataLocation.name) && wheatherCurrent && (
                <Typography
                  textAlign={"center"}
                  mb={"cake"}
                  color={"base"}
                  fontSize={25}
                >
                  {wheatherCurrent.city.country}, {wheatherCurrent.city.name}
                </Typography>
              )}
            </Box>

            {!loading && (
              <Box>
                <ImgWeather
                  loading={loading}
                  wheatherCurrent={wheatherCurrent}
                />
              </Box>
            )}

            {loading && (
              <Box>
                <Box mt={"xx"} mb={"nano"}>
                  <ActivityIndicator color={theme.colors.base} />
                </Box>

                <Typography
                  fontSize={70}
                  textAlign={"center"}
                  mb={"cake"}
                  color={"base"}
                >
                  - -
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
                  desc={
                    parseInt(
                      wheatherCurrent?.list[0]?.main.feels_like as string
                    ) + "º"
                  }
                />

                <MiniItem
                  title={"Umidade"}
                  desc={wheatherCurrent?.list[0]?.main.humidity + "%"}
                />

                <MiniItem
                  title={"Vento"}
                  desc={(
                    parseInt(wheatherCurrent?.list[0]?.wind.speed as string) *
                    3.6
                  ).toFixed(0)}
                  subDesc={"km/h"}
                />

                <MiniItem
                  title={"Visibilidade"}
                  desc={(
                    (wheatherCurrent?.list[0]?.visibility as number) / 1000
                  )
                    .toFixed(1)
                    .replace(".", ",")}
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
        bg={"base5"}
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
          <Touchable mr={"sm"} onPress={getLocationCurrent}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("@assets/images/scope.png")}
            />
          </Touchable>

          <Touchable
            onPress={() => navigation.navigate("NewLocation" as never)}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("@assets/images/search.png")}
            />
          </Touchable>
        </Box>
      </Box>
    </LinearGradient>
  );
};
