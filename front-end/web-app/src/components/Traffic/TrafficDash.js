import React, { useEffect, useState } from 'react'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent, Typography, useTheme } from '@material-ui/core';
import Title from '../Title'
import clsx from 'clsx';
import API from '../../api-services'
import Map from './Map'
import Filters from './TrafficFilters'
import { useStyles }  from '../../css/DashboardCSS'




export default function TrafficDash(props){
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightChart);
    const [sensors, setSensors] = useState(null)
    const [reportIdData, setReportIdData] = useState(null)
    const [data,setData] = useState(null)

    useEffect(()=>{
      API.trafficSensorsAPI()
      .then( (res) => setSensors(res))
    },[])

    useEffect( ()=>{
      if (reportIdData){
        let data = []
        reportIdData.forEach( async (item) =>{
          let url = `http://127.0.0.1:8000/api/traffic/records/?id=${item.rep_id}&start=2014-08-08-15&end=2014-08-08`
          const resp = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          const res = await resp.json()
          data.push({item, res})
        })
        setData(data)
      }
    }, [reportIdData])

    return(
        <React.Fragment>
        {/* ----------------------------------- */}
        {/* Main Content of Dashboard */}
        {/* ----------------------------------- */}
  
          <Grid container  spacing={2}>
  
            <Grid item  xs={12} md={4} lg={12} > 
                <Paper>                  
                  <CardContent>
                    <Title>Sensors across the town</Title>
                  </CardContent>  
                </Paper>     
                <Paper>
                    <Map sensors={sensors} setReportIdData={setReportIdData}/>
                </Paper>
            </Grid>
             
            <Grid item  xs={12} md={4} lg={3} >      
                   <Paper className={classes.paper}>
                    <CardContent>
                      <Filters/>
                    </CardContent>
                   </Paper>
            </Grid>

          </Grid>
        
  
    </React.Fragment>
    )
}