import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Markers from "./Markers";
import "./../CSS/Drawer.css"
import L from 'leaflet';
import "leaflet.markercluster";

export class Map extends Component {
    constructor(props) {
        super(props);
        console.log(props)
     
        this.state = {markers: [
            {
                Height : 0, 
                Width : 0,
                text : 'fa fa bi fa ti na mi',
                coordinates : [-79.9372, 32.7872] , 

              },
              {
                Height : 0, 
                Width : 0,
                text : 'fa fa bi fa ti na mi',
                coordinates : [-78.9372, 33.7872] , 

              }
        ]};
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
            <div  id = "mapdiv"
             style={{
                paddingBottom: "50%",
                position: "absolute",
            }}
            >
                <MapContainer  
                 style={{
                    height: h*0.80,
                    width: w*0.99,
                    paddingTop : "10%",
                    position: "initial",
                        outline: "auto",}}
                center={position}
                zoom={3}
                zoomOffset={4}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> "
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <MarkerClusterGroup>
                        <Markers markersArr = {this.state.markers}></Markers>
                        </MarkerClusterGroup>;
                </MapContainer>
            </div>
        )
    }
}
