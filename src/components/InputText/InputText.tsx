import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { RTextInput } from "./styles";
import { Box } from "../Box/Box";
import { Typography } from "../Typography/Typography";
import { theme as defaultTheme } from "@themes/default";
interface InputTextProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIconPress?: () => void;
  width?: number;
  heigth?: number;
  rightIconPress?: () => void;
  bg?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  error,
  leftIconPress,
  width,
  heigth,
  rightIconPress,
  onFocus,
  onBlur,
  bg,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <Box>
      {label ? (
        <Box mb={"xxxs"}>
          <Typography>{label}</Typography>
        </Box>
      ) : null}

      <Box
        width={width}
        height={heigth}
        borderRadius={"xi"}
        flexDirection={"row"}
        alignItems={"center"}
        bg={bg || "base"}
      >
        <RTextInput
          px={"xxxs"}
          py={"nano"}
          placeholderTextColor={defaultTheme.colors.grey03}
          pl={"xxxs"}
          pr={"xxxs"}
          onFocus={(e) => {
            setFocus(true);
            typeof onFocus == "function" && onFocus(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            typeof onBlur == "function" && onBlur(e);
          }}
          {...props}
        />
      </Box>
    </Box>
  );
};
