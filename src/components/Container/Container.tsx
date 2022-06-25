import { Box } from "@components/Box";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ContainerProps {
  children: any;
}

export const Container = ({ children }: ContainerProps): JSX.Element => {
  return (
    <Box style={styles.container}>
      <Text>{children}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 35,
  },
});
