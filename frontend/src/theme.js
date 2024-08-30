import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
      "@media (min-width:600px)": {
        fontSize: "1.25rem",
      },
    },
  },
  palette: {
    primary: {
      main: "#4ECDC4",
    },
    secondary: {
      main: "#FF6B6B",
    },
    background: {
      default: "#F7F7F7",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C3E50",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
