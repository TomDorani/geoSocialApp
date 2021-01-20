import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import Markers from "./Markers"
import "./../CSS/Drawer.css"
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
                paddingBottom: "50%",
                position: "absolute",
            }}>
                <MapContainer
                 style={{
                    height: h*0.88,
                    width: w*0.99,
                    position: "initial",
                        outline: "auto",}}
                center={position}
                zoom={3}
                zoomOffset={this.state.markersData[0].zoomOffset}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> "
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
