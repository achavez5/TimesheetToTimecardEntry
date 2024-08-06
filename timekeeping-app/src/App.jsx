import React from 'react';
import './App.css';
import { TimecardImport } from './scenes/timecard-import';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ColorModeContext, useMode } from './theme';


function App() {
  const [ theme, colorMode ] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <header className="App-header">
              <TimecardImport/>
            </header>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
