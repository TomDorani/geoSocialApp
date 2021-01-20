import { Typography } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom'
import {Marker, Popup} from 'react-leaflet'

  // const latRef = useRef(null);
  // const LngRef = useRef(null);
  // const zoomRef = useRef(null);
  // const zoomOffRef = useRef(null);


  // function createMarker(item) {
  //   latRef.current = item.lat;
  //   LngRef.current = item.lng;
  //   zoomRef.current = item.zoom;
  //   zoomOffRef.current = item.zoomOffset;
  // }
const EventsCreator = (state) => {
  console.log(state);
  const markers = state.markersArr.map((item) => {
    if(item.coordinates){
    console.log(item)
    const position = [item.coordinates.coordinates[1], item.coordinates.coordinates[0]]
    console.log(position)
    const text=`"`+ item.text +`"`
    const authur=item.author+" says:"
    console.log(position)
    return (

      <Marker position={position}>
      <Popup>
       {authur}
          <br/>
          {text}
      </Popup>
      </Marker>
    )}
  })

  return(
    <div>
      {markers}
    </div>
  )


}

export default EventsCreator;
