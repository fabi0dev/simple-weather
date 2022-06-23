import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container } from "@components/Container";

export const Home = (): JSX.Element => {
  return (
    <Container>
      <Text>Tela home!</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
