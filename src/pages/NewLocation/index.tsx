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
        const response = await getGeo("Gurupi");
        setData(response);
      } catch (e) {}
      setLoading(false);
    }, 400);
  };

  const Item = ({ data, children }) => {
    return (
      <Touchable mb={"nano"}>
        <Typography>{children}</Typography>
      </Touchable>
    );
  };

  return (
    <LinearGradient colors={["#eee", "#fff"]} style={{ flex: 1 }}>
      <Box p={"xxxs"} mt={"xs"}>
        <Box mb={"xx"}>
          <InputText
            placeholder="Buscar cidade..."
            onChangeText={(value) => {
              getCitys(value);
            }}
          />
        </Box>

        <ScrollView>
          {loading && (
            <ActivityIndicator color={theme.colors.primary} size={25} />
          )}

          {data.map((dataCity: GeoData, key) => {
            return (
              <Box key={key} p={"xxxs"} pt={"none"}>
                <Item data={dataCity}>
                  {dataCity.name} - {dataCity.state}, {dataCity.country}
                </Item>
              </Box>
            );
          })}
        </ScrollView>
      </Box>
    </LinearGradient>
  );
};
