import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { Box } from "@components/Box";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export const NewLocation = (): JSX.Element => {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <LinearGradient colors={["#eee", "#fff"]} style={{ flex: 1 }}>
      <Box mt={"xs"} alignItems="center"></Box>
    </LinearGradient>
  );
};
