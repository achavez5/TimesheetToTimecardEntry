import React from 'react';
import './App.css';
import { TimecardImport } from './scenes/timecard-import';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <>
      <CssBaseline>
        <div className="App">
          <header className="App-header">
            <TimecardImport/>
          </header>
        </div>
      </CssBaseline>
    </>
  );
}

export default App;
