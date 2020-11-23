import React from 'react';
import Dashboard from './components/Dashboard'
import 'fontsource-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';





function App() {

// Use dark mode for those who have dark mode as global settings of their device 
// Also added some custom theme for material UI
//----------------------------------------------------------------------------
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontSize: 16,
        },
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary:{
            main: '#2196f3'
          },
          secondary:{
            main: '#ec407a'
          }
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
