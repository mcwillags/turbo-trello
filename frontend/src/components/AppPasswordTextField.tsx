import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput, OutlinedInputProps } from "@mui/material";
import { ForwardedRef, forwardRef, useState } from "react";

export const AppPasswordTextField = forwardRef(
  ({ value, onChange, ...props }: OutlinedInputProps, ref: ForwardedRef<unknown>) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    );
  }
);

AppPasswordTextField.displayName = "AppPasswordTextField";
