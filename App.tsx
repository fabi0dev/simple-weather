import { StatusBar } from "expo-status-bar";
import React from "react";
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

  return (
    <ThemeProvider theme={DefaultTheme}>
      <StatusBar backgroundColor={DefaultTheme.colors.primary} />
      <Navigator />
    </ThemeProvider>
  );
}
