import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import Markers from "./Markers"

export class Map extends Component {
    state = { 
        markersData : [
        {
        lat: 51.505,
        lng: -0.09,
        zoom: 1,
        zoomOffset: 1
        },
        {
            lat: 20.505,
            lng: -0.09,
            zoom: 1,
            zoomOffset: 1
            },
        ]
    }

    render() {
        const position = [this.state.markersData[0].lat, this.state.markersData[0].lng]
        const h = window.innerHeight
        const w = window.innerWidth
        return (
            <div style={{
                paddingBottom: "5%",
                height: h,
                width: w/1.5
            }}>
                <MapContainer style={{
                paddingBottom: "5%",
                height: "900px",
                width: "1100px"}} center={position} zoom={this.state.markersData[0].zoom} zoomOffset={this.state.markersData[0].zoomOffset}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Markers markersArr = {this.state.markersData}></Markers>
                    {/* <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup.
                            <br/>
                            Easily customizable.
                        </Popup>
                    </Marker> */}
                </MapContainer>
            </div>
        )
    }
}
