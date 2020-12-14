import React from 'react'
import ReactMapGL, { 
    Marker,  
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
  } 
from 'react-map-gl';
import PlaceIcon from '@material-ui/icons/Place';
import IconButton from '@material-ui/core/IconButton'


/* ----------------------------------- */
/* Set styles for Map's Control buttons */
/* ----------------------------------- */
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

export default function Map(props){

      const event = props.event

      const [viewport, setViewport] = React.useState({
          width:  '100%',
          height: 250,
          latitude: 56.15385440357377,
          longitude: 10.209113055098777,
          zoom: 8
        });

        let token = process.env.REACT_APP_TOKEN
        return (
          <ReactMapGL  mapboxApiAccessToken={token}
              mapStyle='mapbox://styles/xeniasdimitris/cki3rye421lkb19qigk2jv3bw'
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
          >

            {/* ----------------------------------- */}
            {/* Define Markers */}
            {/* ----------------------------------- */}
            {event && (
              <Marker key={event.title} latitude={event.latitude} longitude={event.longitude} >
                  <IconButton 
                        aria-label="place" 
                        style = {{color:'#ff5353'}}
                        size='small'
                      >
                    <PlaceIcon style={{margin:0, padding:0}}/> 
                  </IconButton>               
              </Marker>
            )}
  

            {/* ----------------------------------- */}
            {/* Button for for using user's location */}
            {/* ----------------------------------- */}
            <div style={geolocateStyle}>
              <GeolocateControl />
            </div>

            {/* ----------------------------------- */}
            {/* Map Fullscreen button */}
            {/* ----------------------------------- */}
            <div style={fullscreenControlStyle}>
              <FullscreenControl />
            </div>

            {/* ----------------------------------- */}
            {/* Map's Compass */}
            {/* ----------------------------------- */}
            <div style={navStyle}>
              <NavigationControl />
            </div>

            {/* ----------------------------------- */}
            {/* Zoom In/Out button */}
            {/* ----------------------------------- */}
            <div style={scaleControlStyle}>
              <ScaleControl />
            </div>
          </ReactMapGL>

        );
  }
  