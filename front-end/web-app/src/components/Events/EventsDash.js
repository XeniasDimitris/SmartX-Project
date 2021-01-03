import React, {useEffect} from 'react'
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent} from '@material-ui/core';
import Filters from './EventsFilters'
import Title from '../Title'
import { useStyles }  from '../../css/DashboardCSS'
import API from '../../api-services'
import Table from './Table'
import CircularProgress from '@material-ui/core/CircularProgress';


function formatDate(start,end){
    end = end ? `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`: null
    start =  start ? `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}` : null
    return {start,end}
  }

export default function EventsDash(props){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightChart);
    
    //--------------------------------
    //All about fetching data from API
    //---------------------------------
    const [data,setData] = React.useState(null)
    const [filters,setFilters] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
  
    const handleSetFilters = ({start,end,datasets})=>{
        let ret = formatDate(start,end)
        start = ret.start
        end = ret.end
        setFilters({start,end})
        setLoading(true)
    }
  
    //---------------------------------------------
    // API CALL for given filters from Filter Form
    //---------------------------------------------
    useEffect( () =>{
      
      if (filters){
        setTimeout( ()=>{
         API.EventsAPI(filters)
         .then( res =>{
             setData(res)
             setLoading(false)
         })
         .catch(err => err)
        }, 500 ) 
      }
    },[filters])
  
  
    return (

        <Grid container spacing={2}>

        {/* ----------------------------------- */}
        {/* Main Content of Dashboard */}
        {/* ----------------------------------- */}
  
        {/* Filters */}
        <Grid item  xs={12} md={4} lg={12} >

                <Paper className={classes.paper}>
                <CardContent >
                    <Filters handleSetFilters={handleSetFilters}/>
                </CardContent>

                </Paper>
        </Grid>
    
        {/* ----------------------------------------- */}
        {/* Raw Data Component */}
        {/* ----------------------------------------- */}

        {filters && 
        <Grid item xs={12} md={12} lg={12}>
            <Paper square={true} >
            <CardContent>
                <Title>Results</Title>
            </CardContent>
            </Paper>
            <Paper square={true} >
                <CardContent>
                { loading?
                <CircularProgress color="secondary" className={classes.loading}/>
                :<Table data={data}/>
                }
                </CardContent>
                
            </Paper>
        
        </Grid>}
          
    </Grid>
    );
}