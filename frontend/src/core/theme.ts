import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      dark: "#333333",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#c6c6c6",
      light: "#e1e1e1",
      dark: "#949494",
      contrastText: "#5c5f62",
    },
  },

  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    fontSize: 16,
    body1: {
      color: "#6b6e71",
      fontSize: "1rem",
    },
    body2: {
      color: "blue",
      fontSize: "1rem",
    },
    h2: {
      color: "#000",
      fontWeight: 600,
      fontSize: "1.5rem",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
