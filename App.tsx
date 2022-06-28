import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { theme as DefaultTheme } from "@themes/default";
import Navigator from "./src/navigator";
import { useFonts } from "expo-font";
import { Typography } from "@components/Typography";

export default function App() {
  const [loaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto.ttf"),
    RobotoMedium: require("./src/assets/fonts/Roboto-Medium.ttf"),
  });

  if (!loaded) {
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
      <StatusBar backgroundColor={getColorStatusBar()} />
      <Navigator />
    </ThemeProvider>
  );
}
