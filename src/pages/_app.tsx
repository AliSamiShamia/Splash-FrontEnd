import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { store } from "@/store";
import { Provider } from "react-redux";
import { AuthProvider } from "@/components/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const customTheme = createTheme({
    typography: {
      fontFamily: `"Open-Sans", "Helvetica", "Arial", sans-serif`,
    },
    palette: {
      secondary: {
        main: "#aab2c2",
      },
      primary: {
        main: "#202632",
      },
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
