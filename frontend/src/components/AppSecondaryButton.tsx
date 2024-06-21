import { Button, ButtonProps } from "@mui/material";

export interface IButtonProps extends ButtonProps {
  text: string;
}

export const AppSecondaryButton = ({ text, sx, ...props }: IButtonProps) => {
  return (
    <Button variant="contained" color="secondary" sx={{ textTransform: "none", ...sx }} {...props}>
      {text}
    </Button>
  );
};
