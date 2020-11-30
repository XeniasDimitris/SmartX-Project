import React from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent, useTheme } from '@material-ui/core';
import Title from '../Title'

import clsx from 'clsx';
import { useStyles }  from '../../css/DashboardCSS'

function Map(props){
    const [viewport, setViewport] = React.useState({
        width:  '100%',
        height: 700,
        latitude: 56.1496278,
        longitude: 10.2134046,
        zoom: 12
      });
      let token = process.env.REACT_APP_TOKEN
      return (
        <ReactMapGL  mapboxApiAccessToken={token}
            mapStyle='mapbox://styles/xeniasdimitris/cki3rye421lkb19qigk2jv3bw'
          {...viewport}
          onViewportChange={nextViewport => setViewport(nextViewport)}
        />
      );
}


export default function TrafficDash(props){
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightChart);

    return(
        <React.Fragment>
        {/* ----------------------------------- */}
        {/* Main Content of Dashboard */}
        {/* ----------------------------------- */}
  
          <Grid container  spacing={2}>
  
            <Grid item  xs={12} md={4} lg={12} >      
                <Paper>
                    <Map />
                </Paper>
            </Grid>
             
            <Grid item  xs={12} md={4} lg={12} >      
                   <Paper className={classes.paper}>
                    <CardContent>
                            <Title>hi</Title>
                        </CardContent>
                   </Paper>
            </Grid>
          </Grid>
        
  
    </React.Fragment>
    )
}