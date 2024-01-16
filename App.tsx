import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { theme as DefaultTheme } from "@themes/default";
import Navigator from "./src/navigator";
import { useFonts } from "expo-font";
import { getDataLocation } from "./src/Storage/Weather";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [locationSetted, setLocationSetted] = useState(false);
  const [renewApp, setRenewApp] = useState(false);

  const [loaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto.ttf"),
    RobotoMedium: require("./src/assets/fonts/Roboto-Medium.ttf"),
  });

  const checkLocation = async () => {
    setLoading(true);
    const location = await getDataLocation();
    setLocationSetted(location != null);
  };

  useEffect(() => {
    setTimeout(async () => {
      if (!locationSetted) {
        setRenewApp(!renewApp);
        if (!loading) {
          await checkLocation();
        }
      }
    }, 2000);

    checkLocation();
  }, [renewApp]);

  if (!loaded || !loading) {
    return null;
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Navigator locationSetted={locationSetted} />
    </ThemeProvider>
  );
}
