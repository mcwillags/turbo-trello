import { SxProps } from "@mui/material";

export function createSxStyles<Keys extends PropertyKey>(styles: Record<Keys, SxProps>): Record<Keys, SxProps> {
  return styles;
}
