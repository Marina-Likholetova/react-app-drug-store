import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { ScrollRestoration } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from './components/Header';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
   mode: mode,
    ...(mode === "light"
      ? {
        // palette values for light mode
        primary: {
          main: "#4e72d0",
        },
        divider: "#4e72d0",
        background: {
          default: "#ffffff",
          paper: "#ffffff",
        },
        text: {
          primary: "#71717a",
          secondary: "#223645",
        },
      }
      : {
        // palette values for dark mode
        primary: {
          main: "#dbf4ff",
        },
        divider: "#004282",
        background: {
          default: "#000e21",
          paper: "#000e21",
        },
        text: {
          primary: "rgb(135, 150, 165)",
          secondary: "#71717a",
        },
      }),
  },
});

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);


  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <main className={`${mode}-theme`}>
        <div className='container'>
          <Outlet/>
        </div>
      </main>
      <footer className={`footer ${mode}-theme`}>
        <div className='container'>
          <p>Coperight © 2022</p>
        </div>
      </footer>
      <ScrollRestoration />
    </ThemeProvider>
  );
}

export default App;
