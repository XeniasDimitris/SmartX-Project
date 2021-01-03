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
import BarChart from './BarChart'
import LineChart from './LineChart'
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
        <Tab label="Timeline Series" {...a11yProps(0)} />
        <Tab label="Grouped Analytics" {...a11yProps(1)} />
      </Tabs>
      </AppBar>

      {/* TabPanel 1 -- Timeline Series */}
      <TabPanel value={value} index={0}>
        <Paper elevation={2} className={classes.paper}>
          <CardContent>
          <Title> Cumulative Parking Spaces </Title>
            <LineChart  
                    data={data} 
                    chartID='parkings'/>
          </CardContent> 
        </Paper>  
      </TabPanel>
          
      {/* TabPanel 2 -- Grouped Series */}
      <TabPanel value={value} index={1}>
      <Grid container spacing={2}>
        <Grid item  xs={12} md={4} lg={12} >
          <Paper elevation={2}  className={classes.paper}>
            <CardContent style={{height: 700}}>
              <Title> Parking Spaces across Town </Title>
              <BarChart  
                    data={data} 
                    chartID='parkings'/> 
            </CardContent>
          </Paper> 
        </Grid>
      </Grid>
      </TabPanel>
    </div>
  )
}