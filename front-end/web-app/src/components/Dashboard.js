import React , { useEffect }from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Info from './Info';
import Data from './Data';
import { CardContent, useTheme } from '@material-ui/core';
import Filters from './Filters'
import Title from './Title'
import { useStyles }  from '../css/DashboardCSS'
import API from '../api-services'

function formatDate(start,end){
  end = end ? `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`: null
  start =  start ? `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}` : null
  return {start,end}
}


export default function Dashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightChart);
  const theme = useTheme()
  //--------------------------------
  //All about fetching data from API
  //---------------------------------
  const [data,setData] = React.useState([])
  const [filters,setFilters] = React.useState(null)

  const handleSetFilters = ({start,end})=>{
      setFilters(formatDate(start,end))
  }


  useEffect( () =>{
    if (filters){
    API.weatherAPI(filters)
        .then(resp => {
          resp.forEach((item)=>{
            item.datetime = new Date(item.datetime)
          })
          setData(resp)

        })
        .catch(error => error)
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
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <CardContent className={fixedHeightPaper} >
                { filters ? (
                  <React.Fragment>
                    <Title>Weather from {filters.start} to {filters.end}</Title>
                    <Chart data={data} />
                  </React.Fragment>)
                  : null
                }
              </CardContent>
            </Paper>
          </Grid>

        </Grid>


        {/* Raw Data */}
        <Grid container style={{paddingTop:10}}spacing={2}>
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