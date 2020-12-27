import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent} from '@material-ui/core';
import Title from '../Title'
import API from '../../api-services'
import Map from './PollutionMap'
import CircularProgress from '@material-ui/core/CircularProgress';
import Filters from './PollutionFilters'
import TabContainer from './TabContainer'
import { useStyles }  from '../../css/DashboardCSS'

function formatDate(start,end){
  end = end ? `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`: null
  start =  start ? `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}` : null
  return {start,end}
}


export default function PollutionDash(props){

    /* ----------------------------------- */
    /* Define States of Component */
    /* ----------------------------------- */
    const classes = useStyles()
    const [sensors, setSensors] = useState(null)
    const [filters,setFilters] = useState(null)
    const [loading, setLoading] = useState(null)
    const [data, setData] = useState(null)
    const [disabledFilterButton, setDisabledFilterButton] = useState(true)
    const [disabledMap, setDisabledMap] = useState(true)
    const [selectedSensor, setSelectedSensor] = useState(null)


    /* ----------------------------------- */
    /* Handle Filter Submission */
    /* ----------------------------------- */
    const handleSetFilters = ({start,end}) =>{
      let ret = formatDate(start,end)
      start = ret.start
      end = ret.end
      setFilters({start,end})
      setLoading(true)
    }



    /* ---------------------------------------------------------- */
    /* Fetch Data for the sensor when filters will be submitted  */
    /* ---------------------------------------------------------- */
    useEffect( () =>{
      if (filters){
        let {start, end} = filters
        let report_id = selectedSensor.report_id
        setTimeout( ()=>{
              API.PollutionRecsAPI({start,end,report_id})
              .then(resp => {
                  resp.forEach(item =>{
                    item.datetime = new Date(item.datetime)
                  })
                  setData(resp)
                  setLoading(false)
              })
              .catch(error => error)
            }, 500 )} 
      },[filters])


    /* ------------------------------------------- */
    /* Fetch sensor info when page will be loaded  */
    /* ------------------------------------------- */
    useEffect(()=>{
        API.PollutionSensorsAPI()
        .then( (res) => setSensors(res)) 
    },[])
  
    return(
        <React.Fragment>
        {/* ----------------------------------- */}
        {/* Main Content of Dashboard */}
        {/* ----------------------------------- */}
  
          <Grid container  spacing={2}>
          
          {/* ----------------------------------- */}
          {/* Map Component */}
          {/* ----------------------------------- */}
          <Grid item  xs={12} md={4} lg={12} > 
                <Paper>                  
                  <CardContent>
                    <Title>1) Selecet Pollution Sensor</Title>
                  </CardContent>  
                </Paper>     
                <Paper>
                    <Map sensors={sensors}
                        disabledMap={disabledMap}
                        setDisabledMap={setDisabledMap}
                        setDisabledFilterButton={setDisabledFilterButton}
                        selectedSensor={selectedSensor}
                        setSelectedSensor={setSelectedSensor}
                        setFilters={setFilters}
                        />
                </Paper>
            </Grid>

            {/* ----------------------------------- */}
            {/* Filters Component */}
            {/* ----------------------------------- */}
            <Grid item  xs={12} md={4} lg={3} >      
                   <Paper className={classes.paper}>
                    <CardContent>
                        <Filters handleSetFilters={handleSetFilters} disabledFilterButton={disabledFilterButton}/> 
                    </CardContent>
                   </Paper>
            </Grid>
             

            {/* ----------------------------------------- */}
            {/* if we have a submitted sensor, load charts */}
            {/* ----------------------------------------- */}
            { filters && (
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
                  <Paper>
                    <TabContainer data={data} filters={filters}/>     
                  </Paper>  
                </Grid>
            )}

          </Grid>
        
  
    </React.Fragment>
    )
}