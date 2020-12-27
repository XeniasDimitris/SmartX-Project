import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent } from '@material-ui/core';
import Title from '../Title'
import API from '../../api-services'
import Map from './Map'
import Filters from './TrafficFilters'
import CircularProgress from '@material-ui/core/CircularProgress';
import TabContainer from './TabContainer' 
import { useStyles }  from '../../css/DashboardCSS'

function formatDate(start,end){
  end = end ? `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`: null
  start =  start ? `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}` : null
  return {start,end}
}



export default function TrafficDash(props){
      
    /* ----------------------------------- */
    /* Define States of Component */
    /* ----------------------------------- */

    const classes = useStyles()
    const [sensors, setSensors] = useState(null)
    const [reportIdData, setReportIdData] = useState(null)
    const [data,setData] = useState(null)
    const [filters,setFilters] = useState(null)
    const [disabledMap, setDisabledMap] = useState(true)
    const [disabledFilters, setDisabledFilters] = useState(true)
    const [loading, setLoading] = useState(null)
 
    
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

    
    /* ------------------------------------------- */
    /* Fetch sensors info when page has been loaded  */
    /* ------------------------------------------- */
    useEffect(()=>{
      API.trafficSensorsAPI()
      .then( (res) => setSensors(res))
    },[])


    /* ---------------------------------------------------------- */
    /* Fetch Data for each record when filters have been submitted */
    /* ---------------------------------------------------------- */
    useEffect( ()=>{
      async function fetchData(){
        if (filters){
          let data = []
          await Promise.all(reportIdData.map( async (item) =>{
            let res = await API.trafficRecordsAPI({rep_id: item.rep_id, start: filters.start, end: filters.end})
            res.forEach( i =>{
              i.datetime = new Date(i.datetime)
            })
            data.push({item, res})
          }))
          console.log(data)
          setData(data)
          setLoading(false)
        }
      }
      fetchData()
    }, [filters])

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
                    <Title>1) Select Traffic Sensor</Title>
                  </CardContent>  
                </Paper>     
                <Paper>
                    <Map sensors={sensors} 
                        setReportIdData={setReportIdData} 
                        disabledMap={disabledMap} 
                        setDisabledMap={setDisabledMap}
                        setDisabledFilters={setDisabledFilters}
                        setData={setData}
                        setFilters={setFilters}/>
                </Paper>
            </Grid>
             

            {/* ----------------------------------- */}
            {/* Filters Component */}
            {/* ----------------------------------- */}
            <Grid item  xs={12} md={4} lg={3} >      
                   <Paper className={classes.paper}>
                    <CardContent>
                      <Filters handleSetFilters={handleSetFilters} disabledFilters={disabledFilters}/>
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
                <Grid item  xs={12} md={4} lg={9}>
                  <Paper>
                    <TabContainer data={data} filters={filters}/>     
                  </Paper>  
                </Grid> )
            }
          </Grid>
        
  
    </React.Fragment>
    )
}