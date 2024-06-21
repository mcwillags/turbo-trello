import { Button, ButtonProps } from "@mui/material";

export interface IButtonProps extends ButtonProps {
  text: string;
}

export const AppPrimaryButton = ({ text, sx, ...props }: IButtonProps) => {
  return (
    <Button variant="contained" color="primary" sx={{ textTransform: "none", ...sx }} {...props}>
      {text}
    </Button>
  );
};
