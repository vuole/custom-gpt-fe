import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";

type SLTextFieldProps = TextFieldProps & {
  isEmty?: boolean;
  isValid?: boolean;
  messageHelper?: string;
  hasBorderRight?: boolean;
  disableBorder?: boolean;
};

const StyledTextField = styled(TextField)<SLTextFieldProps>(
  ({ disableBorder, hasBorderRight, theme }) => ({
    ...(disableBorder && {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
        borderRight: hasBorderRight ? "1px solid #ccc" : "none",
      },

      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        border: "none",
        borderRight: hasBorderRight ? "1px solid #ccc" : "none",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
        borderRight: hasBorderRight ? "1px solid #ccc" : "none",
      },
    }),
  })
);

export default function SLTextField({
  children,
  isEmty,
  isValid = true,
  messageHelper = "",
  ...props
}: SLTextFieldProps) {
  const [isInputChanged, setIsInputChanged] = useState<boolean>(false);

  useEffect(() => {
    if (props.value) {
      setIsInputChanged(true);
    }
  }, [props.value]);

  const helperText = useMemo(() => {
    return !isInputChanged
      ? ""
      : isEmty
        ? "Trường này là bắt buộc."
        : !isValid
          ? messageHelper
          : "";
  }, [isInputChanged, isEmty, isValid, messageHelper]);

  return (
    <StyledTextField
      variant="outlined"
      error={(isEmty || !isValid) && isInputChanged ? true : false}
      helperText={helperText}
      {...props}
    >
      {children}
    </StyledTextField>
  );
}
