import styled from "styled-components";
import { theme as themeDefault } from "../../themes/default";
import {
  padding,
  variant,
  TextColorProps,
  ColorProps,
  TypographyProps,
  BorderProps,
  PaddingProps,
  margin,
  MarginProps,
} from "styled-system";

export type TextInputVariantsType = "focusIn" | "";
export interface TextInputProps
  extends TypographyProps<typeof themeDefault>,
    ColorProps<typeof themeDefault>,
    BorderProps<typeof themeDefault>,
    PaddingProps<typeof themeDefault>,
    MarginProps<typeof themeDefault> {
  focusControl?: TextInputVariantsType;
}

const rTextInputVariants = variant<TextInputProps>({
  prop: "focusControl",
  variants: {
    focusIn: {
      borderColor: "primaryLight",
    },
  },
});

export const RTextInput = styled.TextInput<TextInputProps>`
  font-size: 15px;
  border-radius: 6px;
  height: 50px;
  flex:1
  background-color: transparent;
  color: ${({ theme }) => theme.colors.grey02};
  ${padding}
  ${margin}
`;
