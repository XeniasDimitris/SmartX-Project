import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Info from './Info';
import Data from './Data';
import { CardContent, useTheme } from '@material-ui/core';
import DateForm from './DateForm'
import Title from './Title'
import Test from './test'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useStyles }  from '../css/DashboardCSS'
import API from '../api-services'


export default function Dashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightChart);
  const theme = useTheme()

  //-------------------------------
  // All about checkboxes 
  //-------------------------------
  const [checkboxState, setcheckboxState] = React.useState({
    gilad: false,
    jason: false,
    antoine: false,
  });
  const handleCheckboxChange = (event) => {
    setcheckboxState({ ...checkboxState, [event.target.name]: event.target.checked });
  };


  const { gilad, jason, antoine } = checkboxState;
  //-------------------------------
  //All about dates selection
  //-------------------------------
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);


  //--------------------------------
  //All about fetching data from API
  //---------------------------------
  const [data,setData] = React.useState([])
  
  const handleClick = (e) =>{
    let end = selectedEndDate && selectedEndDate.split('T')[0] 
    let start = selectedStartDate && selectedStartDate.split('T')[0] 
    let queries = { start, end }
    API.weatherAPI(queries)
        .then(resp => setData(resp))
        .catch(error => error)
    }
  
  return (
      <React.Fragment>
      {/* ----------------------------------- */}
      {/* Main Content of Dashboard */}
      {/* ----------------------------------- */}
    
        <Grid container  spacing={2}>
          
          {/* Filters */}
          <Grid item  xs={12} md={4} lg={3} >

                <Paper className={classes.paper}>
                  <CardContent >
                    <DateForm setSelectedStartDate={setSelectedStartDate}
                              selectedStartDate={selectedStartDate}
                              setSelectedEndDate={setSelectedEndDate}
                              selectedEndDate={selectedEndDate}
                    />
                    <FormControl component="fieldset" style={{marginTop: 30, display:'flex'}}>
                      <FormLabel required component="legend" > <Title>Choose Data</Title></FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={gilad} onChange={handleCheckboxChange} name="gilad" />}
                          label="Gilad Gray"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={jason} onChange={handleCheckboxChange} name="jason" />}
                          label="Jason Killian"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={antoine} onChange={handleCheckboxChange} name="antoine" />}
                          label="Antoine Llorca"
                        />
                      </FormGroup>
                    </FormControl>


                    <Button  style={{display:'flex',marginTop: 20,color:theme.palette.error.main}}
                              variant='outlined'
                              onClick={handleClick}>
                                See Diagram
                    </Button>
                    
                  </CardContent>                  
     
                </Paper>
          </Grid>   
                  
          {/* Chart */} 
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <CardContent className={fixedHeightPaper} >
                <Chart data={data} />
              </CardContent>
            </Paper>
          </Grid>
          
        </Grid>


        <Grid container style={{paddingTop:10}}spacing={2}>
          {/* Raw Data */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <CardContent>
                <Data data={data}/>
              </CardContent>
            </Paper>
          </Grid>
        </Grid>
         
  </React.Fragment>
  );
}