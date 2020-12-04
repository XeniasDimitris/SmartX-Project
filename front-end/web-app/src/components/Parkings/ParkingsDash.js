import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent  } from '@material-ui/core';
import Title from '../Title'
import API from '../../api-services'
import Map from './ParkingsMap'
import CircularProgress from '@material-ui/core/CircularProgress';
import Filters from './ParkingsFilters'
import Chart from './Chart'
import { useStyles }  from '../../css/DashboardCSS'

function formatDate(start,end){
  end = end ? `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`: null
  start =  start ? `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}` : null
  return {start,end}
}


export default function TrafficDash(props){
    const classes = useStyles()
    const [parkings, setParkings] = useState(null)
    const [filters,setFilters] = useState(null)
    const [loading, setLoading] = useState(null)
    const [data, setData] = useState(null)
    const [selectedParking, setSelectedParking] = useState(null)

    const handleSetFilters = ({start,end,datasets}) =>{
      let ret = formatDate(start,end)
      start = ret.start
      end = ret.end
      setFilters({start,end,datasets})
      setLoading(true)
    }


    useEffect( () =>{
      if (filters){
        let {start, end, datasets} = filters
        setTimeout( ()=>{
              API.ParkingsRecsAPI({start,end})
              .then(resp => {
                  let cum_data = [] 
                  for (let key in datasets){
                    if  ((key==='All') && (datasets[key]===true)){
                      setSelectedParking('All')
                      for (let i = 0; i < resp.length; i++){ 
                          let item = resp[i]
                          item.datetime = new Date(item.datetime)
                          if (cum_data.length===0) {
                            cum_data.push(item)
                            continue
                          }
                          if(item.datetime.toString() === cum_data[cum_data.length-1].datetime.toString()){
                            cum_data[cum_data.length-1].totalspaces += item.totalspaces
                            cum_data[cum_data.length-1].vehiclecount += item.vehiclecount
                            continue
                          }
                          cum_data.push(item)
                          
                      }

                      break;
                    }
                    if (datasets[key]===true){ // pernei mono to prwto checked
                      setSelectedParking(key)
                      for (let i = 0; i < resp.length; i++) {
                        let item = resp[i]
                        if (key === item['garagecode']){
                          item.datetime = new Date(item.datetime)
                          cum_data.push(item)
                        }
                      }
                      break;
                    }
                  }   
                  setData(cum_data)
                  setLoading(false)
              })
              .catch(error => error)
            }, 500 )} 
      },[filters])

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
                    <Paper className={classes.paper}>
                      <CardContent >
                        <Title> Parking Spaces of {selectedParking} </Title>
                        <Chart field={['vehiclecount','totalspaces']} 
                              data={data} 
                              chartID='parkings'/> 
                      </CardContent>
                    </Paper>
                  </Grid>
            )}

          </Grid>
        
  
    </React.Fragment>
    )
}