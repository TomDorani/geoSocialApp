import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

export class Map extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 1,
        zoomOffset: 1
    }

    render() {
        const position = [this.state.lat, this.state.lng]
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
                width: "1100px"}} center={position} zoom={this.state.zoom} zoomOffset={this.zoomOffset}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup.
                            <br/>
                            Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        )
    }
}
