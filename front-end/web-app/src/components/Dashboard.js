import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Info from './Info';
import Data from './Data';
import { CardContent } from '@material-ui/core';
import Form from './Form'


import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import { useStyles }  from '../css/DashboardCSS'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Xenias Dimitris '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Dashboard(props) {
  const classes = useStyles();
  const open = props.open
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
      <React.Fragment>
      {/* ----------------------------------- */}
      {/* Main Content of Dashboard */}
      {/* ----------------------------------- */}
      
        <Container maxWidth="lg" className={clsx(classes.container, open && classes.containerShift)}>

          <Grid container spacing={3}>
            {/* Filters */}
            <Grid  container alignContent='center' spacing={2} xs={12} md={4} lg={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                  <CardContent >
                    <Form />
                  </CardContent>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                  <CardContent >
                  <FormControlLabel
                    value="start"
                    control={<Checkbox color="primary" />}
                    label="Start"
                    labelPlacement="start"
                  />
                  </CardContent>
                  
                </Paper>
              </Grid>
            </Grid>     
            
                            
            {/* Chart */} 
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
                <CardContent className={fixedHeightPaper} >
                  <Chart />
                </CardContent>
              </Paper>
            </Grid>



            {/* Raw Data */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <CardContent>
                  <Data />
                </CardContent>
              </Paper>
            </Grid>


            {/* Extra Info */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={classes.paper}>
                <CardContent>
                  <Info />
                </CardContent>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={classes.paper}>
                <CardContent>
                  <Info />
                </CardContent>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={classes.paper}>
                <CardContent>
                  <Info />
                </CardContent>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
    </React.Fragment>
  );
}