import React , { useState }from 'react';
import WeatherDashboard from './components/Weather/WeatherDashboard'
import DemographicsDash from './components/Demographics/DemographicsDash'
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppDrawer from './components/AppDrawer'
import HomePage from './components/HomePage'
import Copyright from './components/Copyright'
import Box from '@material-ui/core/Box';
import clsx from 'clsx'
import TrafficDash from './components/Traffic/TrafficDash'
import ParkingsDash from './components/Parkings/ParkingsDash'
import Dokk1Dash from './components/Dokk1/Dokk1Dash'
import 'mapbox-gl/dist/mapbox-gl.css';
import PollutionDash from './components/Pollution/PollutionDash';
import EventsDash from './components/Events/EventsDash'
import Predictions from './components/Predictions/Predictions'
import { useStyles }  from './css/DashboardCSS'
import Jupyter from './components/Predictions/Jupyter';

function App() {

//-----------------------------------------------------------------------------
// Use dark mode for those who have dark mode as global settings of their device 
// Also added some custom theme for material UI
//----------------------------------------------------------------------------
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontSize: 14,
        },
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary:{
            main: 'rgba(0, 0, 0, 0.9)'
          },
          secondary:{
            main: '#2196f3'
          }
        },
        overrides: {
          MuiPickersToolbar: {
            toolbar: {
              backgroundColor: '#2196f3',
            },
          },
          MuiPickersDay:{
            daySelected:{
              backgroundColor: '#2196f3'
            }
          }
        },
      }),
    [prefersDarkMode],
  );
  //----------------------------------------------------------------------------

  const classes = useStyles();

  const [open, setOpen] = useState(true);

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

          {/* ---------------------------------------------- */}
          {/* Use Application's Navbar and Menu in left side */}
          {/* ---------------------------------------------- */}
          <AppDrawer open={open} 
                          handleDrawerOpen={handleDrawerOpen} 
                          handleDrawerClose={handleDrawerClose}
                            />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />

              {/* ----------------------------------- */}
              {/* Define Site's Routes */}
              {/* ----------------------------------- */}
              <Container maxWidth="lg" className={clsx(classes.container, open && classes.containerShift)}>
                <Switch>
                  <Route path='/' exact component={HomePage} />
                  <Route path='/dashboard/weather' exact component={WeatherDashboard}/>
                  <Route path='/dashboard/demographics' exact component={DemographicsDash}/>
                  <Route path='/dashboard/traffic' exact component={TrafficDash}/>
                  <Route path='/dashboard/parkings' exact component={ParkingsDash}/>
                  <Route path='/dashboard/dokk1' exact component={Dokk1Dash}/>
                  <Route path='/dashboard/pollution' exact component={PollutionDash}/>
                  <Route path='/dashboard/events' exact component={EventsDash}/>
                  <Route path='/predictions' exact component={Predictions}/>
                  <Route path='/jupyter' exact component={Jupyter}/>
                  {/* <Route path='/dashboard/test' exact render={(props) => (<WeatherDashboard {...props} />)}/> */}
                </Switch>
                <Box pt={4}  className={classes.footer}>
                    <Copyright />
                </Box>  
              </Container>
              
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
