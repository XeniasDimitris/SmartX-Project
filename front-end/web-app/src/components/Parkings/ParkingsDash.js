import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent, recomposeColor  } from '@material-ui/core';
import Title from '../Title'
import API from '../../api-services'
import Map from './ParkingsMap'
import CircularProgress from '@material-ui/core/CircularProgress';
import Filters from './ParkingsFilters'
import { transform_data } from './utils'
import TabContainer from './TabContainer'
import { useStyles }  from '../../css/DashboardCSS'


function formatDate(start,end){
  end = end ? `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`: null
  start =  start ? `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}` : null
  return {start,end}
}


export default function ParkingDash(props){

    /* ----------------------------------- */
    /* Define States of Component */
    /* ----------------------------------- */
    const classes = useStyles()
    const [parkings, setParkings] = useState(null)
    const [filters,setFilters] = useState(null)
    const [loading, setLoading] = useState(null)
    const [data, setData] = useState(null)

    
    /* ----------------------------------- */
    /* Handle Filter Submission */
    /* ----------------------------------- */
    const handleSetFilters = ({start,end,datasets}) =>{
      let ret = formatDate(start,end)
      start = ret.start
      end = ret.end
      setFilters({start,end,datasets})
      setLoading(true)
    }



    /* ---------------------------------------------------------- */
    /* Fetch Data for Parking Areas when filters will be submitted  */
    /* ---------------------------------------------------------- */
    useEffect( () =>{
      if (filters){
        const fetchdata = async () =>{
          let {start, end, datasets} = filters
          let res = {}
          let all = false
          await Promise.all(
            Object.keys(datasets).map( async key =>{
              if (datasets[key] === true && key==='All'){
                all = true
              }
              else if (datasets[key] === true || all === true){
                let parking = key
                let response = await API.ParkingsRecsAPI({start,end,parking},'D')
                response.map( item => {
                  if (res[item['datetime']]){
                    res[item['datetime']][key] = item.vehiclecount
                  }
                  else{
                    res[item['datetime']] = new Object()
                    res[item['datetime']][key] = item.vehiclecount
                 }
                })
              }
              
            })
          )
          res = transform_data(res)
          let data = {dataD : res}
          
          res = {}
          await Promise.all(
            Object.keys(datasets).map( async key =>{
              if (datasets[key] === true && key==='All'){
                all = true
              }
              else if (datasets[key] === true || all === true){
                let parking = key
                let response = await API.ParkingsRecsAPI({start,end,parking},'30min')
                response.map( item => {
                  if (res[item['datetime']]){
                    res[item['datetime']][key] = item.vehiclecount
                  }
                  else{
                    res[item['datetime']] = new Object()
                    res[item['datetime']][key] = item.vehiclecount
                 }
                })
              }
              
            })
          )
          res = transform_data(res)
          data.dataH = res
          console.log(data)
          setData(data)
          setLoading(false)

          }
        fetchdata() 
       } 
      },[filters])

    
    /* ------------------------------------------- */
    /* Fetch parking areas info when page will be loaded  */
    /* ------------------------------------------- */
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
            


            {/* ----------------------------------- */}
            {/* Filters Component */}
            {/* ----------------------------------- */}
            <Grid item  xs={12} md={4} lg={3} >      
                   <Paper className={classes.paper}>
                    <CardContent>
                      <Filters handleSetFilters={handleSetFilters}/>
                    </CardContent>
                   </Paper>
            </Grid>

            {/* ----------------------------------- */}
            {/* Map Component */}
            {/* ----------------------------------- */}
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
             

            {/* -------------------------------------------------*/}
            {/* if we have a submitted parking area, load charts */}
            {/* ------------------------------------------------ */}
            { filters && (
                loading ? 
                  <Grid item  xs={12} md={4} lg={12} >
                    <Paper className={classes.paper}>
                      <CardContent>
                        <CircularProgress color="secondary" className={classes.loading}/>
                      </CardContent>
                    </Paper>
                  </Grid>
                :
                  <Grid item  xs={12} md={4} lg={12} >      
                   <Paper>
                      <TabContainer data={data} filters={filters} />
                   </Paper>
                  </Grid>
            )}

          </Grid>
        
  
    </React.Fragment>
    )
}