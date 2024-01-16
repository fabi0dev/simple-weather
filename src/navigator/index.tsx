import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { default as HomeNavigator } from "./HomeNavigator";
import { default as WelcomeNavigator } from "./WelcomeNavigator";

const Stack = createStackNavigator();

const Navigator = ({ locationSetted }) => {
  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <Stack.Navigator
        screenOptions={{
          //@ts-ignore
          headerMode: false,
        }}
        initialRouteName="Home"
      >
        {locationSetted &&
          Object.entries(HomeNavigator).map(([nameScreen, Component]) => {
            return (
              <Stack.Screen
                key={nameScreen}
                name={nameScreen}
                component={Component}
              />
            );
          })}

        {!locationSetted &&
          Object.entries(WelcomeNavigator).map(([nameScreen, Component]) => {
            return (
              <Stack.Screen
                key={nameScreen}
                name={nameScreen}
                component={Component}
              />
            );
          })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
