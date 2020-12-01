import React, { useState,useEffect } from 'react'
import ReactMapGL, { 
    Marker, 
    Popup,
  } 
from 'react-map-gl';
import PlaceIcon from '@material-ui/icons/Place';
import IconButton from '@material-ui/core/IconButton'
import API from '../../api-services'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core';
import PopupMsg from './PopupMsg'
import MapLegend from './MapLegend'
import './Map.css'


  const useStyles = makeStyles(()=>({

    marker:{
      color:'#ff5353'
    },
    available_marker:{
      color: '#179700'
    },
  }))
  
  export default function Map(props){
      const classes = useStyles()
      const [popupSensor, setPopupSensor] = useState(null)
      const [selectedSensor, setSelectedSensor] = useState(null)
      const [neighborSensors, setNeighborSensors] = useState([])
      const [submitedSensor, setSubmitedSensor] = useState(null)
      const [disabledButton, setDisabledButton] = useState(false)

      const setReportIdData = props.setReportIdData

      const sensors = props.sensors
      const handleClickMarker = (sensor) => (e) => {
        setPopupSensor(sensor)
      } 
      const handleClickButton = (popupSensor) => (e) =>{
        setSelectedSensor(popupSensor)
        props.setDisabledMap(false)
        setPopupSensor(null)    
      }

      const handleResetClick = ()=>{
        setSelectedSensor(null)
        setNeighborSensors([])
        setDisabledButton(false)
        props.setFilters(null)
        props.setDisabledMap(true)
        props.setDisabledFilters(true)
        props.setData(null)
      }

      const handleSubmitClick = () =>{
        setSubmitedSensor(selectedSensor.id)
        setDisabledButton(true)
        props.setDisabledMap(true)
        props.setDisabledFilters(false)
      }

      useEffect( ()=>{
        if (submitedSensor){
          API.trafficCorSensorsAPI()
          .then( resp => {
            let data = []
            resp.map( item =>{
              if (item['POINT_1_NAME'] === submitedSensor || item['POINT_2_NAME'] === submitedSensor){
                data.push({rep_id: item['REPORT_ID'], point_1: item['POINT_1_NAME'], point_2: item['POINT_2_NAME']})
              }
            })
            setReportIdData(data)
          }
          )
        }
      }, [submitedSensor])

      useEffect( ()=>{
        if (selectedSensor){
          API.trafficCorSensorsAPI()
          .then(resp =>{
            let available_sensors = []
            resp.forEach( item =>{
              if (item['POINT_1_NAME']===selectedSensor.id && !available_sensors.includes(item['POINT_2_NAME'])){
                available_sensors.push(item['POINT_2_NAME'])
              }
              if (item['POINT_2_NAME']===selectedSensor.id && !available_sensors.includes(item['POINT_1_NAME'])){
                available_sensors.push(item['POINT_1_NAME'])
              }
            })
            setNeighborSensors(available_sensors)
          })
        }
      }, [selectedSensor])
      
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
              <Marker key={sensor.id} latitude={sensor.lat} longitude={sensor.lng} >
                  <IconButton 
                        aria-label="place" 
                        className={clsx( classes.marker, 
                                        neighborSensors.includes(sensor.id) && classes.available_marker)}
                        size='small'
                        disabled={!neighborSensors.includes(sensor.id) && selectedSensor!==null && selectedSensor!==sensor} 
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
                  latitude={popupSensor.lat} 
                  longitude={popupSensor.lng}
                  offsetLeft = {15}
                  dynamicPosition={false}
                  closeOnClick={false}
                  onClose= { (e)=> {setPopupSensor(null)}}
                  >
                  <PopupMsg popupSensor={popupSensor} handleClickButton={handleClickButton} disabledButton={disabledButton}/>
              </Popup>
            ): null}
  
              <MapLegend handleResetClick={handleResetClick} handleSubmitClick={handleSubmitClick} disabledMap={props.disabledMap} />
          </ReactMapGL>

        );
  }
  