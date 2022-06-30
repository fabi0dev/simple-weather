import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { Box } from "@components/Box";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { InputText } from "@components/InputText";
import { Typography } from "@components/Typography";
import { ScrollView } from "react-native-gesture-handler";
import { getGeo } from "../../services/OpenWeatherAPI";
import { getColorLinearBg } from "../../services/UI";
import { Touchable } from "@components/Touchable";
import { theme } from "@themes/default";
import {
  delDataWeather,
  getDataWeather,
  saveDataLocation,
} from "../../Storage/Weather";
import { capitalizeFont } from "../../services/Helps";

interface GeoData {
  name: string;
  state: string;
  country: string;
}

export const NewLocation = (): JSX.Element => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [dataWeather, setDataWeather] = useState(null);
  const [data, setData] = useState([]);
  let timeSearch: any = null;

  const getCurrentData = async () => {
    const dataWeather = await getDataWeather();
    setDataWeather(dataWeather);
  };

  const getCitys = async (search) => {
    clearTimeout(timeSearch);

    if (search == "") {
      setLoading(false);
      return;
    }

    setLoading(true);

    timeSearch = setTimeout(async () => {
      if (!search) {
        return;
      }

      try {
        const response = await getGeo(search);
        setData(response);
      } catch (e) {}
      setLoading(false);
    }, 400);
  };

  const saveData = async (data) => {
    await saveDataLocation({
      latitude: data.lat,
      longitude: data.lon,
      ...data,
    });

    await delDataWeather();

    navigation.navigate("Home", {
      reload: true,
    });
  };

  const Item = ({ data, children }) => {
    return (
      <Touchable onPress={() => saveData(data)} mb={"nano"}>
        <Typography color={"blueLightest"}>{children}</Typography>
      </Touchable>
    );
  };

  const ItemCurrent = () => {
    if (dataWeather !== null) {
      const { weather, main } = dataWeather.list[0];

      return (
        <Touchable onPress={() => navigation.goBack()} mb={"nano"}>
          <LinearGradient
            colors={getColorLinearBg(weather[0].main)}
            style={{
              flex: 1,
              borderRadius: 16,
              padding: 20,
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            <Box
              flexDirection={"row"}
              alignContent={"center"}
              justifyContent={"space-between"}
            >
              <Box>
                <Box mb={"xx"}>
                  <Typography color={"base"} variant={"medium"} fontSize={20}>
                    Meu Local
                  </Typography>

                  <Typography color={"base2"} fontSize={15}>
                    {dataWeather.city.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography color={"base2"} fontSize={15}>
                    {capitalizeFont(weather[0].description)}
                  </Typography>
                </Box>
              </Box>

              <Box justifyContent={"center"}>
                <Box>
                  <Typography color={"base"} fontSize={40}>
                    {parseInt(main.temp)}ºc
                  </Typography>

                  <Typography variant="medium" fontSize={14} color={"base"}>
                    Max.:{parseInt(main.temp_max)}º ~ Min.:
                    {parseInt(main.temp_min)}º
                  </Typography>
                </Box>
              </Box>
            </Box>
          </LinearGradient>
        </Touchable>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    getCurrentData();
  }, []);

  return (
    <Box p={"xxxs"} pt={"md"} bg={"base3"} flex={1}>
      <Box mb={"xx"}>
        <InputText
          bg={"rgba(255,255,255, .7)"}
          placeholder="Buscar cidade..."
          onChangeText={(value) => {
            getCitys(value);
          }}
        />
      </Box>

      <ScrollView>
        {!data.length && <ItemCurrent />}

        {!loading &&
          data.map((dataCity: GeoData, key) => {
            return (
              <Box key={key} p={"xxxs"} pt={"none"}>
                <Item data={dataCity}>
                  {dataCity.name} - {dataCity.state}, {dataCity.country}
                </Item>
              </Box>
            );
          })}

        {loading && (
          <ActivityIndicator color={theme.colors.primary} size={25} />
        )}
      </ScrollView>
    </Box>
  );
};
