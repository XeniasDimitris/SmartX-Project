import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';
import Title from '../Title'
import { CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles }  from '../../css/DashboardCSS'
import HeatChart from './HeatChart'
import Chart from './PollutionChart'
import BoxPlotChart from './BoxPlotChart'

//---------------------------------------
// Define TabPanels
//---------------------------------------
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={2}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

//--------------------------------------------------------
// Define TabContainer consisted of more TabPanels
//-------------------------------------------------------
const useStyles2 = makeStyles((theme) => ({
  tabs: {
    backgroundColor: theme.palette.secondary.main,
  },
  section:{
    backgroundColor: '#68b2f8'
  }
}));
  
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const helper = {
    'Carbon Monoxide': 'carbon_monoxide',
    'Sulfure Dioxide': 'sulfure_dioxide',
    'Nitrogen Dioxide': 'nitrogen_dioxide',
    'Ozone': 'ozone',
    'Particullate Matter': 'particullate_matter'
}

export default function TableContainer (props){
  const data = props.data
  const classes = useStyles()
  const classes2 = useStyles2();
  const [value, setValue] = React.useState(0);
  const filters = props.filters
  /* ----------------------------------- */
  /* Handle Tabs */
  /* ----------------------------------- */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {/* Appbar for Tabs */}
      <AppBar position="static" className={clsx(classes2.tabs)}>
      <Tabs value={value} 
            variant="fullWidth"
            indicatorColor="primary"  
            onChange={handleChange}
            aria-label="simple tabs example">
        <Tab label="Time Series" {...a11yProps(0)} />
        <Tab label="Grouped Analytics" {...a11yProps(1)} />
      </Tabs>
      </AppBar>

      {/* TabPanel 1 -- Timeline Series */}
      <TabPanel value={value} index={0}>
      <Grid container spacing={2}>  
            <Grid item xs={12} md={4} lg={12}>
                <Paper className={classes.paper}>
                <CardContent >
                    <Title>Carbon Monoxide 
                    { filters.start ? 
                    <React.Fragment> from <b>{filters.start}</b>  </React.Fragment>: 
                    <React.Fragment> from the first available record </React.Fragment>}
                  { filters.end ? 
                    <React.Fragment> to <b>{filters.end}</b> </React.Fragment>: 
                    <React.Fragment> to the last one </React.Fragment>}</Title>
                    <Chart  
                        data={data} 
                        field={['carbon_monoxide']}
                        chartID='carbon'/> 

                </CardContent>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={12}>
                <Paper className={classes.paper}>
                <CardContent >
                    <Title>Nitrogen Dioxide
                    { filters.start ? 
                    <React.Fragment> from <b>{filters.start}</b>  </React.Fragment>: 
                    <React.Fragment> from the first available record </React.Fragment>}
                  { filters.end ? 
                    <React.Fragment> to <b>{filters.end}</b> </React.Fragment>: 
                    <React.Fragment> to the last one </React.Fragment>}</Title>
                    <Chart 
                        data={data} 
                        field={[ 'nitrogen_dioxide']}
                        chartID='nitr'/> 

                </CardContent>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={12}>
                <Paper className={classes.paper}>
                <CardContent >
                    <Title>Sulfure Dioxide
                    { filters.start ? 
                    <React.Fragment> from <b>{filters.start}</b>  </React.Fragment>: 
                    <React.Fragment> from the first available record </React.Fragment>}
                  { filters.end ? 
                    <React.Fragment> to <b>{filters.end}</b> </React.Fragment>: 
                    <React.Fragment> to the last one </React.Fragment>} </Title>
                    <Chart 
                        data={data} 
                        field={['sulfure_dioxide']}
                        chartID='sulfure'/> 

                </CardContent>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={12}>
                <Paper className={classes.paper}>
                <CardContent >
                    <Title>Ozone and particullate matter
                    { filters.start ? 
                    <React.Fragment> from <b>{filters.start}</b>  </React.Fragment>: 
                    <React.Fragment> from the first available record </React.Fragment>}
                  { filters.end ? 
                    <React.Fragment> to <b>{filters.end}</b> </React.Fragment>: 
                    <React.Fragment> to the last one </React.Fragment>} </Title>
                    <Chart 
                        data={data} 
                        field={['ozone','particullate_matter']}
                        chartID='ozone_parmat'/> 

                </CardContent>
                </Paper>
            </Grid>
        </Grid>
        </TabPanel>
        
      {/* TabPanel 2 -- Grouped Series */}
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
            {['Carbon Monoxide','Nitrogen Dioxide','Sulfure Dioxide', 'Ozone','Particullate Matter'].map( (item,index) =>{
                return (
                <React.Fragment>
                <Grid key={index} item xs={12} md={12} lg={12}>
                    <Paper elevation={3} style={{padding:8}} className={clsx(classes.paper, classes2.section)}>
                        <Typography component="span" variant="h6" style={{color:'white'}} gutterBottom>
                        {item}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid key={index} item xs={12} md={4} lg={6} >
                    <Paper elevation={3} className={classes.paper}>
                    <CardContent style={{height:700}}>
                        <Title>Average value per hour of day
                          { filters.start ? 
                          <React.Fragment> from <b>{filters.start}</b>  </React.Fragment>: 
                          <React.Fragment> from the first available record </React.Fragment>}
                        { filters.end ? 
                          <React.Fragment> to <b>{filters.end}</b> </React.Fragment>: 
                          <React.Fragment> to the last one </React.Fragment>}</Title>
                        <HeatChart field={helper[item]}
                            data={data} 
                            chartID={item+'heat'}/>
                    </CardContent>
                    </Paper>
                </Grid>
                <Grid key={index} item xs={12} md={4} lg={6} >
                    <Paper elevation={3} className={classes.paper}>
                    <CardContent style={{height:700}}>
                        <Title>Analytics for daily cumulative data per month
                          { filters.start ? 
                          <React.Fragment> from <b>{filters.start}</b>  </React.Fragment>: 
                          <React.Fragment> from the first available record </React.Fragment>}
                        { filters.end ? 
                          <React.Fragment> to <b>{filters.end}</b> </React.Fragment>: 
                          <React.Fragment> to the last one </React.Fragment>}</Title>
                        <BoxPlotChart field={helper[item]}
                            data={data} 
                            chartID={item+'boxplot'}/>
                    </CardContent>
                    </Paper>
                </Grid>
                </React.Fragment>
            )})}
        </Grid>
      </TabPanel>
    </div>
  )
}