import React , { useState }from 'react';
import Dashboard from './components/Dashboard'
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppDrawer from './components/AppDrawer'
import { useStyles }  from './css/DashboardCSS'

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

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <div className={classes.root}>
        <Router>
          <AppDrawer open={open} 
                          handleDrawerOpen={handleDrawerOpen} 
                          handleDrawerClose={handleDrawerClose}
                            />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <Route path='/dashboard' render={(props) => (<Dashboard {...props} open={open} />)}/>
            </Switch>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
