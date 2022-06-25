import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { default as HomeNavigator } from "./HomeNavigator";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerMode: false,
        }}
        initialRouteName="Welcome"
      >
        {Object.entries(HomeNavigator).map(([nameScreen, Component]) => {
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
