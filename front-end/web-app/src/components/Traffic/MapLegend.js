import React from 'react'
import  { 
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl} 
from 'react-map-gl';
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';

const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  };
  
const fullscreenControlStyle = {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'
  };
  
const navStyle = {
    position: 'absolute',
    top: 72,
    left: 0,
    padding: '10px'
  };
  
const scaleControlStyle = {
    position: 'absolute',
    bottom: 36,
    left: 0,
    padding: '10px'
  };

const resetButtonStyle ={
    position: 'absolute',
    bottom: 70,
    left: 10,
    backgroundColor: '#ff5353',
    width: 200
  }

const submitButtonStyle ={
    position: 'absolute',
    bottom: 120,
    left: 10,
    width: 200
  }
export default function MapLegend(props){
    return (
        <React.Fragment>
        <div style={geolocateStyle}>
            <GeolocateControl />
          </div>
          <div style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
          <div style={navStyle}>
            <NavigationControl />
          </div>
          <div style={scaleControlStyle}>
            <ScaleControl />
          </div>
          <Button variant="contained" 
                  color='secondary' 
                  style={submitButtonStyle}
                  disabled={props.disabledMap}
                  onClick={props.handleSubmitClick}
                  >
                    <Typography>Lock Sensor</Typography>
          </Button>
          <Button variant="contained" 
                  color='secondary' 
                  style={resetButtonStyle}
                  onClick={props.handleResetClick}
                  >
                    <Typography>Reset</Typography>
          </Button>
        </React.Fragment>
    )
}