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
      backgroundColor: "base",
    },
  },
});

export const TouchableButton = styled(TouchableOpacity)<TouchableButtonProps>`
  ${() => ({
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
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
      color: "blueDark",
    },
  },
});

export const ButtonText = styled(Typography)<TextButtonProps>`
  ${textButtonVariants}
  ${color}
`;
//-------------------------------
