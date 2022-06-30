import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { theme as DefaultTheme } from "@themes/default";
import Navigator from "./src/navigator";
import { useFonts } from "expo-font";
import { getDataLocation } from "./src/Storage/Weather";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [locationSetted, setLocationSetted] = useState(false);

  const [loaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto.ttf"),
    RobotoMedium: require("./src/assets/fonts/Roboto-Medium.ttf"),
  });

  const checkLocation = async () => {
    setLoading(true);
    const location = await getDataLocation();

    if (location != null) {
      setLocationSetted(true);
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  if (!loaded || !loading) {
    return null;
  }

  const getColorStatusBar = () => {
    const d = new Date();

    if (d.getHours() > 18 || d.getHours() < 6) {
      return DefaultTheme.colors.blueDark;
    } else {
      return DefaultTheme.colors.blue;
    }
  };

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Navigator locationSetted={locationSetted} />
    </ThemeProvider>
  );
}
