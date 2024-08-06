import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      primary: {
        main: '#df3a3a',
      },
      secondary: {
        main: '#3adfdf',
      },
    },
    typography: {
        fontFamily: "Source Sans 3, sans-serif",
        fontSize: 12,
        h1: {
          fontFamily: "Source Sans 3, sans-serif",
          fontSize: 40
        },
        h2: {
          fontFamily: "Source Sans 3, sans-serif",
          fontSize: 32
        },
        h3:  {
          fontFamily: "Source Sans 3, sans-serif",
          fontSize: 24
        },
        h4: {
          fontFamily: "Source Sans 3, sans-serif",
          fontSize: 20
        },
        h5: {
          fontFamily: "Source Sans 3, sans-serif",
          fontSize: 16
        }, 
        h6: {
          fontFamily: "Source Sans 3, sans-serif",
          fontSize: 14
        },
      },
  }
};

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [ mode, setMode ] = useState("dark");
    const colorMode = useMemo( () => ({ toggleColorMode: () => { setMode((prev) => (prev === "light" ? "dark" : "light")) }}), []);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [ theme, colorMode ];
}