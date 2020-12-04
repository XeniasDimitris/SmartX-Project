import React, { useState } from 'react'
import ReactMapGL, { 
    Marker, 
    Popup,    
  } 
from 'react-map-gl';
import PlaceIcon from '@material-ui/icons/Place';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import MapLegend from './PollutionMapLegend'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(()=>({

  marker:{
    color:'#ff5353'
  },
}))


export default function Map(props){
      const classes = useStyles()
      const [popupSensor, setPopupSensor] = useState(null)
      const selectedSensor = props.selectedSensor
      const setSelectedSensor = props.setSelectedSensor
      const sensors = props.sensors

      const handleClickMarker = (sensor) => (e) => {
        setPopupSensor(sensor)
      } 

      const handleClickButton = (sensor) => (e) =>{
        setPopupSensor(null)
        setSelectedSensor(sensor)
        props.setDisabledMap(false)
      }

      const handleSubmitClick = (e) =>{
        props.setDisabledMap(true)
        props.setDisabledFilterButton(false)
      }

      const handleResetClick = (e) =>{
        props.setDisabledMap(true)
        props.setDisabledFilterButton(true)
        props.setFilters(null)
        setSelectedSensor(null)
      }

      
      const [viewport, setViewport] = React.useState({
          width:  '100%',
          height: 750,
          latitude: 56.1496278,
          longitude: 10.2134046,
          zoom: 10.5
        });

        let token = process.env.REACT_APP_TOKEN
        return (
          <ReactMapGL  mapboxApiAccessToken={token}
              mapStyle='mapbox://styles/xeniasdimitris/cki3rye421lkb19qigk2jv3bw'
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            onClick={(e)=>setPopupSensor(null)}
          >
            {sensors && (
             sensors.map(sensor => (
              <Marker key={sensor.report_id} latitude={sensor.latitude} longitude={sensor.longitude} >
                  <IconButton 
                        aria-label="place" 
                        className={clsx(classes.marker)}
                        size='small'
                        disabled={selectedSensor!==null && selectedSensor!==sensor}
                        onClick={handleClickMarker(sensor)}
                      >
                    <PlaceIcon style={{margin:0, padding:0}}/> 
                  </IconButton>               
              </Marker>
             ) 
            ))}
  
            { popupSensor ? (
              <Popup 
                  tipSize={10}
                  latitude={popupSensor.latitude} 
                  longitude={popupSensor.longitude}
                  offsetLeft = {15}
                  dynamicPosition={false}
                  closeOnClick={false}
                  onClose= { (e)=> {setPopupSensor(null)}}
                  >
                    <Box m={1}>
                    <Typography component='span'> 
                    <Box mb={1} textAlign="center" fontSize="h6.fontSize" style={{textDecoration: 'underline'}}> Details  </Box>
                    </Typography>
                    <Typography component='span'  style={{display: 'flex'}}> 
                    <Box mr={1}> Id:  </Box>
                    <Box fontWeight='fontWeightBold'>{popupSensor.report_id}</Box>
                    </Typography>
                    </Box>
                    <Button color='secondary' onClick={handleClickButton(popupSensor)}> <Typography>Choose</Typography></Button>
              </Popup>
            ): null}
            <MapLegend handleResetClick={handleResetClick} handleSubmitClick={handleSubmitClick} disabledMap={props.disabledMap} />
          </ReactMapGL>

        );
  }
  