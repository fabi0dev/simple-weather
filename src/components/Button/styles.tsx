import styled from "styled-components";
import { theme as themeDefault } from "@themes/default";
import {
  BorderProps,
  color,
  ColorProps,
  space,
  TypographyProps,
  variant,
} from "styled-system";
import { Typography } from "../Typography";
import { TouchableOpacity } from "react-native";

export type TouchableButtonTypes = "primary";

export interface TouchableButtonProps
  extends ColorProps<typeof themeDefault>,
    BorderProps<typeof themeDefault> {
  variant?: TouchableButtonTypes;
}

const touchableButtonVariants = variant<
  TouchableButtonProps,
  TouchableButtonTypes
>({
  prop: "variant",
  variants: {
    primary: {
      backgroundColor: "primary",
    },
  },
});

export const TouchableButton = styled(TouchableOpacity)<TouchableButtonProps>`
  ${() => ({
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 20,
    paddingLeft: 50,
    paddingRight: 50,
  })}
  ${touchableButtonVariants}
  ${space}
  ${color}
`;

//-------------------------------
export interface TextButtonProps
  extends TypographyProps<typeof themeDefault>,
    ColorProps<typeof themeDefault> {
  type?: TouchableButtonTypes;
}

const textButtonVariants = variant<TextButtonProps, TouchableButtonTypes>({
  prop: "type",
  variants: {
    primary: {
      color: "base",
      fontSize: 18,
    },
  },
});

export const ButtonText = styled(Typography)<TextButtonProps>`
  ${textButtonVariants}
  ${color}
`;
//-------------------------------
