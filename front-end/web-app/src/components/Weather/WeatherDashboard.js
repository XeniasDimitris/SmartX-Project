import React , { useEffect }from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Info from '../Info';
import Data from './Data';
import { CardContent, useTheme } from '@material-ui/core';
import Filters from './Filters'
import Title from '../Title'
import { useStyles }  from '../../css/DashboardCSS'
import API from '../../api-services'
import CircularProgress from '@material-ui/core/CircularProgress';

function formatDate(start,end){
  end = end ? `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`: null
  start =  start ? `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}` : null
  return {start,end}
}


export default function WeatherDashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightChart);
  const theme = useTheme()
  //--------------------------------
  //All about fetching data from API
  //---------------------------------
  const [data,setData] = React.useState(null)
  const [filters,setFilters] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const handleSetFilters = ({start,end,datasets})=>{
      let ret = formatDate(start,end)
      start = ret.start
      end = ret.end
      setFilters({start,end,datasets})
      setLoading(true)
  }

  // API CALL for given filters from Filter Form
  useEffect( () =>{
    
    if (filters){
      let {start, end, datasets} = filters
      console.log(datasets)
      setTimeout( ()=>{
        let cum_data = []
        for (let key in datasets){
          if (datasets[key]===true){ 
            console.log('mpika',key) 
            API.weatherAPI({start,end, dataset: key})
            .then(resp => {
                resp.forEach((item)=>{
                  item.datetime = new Date(item.datetime)
                  if (item.value === ''){
                    delete item.value
                  }
                })
                console.log()
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

          {/* Chart */}
           { filters && 
            <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <CardContent className={fixedHeightPaper} >
                { loading ? 
                    <CircularProgress color="secondary" className={classes.loading}/>
                    : (
                  <React.Fragment>
                      <Title>Weather from {filters.start} to {filters.end}</Title>
                      <Chart data={data} />
                    </React.Fragment>
                )} 
              </CardContent>
            </Paper>
          </Grid>} 
           

        </Grid>


        {/* Raw Data */}
        {filters && 
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
        </Grid>}
        


  </React.Fragment>
  );
}