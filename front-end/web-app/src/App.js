import React from 'react';

import './App.css';
import Dashboard from './components/Dashboard'
import 'fontsource-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const theme = createMuiTheme({
  typography: {
    fontSize: 16,
  },
  // palette:{
  //   primary:{
  //     main:
  //   },
  //   secondary:{
  //     main:
  //   }
  
});

function App() {
  
  // Use dark mode for those who have dark mode as global settings of their device 
  //----------------------------------------------------------------------------
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  //----------------------------------------------------------------------------
  
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Dashboard />
    </div>

    </ThemeProvider>

  );
}

export default App;
