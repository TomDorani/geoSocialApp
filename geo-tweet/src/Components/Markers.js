import React from 'react';
import ReactDOM from 'react-dom'
import {Marker, Popup} from 'react-leaflet'

const EventsCreator = (state) => {


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

  const markers = state.markersArr.map((item, index) => {
    console.log(item)
    const position = [item.lat, item.lng]
    console.log(position)
    return (

      <Marker position={position}>
      <Popup>
          A pretty CSS3 popup.
          <br/>
          Easily customizable.
      </Popup>
      </Marker>
    )
  })

  return(
    <div>
      {markers}
    </div>
  )


}

export default EventsCreator;

// {
//   lat: 51.505,
//   lng: -0.09,
//   zoom: 1,
//   zoomOffset: 1
//   },