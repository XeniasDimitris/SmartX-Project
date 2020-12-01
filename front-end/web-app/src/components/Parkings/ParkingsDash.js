import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent, Typography, useTheme } from '@material-ui/core';
import Title from '../Title'
import clsx from 'clsx';
import API from '../../api-services'
import Map from './ParkingsMap'
import CircularProgress from '@material-ui/core/CircularProgress';
import Filters from './ParkingsFilters'
import { useStyles }  from '../../css/DashboardCSS'

function formatDate(start,end){
  end = end ? `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`: null
  start =  start ? `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}` : null
  return {start,end}
}


export default function TrafficDash(props){
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightChart);
    const [parkings, setParkings] = useState(null)
    const [filters,setFilters] = useState(null)

    const handleSetFilters = (filters) => (e) =>{

    }
    
    useEffect(()=>{
        API.ParkingsInfoAPI()
        .then( (res) => setParkings(res))
    },[])
  
    return(
        <React.Fragment>
        {/* ----------------------------------- */}
        {/* Main Content of Dashboard */}
        {/* ----------------------------------- */}
  
          <Grid container  spacing={2}>
            
            <Grid item  xs={12} md={4} lg={3} >      
                   <Paper className={classes.paper}>
                    <CardContent>
                      <Filters handleSetFilters={handleSetFilters}/>
                    </CardContent>
                   </Paper>
            </Grid>
            <Grid item  xs={12} md={4} lg={9} > 
                <Paper>                  
                  <CardContent>
                    <Title>Parkings across the town</Title>
                  </CardContent>  
                </Paper>     
                <Paper>
                    <Map parkings={parkings}/>
                </Paper>
            </Grid>
             

            {/* { filters && (
                loading ? 
                  <Grid item  xs={12} md={4} lg={9} >
                    <Paper className={classes.paper}>
                      <CardContent>
                        <CircularProgress color="secondary" className={classes.loading}/>
                      </CardContent>
                    </Paper>
                  </Grid>
                :
                  <Grid item  xs={12} md={4} lg={9} >      
                    <Grid container spacing={2}>
                      {data.map((obj,index)=> {
                          return (
                          <Grid key={index} item xs={12} md={4} lg={12} >
                              <Paper className={classes.paper}>
                                <CardContent >
                                  <Title> From sensor {obj.item.point_1} to sensor {obj.item.point_2}</Title>
                                  <Chart field={['vehicleCount','avgSpeed']} 
                                        data={obj.res} 
                                        chartID={obj.item.rep_id.toString()}/>
                                </CardContent>
                              </Paper>
                          </Grid>
                          )})}
                    </Grid>
                  </Grid> )
            } */}
          </Grid>
        
  
    </React.Fragment>
    )
}