import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { Box } from "@components/Box";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { InputText } from "@components/InputText";
import { Typography } from "@components/Typography";
import { ScrollView } from "react-native-gesture-handler";
import { getGeo } from "../../services/OpenWeatherAPI";
import { Touchable } from "@components/Touchable";
import { theme } from "@themes/default";
import { delDataWeather, saveDataLocation } from "../../Storage/Weather";

interface GeoData {
  name: string;
  state: string;
  country: string;
}

export const NewLocation = (): JSX.Element => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let timeSearch: any = null;

  const getCitys = async (search) => {
    clearTimeout(timeSearch);
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

    navigation.navigate("Home");
  };

  const Item = ({ data, children }) => {
    return (
      <Touchable onPress={() => saveData(data)} mb={"nano"}>
        <Typography color={"blueLightest"}>{children}</Typography>
      </Touchable>
    );
  };

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
