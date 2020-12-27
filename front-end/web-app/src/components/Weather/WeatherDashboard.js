import React , { useEffect }from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LineChart from './LineChart';
import Data from './Data';
import { CardContent } from '@material-ui/core';
import Filters from './Filters'
import Title from '../Title'
import HeatChart from './HeatChart'
import BoxPlotChart from './BoxPlotChart'
import { useStyles }  from '../../css/DashboardCSS'
import API from '../../api-services'
import CircularProgress from '@material-ui/core/CircularProgress';

function formatDate(start,end){
  end = end ? `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`: null
  start =  start ? `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}` : null
  return {start,end}
}

const measure = {
  temperature: ['Temperature','Celsium'],
  humidity: ['Humidity','%'],
  pressure: ['Pressure','mBar'],
  dew: ['Dew Point','Celsium'],
  wind_direction:['Wind Direction','degrees'],
  wind_speed: ['Wind Speed','kph']
}
export default function WeatherDashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightChart);
  
  //--------------------------------
  //All about fetching data from API
  //---------------------------------
  const [data,setData] = React.useState(null)
  const [filters,setFilters] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [selectedDataset,setSelectedDataset] = React.useState(null)

  const handleSetFilters = ({start,end,datasets})=>{
      let ret = formatDate(start,end)
      start = ret.start
      end = ret.end
      setFilters({start,end,datasets})
      setLoading(true)
  }

  //---------------------------------------------
  // API CALL for given filters from Filter Form
  //---------------------------------------------
  useEffect( () =>{
    
    if (filters){
      let {start, end, datasets} = filters
      setTimeout( ()=>{
        for (let key in datasets){
          if (datasets[key]===true){ 
            setSelectedDataset(key)
            API.weatherAPI({start,end, dataset: key})
            .then(resp => {
                resp.forEach((item)=>{
                  item.datetime = new Date(item.datetime)
                  if (item.value === ''){
                    delete item.value
                  }
                })
                setData(resp)
                setLoading(false)
            })
            .catch(error => error)
            break
          }
        }
      }, 500 ) 
    }
  },[filters])


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
                    <Filters handleSetFilters={handleSetFilters}/>
                  </CardContent>

                </Paper>
          </Grid>

          
            {/* ----------------------------------------- */}
            {/* Charts Component */}
            {/* ----------------------------------------- */}
           { filters && 

            // Line Chart with raw Data
            <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <CardContent className={fixedHeightPaper} >
                { loading ? 
                    <CircularProgress color="secondary" className={classes.loading}/>
                    : (
                  <React.Fragment>
                      {selectedDataset  && <Title>{measure[selectedDataset][0]} 
                        { filters.start ? 
                          <React.Fragment> from <b>{filters.start}</b>  </React.Fragment>: 
                          <React.Fragment> from the first available record </React.Fragment>}
                        { filters.end ? 
                          <React.Fragment> to <b>{filters.end}</b> </React.Fragment>: 
                          <React.Fragment> to the last one </React.Fragment>}
                        </Title>
                      }
                      <LineChart data={data} chartID={measure[selectedDataset][0]} measure={measure[selectedDataset][1]}/>
                    </React.Fragment>
                )} 
              </CardContent>
            </Paper>

          </Grid>} 
          { filters && 
            // HeatChart grouped by Day
            <Grid item xs={12} md={8} lg={6}>
            <Paper className={classes.paper}>
              <CardContent style={{height:500}}>
                { loading ? 
                    <CircularProgress color="secondary" className={classes.loading}/>
                    : (
                  <React.Fragment>
                      {selectedDataset  && <Title>Average {measure[selectedDataset][0]} grouped by Day
                        { filters.start ? 
                          <React.Fragment> from <b>{filters.start}</b>  </React.Fragment>: 
                          <React.Fragment> from the first available record </React.Fragment>}
                        { filters.end ? 
                          <React.Fragment> to <b>{filters.end}</b> </React.Fragment>: 
                          <React.Fragment> to the last one </React.Fragment>}
                        </Title>
                      }
                      <HeatChart data={data} chartID='heat'/>
                    </React.Fragment>
                )} 
              </CardContent>
            </Paper>
          </Grid>} 
          { filters && 
            // Box plot grouped by Month
            <Grid item xs={12} md={8} lg={6}>
            <Paper className={classes.paper}>
              <CardContent style={{height:500}}>
                { loading ? 
                    <CircularProgress color="secondary" className={classes.loading}/>
                    : (
                  <React.Fragment>
                      {selectedDataset  && <Title> {measure[selectedDataset][0]} grouped by Month
                        { filters.start ? 
                          <React.Fragment> from <b>{filters.start}</b>  </React.Fragment>: 
                          <React.Fragment> from the first available record </React.Fragment>}
                        { filters.end ? 
                          <React.Fragment> to <b>{filters.end}</b> </React.Fragment>: 
                          <React.Fragment> to the last one </React.Fragment>}
                        </Title>
                      }
                      <BoxPlotChart data={data} chartID='boxplot'/>
                    </React.Fragment>
                )} 
              </CardContent>
            </Paper>
          </Grid>} 

        </Grid>


    
        {/* ----------------------------------------- */}
        {/* Raw Data Component */}
        {/* ----------------------------------------- */}
        {/* {filters && 
        <Grid container style={{paddingTop:10}}spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper square={true} >
              <CardContent>
               <Title>Raw Data</Title>
              </CardContent>
            </Paper>
            <Paper square={true} >
                <CardContent>
                  { loading?
                  <CircularProgress color="secondary" className={classes.loading}/>
                  :<Data data={data}/>
                  }
                  </CardContent>
                
            </Paper>
          </Grid>
        </Grid>} */}
        


  </React.Fragment>
  );
}