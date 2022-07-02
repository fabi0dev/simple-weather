import React from "react";
import { ButtonText, TouchableButton, TouchableButtonTypes } from "./styles";
import { theme as themeDefault } from "@themes/default";
import { SpaceProps } from "styled-system";

interface ButtonProps extends SpaceProps<typeof themeDefault> {
  children: any;
  variant?: TouchableButtonTypes;
  onPress: () => void;
}

export const Button = ({
  variant,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <TouchableButton variant={variant} {...props}>
      <ButtonText type={variant}>{children}</ButtonText>
    </TouchableButton>
  );
};
