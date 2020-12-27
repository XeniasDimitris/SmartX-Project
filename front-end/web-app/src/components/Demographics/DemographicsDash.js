import React , { useEffect }from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent } from '@material-ui/core';
import Title from '../Title'
import API from '../../api-services'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import PieChart from './PieChart'
import Filters from './Filters'
import BarChart from './BarChart';
import Pyramid from './Pyramid'
import { makeStyles } from '@material-ui/core/styles';
import { useStyles }  from '../../css/DashboardCSS'

const useStyles2 = makeStyles((theme)=>({
  fixedHeightChart:{
    height: 700,
  },
  section:{
    backgroundColor: '#4faaff'
  }
}))

const fillData = (dat, item) =>{
  dat.gender[0]['value'] += item['Men']
  dat.gender[1]['value'] += item['Women']
  dat.gender[2].push({
    'community': item['Local community'],
    'male': item['Men'],
    'female': item['Women']
  })
  dat.years[0]['value'] += item['0-2  yr']
  dat.years[0][item['Local community']] = item['0-2  yr']

  dat.years[1]['value'] += item['3-5 yr']
  dat.years[1][item['Local community']] = item['3-5 yr']

  dat.years[2]['value'] += item['6-15 yr']
  dat.years[2][item['Local community']] = item['6-15 yr']
  
  dat.years[3]['value'] += item['16-19 yr']
  dat.years[3][item['Local community']] = item['16-19 yr']

  dat.years[4]['value'] += item['20-24 yr']
  dat.years[4][item['Local community']] = item['20-24 yr']

  dat.years[5]['value'] += item["25-64 yr"]
  dat.years[5][item['Local community']] = item['25-64 yr']
  
  dat.years[6]['value'] += item["65 yr -"]
  dat.years[5][item['Local community']] = item['65 yr -']
}
export default function DemographicsDashboard(props) {

  
  const classes = useStyles();
  const classes2 = useStyles2()
  const fixedHeightPaper = clsx(classes.paper, classes2.fixedHeightChart);


  /* ----------------------------------- */
  /* Define States of Component */
  /* ----------------------------------- */
  const [data,setData] = React.useState(null)
  const [filters,setFilters] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  /* ----------------------------------- */
  /* Handle Filter Submission */
  /* ----------------------------------- */
  const handleSetFilters = (filt)=>{
      setFilters(filt)
      setLoading(true)
  }

  
  
  /* ------------------------------------------- */
  /* Fetch data when filters have been submitted  */
  /* ------------------------------------------- */
  useEffect( () =>{
    
    if (filters){
      setTimeout( ()=>{
            let dat = { 
              gender: [ { 'gender' : 'Men','value' : 0}, 
                        { 'gender' : 'Women','value' : 0},
                        []]
              , years: [ { 'year': '0-2 yr', 'value': 0},
                         { 'year': '3-5 yr', 'value': 0},
                         { 'year': '6-15 yr', 'value': 0},
                         { 'year': '16-19 yr', 'value': 0},
                         { 'year': '20-24 yr', 'value': 0},
                         { 'year': '25-64 yr', 'value': 0},
                         { 'year': '65- yr', 'value': 0}]
              }
            API.demographicsAPI()
            .then(resp => {
                for (let key in filters){
                  if ((key==='All') && (filters[key]===true)){
                    resp.forEach( (item)=>{
                      fillData(dat,item)
                    })
                    break;
                  }
                  if (filters[key]===true){
                    for (var i = 0; i < resp.length; i++) {
                      let item = resp[i]
                      if (key === item['Local community']){
                        fillData(dat,item)
                        break;
                      }
                    }
                  }
              }
              setData(dat)
              setLoading(false)
            })
            .catch(error => error)
          }, 500 ) 
    }
  },[filters])


  return (
      <React.Fragment>
      {/* ----------------------------------- */}
      {/* Main Content of Dashboard */}
      {/* ----------------------------------- */}

        <Grid container  spacing={2}>

          
          {/* ----------------------------------- */}
          {/* Filters Component */}
          {/* ----------------------------------- */}
          <Grid item  xs={12} md={4} lg={3} >

                <Paper className={classes.paper}>
                  <CardContent >
                    <Filters handleSetFilters={handleSetFilters}/>
                  </CardContent>

                </Paper>
          </Grid>

          
          {/* ----------------------------------- */}
          {/* BarCharts and Piecharts */}
          {/* ----------------------------------- */}
           { filters && 
            <Grid item xs={12} md={8} lg={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper className={clsx(classes.paper, classes2.section)}>
                    <Typography component="span" variant="h6" style={{color:'white'}} gutterBottom>
                    Gender Distribution
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={5}>
                  <Paper className={classes.paper}>
                    <CardContent style={{height:400}} className={clsx(classes.paper)}>
                      { loading ? 
                          <CircularProgress color="secondary" className={classes.loading}/>
                          : (
                        <React.Fragment>
                            <Title>Pie chart of gender distribution</Title> 
                            <PieChart data={data.gender.slice(0,2)} category='gender'  chartID='gender pie'/>
                          </React.Fragment>
                      )} 
                    </CardContent>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={12} lg={12}>
                  <Paper className={classes.paper}>
                    <CardContent className={fixedHeightPaper} >
                      { loading ? 
                          <CircularProgress color="secondary" className={classes.loading}/>
                          : (
                        <React.Fragment>
                            <Title>Pyramid of gender distribution</Title> 
                            <Pyramid data={data.gender[2]}  chartID='gender bar'/>
                          </React.Fragment>
                      )} 
                    </CardContent>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper className={clsx(classes.paper, classes2.section)}>
                    <Typography component="span" variant="h6" style={{color:'white'}} gutterBottom>
                          Age Distribution
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={5}>
                  <Paper className={classes.paper}>
                    <CardContent style={{height:400}}  >
                      { loading ? 
                          <CircularProgress color="secondary" className={classes.loading}/>
                          : (
                        <React.Fragment>
                            <Title>Pie chart of age distribution</Title> 
                            <PieChart data={data.years} category="year" chartID='year pi'/>
                          </React.Fragment>
                      )} 
                    </CardContent>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper className={classes.paper}>
                    <CardContent className={fixedHeightPaper} >
                      { loading ? 
                          <CircularProgress color="secondary" className={classes.loading}/>
                          : (
                        <React.Fragment>
                            <Title>Bar chart of age distribution</Title> 
                            <BarChart data={data.years} category="year" chartID='year bar'/>
                          </React.Fragment>
                      )} 
                    </CardContent>
                  </Paper>
                </Grid>

              </Grid>
            </Grid>} 
           

        </Grid>
      

  </React.Fragment>
  );
}