import React , { useEffect }from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import LineChart from './LineChart';
// import Data from './Data';
import { CardContent } from '@material-ui/core';
import Filters from './Filters'
import Title from '../Title'
// import HeatChart from './HeatChart'
// import BoxPlotChart from './BoxPlotChart'
import { useStyles }  from '../../css/DashboardCSS'
import API from '../../api-services'
import CircularProgress from '@material-ui/core/CircularProgress';
import PredictionDetails from './PredictionDetails'

const dictionary = {
  'Simple Exponential Smoothing': 'ses',
  'Multiple Linear Regression': 'mlr',
  'Prophet': 'prophet',
  'ARIMA': 'arima',
  'Vector Auto Regression': 'var',
  'Random Forest': 'random_forest',
  'SVR': 'svr',
  'LSTM': 'lstm',
  'MLP': 'mlp',

}

export default function Prediction() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightChart);
  
  //--------------------------------
  //All about fetching data from API
  //---------------------------------
  const [data,setData] = React.useState(null)
  const [filters,setFilters] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const handleSetFilters = (filters)=>{
      setFilters(filters)
      setLoading(true)
  }

  //---------------------------------------------
  // API CALL for given filters from Filter Form
  //---------------------------------------------
  useEffect( () =>{
    
    async function fetchData(){
      if (filters){
        let data = []
        await Promise.all(Object.keys(filters).map(async (item) =>{
          if (filters[item]== true){
            let res = await API.Prediction(dictionary[item])
            res['model'] = item
            data.push(res)
          }
        }))
        setData(data)
        setLoading(false)
      }
    }
    fetchData()
  },[filters])


  return (
      <React.Fragment>
      {/* ----------------------------------- */}
      {/* Main Content of Dashboard */}
      {/* ----------------------------------- */}

        <Grid container  spacing={2}>
         <Grid item  xs={12} md={12} lg={12} >
            <Paper className={classes.paper}>
              <CardContent>
               <Title >Based on our data, we forecast the measure of Carbon monoxide
                 for the previous hour and compare these two measures for the evaluation 
                 of our forecast
               </Title>
              </CardContent>

            </Paper>
          </Grid>

          {/* Filters */}
          <Grid item  xs={12} md={4} lg={3} >

                <Paper className={classes.paper}>
                  <CardContent >
                    <Filters handleSetFilters={handleSetFilters}/>
                  </CardContent>

                </Paper>
          </Grid>

          
            {/* ----------------------------------------- */}
            {/* Charts Component */}
            {/* ----------------------------------------- */}
           { filters && 
            <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <CardContent >
                { loading ? 
                    <CircularProgress color="secondary" className={classes.loading}/>
                    : (
                    data.map( (item, index) =>{
                      console.log('index is ', index)
                      return (
                        <Paper elevation={4}style={{margin:'30px 0 30px'}} className={classes.paper}>
                          <PredictionDetails data={item} id={index}/>
                        </Paper>
                      )
                    })
                )} 
              </CardContent>
            </Paper>

          </Grid>} 
        

        </Grid>

  </React.Fragment>
  );
}