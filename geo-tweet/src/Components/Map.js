import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import Markers from "./Markers"
import "./../CSS/Drawer.css"
export class Map extends Component {
    constructor(props) {
        super(props);
        console.log(props)
     
        this.state = {markers: []};
      }
    componentWillMount(){
            const bringTweets = async () => {
              const res = await fetch( `http://127.0.0.1:5000/`,
              {headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'}        
             }
            );
            const data = await res.json();
            console.log("data:", data["tweets"]);
            this.state.markers=data["tweets"];
            console.log("markers:", this.state.markers);
            }
            bringTweets();
            
      }

    render() {
        const position = [30,35]
        const h = window.innerHeight
        const w = window.innerWidth
        console.log("markers2:", this.state.markers);
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
                zoomOffset={4}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> "
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Markers markersArr = {this.state.markers}></Markers>
                </MapContainer>
            </div>
        )
    }
}
