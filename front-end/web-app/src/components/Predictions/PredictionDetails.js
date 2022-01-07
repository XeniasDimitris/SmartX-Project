import React , { useEffect }from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import LineChart from './LineChart';
import Typography from '@material-ui/core/Typography';


import { CardContent } from '@material-ui/core';
import Filters from './Filters'
import Title from '../Title'
import BarChart from './BarChart'
import { useStyles }  from '../../css/DashboardCSS'
import { useStyles as useStyles3 }  from './PredictionCSS'
import API from '../../api-services'
import CircularProgress from '@material-ui/core/CircularProgress';
import PredictionDetails from './PredictionDetails'
import { makeStyles } from '@material-ui/core/styles';



const useStyles2 = makeStyles((theme) => ({
    tabs: {
      backgroundColor: theme.palette.secondary.main,
    },
    section:{
      backgroundColor: '#68b2f8'
    }
  }));
export default function Prediction(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const classes3=  useStyles3();
  
  const data = props.data

  return (
      <React.Fragment>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
            <Paper className={clsx(classes.paper, classes2.section)}>
            <Typography component="span" variant="h5" style={{color:'white'}} gutterBottom>
                     {data['model']}
            </Typography>
            </Paper>
            </Grid>
            <Grid alignContent='flex-start' container item  xs={3} md={3} lg={3} spacing={2}>
                <Grid item xs={3} md={3} lg={12}>
                    <Paper className={clsx(classes.paper)}>
                    <Typography component="span" style={{fontSize:18}} gutterBottom>
                        Forecast: {Math.round(data['prediction']*100)/100} AQI
                    </Typography>

                    </Paper>
                </Grid>
                <Grid item xs={3} md={3} lg={12}>
                    <Paper className={clsx(classes.paper)}>
                    <Typography component="span" style={{fontSize:18}} gutterBottom>
                        Actual: {Math.round(data['expected']*100) /100} AQI
                    </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={9}>
                <Paper className={clsx(classes.paper, classes3.fixedHeightChart)}>
                <BarChart data={data} category="year" chartID={props.id}/>
                </Paper>
            </Grid>
        </Grid>



  </React.Fragment>
  );
}