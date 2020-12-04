import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent } from '@material-ui/core';
import Title from '../Title'
import API from '../../api-services'
import Map from './Dokk1Map'
import CircularProgress from '@material-ui/core/CircularProgress';
import Filters from './Dokk1Filters'
import Chart from './Dokk1Chart'
import { useStyles }  from '../../css/DashboardCSS'

function formatDate(start,end){
  end = end ? `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`: null
  start =  start ? `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}` : null
  return {start,end}
}


export default function Dokk1Dash(props){
    const classes = useStyles()
    const [sensors, setSensors] = useState(null)
    const [filters,setFilters] = useState(null)
    const [loading, setLoading] = useState(null)
    const [data, setData] = useState(null)
    const [disabledFilterButton, setDisabledFilterButton] = useState(true)
    const [disabledMap, setDisabledMap] = useState(true)
    const [selectedSensor, setSelectedSensor] = useState(null)

    const handleSetFilters = ({start,end}) =>{
      let ret = formatDate(start,end)
      start = ret.start
      end = ret.end
      setFilters({start,end})
      setLoading(true)
    }


    useEffect( () =>{
      if (filters){
        let {start, end} = filters
        let id = selectedSensor.id
        setTimeout( ()=>{
              API.Dokk1RecsAPI({start,end,id})
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

    useEffect(()=>{
        API.SensorsDokk1API()
        .then( (res) => setSensors(res))
    },[])
  
    return(
        <React.Fragment>
        {/* ----------------------------------- */}
        {/* Main Content of Dashboard */}
        {/* ----------------------------------- */}
  
          <Grid container  spacing={2}>
            
          <Grid item  xs={12} md={4} lg={12} > 
                <Paper>                  
                  <CardContent>
                    <Title>1) Select Dokk1's Sensor</Title>
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
            <Grid item  xs={12} md={4} lg={3} >      
                   <Paper className={classes.paper}>
                    <CardContent>
                        <Filters handleSetFilters={handleSetFilters} disabledFilterButton={disabledFilterButton}/> 
                    </CardContent>
                   </Paper>
            </Grid>
             

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
                    <Grid container spacing={2}>
                      <Grid item  xs={12} md={4} lg={12} >      
                        <Paper className={classes.paper}>
                          <CardContent >
                            <Title> Humidity and Temperature of Sensor {selectedSensor.id}  </Title>
                            <Chart  
                                  data={data} 
                                  field={['humidity', 'temperature']}
                                  chartID='hum_temp'/> 
                          </CardContent>
                        </Paper>
                      </Grid>
                      <Grid item  xs={12} md={4} lg={12} >      
                        <Paper className={classes.paper}>
                          <CardContent >
                            <Title> Co2 of Sensor {selectedSensor.id} </Title>
                            <Chart 
                                  data={data} 
                                  field={['co2']}
                                  chartID='co2'/> 
                          </CardContent>
                        </Paper>
                      </Grid>
                      <Grid item  xs={12} md={4} lg={12} >      
                        <Paper className={classes.paper}>
                          <CardContent >
                            <Title>Light Level and Color of Sensor {selectedSensor.id} </Title>
                            <Chart 
                                  data={data} 
                                  field={['light_level', 'light_colour']}
                                  chartID='light'/> 
                          </CardContent>
                        </Paper>
                      </Grid>
                      <Grid item  xs={12} md={4} lg={12} >      
                        <Paper className={classes.paper}>
                          <CardContent >
                            <Title> Occupancy of Sensor {selectedSensor.id} </Title>
                            <Chart 
                                  data={data} 
                                  field={['occupancy']}
                                  chartID='occ'/> 
                          </CardContent>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
            )}

          </Grid>
        
  
    </React.Fragment>
    )
}