import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme as DefaultTheme } from "@themes/default";
import Navigator from "./src/navigator";

export default function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <StatusBar backgroundColor={DefaultTheme.colors.primary} />
      <Navigator />
    </ThemeProvider>
  );
}
