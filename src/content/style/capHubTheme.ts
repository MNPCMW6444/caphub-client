import { ThemeOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

export const capHubTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#3f3f3f", // A shade of gray for the primary color
    },
    secondary: {
      main: "#b8a07e", // A shade of gold for the secondary color (pop of color)
    },
    background: {
      default: "#ffffff", // White background color
    },
    text: {
      primary: "#1c1c1c", // Dark gray for the primary text color
      secondary: "#5c5c5c", // Light gray for the secondary text color
    },
  },
  typography: {
    fontFamily: "Helvetica, Arial, sans-serif", // Clean and modern typography
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 500,
      fontSize: "2rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
    },
    body2: {
      fontWeight: 300,
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Keep the button text with regular capitalization
        },
      },
    },
  },
});

export default capHubTheme;
